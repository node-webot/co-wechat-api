'use strict';
const url = require('url');

/**
 * 小程序登录凭证校验
 * 详细细节 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
 * Examples:
 * ```
 * api.code2Session('jd745fgdfg');
 * ```

 * @param {String} jsCode 小程序登录时获取的 code
 */
exports.code2Session = async function (jsCode) {
  // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  var urlObj = url.parse(this.snsPrefix + 'jscode2session');
  var params = urlObj.searchParams;
  params.append('appid', this.appid);
  params.append('secret', this.appsecret);
  params.append('js_code', jsCode);
  params.append('grant_type', 'authorization_code');

  return this.request(urlObj.href);
};
