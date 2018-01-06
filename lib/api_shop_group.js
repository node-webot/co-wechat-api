'use strict';

// 商品分组管理接口
const { postJSON } = require('./util');

/**
 * 创建商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.createGoodsGroup(groupName, productList);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "group_id": 19
 * }
 * ```
 * @param {String}      groupName 分组名
 * @param {Array}       productList 该组商品列表
 * @param {Function}    callback 回调函数
 */
exports.createGoodsGroup = async function (groupName, productList) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    'group_detail': {
      'group_name': groupName,
      'product_list': productList && productList.length ? productList: []
    }
  };
  var url = this.merchantPrefix + 'group/add?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 删除商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.deleteGoodsGroup(groupId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {String}      groupId 分组ID
 */
exports.deleteGoodsGroup = async function (groupId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    'group_id': groupId
  };
  var url = this.merchantPrefix + 'group/del?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 修改商品分组属性
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateGoodsGroup(groupId, groupName);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {String}      groupId 分组ID
 * @param {String}      groupName 分组名
 */
exports.updateGoodsGroup = async function (groupId, groupName) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    'group_id': groupId,
    'group_name': groupName
  };
  var url = this.merchantPrefix + 'group/propertymod?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 修改商品分组内的商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateGoodsForGroup(groupId, addProductList, delProductList);
 * ```
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {Object}      groupId 分组ID
 * @param {Array}       addProductList 待添加的商品数组
 * @param {Array}       delProductList 待删除的商品数组
 * @param {Function}    callback 回调函数
 */
exports.updateGoodsForGroup = async function (groupId, addProductList, delProductList) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    'group_id': groupId,
    'product': []
  };

  if (addProductList && addProductList.length) {
    addProductList.forEach(function (val) {
      data.product.push({
        'product_id': val,
        'mod_action': 1
      });
    });
  }

  if (delProductList && delProductList.length) {
    delProductList.forEach(function (val) {
      data.product.push({
        'product_id': val,
        'mod_action': 0
      });
    });
  }

  var url = this.merchantPrefix + 'group/productmod?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 获取所有商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getAllGroups();
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "groups_detail": [
 *    {
 *      "group_id": 200077549,
 *      "group_name": "新品上架"
 *    },{
 *      "group_id": 200079772,
 *      "group_name": "全球热卖"
 *    }
 *  ]
 * }
 * ```
 */
exports.getAllGroups = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'group/getall?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

/**
 * 根据ID获取商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getGroupById(groupId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "group_detail": {
 *    "group_id": 200077549,
 *    "group_name": "新品上架",
 *    "product_list": [
 *      "pDF3iYzZoY-Budrzt8O6IxrwIJAA",
 *      "pDF3iY3pnWSGJcO2MpS2Nxy3HWx8",
 *      "pDF3iY33jNt0Dj3M3UqiGlUxGrio"
 *    ]
 *  }
 * }
 * ```
 * @param {String}      groupId 分组ID
 */
exports.getGroupById = async function (groupId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    'group_id': groupId
  };
  var url = this.merchantPrefix + 'group/getbyid?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};
