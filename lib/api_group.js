'use strict';

const { postJSON } = require('./util');

/**
 * 获取分组列表
 * 详情请见：<http://mp.weixin.qq.com/wiki/0/56d992c605a97245eb7e617854b169fc.html>
 * Examples:
 * ```
 * api.getGroups();
 * ```

 * Result:
 * ```
 * {
 *  "groups": [
 *    {"id": 0, "name": "未分组", "count": 72596},
 *    {"id": 1, "name": "黑名单", "count": 36}
 *  ]
 * }
 * ```
 */
exports.getGroups = async function () {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/groups/get?access_token=ACCESS_TOKEN
  var url = this.prefix + 'groups/get?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

/**
 * 查询用户在哪个分组
 * 详情请见：<http://mp.weixin.qq.com/wiki/0/56d992c605a97245eb7e617854b169fc.html>
 * Examples:
 * ```
 * api.getWhichGroup(openid);
 * ```

 * Result:
 * ```
 * {
 *  "groupid": 102
 * }
 * ```
 * @param {String} openid Open ID
 */
exports.getWhichGroup = async function (openid) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/groups/getid?access_token=ACCESS_TOKEN
  var url = this.prefix + 'groups/getid?access_token=' + accessToken;
  var data = {
    'openid': openid
  };
  return this.request(url, postJSON(data));
};

/**
 * 创建分组
 * 详情请见：<http://mp.weixin.qq.com/wiki/0/56d992c605a97245eb7e617854b169fc.html>
 * Examples:
 * ```
 * api.createGroup('groupname');
 * ```

 * Result:
 * ```
 * {"group": {"id": 107, "name": "test"}}
 * ```
 * @param {String} name 分组名字
 */
exports.createGroup = async function (name) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/groups/create?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"group":{"name":"test"}}
  var url = this.prefix + 'groups/create?access_token=' + accessToken;
  var data = {
    'group': {'name': name}
  };
  return this.request(url, postJSON(data));
};

/**
 * 更新分组名字
 * 详情请见：<http://mp.weixin.qq.com/wiki/0/56d992c605a97245eb7e617854b169fc.html>
 * Examples:
 * ```
 * api.updateGroup(107, 'new groupname');
 * ```

 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {Number} id 分组ID
 * @param {String} name 新的分组名字
 */
exports.updateGroup = async function (id, name) {
  const { accessToken } = await this.ensureAccessToken();
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/groups/update?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"group":{"id":108,"name":"test2_modify2"}}
  var url = this.prefix + 'groups/update?access_token=' + accessToken;
  var data = {
    'group': {'id': id, 'name': name}
  };
  return this.request(url, postJSON(data));
};

/**
 * 移动用户进分组
 * 详情请见：<http://mp.weixin.qq.com/wiki/0/56d992c605a97245eb7e617854b169fc.html>
 * Examples:
 * ```
 * api.moveUserToGroup(openid, groupId);
 * ```

 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {String} openid 用户的openid
 * @param {Number} groupId 分组ID
 */
exports.moveUserToGroup = async function (openid, groupId) {
  const { accessToken } = await this.ensureAccessToken();
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"openid":"oDF3iYx0ro3_7jD4HFRDfrjdCM58","to_groupid":108}
  var url = this.prefix + 'groups/members/update?access_token=' + accessToken;
  var data = {
    'openid': openid,
    'to_groupid': groupId
  };
  return this.request(url, postJSON(data));
};

/**
 * 批量移动用户分组
 * 详情请见：<http://mp.weixin.qq.com/wiki/8/d6d33cf60bce2a2e4fb10a21be9591b8.html>
 * Examples:
 * ```
 * api.moveUsersToGroup(openids, groupId);
 * ```

 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {String} openids 用户的openid数组
 * @param {Number} groupId 分组ID
 */
exports.moveUsersToGroup = async function (openids, groupId) {
  const { accessToken } = await this.ensureAccessToken();
  // http请求方式: POST（请使用https协议）
  // https://api.weixin.qq.com/cgi-bin/groups/members/batchupdate?access_token=ACCESS_TOKEN
  // POST数据格式：json
  // POST数据例子：{"openid_list":["oDF3iYx0ro3_7jD4HFRDfrjdCM58","oDF3iY9FGSSRHom3B-0w5j4jlEyY"],"to_groupid":108}
  var url = this.prefix + 'groups/members/batchupdate?access_token=' + accessToken;
  var data = {
    'openid_list': openids,
    'to_groupid': groupId
  };
  return this.request(url, postJSON(data));
};
/**
 * 删除分组
 * 详情请见：<http://mp.weixin.qq.com/wiki/0/56d992c605a97245eb7e617854b169fc.html>
 * Examples:
 * ```
 * api.removeGroup(groupId);
 * ```

 * Result:
 * ```
 * {"errcode": 0, "errmsg": "ok"}
 * ```
 * @param {Number} groupId 分组ID
 */
exports.removeGroup = async function (groupId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'groups/delete?access_token=' + accessToken;
  var data = {
    'group': { id: groupId}
  };
  return this.request(url, postJSON(data));
};
