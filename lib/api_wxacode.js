'use strict';

const { postJSON } = require('./util');

/**
 * 获取小程序二维码，适用于需要的码数量较少的业务场景
 * https://developers.weixin.qq.com/miniprogram/dev/api/createWXAQRCode.html
 * Examples:
 * ```
 * var path = 'index?foo=bar'; // 小程序页面路径
 * api.createWXAQRCode(path);
 * ```
 * @param {String} path 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
 * @param {String} width 二维码的宽度，单位 px。最小 280px，最大 1280px
 */
exports.createWXAQRCode = async function (path, width = 430) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'wxaapp/createwxaqrcode?access_token=' + accessToken;
  var data = {
    path,
    width
  };
  return this.request(apiUrl, postJSON(data));
};


/**
 * 获取小程序码，适用于需要的码数量较少的业务场景
 * https://developers.weixin.qq.com/miniprogram/dev/api/getWXACode.html
 * Examples:
 * ```
 * var path = 'index?foo=bar'; // 小程序页面路径
 * api.getWXACode(path);
 * ```
 * @param {String} path 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
 * @param {String} width 二维码的宽度，单位 px。最小 280px，最大 1280px
 * @param {String} auto_color 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
 * @param {Object} line_color auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 * @param {Bool} is_hyaline 是否需要透明底色，为 true 时，生成透明底色的小程序码
 */
exports.getWXACode = async function (path, width = 430, auto_color = false, line_color = {'r':0,'g':0,'b':0}, is_hyaline = false) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.wxaPrefix + 'getwxacode?access_token=' + accessToken;
  var data = {
    path,
    width,
    auto_color,
    line_color,
    is_hyaline
  };
  return this.request(apiUrl, postJSON(data));
};


/**
 * 获取小程序码，适用于需要的码数量极多的业务场景
 * https://developers.weixin.qq.com/miniprogram/dev/api/getWXACodeUnlimit.html
 * Examples:
 * ```
 * var scene = 'foo=bar';
 * var page = 'pages/index/index'; // 小程序页面路径
 * api.getWXACodeUnlimit(scene, page);
 * ```
 * @param {String} scene 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
 * @param {String} page 必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面 
 * @param {String} width 二维码的宽度，单位 px。最小 280px，最大 1280px
 * @param {String} auto_color 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
 * @param {Object} line_color auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 * @param {Bool} is_hyaline 是否需要透明底色，为 true 时，生成透明底色的小程序码
 */
exports.getWXACodeUnlimit = async function (scene, page, width = 430, auto_color = false, line_color = {'r':0,'g':0,'b':0}, is_hyaline = false) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.wxaPrefix + 'getwxacodeunlimit?access_token=' + accessToken;
  var data = {
    scene,
    page,
    width,
    auto_color,
    line_color,
    is_hyaline
  };
  return this.request(apiUrl, postJSON(data));
};
