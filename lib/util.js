'use strict';

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
