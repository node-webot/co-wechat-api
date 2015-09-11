var path = require('path');
var fs = require('fs');

/**
 * 上传图片
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.uploadPicture('/path/to/your/img.jpg');
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "image_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2ibl4JWwwnW3icSJGqecVtRiaPxwWEIr99eYYL6AAAp1YBo12CpQTXFH6InyQWXITLvU4CU7kic4PcoXA/0"
 * }
 * ```
 * @param {String} filepath 文件路径
 */
exports.uploadPicture = function* (filepath) {
  var token = yield* this.ensureAccessToken();
  var basename = path.basename(filepath);
  var url = this.merchantPrefix + 'common/upload_img?access_token=' +
    token.accessToken + '&filename=' + basename;
  var reader = fs.createReadStream(filepath);
  var opts = {
    dataType: 'json',
    type: 'POST',
    data: reader
  };
  return yield* this.request(url, opts);
};
