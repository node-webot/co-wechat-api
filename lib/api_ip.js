var util = require('./util');


/**
 * 获取微信服务器IP地址
 * 详情请见：<http://mp.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E5%BE%AE%E4%BF%A1%E6%9C%8D%E5%8A%A1%E5%99%A8IP%E5%9C%B0%E5%9D%80>
 * Examples:
 * ```
 * api.getIp();
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *   "ip_list":["127.0.0.1","127.0.0.1"]
 * }
 * ```

 */
exports.getIp = function () {
  this.preRequest(this._getIp, arguments);
};

/*!
* 获取微信服务器IP地址的未封装版本
*/
exports._getIp = function () {
  // https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=ACCESS_TOKEN
  var url = this.prefix + 'getcallbackip?access_token=' + token.accessToken;
  return yield * this.request(url, {dataType: 'json'});
};
