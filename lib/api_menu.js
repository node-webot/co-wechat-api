'use strict';

const { postJSON } = require('./util');

/**
 * 创建自定义菜单
 * 详细请看：http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单创建接口 * Menu:
 * ```
 * {
 *  "button":[
 *    {
 *      "type":"click",
 *      "name":"今日歌曲",
 *      "key":"V1001_TODAY_MUSIC"
 *    },
 *    {
 *      "name":"菜单",
 *      "sub_button":[
 *        {
 *          "type":"view",
 *          "name":"搜索",
 *          "url":"http://www.soso.com/"
 *        },
 *        {
 *          "type":"click",
 *          "name":"赞一下我们",
 *          "key":"V1001_GOOD"
 *        }]
 *      }]
 *    }
 *  ]
 * }
 * ```
 * Examples:
 * ```
 * var result = await api.createMenu(menu);
 * ```
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 * @param {Object} menu 菜单对象 */
exports.createMenu = async function (menu) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'menu/create?access_token=' + accessToken;
  return this.request(url, postJSON(menu));
};

/**
 * 获取菜单
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单查询接口> * Examples:
 * ```
 * var result = await api.getMenu();
 * ```
 * Result:
 * ```
 * // 结果示例
 * {
 *  "menu": {
 *    "button":[
 *      {"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC","sub_button":[]},
 *      {"type":"click","name":"歌手简介","key":"V1001_TODAY_SINGER","sub_button":[]},
 *      {"name":"菜单","sub_button":[
 *        {"type":"view","name":"搜索","url":"http://www.soso.com/","sub_button":[]},
 *        {"type":"view","name":"视频","url":"http://v.qq.com/","sub_button":[]},
 *        {"type":"click","name":"赞一下我们","key":"V1001_GOOD","sub_button":[]}]
 *      }
 *    ]
 *  }
 * }
 * ```
 */
exports.getMenu = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'menu/get?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

/**
 * 删除自定义菜单
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单删除接口>
 * Examples:
 * ```
 * var result = await api.removeMenu();
 * ```
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 */
exports.removeMenu = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'menu/delete?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

/**
 * 获取自定义菜单配置
 * 详细请看：<http://mp.weixin.qq.com/wiki/17/4dc4b0514fdad7a5fbbd477aa9aab5ed.html>
 * Examples:
 * ```
 * var result = await api.getMenuConfig();
 * ```
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 */
exports.getMenuConfig = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'get_current_selfmenu_info?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

/**
 * 创建个性化自定义菜单
 * 详细请看：http://mp.weixin.qq.com/wiki/0/c48ccd12b69ae023159b4bfaa7c39c20.html * Menu:
 * ```
 * {
 *  "button":[
 *  {
 *      "type":"click",
 *      "name":"今日歌曲",
 *      "key":"V1001_TODAY_MUSIC"
 *  },
 *  {
 *    "name":"菜单",
 *    "sub_button":[
 *    {
 *      "type":"view",
 *      "name":"搜索",
 *      "url":"http://www.soso.com/"
 *    },
 *    {
 *      "type":"view",
 *      "name":"视频",
 *      "url":"http://v.qq.com/"
 *    },
 *    {
 *      "type":"click",
 *      "name":"赞一下我们",
 *      "key":"V1001_GOOD"
 *    }]
 * }],
 * "matchrule":{
 *  "group_id":"2",
 *  "sex":"1",
 *  "country":"中国",
 *  "province":"广东",
 *  "city":"广州",
 *  "client_platform_type":"2"
 *  }
 * }
 * ```
 * Examples:
 * ```
 * var result = await api.addConditionalMenu(menu);
 * ```
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 * @param {Object} menu 菜单对象
 */
exports.addConditionalMenu = async function (menu) {
  // https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=ACCESS_TOKEN
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'menu/addconditional?access_token=' + accessToken;
  return this.request(url, postJSON(menu));
};

/**
 * 删除个性化自定义菜单
 * 详细请看：http://mp.weixin.qq.com/wiki/0/c48ccd12b69ae023159b4bfaa7c39c20.html * Menu:
 * ```
 * {
 *  "menuid":"208379533"
 * }
 * ```
 * Examples:
 * ```
 * var result = await api.delConditionalMenu(menuid);
 * ```
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 * @param {String} menuid 菜单id
 */
exports.delConditionalMenu = async function (menuid) {
  // https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=ACCESS_TOKEN
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'menu/delconditional?access_token=' + accessToken;
  var data = {
    menuid: menuid
  };
  return this.request(url, postJSON(data));
};

/**
 * 测试个性化自定义菜单
 * 详细请看：http://mp.weixin.qq.com/wiki/0/c48ccd12b69ae023159b4bfaa7c39c20.html * Menu:
 * ```
 * {
 *  "user_id":"nickma"
 * }
 * ```
 * Examples:
 * ```
 * var result = await api.tryConditionalMenu(user_id);
 * ```
 * Result:
 * ```
 * {
 *    "button": [
 *        {
 *            "type": "view",
 *            "name": "tx",
 *            "url": "http://www.qq.com/",
 *            "sub_button": [ ]
 *        },
 *        {
 *            "type": "view",
 *            "name": "tx",
 *            "url": "http://www.qq.com/",
 *            "sub_button": [ ]
 *        },
 *        {
 *            "type": "view",
 *            "name": "tx",
 *            "url": "http://www.qq.com/",
 *            "sub_button": [ ]
 *        }
 *    ]
 * }
 * ```
 * @param {String} user_id user_id可以是粉丝的OpenID，也可以是粉丝的微信号。
 */
exports.tryConditionalMenu = async function (user_id) {
  // https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=ACCESS_TOKEN
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'menu/trymatch?access_token=' + accessToken;
  var data = {
    user_id: user_id
  };
  return this.request(url, postJSON(data));
};
