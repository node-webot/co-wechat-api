'use strict';

const { postJSON } = require('./util');

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
 * var result = await api.getUserSummary(startDate, endDate); // 获取用户增减数据
 * var result = await api.getUserCumulate(startDate, endDate); // 获取累计用户数据
 * // 图文分析数据接口
 * var result = await api.getArticleSummary(startDate, endDate); // 获取图文群发每日数据
 * var result = await api.getArticleTotal(startDate, endDate); // 获取图文群发总数据
 * var result = await api.getUserRead(startDate, endDate); // 获取图文统计数据
 * var result = await api.getUserReadHour(startDate, endDate); // 获取图文统计分时数据
 * var result = await api.getUserShare(startDate, endDate); // 获取图文分享转发数据
 * var result = await api.getUserShareHour(startDate, endDate); // 获取图文分享转发分时数据
 * // 消息分析数据接口
 * var result = await api.getUpstreamMsg(startDate, endDate); // 获取消息发送概况数据
 * var result = await api.getUpstreamMsgHour(startDate, endDate); // 获取消息分送分时数据
 * var result = await api.getUpstreamMsgWeek(startDate, endDate); // 获取消息发送周数据
 * var result = await api.getUpstreamMsgMonth(startDate, endDate); // 获取消息发送月数据
 * var result = await api.getUpstreamMsgDist(startDate, endDate); // 获取消息发送分布数据
 * var result = await api.getUpstreamMsgDistWeek(startDate, endDate); // 获取消息发送分布周数据
 * var result = await api.getUpstreamMsgDistMonth(startDate, endDate); // 获取消息发送分布月数据
 * // 接口分析数据接口
 * var result = await api.getInterfaceSummary(startDate, endDate); // 获取接口分析数据
 * var result = await api.getInterfaceSummaryHour(startDate, endDate); // 获取接口分析分时数据
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
  exports[method] = async function (begin, end) {
    const { accessToken } = await this.ensureAccessToken();
    var data = {
      begin_date: begin,
      end_date: end
    };
    var url = 'https://api.weixin.qq.com/datacube/' + method.toLowerCase() + '?access_token=' + accessToken;
    return this.request(url, postJSON(data));
  };
});
