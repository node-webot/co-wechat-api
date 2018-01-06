'use strict';

const { postJSON } = require('./util');

/**
 * 发送语义理解请求
 * 详细请看：http://mp.weixin.qq.com/wiki/index.php?title=%E8%AF%AD%E4%B9%89%E7%90%86%E8%A7%A3 * Opts:
 * ```
 * {
 *   "query":"查一下明天从北京到上海的南航机票",
 *   "city":"北京",
 *   "category": "flight,hotel"
 * }
 * ```
 * Examples:
 * ```
 * api.semantic(uid, opts);
 * ```

 * Result:
 * ```
 * {
 *   "errcode":0,
 *   "query":"查一下明天从北京到上海的南航机票",
 *   "type":"flight",
 *   "semantic":{
 *       "details":{
 *           "start_loc":{
 *               "type":"LOC_CITY",
 *               "city":"北京市",
 *               "city_simple":"北京",
 *               "loc_ori":"北京"
 *               },
 *           "end_loc": {
 *               "type":"LOC_CITY",
 *               "city":"上海市",
 *               "city_simple":"上海",
 *               "loc_ori":"上海"
 *             },
 *           "start_date": {
 *               "type":"DT_ORI",
 *               "date":"2014-03-05",
 *               "date_ori":"明天"
 *             },
 *          "airline":"中国南方航空公司"
 *       },
 *   "intent":"SEARCH"
 * }
 * ```
 * @param {String} openid 用户ID
 * @param {Object} opts 查询条件
 */
exports.semantic = async function (uid, opts) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/semantic/semproxy/search?access_token=YOUR_ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/semantic/semproxy/search?access_token=' + accessToken;
  opts.appid = this.appid;
  opts.uid = uid;
  return this.request(url, postJSON(opts));
};
