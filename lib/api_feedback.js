var util = require('./util');


/**
 * 标记客户的投诉处理状态
 * Examples:
 * ```
 * api.updateFeedback(openid, feedbackId, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
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
exports.updateFeedback = function (openid, feedbackId) {
  this.preRequest(this._updateFeedback, arguments);
};

exports._updateFeedback = function (openid, feedbackId) {
  var feedbackUrl = 'https://api.weixin.qq.com/payfeedback/update';
  // https://api.weixin.qq.com/payfeedback/update?access_token=xxxxx&openid=XXXX&feedbackid=xxxx
  var data = {
    'access_token': token.accessToken,
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
