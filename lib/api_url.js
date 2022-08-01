'use strict';

const { postJSON } = require('./util');

/**
 * 短网址服务
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=长链接转短链接接口
 * Examples:
 * ```
 * api.shorturl('http://mp.weixin.com');
 * ```

 * @param {String} longUrl 需要转换的长链接，支持http://、https://、weixin://wxpay格式的url
 */
exports.shorturl = async function (longUrl) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/shorturl?access_token=ACCESS_TOKEN
  var url = this.prefix + 'shorturl?access_token=' + accessToken;
  var data = {
    'action': 'long2short',
    'long_url': longUrl,
  };
  return this.request(url, postJSON(data));
};

/**
 * 获取小程序 URL Link，适用于短信、邮件、网页、微信内等拉起小程序的业务场景。目前仅针对国内非个人主体的小程序开放
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-link/urllink.generate.html
 * {
 *     "path": "/pages/publishHomework/publishHomework",
 *     "query": "",
 *     "expire_type":1,
 *     "expire_interval":1,
 *     "env_version": "release",
 *     "cloud_base":
 *     {
 *         "env": "xxx",
 *         "domain": "xxx.xx",
 *         "path": "/jump-wxa.html",
 *         "query": "a=1&b=2"
 *     }
 * }
 *
 * {
 *  "errcode": 0,
 *  "errmsg": "ok",
 *  "url_link": "URL Link"
 * }
 *
 * Examples:
 * ```
 * api.getUrlLink({});
 * ```
 */
exports.getUrlLink = async function ({ path, query, envVersion, expireType, expireTime, expireInterval, cloudBase }) {
  const { accessToken } = await this.ensureAccessToken();
  const apiUrl = this.wxaPrefix + 'generate_urllink?access_token=' + accessToken;
  const data = {
    path,
    query,
    env_version: envVersion,
    expire_type: expireType,
    expire_time: expireTime,
    expire_interval: expireInterval,
    cloud_base: cloudBase,
  };
  return this.request(apiUrl, postJSON(data));
};