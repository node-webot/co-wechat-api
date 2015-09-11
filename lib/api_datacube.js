var util = require('./util');

var postJSON = util.postJSON;

var methods = [
  // 用户分析数据接口
  'getUserSummary', // 获取用户增减数据
  'getUserCumulate', // 获取累计用户数据
  // 图文分析数据接口
  'getArticleSummary', // 获取图文群发每日数据
  'getArticleTotal', // 获取图文群发总数据
  'getUserRead', // 获取图文统计数据
  'getUserReadHour', // 获取图文统计分时数据
  'getUserShare', // 获取图文分享转发数据
  'getUserShareHour', // 获取图文分享转发分时数据
  // 消息分析数据接口
  'getUpstreamMsg', //获取消息发送概况数据
  'getUpstreamMsgHour', // 获取消息分送分时数据
  'getUpstreamMsgWeek', // 获取消息发送周数据
  'getUpstreamMsgMonth', // 获取消息发送月数据
  'getUpstreamMsgDist', // 获取消息发送分布数据
  'getUpstreamMsgDistWeek', // 获取消息发送分布周数据
  'getUpstreamMsgDistMonth', // 获取消息发送分布月数据
  // 接口分析数据接口
  'getInterfaceSummary', // 获取接口分析数据
  'getInterfaceSummaryHour' // 获取接口分析分时数据
];

/**
 * 公众平台官网数据统计模块
 * 详情请见：<http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html>
 * Examples:
 * ```
 * // 用户分析数据接口
 * var result = yield api.getUserSummary(startDate, endDate); // 获取用户增减数据
 * var result = yield api.getUserCumulate(startDate, endDate); // 获取累计用户数据
 * // 图文分析数据接口
 * var result = yield api.getArticleSummary(startDate, endDate); // 获取图文群发每日数据
 * var result = yield api.getArticleTotal(startDate, endDate); // 获取图文群发总数据
 * var result = yield api.getUserRead(startDate, endDate); // 获取图文统计数据
 * var result = yield api.getUserReadHour(startDate, endDate); // 获取图文统计分时数据
 * var result = yield api.getUserShare(startDate, endDate); // 获取图文分享转发数据
 * var result = yield api.getUserShareHour(startDate, endDate); // 获取图文分享转发分时数据
 * // 消息分析数据接口
 * var result = yield api.getUpstreamMsg(startDate, endDate); // 获取消息发送概况数据
 * var result = yield api.getUpstreamMsgHour(startDate, endDate); // 获取消息分送分时数据
 * var result = yield api.getUpstreamMsgWeek(startDate, endDate); // 获取消息发送周数据
 * var result = yield api.getUpstreamMsgMonth(startDate, endDate); // 获取消息发送月数据
 * var result = yield api.getUpstreamMsgDist(startDate, endDate); // 获取消息发送分布数据
 * var result = yield api.getUpstreamMsgDistWeek(startDate, endDate); // 获取消息发送分布周数据
 * var result = yield api.getUpstreamMsgDistMonth(startDate, endDate); // 获取消息发送分布月数据
 * // 接口分析数据接口
 * var result = yield api.getInterfaceSummary(startDate, endDate); // 获取接口分析数据
 * var result = yield api.getInterfaceSummaryHour(startDate, endDate); // 获取接口分析分时数据
 * ```
 *
 * Result:
 * ```
 * {
 *   "list":[...] // 详细请参见<http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html>
 * }
 * ```
 * @param {String} startDate 起始日期，格式为2014-12-08
 * @param {String} endDate 结束日期，格式为2014-12-08
  */
methods.forEach(function (method) {
  exports[method] = function* (begin, end) {
    var token = yield* this.ensureAccessToken();
    var data = {
      begin_date: begin,
      end_date: end
    };
    var url = 'https://api.weixin.qq.com/datacube/' + method.toLowerCase() + '?access_token=' + token.accessToken;
    return yield* this.request(url, postJSON(data));
  };
});
