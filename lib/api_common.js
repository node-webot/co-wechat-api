'use strict';

// 本文件用于wechat API，基础文件，主要用于Token的处理和mixin机制
const httpx = require('httpx');
const liburl = require('url');
const JSONbig = require('json-bigint');
const {
  replaceJSONCtlChars
} = require('./util');

class AccessToken {
  constructor(accessToken, expireTime) {
    this.accessToken = accessToken;
    this.expireTime = expireTime;
  }

  /*!
   * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比
   * Examples:
   * ```
   * token.isValid();
   * ```
   */
  isValid() {
    return !!this.accessToken && Date.now() < this.expireTime;
  }
}

class API {
  /**
   * 根据 appid 和 appsecret 创建API的构造函数
   * 如需跨进程跨机器进行操作Wechat API（依赖access token），access token需要进行全局维护
   * 使用策略如下：
   * 1. 调用用户传入的获取 token 的异步方法，获得 token 之后使用
   * 2. 使用appid/appsecret获取 token 。并调用用户传入的保存 token 方法保存
   * Tips:
   * - 如果跨机器运行wechat模块，需要注意同步机器之间的系统时间。
   * Examples:
   * ```
   * var API = require('wechat-api');
   * var api = new API('appid', 'secret');
   * ```
   * 以上即可满足单进程使用。
   * 当多进程时，token 需要全局维护，以下为保存 token 的接口。
   * ```
   * var api = new API('appid', 'secret', async function () {
   *   // 传入一个获取全局 token 的方法
   *   var txt = await fs.readFile('access_token.txt', 'utf8');
   *   return JSON.parse(txt);
   * }, async function (token) {
   *   // 请将 token 存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
   *   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
   *   await fs.writeFile('access_token.txt', JSON.stringify(token));
   * });
   * ```
   * @param {String} appid 在公众平台上申请得到的appid
   * @param {String} appsecret 在公众平台上申请得到的app secret
   * @param {AsyncFunction} getToken 可选的。获取全局token对象的方法，多进程模式部署时需在意
   * @param {AsyncFunction} saveToken 可选的。保存全局token对象的方法，多进程模式部署时需在意
   */
  constructor(appid, appsecret, getToken, saveToken, tokenFromCustom) {
    this.appid = appid;
    this.appsecret = appsecret;
    this.getToken = getToken || async function () {
      return this.store;
    };
    this.saveToken = saveToken || async function (token) {
      this.store = token;
      if (process.env.NODE_ENV === 'production') {
        console.warn('Don\'t save token in memory, when cluster or multi-computer!');
      }
    };
    this.prefix = 'https://api.weixin.qq.com/cgi-bin/';
    this.mpPrefix = 'https://mp.weixin.qq.com/cgi-bin/';
    this.fileServerPrefix = 'http://file.api.weixin.qq.com/cgi-bin/';
    this.payPrefix = 'https://api.weixin.qq.com/pay/';
    this.merchantPrefix = 'https://api.weixin.qq.com/merchant/';
    this.customservicePrefix = 'https://api.weixin.qq.com/customservice/';
    this.wxaPrefix = 'https://api.weixin.qq.com/wxa/';
    this.defaults = {};
    this.tokenFromCustom = tokenFromCustom;
    // set default js ticket handle
    this.registerTicketHandle();
  }

  /**
   * 用于设置urllib的默认options * Examples:
   * ```
   * api.setOpts({timeout: 15000});
   * ```
   * @param {Object} opts 默认选项
   */
  setOpts(opts) {
    this.defaults = opts;
  }

  /**
   * 设置urllib的hook
   */
  async request(url, opts, retry) {
    if (typeof retry === 'undefined') {
      retry = 3;
    }

    var options = {};
    Object.assign(options, this.defaults);
    opts || (opts = {});
    var keys = Object.keys(opts);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key !== 'headers') {
        options[key] = opts[key];
      } else {
        if (opts.headers) {
          options.headers = options.headers || {};
          Object.assign(options.headers, opts.headers);
        }
      }
    }

    var res = await httpx.request(url, options);
    if (res.statusCode < 200 || res.statusCode > 204) {
      var err = new Error(`url: ${url}, status code: ${res.statusCode}`);
      err.name = 'WeChatAPIError';
      throw err;
    }

    var buffer = await httpx.read(res);
    var contentType = res.headers['content-type'] || '';
    if (contentType.indexOf('application/json') !== -1) {
      var data;
      var origin = buffer.toString();
      try {
        data = JSONbig.parse(replaceJSONCtlChars(origin));
      } catch (ex) {
        let err = new Error('JSON.parse error. buffer is ' + origin);
        err.name = 'WeChatAPIError';
        throw err;
      }

      if (data && data.errcode) {
        let err = new Error(data.errmsg);
        err.name = 'WeChatAPIError';
        err.code = data.errcode;

        if ((err.code === 40001 || err.code === 42001) && retry > 0 && !this.tokenFromCustom) {
          // 销毁已过期的token
          await this.saveToken(null);
          let token = await this.getAccessToken();
          let urlobj = liburl.parse(url, true);

          if (urlobj.query && urlobj.query.access_token) {
            urlobj.query.access_token = token.accessToken;
            delete urlobj.search;
          }

          return this.request(liburl.format(urlobj), opts, retry - 1);
        }

        throw err;
      }

      return data;
    }

    return buffer;
  }

  /*!
   * 根据创建API时传入的appid和appsecret获取access token
   * 进行后续所有API调用时，需要先获取access token
   * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=获取access_token> * 应用开发者无需直接调用本API。 * Examples:
   * ```
   * var token = await api.getAccessToken();
   * ```
   * - `err`, 获取access token出现异常时的异常对象
   * - `result`, 成功时得到的响应结果 * Result:
   * ```
   * {"access_token": "ACCESS_TOKEN","expires_in": 7200}
   * ```
   */
  async getAccessToken() {
    var url = this.prefix + 'token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.appsecret;
    var data = await this.request(url);

    // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
    var expireTime = Date.now() + (data.expires_in - 10) * 1000;
    var token = new AccessToken(data.access_token, expireTime);
    await this.saveToken(token);
    return token;
  }

  /*!
   * 需要access token的接口调用如果采用preRequest进行封装后，就可以直接调用。
   * 无需依赖 getAccessToken 为前置调用。
   * 应用开发者无需直接调用此API。
   * Examples:
   * ```
   * await api.ensureAccessToken();
   * ```
   */
  async ensureAccessToken() {
    // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
    var token = await this.getToken();
    var accessToken;
    if (token && (accessToken = new AccessToken(token.accessToken, token.expireTime)).isValid()) {
      return accessToken;
    } else if (this.tokenFromCustom) {
      let err = new Error('accessToken Error');
      err.name = 'WeChatAPIError';
      err.code = 40001;
      throw err;
    }
    return this.getAccessToken();
  }
}

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * Examples:
 * ```
 * // 媒体管理（上传、下载）
 * API.mixin(require('./lib/api_media'));
 * ```
 * @param {Object} obj 要合并的对象
 */
API.mixin = function (obj) {
  for (var key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: '+ key);
    }
    API.prototype[key] = obj[key];
  }
};

API.AccessToken = AccessToken;

module.exports = API;
