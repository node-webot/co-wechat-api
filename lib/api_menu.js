var util = require('./util');
var postJSON = util.postJSON;

/**
 * 创建自定义菜单
 * 详细请看：http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单创建接口
 *
 * Menu:
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
 * var result = yield* api.createMenu(menu);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 * @param {Object} menu 菜单对象
 */
exports.createMenu = function* (menu) {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'menu/create?access_token=' + token.accessToken;
  return yield* this.request(url, postJSON(menu));
};

/**
 * 获取菜单
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单查询接口>
 *
 * Examples:
 * ```
 * var result = yield * api.getMenu();
 * ```
 *
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
exports.getMenu = function * () {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'menu/get?access_token=' + token.accessToken;
  return yield* this.request(url, {dataType: 'json'});
};

/**
 * 删除自定义菜单
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单删除接口>
 * Examples:
 * ```
 * var result = yield * api.removeMenu();
 * ```
 *
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 */
exports.removeMenu = function * () {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'menu/delete?access_token=' + token.accessToken;
  return yield this.request(url, {dataType: 'json'});
};

/**
 * 获取自定义菜单配置
 * 详细请看：<http://mp.weixin.qq.com/wiki/17/4dc4b0514fdad7a5fbbd477aa9aab5ed.html>
 * Examples:
 * ```
 * var result = yield * api.getMenuConfig();
 * ```
 *
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 */
exports.getMenuConfig = function* () {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'get_current_selfmenu_info?access_token=' + token.accessToken;
  return yield this.request(url, {dataType: 'json'});
};
