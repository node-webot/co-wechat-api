'use strict';

const { postJSON } = require('./util');

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
exports.uploadNews = async function (news) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=ACCESS_TOKEN
  var url = this.prefix + 'media/uploadnews?access_token=' + accessToken;
  return this.request(url, postJSON(news));
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
exports.uploadMPVideo = async function (opts) {
  const { accessToken } = await this.ensureAccessToken();
  // https://file.api.weixin.qq.com/cgi-bin/media/uploadvideo?access_token=ACCESS_TOKEN
  var url = this.fileServerPrefix + 'media/uploadvideo?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
};

/**
 * 群发消息，分别有图文（news）、文本(text)、语音（voice）、图片（image）和视频（video）
 * 详情请见：<https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21>
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
 *  "send_ignore_reprint":0
 * }
 * ```

 * Result:
 * ```
 * {
 *  "errcode":0,
 *  "errmsg":"send job submission success",
 *  "msg_id":34182
 * }
 * ```
 * @param {Object} opts 待发送的数据
 * @param {String|Array} receivers 接收人。一个标签，或者openid列表
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {Int} sendIgnoreReprint 图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0。
 */
exports.massSend = async function (opts, receivers, clientMsgId, sendIgnoreReprint) {
  const { accessToken } = await this.ensureAccessToken();
  var url;
  if (sendIgnoreReprint !== undefined) {
    opts.send_ignore_reprint = sendIgnoreReprint;
  }
  if (clientMsgId !== undefined) {
    opts.clientmsgid = clientMsgId;
  }
  if (Array.isArray(receivers)) {
    opts.touser = receivers;
    url = this.prefix + 'message/mass/send?access_token=' + accessToken;
  } else {
    if (typeof receivers === 'boolean') {
      opts.filter = {
        'is_to_all': receivers
      };
    } else {
      opts.filter = {
        'tag_id': receivers
      };
    }
    url = this.prefix + 'message/mass/sendall?access_token=' + accessToken;
  }
  // https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
  return this.request(url, postJSON(opts));
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
 * ```
 * @param {String} mediaId 图文消息的media id
 * @param {String|Array|Boolean} receivers 接收人。一个组，或者openid列表, 或者true（群发给所有人）
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {Int} sendIgnoreReprint 图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0。
 * */
exports.massSendNews = async function (mediaId, receivers, clientMsgId, sendIgnoreReprint) {
  var opts = {
    'mpnews': {
      'media_id': mediaId
    },
    'msgtype': 'mpnews'
  };
  return this.massSend(opts, receivers, clientMsgId, sendIgnoreReprint);
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
 * ```
 * @param {String} content 文字消息内容
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendText = async function (content, receivers, clientMsgId) {
  var opts = {
    'text': {
      'content': content
    },
    'msgtype': 'text'
  };
  return this.massSend(opts, receivers, clientMsgId);
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
 * ```
 * @param {String} mediaId 声音media id
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendVoice = async function (mediaId, receivers, clientMsgId) {
  var opts = {
    'voice': {
      'media_id': mediaId
    },
    'msgtype': 'voice'
  };
  return this.massSend(opts, receivers, clientMsgId);
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
 * ```
 * @param {String} mediaId 图片media id
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendImage = async function (mediaId, receivers, clientMsgId) {
  var opts = {
    'image': {
      'media_id': mediaId
    },
    'msgtype': 'image'
  };
  return this.massSend(opts, receivers, clientMsgId);
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
 * ```
 * @param {String} mediaId 视频media id
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {String|Array} receivers 接收人。一个组，或者openid列表
 */
exports.massSendVideo = async function (mediaId, receivers, clientMsgId) {
  var opts = {
    'mpvideo': {
      'media_id': mediaId
    },
    'msgtype': 'mpvideo'
  };
  return this.massSend(opts, receivers, clientMsgId);
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
 * ```
 * @param {Object} data 视频数据
 * @param {String|Array} clientMsgId 开发者侧群发msgid，长度限制64字节，如不填，则后台默认以群发范围和群发内容的摘要值做为clientmsgid
 * @param {String|Array} receivers 接收人。一个组，或者openid列表 */
exports.massSendMPVideo = async function (data, receivers, clientMsgId) {
  // 自动帮转视频的media_id
  var result = await this.uploadMPVideo(data);
  return this.massSendVideo(result.media_id, receivers, clientMsgId);
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
exports.deleteMass = async function (messageId) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    msg_id: messageId
  };
  var url = this.prefix + 'message/mass/delete?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
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
exports.previewNews = async function (openid, mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'mpnews': {
      'media_id': mediaId
    },
    'msgtype': 'mpnews'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
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
exports.previewText = async function (openid, content) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'text': {
      'content': content
    },
    'msgtype': 'text'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
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
exports.previewVoice = async function (openid, mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'voice': {
      'media_id': mediaId
    },
    'msgtype': 'voice'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
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
exports.previewImage = async function (openid, mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'image': {
      'media_id': mediaId
    },
    'msgtype': 'image'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
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
exports.previewVideo = async function (openid, mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    'touser': openid,
    'mpvideo': {
      'media_id': mediaId
    },
    'msgtype': 'mpvideo'
  };
  var url = this.prefix + 'message/mass/preview?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
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
exports.getMassMessageStatus = async function (messageId) {
  const { accessToken } = await this.ensureAccessToken();
  var opts = {
    'msg_id': messageId
  };
  var url = this.prefix + 'message/mass/get?access_token=' + accessToken;
  return this.request(url, postJSON(opts));
};
