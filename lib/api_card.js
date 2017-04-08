'use strict';

const path = require('path');
const fs = require('co-fs');
const formstream = require('formstream');

const { postJSON } = require('./util');

/**
 * 上传Logo
 * Examples:
 * ```
 * api.uploadLogo('filepath');
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"ok",
 *  "url":"http://mmbiz.qpic.cn/mmbiz/iaL1LJM1mF9aRKPZJkmG8xXhiaHqkKSVMMWeN3hLut7X7hicFNjakmxibMLGWpXrEXB33367o7zHN0CwngnQY7zb7g/0"
 * }
 * ``` * @name uploadLogo
 * @param {String} filepath 文件路径
 */
exports.uploadLogo = async function (filepath) {
  var stat = await fs.stat(filepath);
  var token = await this.ensureAccessToken();
  var form = formstream();
  form.file('buffer', filepath, path.basename(filepath), stat.size);
  var url = this.fileServerPrefix + 'media/uploadimg?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    method: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    stream: form
  };
  return await this.request(url, opts);
};

/**
 * @name addLocations
 * @param {Array} locations 位置
 */
exports.addLocations = async function (locations) {
  var data = {
    location_list: locations
  };
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/location/batchadd?access_token=' + token.accessToken;
  return await this.request(url, postJSON(data));
};

exports.getLocations = async function (offset, count) {
  var data = {
    offset: offset,
    count: count
  };
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/location/batchget?access_token=' + token.accessToken;
  return await this.request(url, postJSON(data));
};

exports.getColors = async function () {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/getcolors?access_token=' + token.accessToken;
  return await this.request(url, {dataType: 'json'});
};

exports.createCard = async function (card) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/create?access_token=' + token.accessToken;
  var data = {card: card};
  return await this.request(url, postJSON(data));
};

exports.getRedirectUrl = function (url, encryptCode, cardId) {
  // TODO
};

exports.createQRCode = async function (card) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/qrcode/create?access_token=' + token.accessToken;
  var data = {
    action_name: 'QR_CARD',
    action_info: {
      card: card
    }
  };
  return await this.request(url, postJSON(data));
};

exports.consumeCode = async function (code, cardId) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/consume?access_token=' + token.accessToken;
  var data = {
    code: code,
    card_id: cardId
  };
  return await this.request(url, postJSON(data));
};

exports.decryptCode = async function (encryptCode) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/decrypt?access_token=' + token.accessToken;
  var data = {
    encrypt_code: encryptCode
  };
  return await this.request(url, postJSON(data));
};

exports.deleteCard = async function (cardId) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/delete?access_token=' + token.accessToken;
  var data = {
    card_id: cardId
  };
  return await this.request(url, postJSON(data));
};

exports.getCode = async function (code, cardId) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/get?access_token=' + token.accessToken;
  var data = {code: code};
  if (cardId) {
    data.card_id = cardId;
  }
  return await this.request(url, postJSON(data));
};

exports.getCards = async function (offset, count, status_list) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/batchget?access_token=' + token.accessToken;
  var data = {
    offset: offset,
    count: count
  };
  if (status_list) {
    data.status_list = status_list;
  }
  return await this.request(url, postJSON(data));
};

exports.getCard = async function (cardId) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/get?access_token=' + token.accessToken;
  var data = {
    card_id: cardId
  };
  return await this.request(url, postJSON(data));
};
/**
 * 获取用户已领取的卡券
 * 详细细节 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272&token=&lang=zh_CN
 * Examples:
 * ```
 * api.getCardList('openid', 'card_id');
 * ```
 *
 * @param {String} openid 用户的openid
 * @param {String} cardId 卡券的card_id
 */
exports.getCardList = async function (openid, cardId) {
  var token = await this.ensureAccessToken();
  // {
  //  "openid":"openid",
  //  "card_id":"cardId"
  // }
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'card/user/getcardlist?access_token=' + token.accessToken;
  var data = {
    'openid': openid,
    'card_id': cardId
  };
  return await this.request(url, postJSON(data));
};

exports.updateCode = async function (code, cardId, newcode) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/update?access_token=' + token.accessToken;
  var data = {
    code: code,
    card_id: cardId,
    newcode: newcode
  };
  return await this.request(url, postJSON(data));
};

exports.unavailableCode = async function (code, cardId) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/unavailable?access_token=' + token.accessToken;
  var data = {
    code: code
  };
  if (cardId) {
    data.card_id = cardId;
  }
  return await this.request(url, postJSON(data));
};

exports.updateCard = async function (cardId, cardInfo) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/update?access_token=' + token.accessToken;
  var data = {
    card_id: cardId,
    member_card: cardInfo
  };
  return await this.request(url, postJSON(data));
};

exports.updateCardStock = async function (cardId, num) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/modifystock?access_token=' + token.accessToken;
  var data = {
    card_id: cardId
  };
  if (num > 0) {
    data.increase_stock_value = Math.abs(num);
  } else {
    data.reduce_stock_value = Math.abs(num);
  }
  return await this.request(url, postJSON(data));
};

exports.activateMembercard = async function (info) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/activate?access_token=' + token.accessToken;
  return await this.request(url, postJSON(info));
};

exports.updateMembercard = async function (info) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/updateuser?access_token=' + token.accessToken;
  return await this.request(url, postJSON(info));
};

exports.updateMovieTicket = async function (info) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/movieticket/updateuser?access_token=' + token.accessToken;
  return await this.request(url, postJSON(info));
};

exports.checkInBoardingPass = async function (info) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/boardingpass/checkin?access_token=' + token.accessToken;
  return await this.request(url, postJSON(info));
};

exports.updateLuckyMonkeyBalance = async function (code, cardId, balance) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/luckymonkey/updateuserbalance?access_token=' + token.accessToken;
  var data = {
    'code': code,
    'card_id': cardId,
    'balance': balance
  };
  return await this.request(url, postJSON(data));
};

exports.updateMeetingTicket = async function (info) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/meetingticket/updateuser?access_token=' + token.accessToken;
  return await this.request(url, postJSON(info));
};

exports.setTestWhitelist = async function (info) {
  var token = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/testwhitelist/set?access_token=' + token.accessToken;
  return await this.request(url, postJSON(info));
};
