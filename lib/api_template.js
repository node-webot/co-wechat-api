'use strict';

const { postJSON } = require('./util');

/**
 * 设置所属行业
 * Examples:
 * ```
 * var industryIds = {
 *  "industry_id1":'1',
 *  "industry_id2":"4"
 * };
 * api.setIndustry(industryIds);
 * ```
 * @param {Object} industryIds 公众号模板消息所属行业编号
 */
exports.setIndustry = async function (industryIds) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/api_set_industry?access_token=' + accessToken;
  return this.request(apiUrl, postJSON(industryIds));
};

/**
 * 获得模板ID
 * Examples:
 * ```
 * var templateIdShort = 'TM00015';
 * api.addTemplate(templateIdShort);
 * ```
 * @param {String} templateIdShort 模板库中模板的编号，有“TM**”和“OPENTMTM**”等形式
 */
exports.addTemplate = async function (templateIdShort) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/api_add_template?access_token=' + accessToken;
  var templateId = {
    template_id_short: templateIdShort
  };
  return this.request(apiUrl, postJSON(templateId));
};

/**
 * 发送模板消息
 * Examples:
 * ```
 * var templateId: '模板id';
 * // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
 * var url: 'http://weixin.qq.com/download';
 * var topcolor = '#FF0000'; // 顶部颜色
 * var data = {
 *  user:{
 *    "value":'黄先生',
 *    "color":"#173177"
 *  }
 * };
 * api.sendTemplate('openid', templateId, url, topColor, data);
 * ```
 * @param {String} openid 用户的openid
 * @param {String} templateId 模板ID
 * @param {String} url URL置空，则在发送后，点击模板消息会进入一个空白页面（ios），或无法点击（android）
 * @param {String} topColor 字体颜色
 * @param {Object} data 渲染模板的数据
 * @param {Object} miniprogram 跳转小程序所需数据 {appid, pagepath}
 */
exports.sendTemplate = async function (openid, templateId, url, topColor, data, miniprogram) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'message/template/send?access_token=' + accessToken;
  var template = {
    touser: openid,
    template_id: templateId,
    url: url,
    miniprogram: miniprogram,
    color: topColor,
    data: data
  };
  return this.request(apiUrl, postJSON(template));
};

/**
 * 发送模板消息支持小程序
 * Examples:
 * ```
 * var templateId = '模板id';
 * var page = 'index?foo=bar'; // 小程序页面路径
 * var formId = '提交表单id';
 * var color = '#FF0000'; // 字体颜色
 * var data = {
 *  keyword1: {
 *    "value":'黄先生',
 *    "color":"#173177"
 *  }
 * var emphasisKeyword = 'keyword1.DATA'
 * };
 * api.sendMiniProgramTemplate('openid', templateId, page, formId, data, color, emphasisKeyword);
 * ```
 * @param {String} openid 接收者（用户）的 openid
 * @param {String} templateId 所需下发的模板消息的id
 * @param {String} page 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转
 * @param {String} formId 表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
 * @param {Object} data 模板内容，不填则下发空模板
 * @param {String} color 模板内容字体的颜色，不填默认黑色 【废弃】
 * @param {String} emphasisKeyword 模板需要放大的关键词，不填则默认无放大
 */
exports.sendMiniProgramTemplate = async function (openid, templateId, page, formId, data, color, emphasisKeyword) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'message/wxopen/template/send?access_token=' + accessToken;
  var template = {
    touser: openid,
    template_id: templateId,
    page,
    form_id: formId,
    data: data,
    color: color,
    emphasis_keyword: emphasisKeyword
  };
  return this.request(apiUrl, postJSON(template));
};
