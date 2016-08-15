'use strict';

const path = require('path');
const fs = require('co-fs');
const formstream = require('formstream');
const util = require('./util');
const postJSON = util.postJSON;

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
exports.uploadLogo = function* (filepath) {
  var stat = yield fs.stat(filepath);
  var token = yield* this.ensureAccessToken();
  var form = formstream();
  form.file('buffer', filepath, path.basename(filepath), stat.size);
  var url = this.fileServerPrefix + 'media/uploadimg?access_token=' + token.accessToken;
  var opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    stream: form
  };
  return yield* this.request(url, opts);
};

/**
 * @name addLocations
 * @param {Array} locations 位置
 */
exports.addLocations = function* (locations) {
  var data = {
    location_list: locations
  };
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/location/batchadd?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(data));
};

exports.getLocations = function* (offset, count) {
  var data = {
    offset: offset,
    count: count
  };
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/location/batchget?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(data));
};

exports.getColors = function* () {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/getcolors?access_token=' + token.accessToken;
  return yield* this.request(url, {dataType: 'json'});
};

exports.createCard = function* (card) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/create?access_token=' + token.accessToken;
  var data = {card: card};
  return yield* this.request(url, postJSON(data));
};

exports.getRedirectUrl = function (url, encryptCode, cardId) {
  // TODO
};

exports.createQRCode = function* (card) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/qrcode/create?access_token=' + token.accessToken;
  var data = {
    action_name: 'QR_CARD',
    action_info: {
      card: card
    }
  };
  return yield* this.request(url, postJSON(data));
};

exports.consumeCode = function* (code, cardId) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/consume?access_token=' + token.accessToken;
  var data = {
    code: code,
    card_id: cardId
  };
  return yield* this.request(url, postJSON(data));
};

exports.decryptCode = function* (encryptCode) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/decrypt?access_token=' + token.accessToken;
  var data = {
    encrypt_code: encryptCode
  };
  return yield* this.request(url, postJSON(data));
};

exports.deleteCard = function* (cardId) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/delete?access_token=' + token.accessToken;
  var data = {
    card_id: cardId
  };
  return yield* this.request(url, postJSON(data));
};

exports.getCode = function* (code, cardId) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/get?access_token=' + token.accessToken;
  var data = {code: code};
  if (cardId) {
    data.card_id = cardId;
  }
  return yield* this.request(url, postJSON(data));
};

exports.getCards = function* (offset, count, status_list) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/batchget?access_token=' + token.accessToken;
  var data = {
    offset: offset,
    count: count
  };
  if (status_list) {
    data.status_list = status_list;
  }
  return yield* this.request(url, postJSON(data));
};

exports.getCard = function* (cardId) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/get?access_token=' + token.accessToken;
  var data = {
    card_id: cardId
  };
  return yield* this.request(url, postJSON(data));
};

exports.updateCode = function* (code, cardId, newcode) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/update?access_token=' + token.accessToken;
  var data = {
    code: code,
    card_id: cardId,
    newcode: newcode
  };
  return yield* this.request(url, postJSON(data));
};

exports.unavailableCode = function* (code, cardId) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/code/unavailable?access_token=' + token.accessToken;
  var data = {
    code: code
  };
  if (cardId) {
    data.card_id = cardId;
  }
  return yield* this.request(url, postJSON(data));
};

exports.updateCard = function* (cardId, cardInfo) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/update?access_token=' + token.accessToken;
  var data = {
    card_id: cardId,
    member_card: cardInfo
  };
  return yield* this.request(url, postJSON(data));
};

exports.updateCardStock = function* (cardId, num) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/modifystock?access_token=' + token.accessToken;
  var data = {
    card_id: cardId
  };
  if (num > 0) {
    data.increase_stock_value = Math.abs(num);
  } else {
    data.reduce_stock_value = Math.abs(num);
  }
  return yield* this.request(url, postJSON(data));
};

exports.activateMembercard = function* (info) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/activate?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(info));
};

exports.updateMembercard = function* (info) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/membercard/updateuser?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(info));
};

exports.updateMovieTicket = function* (info) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/movieticket/updateuser?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(info));
};

exports.checkInBoardingPass = function* (info) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/boardingpass/checkin?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(info));
};

exports.updateLuckyMonkeyBalance = function* (code, cardId, balance) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/luckymonkey/updateuserbalance?access_token=' + token.accessToken;
  var data = {
    'code': code,
    'card_id': cardId,
    'balance': balance
  };
  return yield* this.request(url, postJSON(data));
};

exports.updateMeetingTicket = function* (info) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/meetingticket/updateuser?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(info));
};

exports.setTestWhitelist = function* (info) {
  var token = yield* this.ensureAccessToken();
  var url = 'https://api.weixin.qq.com/card/testwhitelist/set?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(info));
};
