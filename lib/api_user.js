var util = require('./util');

var postJSON = util.postJSON;

/**
 * 获取用户基本信息。可以设置lang，其中zh_CN 简体，zh_TW 繁体，en 英语。默认为en
 * 详情请见：<http://mp.weixin.qq.com/wiki/index.php?title=获取用户基本信息>
 * Examples:
 * ```
 * api.getUser(openid);
 * api.getUser({openid: 'openid', lang: 'en'});
 * ```
 *
 * Result:
 * ```
 * {
 *  "subscribe": 1,
 *  "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M",
 *  "nickname": "Band",
 *  "sex": 1,
 *  "language": "zh_CN",
 *  "city": "广州",
 *  "province": "广东",
 *  "country": "中国",
 *  "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
 *  "subscribe_time": 1382694957
 * }
 * ```
 * @param {String|Object} options 用户的openid。或者配置选项，包含openid和lang两个属性。
 */
exports.getUser = function* (options) {
  var token = yield* this.ensureAccessToken();
  if (typeof options !== 'object') {
    options = {
      openid: options,
      lang: 'en'
    };
  }
  // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID
  var url = this.prefix + 'user/info?openid=' + options.openid + '&lang=' + options.lang + '&access_token=' + token.accessToken;
  return yield* this.request(url, {dataType: 'json'});
};

/**
 *  批量获取用户基本信息
 * Example:
 * ```
 * api.batchGetUser(['openid1', 'openid2'])
 * ```

 * Result:
 * ```
 * {
 *   "user_info_list": [{
 *     "subscribe": 1,
 *     "openid": "otvxTs4dckWG7imySrJd6jSi0CWE",
 *     "nickname": "iWithery",
 *     "sex": 1,
 *     "language": "zh_CN",
 *     "city": "Jieyang",
 *     "province": "Guangdong",
 *     "country": "China",
 *     "headimgurl": "http://wx.qlogo.cn/mmopen/xbIQx1GRqdvyqkMMhEaGOX802l1CyqMJNgUzKP8MeAeHFicRDSnZH7FY4XB7p8XHXIf6uJA2SCunTPicGKezDC4saKISzRj3nz/0",
 *     "subscribe_time": 1434093047,
 *     "unionid": "oR5GjjgEhCMJFyzaVZdrxZ2zRRF4",
 *     "remark": "",
 *     "groupid": 0
 *   }, {
 *     "subscribe": 0,
 *     "openid": "otvxTs_JZ6SEiP0imdhpi50fuSZg",
 *     "unionid": "oR5GjjjrbqBZbrnPwwmSxFukE41U",
 *   }]
 * }
 * ```
 * @param {Array} openids 用户的openid数组。
 */
exports.batchGetUsers = function* (openids) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'user/info/batchget?access_token=' + token.accessToken;
  var data = {};
  data.user_list = openids.map(function (openid) {
    return {openid: openid, lang: 'zh-CN'};
  });
  return yield* this.request(url, postJSON(data));
};

/**
 * 获取关注者列表
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=获取关注者列表
 * Examples:
 * ```
 * api.getFollowers();
 * // or
 * api.getFollowers(nextOpenid);
 * ```

 * Result:
 * ```
 * {
 *  "total":2,
 *  "count":2,
 *  "data":{
 *    "openid":["","OPENID1","OPENID2"]
 *  },
 *  "next_openid":"NEXT_OPENID"
 * }
 * ```
 * @param {String} nextOpenid 调用一次之后，传递回来的nextOpenid。第一次获取时可不填
 */
exports.getFollowers = function* (nextOpenid) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
  nextOpenid = nextOpenid || '';
  var url = this.prefix + 'user/get?next_openid=' + nextOpenid + '&access_token=' + token.accessToken;
  return yield* this.request(url, {dataType: 'json'});
};

/**
 * 设置用户备注名
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=设置用户备注名接口
 * Examples:
 * ```
 * api.updateRemark(openid, remark);
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"ok"
 * }
 * ```
 * @param {String} openid 用户的openid
 * @param {String} remark 新的备注名，长度必须小于30字符
 */
exports.updateRemark = function* (openid, remark) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=ACCESS_TOKEN
  var url = this.prefix + 'user/info/updateremark?access_token=' + token.accessToken;
  var data = {
    openid: openid,
    remark: remark
  };
  return yield* this.request(url, postJSON(data));
};
