'use strict';

var util = require('./util');
var postJSON = util.postJSON;

/**
 * 上传多媒体文件，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.uploadNews(news);
 * ```
 * News:
 * ```
 * {
 *  "articles": [
 *    {
 *      "thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",
 *      "author":"xxx",
 *      "title":"Happy Day",
 *      "content_source_url":"www.qq.com",
 *      "content":"content",
 *      "digest":"digest",
 *      "show_cover_pic":"1"
 *   },
 *   {
 *      "thumb_media_id":"qI6_Ze_6PtV7svjolgs-rN6stStuHIjs9_DidOHaj0Q-mwvBelOXCFZiq2OsIU-p",
 *      "author":"xxx",
 *      "title":"Happy Day",
 *      "content_source_url":"www.qq.com",
 *      "content":"content",
 *      "digest":"digest",
 *      "show_cover_pic":"0"
 *   }
 *  ]
 * }
 * ```
 * Result:
 * ```
 * {
 *  "type":"news",
 *  "media_id":"CsEf3ldqkAYJAU6EJeIkStVDSvffUJ54vqbThMgplD-VJXXof6ctX5fI6-aYyUiQ",
 *  "created_at":1391857799
 * }
 * ``` * @param {Object} news 图文消息对象 */
exports.uploadNews = function* (news) {
  var token = yield this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=ACCESS_TOKEN
  var url = this.prefix + 'media/uploadnews?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(news));
};

/**
 * 将通过上传下载多媒体文件得到的视频media_id变成视频素材
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.uploadMPVideo(opts);
 * ```
 * Opts:
 * ```
 * {
 *  "media_id": "rF4UdIMfYK3efUfyoddYRMU50zMiRmmt_l0kszupYh_SzrcW5Gaheq05p_lHuOTQ",
 *  "title": "TITLE",
 *  "description": "Description"
 * }
 * ```
 * Result:
 * ```
 * {
 *  "type":"video",
 *  "media_id":"IhdaAQXuvJtGzwwc0abfXnzeezfO0NgPK6AQYShD8RQYMTtfzbLdBIQkQziv2XJc",
 *  "created_at":1391857799
 * }
 * ``` * @param {Object} opts 待上传为素材的视频 */
exports.uploadMPVideo = function* (opts) {
  var token = yield this.ensureAccessToken();
  // https://file.api.weixin.qq.com/cgi-bin/media/uploadvideo?access_token=ACCESS_TOKEN
  var url = this.fileServerPrefix + 'media/uploadvideo?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 群发消息，分别有图文（news）、文本(text)、语音（voice）、图片（image）和视频（video）
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSend(opts, receivers);
 * ```
 * opts:
 * ```
 * {
 *  "image":{
 *    "media_id":"123dsdajkasd231jhksad"
 *  },
 *  "msgtype":"image"
 * }
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {Object} opts 待发送的数据
 * @param {String|Array} receivers 接收人。一个组，或者openid列表
 */
exports.massSend = function* (opts, receivers) {
  var token = yield this.ensureAccessToken();
  var url;
  if (Array.isArray(receivers)) {
    opts.touser = receivers;
    url = this.prefix + 'message/mass/send?access_token=' + token.accessToken;
  } else {
    if (typeof receivers === 'boolean') {
      opts.filter = {
        'is_to_all': receivers
      };
    } else {
      opts.filter = {
        'group_id': receivers
      };
    }
    url = this.prefix + 'message/mass/sendall?access_token=' + token.accessToken;
  }
  // https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
  return yield this.request(url, postJSON(opts));
};

/**
 * 群发图文（news）消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSendNews(mediaId, receivers);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {String} mediaId 图文消息的media id
 * @param {String|Array|Boolean} receivers 接收人。一个组，或者openid列表, 或者true（群发给所有人） */
exports.massSendNews = function* (mediaId, receivers) {
  var opts = {
    'mpnews': {
      'media_id': mediaId
    },
    'msgtype': 'mpnews'
  };
  return yield this.massSend(opts, receivers);
};

/**
 * 群发文字（text）消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSendText(content, receivers);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {String} content 文字消息内容
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendText = function* (content, receivers) {
  var opts = {
    'text': {
      'content': content
    },
    'msgtype': 'text'
  };
  return yield this.massSend(opts, receivers);
};

/**
 * 群发声音（voice）消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSendVoice(media_id, receivers);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {String} mediaId 声音media id
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendVoice = function* (mediaId, receivers) {
  var opts = {
    'voice': {
      'media_id': mediaId
    },
    'msgtype': 'voice'
  };
  return yield this.massSend(opts, receivers);
};

/**
 * 群发图片（image）消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSendImage(media_id, receivers);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {String} mediaId 图片media id
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendImage = function* (mediaId, receivers) {
  var opts = {
    'image': {
      'media_id': mediaId
    },
    'msgtype': 'image'
  };
  return yield this.massSend(opts, receivers);
};

/**
 * 群发视频（video）消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSendVideo(mediaId, receivers);
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {String} mediaId 视频media id
 * @param {String|Array} receivers 接收人。一个组，或者openid列表
 */
exports.massSendVideo = function* (mediaId, receivers) {
  var opts = {
    'mpvideo': {
      'media_id': mediaId
    },
    'msgtype': 'mpvideo'
  };
  return yield this.massSend(opts, receivers);
};

/**
 * 群发视频（video）消息，直接通过上传文件得到的media id进行群发（自动生成素材）
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.massSendMPVideo(data, receivers);
 * ```
 * Data:
 * ```
 * {
 *  "media_id": "rF4UdIMfYK3efUfyoddYRMU50zMiRmmt_l0kszupYh_SzrcW5Gaheq05p_lHuOTQ",
 *  "title": "TITLE",
 *  "description": "Description"
 * }
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ``` * @param {Object} data 视频数据
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendMPVideo = function* (data, receivers) {
  // 自动帮转视频的media_id
  var result = yield this.uploadMPVideo(data);
  return yield this.massSendVideo(result.media_id, receivers);
};

/**
 * 删除群发消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.deleteMass(message_id);
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"ok"
 * }
 * ``` * @param {String} messageId 待删除群发的消息id
 */
exports.deleteMass = function* (messageId) {
  var token = yield this.ensureAccessToken();
  var opts = {
    msg_id: messageId
  };
  var url = this.prefix + 'message/mass/delete?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 预览接口，预览图文消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.previewNews(openid, mediaId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id": 34182
 * }
 * ``` * @param {String} openid 用户openid
 * @param {String} mediaId 图文消息mediaId
 */
exports.previewNews = function* (openid, mediaId) {
  var token = yield this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'mpnews': {
      'media_id': mediaId
    },
    'msgtype': 'mpnews'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 预览接口，预览文本消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.previewText(openid, content);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id": 34182
 * }
 * ```
 * @param {String} openid 用户openid
 * @param {String} content 文本消息
 */
exports.previewText = function* (openid, content) {
  var token = yield this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'text': {
      'content': content
    },
    'msgtype':'text'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 预览接口，预览语音消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.previewVoice(openid, mediaId);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id": 34182
 * }
 * ``` * @param {String} openid 用户openid
 * @param {String} mediaId 语音mediaId */
exports.previewVoice = function* (openid, mediaId) {
  var token = yield this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'voice': {
      'media_id': mediaId
    },
    'msgtype': 'voice'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 预览接口，预览图片消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.previewImage(openid, mediaId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id": 34182
 * }
 * ``` * @param {String} openid 用户openid
 * @param {String} mediaId 图片mediaId
 */
exports.previewImage = function* (openid, mediaId) {
  var token = yield this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'image': {
      'media_id': mediaId
    },
    'msgtype': 'image'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 预览接口，预览视频消息
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.previewVideo(openid, mediaId);
 * ```
 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id": 34182
 * }
 * ``` * @param {String} openid 用户openid
 * @param {String} mediaId 视频mediaId */
exports.previewVideo = function* (openid, mediaId) {
  var token = yield this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'mpvideo': {
      'media_id': mediaId
    },
    'msgtype': 'mpvideo'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};

/**
 * 查询群发消息状态
 * 详情请见：<http://mp.weixin.qq.com/wiki/15/5380a4e6f02f2ffdc7981a8ed7a40753.html>
 * Examples:
 * ```
 * api.getMassMessageStatus(messageId);
 * ```
 * Result:
 * ```
 * {
 *  "msg_id":201053012,
 *  "msg_status":"SEND_SUCCESS"
 * }
 * ``` * @param {String} messageId 消息ID */
exports.getMassMessageStatus = function* (messageId) {
  var token = yield this.ensureAccessToken();
  var opts = {
    'msg_id': messageId
  };
  var url = this.prefix + 'message/mass/get?access_token=' + token.accessToken;
  return yield this.request(url, postJSON(opts));
};
