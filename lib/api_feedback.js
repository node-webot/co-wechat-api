'use strict';

/**
 * 标记客户的投诉处理状态
 * Examples:
 * ```
 * api.updateFeedback(openid, feedbackId);
 * ```
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {String} openid 用户ID
 * @param {String} feedbackId 投诉ID
 */
exports.updateFeedback = async function (openid, feedbackId) {
  const { accessToken } = await this.ensureAccessToken();
  var feedbackUrl = 'https://api.weixin.qq.com/payfeedback/update';
  // https://api.weixin.qq.com/payfeedback/update?access_token=xxxxx&openid=XXXX&feedbackid=xxxx
  var data = {
    'access_token': accessToken,
    'openid': openid,
    'feedbackid': feedbackId
  };
  var opts = {
    dataType: 'json',
    type: 'GET',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  this.request(feedbackUrl, opts);
};
