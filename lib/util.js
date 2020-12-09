'use strict';
const crypto = require('crypto');

/*!
 * 对提交参数一层封装，当POST JSON，并且结果也为JSON时使用 */
exports.postJSON = function (data) {
  return {
    dataType: 'json',
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
};

exports.getData = function () {
  return {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };
};


const JSONCtlCharsMap = {
  '"': '\\"',       // \u0022
  '\\': '\\',       // \u005c
  '\b': '\\b',      // \u0008
  '\f': '\\f',      // \u000c
  '\n': '\\n',      // \u000a
  '\r': '\\r',      // \u000d
  '\t': '\\t'       // \u0009
};
const JSONCtlCharsRE = /[\u0000-\u001F\u005C]/g;

function _replaceOneChar(c) {
  return JSONCtlCharsMap[c] || '\\u' + (c.charCodeAt(0) + 0x10000).toString(16).substr(1);
}

exports.replaceJSONCtlChars = function (str) {
  return str.replace(JSONCtlCharsRE, _replaceOneChar);
};

/**
 * 小程序加密数据解密算法
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
 * @param {string} sessionKey
 * @param {string} iv
 * @param {string} encryptedData
 * @returns {Object}
 */
exports.decryptDataForMiniProgram = function (sessionKey, iv, encryptedData) {
  const sessionKeyBuffer = Buffer.from(sessionKey, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');
  const encryptedBuffer = Buffer.from(encryptedData, 'base64');

  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer);
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    const decoded =
        decipher.update(encryptedBuffer, 'binary', 'utf8') +
        decipher.final('utf8');

    return JSON.parse(decoded);
  } catch (err) {
    throw new Error('解密失败');
  }
};
