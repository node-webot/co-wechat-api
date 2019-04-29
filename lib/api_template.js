'use strict';

const { postJSON, getData } = require('./util');

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
 * 获取设置的行业信息
 * Examples:
 * ```
 * api.getIndustry(callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * // 结果示例
 * {
 *   "primary_industry":{"first_class":"运输与仓储","second_class":"快递"},
 *   "secondary_industry":{"first_class":"IT科技","second_class":"互联网|电子商务"}
 * }
 * ```
 */
exports.getIndustry = async function(){
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/get_industry?access_token=' + accessToken;
  return this.request(apiUrl, getData());
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
 * 获取模板列表
 * Examples:
 * ```
 * api.getAllPrivateTemplate(callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * // 结果示例
 * {
 *  "template_list": [{
 *       "template_id": "iPk5sOIt5X_flOVKn5GrTFpncEYTojx6ddbt8WYoV5s",
 *       "title": "领取奖金提醒",
 *       "primary_industry": "IT科技",
 *       "deputy_industry": "互联网|电子商务",
 *       "content": "{ {result.DATA} }\n\n领奖金额:{ {withdrawMoney.DATA} }\n领奖  时间:{ {withdrawTime.DATA} }\n银行信息:{ {cardInfo.DATA} }\n到账时间:  { {arrivedTime.DATA} }\n{ {remark.DATA} }",
 *       "example": "您已提交领奖申请\n\n领奖金额：xxxx元\n领奖时间：2013-10-10 12:22:22\n银行信息：xx银行(尾号xxxx)\n到账时间：预计xxxxxxx\n\n预计将于xxxx到达您的银行卡"
 *    }]
 * }
 * ```
 */
exports.getAllPrivateTemplate = async function(callback){
  // https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=ACCESS_TOKEN
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/get_all_private_template?access_token=' + accessToken;
  return this.request(apiUrl, getData());
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
 * 删除模板
 * Examples:
 * ```
 * var templateId = ”Dyvp3-Ff0cnail_CDSzk1fIc6-9lOkxsQE7exTJbwUE”
 * api.delPrivateTemplate(templateId, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * @param {String} templateId 公众帐号下模板消息ID
 */
exports.delPrivateTemplate = async function(templateId){
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'template/del_private_template?access_token=' + accessToken;
  var templateIdData = {
    template_id: templateId
  };
  return this.request(apiUrl, postJSON(templateIdData));
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

/** 
 * 通过API推送订阅模板消息给到授权微信用户
 * Examples:
 * ```
 * var templateId = '模板id';
 * var url = '点击消息跳转的链接，需要有ICP备案';
 * var scene = '订阅场景值';
 * var miniprogram = {
 *    appid:'',
 *    pagepath:'',
 * }
 * var data = {
 *  keyword1: {
 *    "value":'黄先生',
 *    "color":"#173177"
 *  }
 * };
 * var title = '消息标题，15字以内'
 * api.sendSubscribe('openid', templateId, url, miniprogram, scene, title, data);
 * ```
 * 
 * @param {String} openid 接收者（用户）的 openid
 * @param {String} templateId 所需下发的模板消息的id
 * @param {String} url 点击消息跳转的链接，需要有ICP备案
 * @param {Object} miniprogram 跳小程序所需数据，不需跳小程序可不用传该数据
 * @param {String} scene 订阅场景值
 * @param {String} title 消息标题，15字以内
 * @param {Object} data 消息正文，value为消息内容文本（200字以内），没有固定格式，可用\n换行，color为整段消息内容的字体颜色（目前仅支持整段消息为一种颜色）
*/
exports.sendSubscribe = async function (openid, templateId, url, miniprogram, scene, title, data) {
  const { accessToken } = await this.ensureAccessToken();
  var apiUrl = this.prefix + 'message/template/subscribe?access_token=' + accessToken;
  var template = {
    touser: openid,
    template_id: templateId,
    url,
    miniprogram,
    scene,
    title,
    data,
  };
  return this.request(apiUrl, postJSON(template));
}
