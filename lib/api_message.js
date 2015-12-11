var util = require('./util');

var postJSON = util.postJSON;

/**
 * 客服消息，发送文字消息
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=发送客服消息
 * Examples:
 * ```
 * api.sendText('openid', 'Hello world');
 * ```

 * @param {String} openid 用户的openid
 * @param {String} text 发送的消息内容
 */
exports.sendText = function* (openid, text) {
  var token = yield* this.ensureAccessToken();
  // {
  //  "touser":"OPENID",
  //  "msgtype":"text",
  //  "text": {
  //    "content":"Hello World"
  //  }
  // }
  var url = this.prefix + 'message/custom/send?access_token=' + token.accessToken;
  var data = {
    "touser": openid,
    "msgtype": "text",
    "text": {
      "content": text
    }
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 客服消息，发送图片消息
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=发送客服消息
 * Examples:
 * ```
 * api.sendImage('openid', 'media_id');
 * ```

 * @param {String} openid 用户的openid
 * @param {String} mediaId 媒体文件的ID，参见uploadMedia方法
 */
exports.sendImage = function* (openid, mediaId) {
  var token = yield* this.ensureAccessToken();
  // {
  //  "touser":"OPENID",
  //  "msgtype":"image",
  //  "image": {
  //    "media_id":"MEDIA_ID"
  //  }
  // }
  var url = this.prefix + 'message/custom/send?access_token=' + token.accessToken;
  var data = {
    "touser": openid,
    "msgtype":"image",
    "image": {
      "media_id": mediaId
    }
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 客服消息，发送语音消息
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=发送客服消息
 * Examples:
 * ```
 * api.sendVoice('openid', 'media_id');
 * ```

 * @param {String} openid 用户的openid
 * @param {String} mediaId 媒体文件的ID
 */
exports.sendVoice = function* (openid, mediaId) {
  var token = yield* this.ensureAccessToken();
  // {
  //  "touser":"OPENID",
  //  "msgtype":"voice",
  //  "voice": {
  //    "media_id":"MEDIA_ID"
  //  }
  // }
  var url = this.prefix + 'message/custom/send?access_token=' + token.accessToken;
  var data = {
    "touser": openid,
    "msgtype": "voice",
    "voice": {
      "media_id": mediaId
    }
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 客服消息，发送视频消息
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=发送客服消息
 * Examples:
 * ```
 * api.sendVideo('openid', 'media_id', 'thumb_media_id');
 * ```

 * @param {String} openid 用户的openid
 * @param {String} mediaId 媒体文件的ID
 * @param {String} thumbMediaId 缩略图文件的ID
 */
exports.sendVideo = function* (openid, mediaId, thumbMediaId) {
  var token = yield* this.ensureAccessToken();
  // {
  //  "touser":"OPENID",
  //  "msgtype":"video",
  //  "image": {
  //    "media_id":"MEDIA_ID"
  //    "thumb_media_id":"THUMB_MEDIA_ID"
  //  }
  // }
  var url = this.prefix + 'message/custom/send?access_token=' + token.accessToken;
  var data = {
    "touser": openid,
    "msgtype":"video",
    "video": {
      "media_id": mediaId,
      "thumb_media_id": thumbMediaId
    }
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 客服消息，发送音乐消息
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=发送客服消息
 * Examples:
 * ```
 * var music = {
 *  title: '音乐标题', // 可选
 *  description: '描述内容', // 可选
 *  musicurl: 'http://url.cn/xxx', 音乐文件地址
 *  hqmusicurl: "HQ_MUSIC_URL",
 *  thumb_media_id: "THUMB_MEDIA_ID"
 * };
 * api.sendMusic('openid', music);
 * ```

 * @param {String} openid 用户的openid
 * @param {Object} music 音乐文件
 */
exports.sendMusic = function* (openid, music) {
  var token = yield* this.ensureAccessToken();
  // {
  //  "touser":"OPENID",
  //  "msgtype":"music",
  //  "music": {
  //    "title":"MUSIC_TITLE", // 可选
  //    "description":"MUSIC_DESCRIPTION", // 可选
  //    "musicurl":"MUSIC_URL",
  //    "hqmusicurl":"HQ_MUSIC_URL",
  //    "thumb_media_id":"THUMB_MEDIA_ID"
  //  }
  // }
  var url = this.prefix + 'message/custom/send?access_token=' + token.accessToken;
  var data = {
    "touser": openid,
    "msgtype":"music",
    "music": music
  };
  return yield* this.request(url, postJSON(data));
};

/**
 * 客服消息，发送图文消息
 * 详细细节 http://mp.weixin.qq.com/wiki/index.php?title=发送客服消息
 * Examples:
 * ```
 * var articles = [
 *  {
 *    "title":"Happy Day",
 *    "description":"Is Really A Happy Day",
 *    "url":"URL",
 *    "picurl":"PIC_URL"
 *  },
 *  {
 *    "title":"Happy Day",
 *    "description":"Is Really A Happy Day",
 *    "url":"URL",
 *    "picurl":"PIC_URL"
 *  }];
 * api.sendNews('openid', articles);
 * ```

 * @param {String} openid 用户的openid
 * @param {Array} articles 图文列表
 */
exports.sendNews = function* (openid, articles) {
  var token = yield* this.ensureAccessToken();
  // {
  //  "touser":"OPENID",
  //  "msgtype":"news",
  //  "news":{
  //    "articles": [
  //      {
  //        "title":"Happy Day",
  //        "description":"Is Really A Happy Day",
  //        "url":"URL",
  //        "picurl":"PIC_URL"
  //      },
  //      {
  //        "title":"Happy Day",
  //        "description":"Is Really A Happy Day",
  //        "url":"URL",
  //        "picurl":"PIC_URL"
  //      }]
  //   }
  // }
  var url = this.prefix + 'message/custom/send?access_token=' + token.accessToken;
  var data = {
    "touser": openid,
    "msgtype":"news",
    "news": {
      "articles": articles
    }
  };
  return yield* this.request(url, postJSON(data));
};

 /**
 * 获取自动回复规则
 * 详细请看：<http://mp.weixin.qq.com/wiki/19/ce8afc8ae7470a0d7205322f46a02647.html>
 * Examples:
 * ```
 * var result = yield* api.getAutoreply();
 * ```
 * Result:
 * ```
 * {
 * "is_add_friend_reply_open": 1,
 * "is_autoreply_open": 1,
 * "add_friend_autoreply_info": {
 *     "type": "text",
 *     "content": "Thanks for your attention!"
 * },
 * "message_default_autoreply_info": {
 *     "type": "text",
 *     "content": "Hello, this is autoreply!"
 * },
 * "keyword_autoreply_info": {
 *     "list": [
 *         {
 *             "rule_name": "autoreply-news",
 *             "create_time": 1423028166,
 *             "reply_mode": "reply_all",
 *             "keyword_list_info": [
 *                 {
 *                     "type": "text",
 *                     "match_mode": "contain",
 *                     "content": "news测试"//此处content即为关键词内容
 *                 }
 *             ],
 *             "reply_list_info": [
 *                 {
 *                     "type": "news",
 *                     "news_info": {
 *                         "list": [
 *                             {
 *                                 "title": "it's news",
 *                                 "author": "jim",
 *                                 "digest": "it's digest",
 *                                 "show_cover": 1,
 *                                 "cover_url": "http://mmbiz.qpic.cn/mmbiz/GE7et87vE9vicuCibqXsX9GPPLuEtBfXfKbE8sWdt2DDcL0dMfQWJWTVn1N8DxI0gcRmrtqBOuwQHeuPKmFLK0ZQ/0",
 *                                 "content_url": "http://mp.weixin.qq.com/s?__biz=MjM5ODUwNTM3Ng==&mid=203929886&idx=1&sn=628f964cf0c6d84c026881b6959aea8b#rd",
 *                                 "source_url": "http://www.url.com"
 *                             }
 *                         ]
 *                     }
 *                 },
 *                 {
 *                     ....
 *                 }
 *             ]
 *         },
 *         {
 *             "rule_name": "autoreply-voice",
 *             "create_time": 1423027971,
 *             "reply_mode": "random_one",
 *             "keyword_list_info": [
 *                 {
 *                     "type": "text",
 *                     "match_mode": "contain",
 *                     "content": "voice测试"
 *                 }
 *             ],
 *             "reply_list_info": [
 *                 {
 *                     "type": "voice",
 *                     "content": "NESsxgHEvAcg3egJTtYj4uG1PTL6iPhratdWKDLAXYErhN6oEEfMdVyblWtBY5vp"
 *                 }
 *             ]
 *         },
 *         ...
 *     ]
 * }
 * }
 * ```
 */
exports.getAutoreply = function* () {
  var token = yield* this.ensureAccessToken();
  var url = this.prefix + 'get_current_autoreply_info?access_token=' + token.accessToken;
  return yield* this.request(url, {dataType: 'json'});
};
