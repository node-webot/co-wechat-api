'use strict';

const path = require('path');

const { promisify } = require('util');
const { stat } = require('fs');
const statAsync = promisify(stat);
const formstream = require('formstream');

const { postJSON } = require('./util');

/**
 * 上传Logo
 * Examples:
 * ```
 * api.uploadLogo('filepath');
 * ```
 *
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
  var stat = await statAsync(filepath);
  const { accessToken } = await this.ensureAccessToken();
  var form = formstream();
  form.file('buffer', filepath, path.basename(filepath), stat.size);
  var url = this.fileServerPrefix + 'media/uploadimg?access_token=' + accessToken;
  var opts = {
    dataType: 'json',
    method: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    stream: form
  };
  return this.request(url, opts);
};

/**
 * @name addLocations
 * @param {Array} locations 位置
 */
exports.addLocations = async function (locations) {
  var data = {
    location_list: locations
  };
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/location/batchadd?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

exports.getLocations = async function (offset, count) {
  var data = {
    offset: offset,
    count: count
  };
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/location/batchget?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

exports.getColors = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/getcolors?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

exports.createCard = async function (card) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/create?access_token=' + accessToken;
  var data = {card: card};
  return this.request(url, postJSON(data));
};

exports.getRedirectUrl = function (url, encryptCode, cardId) {
  // TODO
};

exports.createQRCode = async function (card) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/qrcode/create?access_token=' + accessToken;
  var data = {
    action_name: 'QR_CARD',
    action_info: {
      card: card
    }
  };
  return this.request(url, postJSON(data));
};

exports.consumeCode = async function (code, cardId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/consume?access_token=' + accessToken;
  var data = {
    code: code,
    card_id: cardId
  };
  return this.request(url, postJSON(data));
};

exports.decryptCode = async function (encryptCode) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/decrypt?access_token=' + accessToken;
  var data = {
    encrypt_code: encryptCode
  };
  return this.request(url, postJSON(data));
};

exports.deleteCard = async function (cardId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/delete?access_token=' + accessToken;
  var data = {
    card_id: cardId
  };
  return this.request(url, postJSON(data));
};

exports.getCode = async function (code, cardId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/get?access_token=' + accessToken;
  var data = {code: code};
  if (cardId) {
    data.card_id = cardId;
  }
  return this.request(url, postJSON(data));
};

exports.getCards = async function (offset, count, status_list) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/batchget?access_token=' + accessToken;
  var data = {
    offset: offset,
    count: count
  };
  if (status_list) {
    data.status_list = status_list;
  }
  return this.request(url, postJSON(data));
};

exports.getCard = async function (cardId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/get?access_token=' + accessToken;
  var data = {
    card_id: cardId
  };
  return this.request(url, postJSON(data));
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
  const { accessToken } = await this.ensureAccessToken();
  // {
  //  "openid":"openid",
  //  "card_id":"cardId"
  // }
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'card/user/getcardlist?access_token=' + accessToken;
  var data = {
    'openid': openid,
    'card_id': cardId
  };
  return this.request(url, postJSON(data));
};

exports.updateCode = async function (code, cardId, newcode) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/update?access_token=' + accessToken;
  var data = {
    code: code,
    card_id: cardId,
    newcode: newcode
  };
  return this.request(url, postJSON(data));
};

exports.unavailableCode = async function (code, cardId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/unavailable?access_token=' + accessToken;
  var data = {
    code: code
  };
  if (cardId) {
    data.card_id = cardId;
  }
  return this.request(url, postJSON(data));
};

exports.updateCard = async function (cardId, cardInfo) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/update?access_token=' + accessToken;
  var data = {
    card_id: cardId,
    member_card: cardInfo
  };
  return this.request(url, postJSON(data));
};

exports.updateCardStock = async function (cardId, num) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/modifystock?access_token=' + accessToken;
  var data = {
    card_id: cardId
  };
  if (num > 0) {
    data.increase_stock_value = Math.abs(num);
  } else {
    data.reduce_stock_value = Math.abs(num);
  }
  return this.request(url, postJSON(data));
};

exports.activateMembercard = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/activate?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};

exports.getActivateMembercardUrl = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/activate/geturl?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};


exports.updateMembercard = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/updateuser?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};

exports.getActivateTempinfo = async function (activate_ticket) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/activatetempinfo/get?access_token=' + accessToken;
  return this.request(url, postJSON({activate_ticket}));
};

exports.activateUserForm = async function (data) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/activateuserform/set?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

exports.updateMovieTicket = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/movieticket/updateuser?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};

exports.checkInBoardingPass = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/boardingpass/checkin?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};

exports.updateLuckyMonkeyBalance = async function (code, cardId, balance) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/luckymonkey/updateuserbalance?access_token=' + accessToken;
  var data = {
    'code': code,
    'card_id': cardId,
    'balance': balance
  };
  return this.request(url, postJSON(data));
};

exports.updateMeetingTicket = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/meetingticket/updateuser?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};

exports.setTestWhitelist = async function (info) {
  const { accessToken } = await this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/testwhitelist/set?access_token=' + accessToken;
  return this.request(url, postJSON(info));
};
