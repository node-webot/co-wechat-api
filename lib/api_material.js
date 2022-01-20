'use strict';

const path = require('path');

const { promisify } = require('util');
const { stat } = require('fs');
const statAsync = promisify(stat);

const formstream = require('formstream');

const { postJSON } = require('./util');

/**
 * 上传永久素材，分别有图片（image）、语音（voice）、和缩略图（thumb）
 * 详情请见：<http://mp.weixin.qq.com/wiki/14/7e6c03263063f4813141c3e17dd4350a.html>
 * Examples:
 * ```
 * api.uploadMaterial('filepath', type);
 * ```

 * Result:
 * ```
 * {"type":"TYPE","media_id":"MEDIA_ID","created_at":123456789}
 * ```
 * Shortcut: * - `exports.uploadImageMaterial(filepath);`
 * - `exports.uploadVoiceMaterial(filepath);`
 * - `exports.uploadThumbMaterial(filepath);` * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、thumb
 */
exports.uploadMaterial = async function (filepath, type) {
  const { accessToken } = await this.ensureAccessToken();
  const stat = await statAsync(filepath);
  const form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  const url = this.prefix + 'material/add_material?access_token=' + accessToken + '&type=' + type;
  const opts = {
    dataType: 'json',
    method: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    data: form,
  };
  return this.request(url, opts);
};

['image', 'voice', 'thumb'].forEach(function (type) {
  const method = 'upload' + type[0].toUpperCase() + type.substring(1) + 'Material';
  exports[method] = async function (filepath) {
    return this.uploadMaterial(filepath, type);
  };
});

/**
 * 上传永久素材，视频（video）
 * 详情请见：<http://mp.weixin.qq.com/wiki/14/7e6c03263063f4813141c3e17dd4350a.html>
 * Examples:
 * ```
 * var description = {
 *   "title":VIDEO_TITLE,
 *   "introduction":INTRODUCTION
 * };
 * api.uploadVideoMaterial('filepath', description);
 * ```
 *
 * Result:
 * ```
 * {"media_id":"MEDIA_ID"}
 * ```
 * @param {String} filepath 视频文件路径
 * @param {Object} description 描述
 */
exports.uploadVideoMaterial = async function (filepath, description) {
  const { accessToken } = await this.ensureAccessToken();
  const stat = await statAsync(filepath);
  const form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  form.field('description', JSON.stringify(description));
  const url = this.prefix + 'material/add_material?access_token=' + accessToken + '&type=video';
  const opts = {
    dataType: 'json',
    method: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    data: form,
  };
  return this.request(url, opts);
};

/**
 * 新增永久图文素材 * News:
 * ```
 * {
 *  "articles": [
 *    {
 *      "title": TITLE,
 *      "thumb_media_id": THUMB_MEDIA_ID,
 *      "author": AUTHOR,
 *      "digest": DIGEST,
 *      "show_cover_pic": SHOW_COVER_PIC(0 / 1),
 *      "content": CONTENT,
 *      "content_source_url": CONTENT_SOURCE_URL
 *    },
 *    //若新增的是多图文素材，则此处应还有几段articles结构
 *  ]
 * }
 * ```
 * Examples:
 * ```
 * api.uploadNewsMaterial(news);
 * ```
 *
 * Result:
 * ```
 * {
 *    "media_id":MEDIA_ID
 * }
 * ```
 * @param {Object} news 图文对象
 */
exports.uploadNewsMaterial = async function (news) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'material/add_news?access_token=' + accessToken;
  return this.request(url, postJSON(news));
};


/**
 * 新建草稿
 * 详情请见：<https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Add_draft.html>
 * ```
 * {
 *   "articles": [
 *     {
 *       "title":TITLE,
 *       "author":AUTHOR,
 *       "digest":DIGEST,
 *       "content":CONTENT,
 *       "content_source_url":CONTENT_SOURCE_URL,
 *       "thumb_media_id":THUMB_MEDIA_ID,
 *       "need_open_comment": 0,
 *       "only_fans_can_comment": 0
 *     }
 *     //若新增的是多图文素材，则此处应还有几段articles结构
 *   ]
 * }
 * ```
 * Examples:
 * ```
 * api.addDraft(news);
 * ```
 *
 * Result:
 * ```
 * {
 *    "media_id":MEDIA_ID
 * }
 * ```
 * @param {Object} news 图文对象
 */
exports.addDraft = async function (news) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'draft/add?access_token=' + accessToken;
  return this.request(url, postJSON(news));
};

/**
 * 更新永久图文素材
 * News:
 * ```
 * {
 *  "media_id":MEDIA_ID,
 *  "index":INDEX,
 *  "articles": [
 *    {
 *      "title": TITLE,
 *      "thumb_media_id": THUMB_MEDIA_ID,
 *      "author": AUTHOR,
 *      "digest": DIGEST,
 *      "show_cover_pic": SHOW_COVER_PIC(0 / 1),
 *      "content": CONTENT,
 *      "content_source_url": CONTENT_SOURCE_URL
 *    },
 *    //若新增的是多图文素材，则此处应还有几段articles结构
 *  ]
 * }
 * ```
 * Examples:
 * ```
 * api.updateNewsMaterial(news);
 * ```
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok"}
 * ```
 * @param {Object} news 图文对象
 */
exports.updateNewsMaterial = async function (news) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'material/update_news?access_token=' + accessToken;
  return this.request(url, postJSON(news));
};

/**
 * 修改草稿
 * News:
 * ```
 * {
 *   "media_id":MEDIA_ID,
 *   "index":INDEX,
 *   "articles": {
 *     "title":TITLE,
 *     "author":AUTHOR,
 *     "digest":DIGEST,
 *     "content":CONTENT,
 *     "content_source_url":CONTENT_SOURCE_URL,
 *     "thumb_media_id":THUMB_MEDIA_ID,
 *     "show_cover_pic": 1,
 *     "need_open_comment": 0,
 *     "only_fans_can_comment": 0
 *   }
 * }
 * ```
 * Examples:
 * ```
 * api.updateDraft(news);
 * ```
 * Result:
 * ```
 * {
 *   "errcode":ERRCODE,
 *   "errmsg": "ERRMSG"
 * }
 * ```
 * @param {Object} news 图文对象
 */
exports.updateDraft = async function (news) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'draft/update?access_token=' + accessToken;
  return this.request(url, postJSON(news));
};

/**
 * 根据媒体ID获取永久素材
 * 详情请见：<http://mp.weixin.qq.com/wiki/4/b3546879f07623cb30df9ca0e420a5d0.html>
 * Examples:
 * ```
 * api.getMaterial('media_id');
 * ```
 *
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象 * @param {String} mediaId 媒体文件的ID
 */
exports.getMaterial = async function (mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'material/get_material?access_token=' + accessToken;
  const opts = {
    method: 'POST',
    data: JSON.stringify({ 'media_id': mediaId }),
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000, // 60秒超时
  };
  return this.request(url, opts);
};

/**
 * 获取草稿
 * 详情请见：<https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Get_draft.html>
 * Examples:
 * ```
 * api.getDraft('media_id');
 * ```
 *
 * - `result`
 * ```
 * {
 *   "news_item": [
 *     {
 *       "title":TITLE,
 *       "author":AUTHOR,
 *       "digest":DIGEST,
 *       "content":CONTENT,
 *       "content_source_url":CONTENT_SOURCE_URL,
 *       "thumb_media_id":THUMB_MEDIA_ID,
 *       "show_cover_pic": 1,
 *       "need_open_comment": 0,
 *       "only_fans_can_comment": 0,
 *       "url":URL
 *     }
 *     //多图文消息应有多段 news_item 结构
 *   ]
 * }
 * ```
 * @param {String} mediaId 媒体文件的ID
 */
exports.getDraft = async function (mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'draft/get?access_token=' + accessToken;
  const opts = {
    method: 'POST',
    data: JSON.stringify({ 'media_id': mediaId }),
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 60000, // 60秒超时
  };
  return this.request(url, opts);
};

/**
 * 删除永久素材
 * 详情请见：<http://mp.weixin.qq.com/wiki/5/e66f61c303db51a6c0f90f46b15af5f5.html>
 * Examples:
 * ```
 * api.removeMaterial('media_id');
 * ```
 *
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象 * @param {String} mediaId 媒体文件的ID
 */
exports.removeMaterial = async function (mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'material/del_material?access_token=' + accessToken;
  return this.request(url, postJSON({ 'media_id': mediaId }));
};

/**
 * 删除草稿
 * 详情请见：<https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Delete_draft.html>
 * Examples:
 * ```
 * api.removeMaterial('media_id');
 * ```
 *
 * - `result`, 调用正常时得到的文件Buffer对象
 * ```
 * {
 *     "errcode":ERRCODE,
 *     "errmsg":"ERRMSG"
 * }
 * ```
 * * @param {String} mediaId 媒体文件的ID
 */
exports.deleteDraft = async function (mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'draft/delete?access_token=' + accessToken;
  return this.request(url, postJSON({ 'media_id': mediaId }));
};

/**
 * 获取素材总数
 * 详情请见：<http://mp.weixin.qq.com/wiki/16/8cc64f8c189674b421bee3ed403993b8.html>
 * Examples:
 * ```
 * api.getMaterialCount();
 * ```
 *
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象 * Result:
 * ```
 * {
 *  "voice_count":COUNT,
 *  "video_count":COUNT,
 *  "image_count":COUNT,
 *  "news_count":COUNT
 * }
 * ```
 */
exports.getMaterialCount = async function () {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'material/get_materialcount?access_token=' + accessToken;
  return this.request(url, { dataType: 'json' });
};

/**
 * 获取草稿总数
 * 详情请见：<https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Count_drafts.html>
 * Examples:
 * ```
 * api.getDraftCount();
 * ```
 *
 * - `res`, HTTP响应对象 * Result:
 * ```
 * {
 *     "total_count":TOTAL_COUNT
 * }
 * ```
 */
exports.getDraftCount = async function () {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'draft/count?access_token=' + accessToken;
  return this.request(url, { dataType: 'json' });
};

/**
 * 获取永久素材列表
 * 详情请见：<http://mp.weixin.qq.com/wiki/12/2108cd7aafff7f388f41f37efa710204.html>
 * Examples:
 * ```
 * api.getMaterials(type, offset, count);
 * ```
 *
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象 * Result:
 * ```
 * {
 *  "total_count": TOTAL_COUNT,
 *  "item_count": ITEM_COUNT,
 *  "item": [{
 *    "media_id": MEDIA_ID,
 *    "name": NAME,
 *    "update_time": UPDATE_TIME
 *  },
 *  //可能会有多个素材
 *  ]
 * }
 * ```
 * @param {String} type 素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）
 * @param {Number} offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
 * @param {Number} count 返回素材的数量，取值在1到20之间
 */
exports.getMaterials = async function (type, offset, count) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'material/batchget_material?access_token=' + accessToken;
  const data = {
    type: type,
    offset: offset,
    count: count,
  };
  return this.request(url, postJSON(data));
};

/**
 * 获取草稿列表
 * 详情请见：<https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Get_draft_list.html>
 * Examples:
 * ```
 * {
 *     "offset":OFFSET,
 *     "count":COUNT,
 *     "no_content":NO_CONTENT
 * }
 * ```
 *
 * ```
 * api.getDrafts(offset, count, no_content);
 * ```
 *
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象 * Result:
 * ```
 * {
 *   "total_count":TOTAL_COUNT,
 *   "item_count":ITEM_COUNT,
 *   "item": [
 *     {
 *       "media_id":MEDIA_ID,
 *       "content": {
 *         "news_item": [
 *           {
 *             "title":TITLE,
 *             "author":AUTHOR,
 *             "digest":DIGEST,
 *             "content":CONTENT,
 *             "content_source_url":CONTENT_SOURCE_URL,
 *             "thumb_media_id":THUMB_MEDIA_ID,
 *             "show_cover_pic": 1,
 *             "need_open_comment": 0,
 *             "only_fans_can_comment": 0,
 *             "url":URL
 *           },
 *           //多图文消息会在此处有多篇文章
 *         ]
 *       },
 *       "update_time": UPDATE_TIME
 *     },
 *     //可能有多个图文消息item结构
 *   ]
 * }
 * ```
 */
exports.getDrafts = async function (offset, count, no_content) {
  const { accessToken } = await this.ensureAccessToken();
  const url = this.prefix + 'draft/batchget?access_token=' + accessToken;
  const data = {
    offset: offset,
    count: count,
    no_content: no_content,
  };
  return this.request(url, postJSON(data));
};
