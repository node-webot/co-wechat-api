'use strict';
const url = require('url');
const crypto = require('crypto');

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
  var urlObj = new url.URL(this.snsPrefix + 'jscode2session');
  var params = urlObj.searchParams;
  params.append('appid', this.appid);
  params.append('secret', this.appsecret);
  params.append('js_code', jsCode);
  params.append('grant_type', 'authorization_code');

  return this.request(urlObj.href);
};

/**
 * 小程序加密数据解密算法
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95
 * @param {string} sessionKey
 * @param {string} iv
 * @param {string} encryptedData
 * @returns {Promise<Object>}
 */
exports.decryptDataForMiniProgram = async function (sessionKey, iv, encryptedData) {
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