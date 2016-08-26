'use strict';

var util = require('./util');
var postJSON = util.postJSON;
var path = require('path');
var fs = require('co-fs');
var formstream = require('formstream');

/**
 * 获取客服聊天记录
 * 详细请看：http://mp.weixin.qq.com/wiki/19/7c129ec71ddfa60923ea9334557e8b23.html
 * Opts:
 * ```
 * {
 *  "starttime" : 123456789,
 *  "endtime" : 987654321,
 *  "openid": "OPENID", // 非必须
 *  "pagesize" : 10,
 *  "pageindex" : 1,
 * }
 * ```
 * Examples:
 * ```
 * var result = yield api.getRecords(opts);
 * ```
 * Result:
 * ```
 * {
 *  "recordlist": [
 *    {
 *      "worker": " test1",
 *      "openid": "oDF3iY9WMaswOPWjCIp_f3Bnpljk",
 *      "opercode": 2002,
 *      "time": 1400563710,
 *      "text": " 您好，客服test1为您服务。"
 *    },
 *    {
 *      "worker": " test1",
 *      "openid": "oDF3iY9WMaswOPWjCIp_f3Bnpljk",
 *      "opercode": 2003,
 *      "time": 1400563731,
 *      "text": " 你好，有什么事情？ "
 *    },
 *  ]
 * }
 * ```
 * @param {Object} opts 查询条件
 */
exports.getRecords = function* (opts) {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/customservice/msgrecord/getrecord?access_token=ACCESS_TOKEN
  var url = this.customservicePrefix + 'msgrecord/getrecord?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 获取客服基本信息
 * 详细请看：http://dkf.qq.com/document-3_1.html
 * Examples:
 * ```
 * var result = yield api.getCustomServiceList();
 * ```
 * Result:
 * ```
 * {
 *   "kf_list": [
 *     {
 *       "kf_account": "test1@test",
 *       "kf_nick": "ntest1",
 *       "kf_id": "1001"
 *     },
 *     {
 *       "kf_account": "test2@test",
 *       "kf_nick": "ntest2",
 *       "kf_id": "1002"
 *     },
 *     {
 *       "kf_account": "test3@test",
 *       "kf_nick": "ntest3",
 *       "kf_id": "1003"
 *     }
 *   ]
 * }
 * ```
 */
exports.getCustomServiceList = function* () {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token= ACCESS_TOKEN
  var url = this.prefix + 'customservice/getkflist?access_token=' + token.accessToken;
  return yield this.request(url, {dataType: 'json'});
};

/**
 * 获取在线客服接待信息
 * 详细请看：http://dkf.qq.com/document-3_2.html * Examples:
 * ```
 * var result = yield api.getOnlineCustomServiceList();
 * ```
 * Result:
 * ```
 * {
 *   "kf_online_list": [
 *     {
 *       "kf_account": "test1@test",
 *       "status": 1,
 *       "kf_id": "1001",
 *       "auto_accept": 0,
 *       "accepted_case": 1
 *     },
 *     {
 *       "kf_account": "test2@test",
 *       "status": 1,
 *       "kf_id": "1002",
 *       "auto_accept": 0,
 *       "accepted_case": 2
 *     }
 *   ]
 * }
 * ```
 */
exports.getOnlineCustomServiceList = function* () {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?access_token= ACCESS_TOKEN
  var url = this.prefix + 'customservice/getonlinekflist?access_token=' + token.accessToken;
  return yield this.request(url, {dataType: 'json'});
};

var md5 = function (input) {
  var crypto = require('crypto');
  var hash = crypto.createHash('md5');
  return hash.update(input).digest('hex');
};

/**
 * 添加客服账号
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html * Examples:
 * ```
 * var result = yield api.addKfAccount('test@test', 'nickname', 'password');
 * ```
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} account 账号名字，格式为：前缀@公共号名字
 * @param {String} nick 昵称
 * @param {String} password 密码，可以直接传递明文，wechat模块自动进行md5加密 */
exports.addKfAccount = function* (account, nick, password) {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/customservice/kfaccount/add?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfaccount/add?access_token=' + token.accessToken;
  var data = {
    'kf_account': account,
    'nickname': nick,
    'password': md5(password),
  };

  return yield this.request(url, postJSON(data));
};

/**
 * 邀请绑定客服帐号
 * 详细请看：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813&token=&lang=zh_CN
 * Examples:
 * ```
 * var result = yield api.inviteworker('test@test', 'invite_wx');
 * ```
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} account 账号名字，格式为：前缀@公共号名字
 * @param {String} wx 邀请绑定的个人微信账号*/
exports.inviteworker = function* (account, wx) {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/customservice/kfaccount/inviteworker?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfaccount/inviteworker?access_token=' + token.accessToken;
  var data = {
    'kf_account': account,
    'invite_wx': wx,
  };

  return yield this.request(url, postJSON(data));
};

/**
 * 设置客服账号
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html * Examples:
 * ```
 * api.updateKfAccount('test@test', 'nickname', 'password');
 * ```
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} account 账号名字，格式为：前缀@公共号名字
 * @param {String} nick 昵称
 * @param {String} password 密码，可以直接传递明文，wechat模块自动进行md5加密
 */
exports.updateKfAccount = function* (account, nick, password) {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/customservice/kfaccount/add?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfaccount/update?access_token=' + token.accessToken;
  var data = {
    'kf_account': account,
    'nickname': nick,
    'password': md5(password),
  };

  return yield this.request(url, postJSON(data));
};

/**
 * 删除客服账号
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html * Examples:
 * ```
 * api.deleteKfAccount('test@test');
 * ```
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} account 账号名字，格式为：前缀@公共号名字
 */
exports.deleteKfAccount = function* (account) {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/customservice/kfaccount/del?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfaccount/del?access_token=' + token.accessToken + '&kf_account=' + account;

  return yield this.request(url, {dataType: 'json'});
};

/**
 * 设置客服头像
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html * Examples:
 * ```
 * api.setKfAccountAvatar('test@test', '/path/to/avatar.png');
 * ```
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} account 账号名字，格式为：前缀@公共号名字
 * @param {String} filepath 头像路径
 */
exports.setKfAccountAvatar = function* (account, filepath) {
  var token = yield this.ensureAccessToken();
  // http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=ACCESS_TOKEN&kf_account=KFACCOUNT
  var stat = yield fs.stat(filepath);
  var form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  var prefix = 'http://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfaccount/uploadheadimg?access_token=' + token.accessToken + '&kf_account=' + account;
  var opts = {
    dataType: 'json',
    method: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    stream: form
  };
  return yield this.request(url, opts);
};
