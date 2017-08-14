'use strict';

const crypto = require('crypto');

class Ticket {
  constructor(ticket, expireTime) {
    this.ticket = ticket;
    this.expireTime = expireTime;
  }

  isValid() {
    return !!this.ticket && (new Date().getTime()) < this.expireTime;
  }
}

/**
 * 多台服务器负载均衡时，ticketToken需要外部存储共享。
 * 需要调用此registerTicketHandle来设置获取和保存的自定义方法。 * Examples:
 * ```
 * api.registerTicketHandle(getTicketToken, saveTicketToken);
 * // getTicketToken
 * function getTicketToken(type) {
 *  settingModel.getItem(type, {key: 'weixin_ticketToken'}, function (err, setting) {
 *    if (err) return callback(err);
 *    callback(null, setting.value);
 *  });
 * }
 * // saveTicketToken
 * function saveTicketToken(type, _ticketToken) {
 *  settingModel.setItem(type, {key:'weixin_ticketToken', value: ticketToken}, function (err) {
 *    if (err) return callback(err);
 *    callback(null);
 *  });
 * }
 * ```
 * @param {Function} getTicketToken 获取外部ticketToken的函数
 * @param {Function} saveTicketToken 存储外部ticketToken的函数
 */
exports.registerTicketHandle = function (getTicketToken, saveTicketToken) {
  if (!getTicketToken && !saveTicketToken) {
    this.ticketStore = {};
  }
  this.getTicketToken = getTicketToken || async function (type) {
    type = type || 'jsapi';
    return this.ticketStore[type];
  };

  this.saveTicketToken = saveTicketToken || async function (type, ticketToken) {
    // 向下兼容
    if (arguments.length === 1) {
      ticketToken = type;
      type = 'jsapi';
    }

    this.ticketStore[type] = ticketToken;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Dont save ticket in memory, when cluster or multi-computer!');
    }
  };
};

/**
 * 获取js sdk所需的有效js ticket
 * - `err`, 异常对象
 * - `result`, 正常获取时的数据 * Result:
 * - `errcode`, 0为成功
 * - `errmsg`, 成功为'ok'，错误则为详细错误信息
 * - `ticket`, js sdk有效票据，如：bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA
 * - `expires_in`, 有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket */
exports.getTicket = async function (type) {
  const { accessToken } = await this.ensureAccessToken();
  type = type || 'jsapi';

  var url = this.prefix + 'ticket/getticket?access_token=' + accessToken + '&type=' + type;
  var data = await this.request(url, {dataType: 'json'});

  // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
  var expireTime = Date.now() + (data.expires_in - 10) * 1000;
  var ticket = new Ticket(data.ticket, expireTime);
  await this.saveTicketToken(type, ticket);
  return ticket;
};

/*!
 * 生成随机字符串 */
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

/*!
 * 生成时间戳 */
var createTimestamp = function () {
  return '' + Math.floor(Date.now() / 1000);
};

/*!
 * 排序查询字符串 */
var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    newArgs[key.toLowerCase()] = args[key];
  }

  var string = '';
  var newKeys = Object.keys(newArgs);
  for (let i = 0; i < newKeys.length; i++) {
    let k = newKeys[i];
    string += '&' + k + '=' + newArgs[k];
  }
  return string.substr(1);
};

/*!
 * 签名算法 * @param {String} nonceStr 生成签名的随机串
 * @param {String} jsapi_ticket 用于签名的jsapi_ticket
 * @param {String} timestamp 时间戳
 * @param {String} url 用于签名的url，注意必须与调用JSAPI时的页面URL完全一致 */
var sign = function (nonceStr, jsapi_ticket, timestamp, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url
  };
  var string = raw(ret);
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
};

/*!
 * 卡券card_ext里的签名算法 * @name signCardExt
 * @param {String} api_ticket 用于签名的临时票据，获取方式见2.获取api_ticket。
 * @param {String} card_id 生成卡券时获得的card_id
 * @param {String} timestamp 时间戳，商户生成从1970 年1 月1 日是微信卡券接口文档00:00:00 至今的秒数,即当前的时间,且最终需要转换为字符串形式;由商户生成后传入。
 * @param {String} code 指定的卡券code 码，只能被领一次。use_custom_code 字段为true 的卡券必须填写，非自定义code 不必填写。
 * @param {String} openid 指定领取者的openid，只有该用户能领取。bind_openid 字段为true 的卡券必须填写，非自定义code 不必填写。
 * @param {String} balance 红包余额，以分为单位。红包类型（LUCKY_MONEY）必填、其他卡券类型不必填。 */
var signCardExt = function(api_ticket, card_id, timestamp, code, openid, balance) {
  var values = [api_ticket, card_id, timestamp, code || '',  openid || '', balance || ''];
  values.sort();

  var string = values.join('');
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
};

exports.ensureTicket = async function (type) {
  var cache = await this.getTicketToken(type);

  var ticket;
  // 有ticket并且ticket有效直接调用
  if (cache) {
    ticket = new Ticket(cache.ticket, cache.expireTime);
  }

  // 没有ticket或者无效
  if (!ticket || !ticket.isValid()) {
    // 从微信端获取ticket
    ticket = await this.getTicket(type);
  }
  return ticket;
};

/**
 * 获取微信JS SDK Config的所需参数 * Examples:
 * ```
 * var param = {
 *  debug: false,
 *  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
 *  url: 'http://www.xxx.com'
 * };
 * api.getJsConfig(param);
 * ```
 * - `result`, 调用正常时得到的js sdk config所需参数
 * @param {Object} param 参数
 */
exports.getJsConfig = async function (param) {
  var ticket = await this.ensureTicket('jsapi');
  var nonceStr = createNonceStr();
  var jsAPITicket = ticket.ticket;
  var timestamp = createTimestamp();
  var signature = sign(nonceStr, jsAPITicket, timestamp, param.url);

  return {
    debug: param.debug,
    appId: this.appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: param.jsApiList
  };
};

/**
 * 获取微信JS SDK Config的所需参数
 * Examples:
 * ```
 * var param = {
 *  card_id: 'p-hXXXXXXX',
 *  code: '1234',
 *  openid: '111111',
 *  balance: 100
 * };
 * api.getCardExt(param);
 * ```
 * - `result`, 调用正常时得到的card_ext对象，包含所需参数
 * @name getCardExt
 * @param {Object} param 参数
 */
exports.getCardExt = async function (param) {
  var apiTicket = await this.ensureTicket('wx_card');
  var timestamp = createTimestamp();
  var signature = signCardExt(apiTicket.ticket, param.card_id, timestamp, param.code, param.openid, param.balance);
  var result = {
    timestamp: timestamp,
    signature: signature
  };

  result.code = param.code || '';
  result.openid = param.openid || '';

  if (param.balance) {
    result.balance = param.balance;
  }
  return result;
};

/**
 * 获取最新的js api ticket
 * Examples:
 * ```
 * api.getLatestTicket();
 * ```
 * - `err`, 获取js api ticket出现异常时的异常对象
 * - `ticket`, 获取的ticket
 */
exports.getLatestTicket = async function () {
  return this.ensureTicket('jsapi');
};
