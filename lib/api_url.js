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
    'long_url': longUrl
  };
  return this.request(url, postJSON(data));
};
