'use strict';

// 库存管理接口
var util = require('./util');

var postJSON = util.postJSON;

/**
 * 增加库存
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateStock(10, productId, sku); // 增加10件库存
 * api.updateStock(-10, productId, sku); // 减少10件库存
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {Number} number 增加或者删除的数量
 * @param {String} productId 商品ID
 * @param {String} sku SKU信息
 */
exports.updateStock = function* (number, productId, sku) {
  var token = yield this.ensureAccessToken();
  var url;
  if (number > 0) {
    url = this.merchantPrefix + 'stock/add?access_token=' + token.accessToken;
  } else {
    url = this.merchantPrefix + 'stock/reduce?access_token=' + token.accessToken;
  }
  var data = {
    'product_id': productId,
    'sku_info': sku,
    'quantity': Math.abs(number)
  };
  return yield this.request(url, postJSON(data));
};
