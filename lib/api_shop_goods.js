'use strict';

const { postJSON } = require('./util');

/**
 * 增加商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.createGoods(goods);
 * ```
 * Goods:
 * ```
 * {
 *  "product_base":{
 *    "category_id":[
 *      "537074298"
 *    ],
 *    "property":[
 *      {"id":"1075741879","vid":"1079749967"},
 *      {"id":"1075754127","vid":"1079795198"},
 *      {"id":"1075777334","vid":"1079837440"}
 *    ],
 *    "name":"testaddproduct",
 *    "sku_info":[
 *      {
 *        "id":"1075741873",
 *        "vid":["1079742386","1079742363"]
 *      }
 *    ],
 *    "main_img": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic0FD3vN0V8PILcibEGb2fPfEOmw/0",
 *    "img":[
 *      "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic0FD3vN0V8PILcibEGb2fPfEOmw/0"
 *    ],
 *    "detail":[
 *      {"text":"testfirst"},
 *      {"img": 4whpV1VZl2iccsvYbHvnphkyGtnvjD3ul1UcLcwxrFdwTKYhH9Q5YZoCfX4Ncx655ZK6ibnlibCCErbKQtReySaVA/0"},
 *      {"text":"testagain"}
 *    ],
 *    "buy_limit":10
 *  },
 *  "sku_list":[
 *    {
 *      "sku_id":"1075741873:1079742386",
 *      "price":30,
 *      "icon_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl28bJj62XgfHPibY3ORKicN1oJ4CcoIr4BMbfA8LqyyjzOZzqrOGz3f5K Wq1QGP3fo6TOTSYD3TBQjuw/0",
 *      "product_code":"testing",
 *      "ori_price":9000000,
 *      "quantity":800
 *    },
 *    {
 *      "sku_id":"1075741873:1079742363",
 *      "price":30,
 *      "icon_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl28bJj62XgfHPibY3ORKicN1oJ4CcoIr4BMbfA8LqyyjzOZzqrOGz3f5K Wq1QGP3fo6TOTSYD3TBQjuw/0",
 *      "product_code":"testingtesting",
 *      "ori_price":9000000,
 *      "quantity":800
 *    }
 *  ],
 *  "attrext":{
 *    "location":{
 *      "country":"中国",
 *      "province":"广东省",
 *      "city":"广州市",
 *      "address":"T.I.T创意园"
 *    },
 *    "isPostFree":0,
 *    "isHasReceipt":1,
 *    "isUnderGuaranty":0,
 *    "isSupportReplace":0
 *  },
 *  "delivery_info":{
 *    "delivery_type":0,
 *    "template_id":0,
 *    "express":[
 *      {"id":10000027,"price":100},
 *      {"id":10000028,"price":100},
 *      {"id":10000029,"price":100}
 *    ]
 *  }
 * }
 * ```
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "product_id": "pDF3iYwktviE3BzU3BKiSWWi9Nkw"
 * }
 * ```
 * @param {Object} goods 商品信息
 */
exports.createGoods = async function (goods) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'create?access_token=' + accessToken;
  return this.request(url, postJSON(goods));
};

/**
 * 删除商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.deleteGoods(productId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 * }
 * ```
 * @param {String} productId 商品Id
 */
exports.deleteGoods = async function (productId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    'product_id': productId
  };
  var url = this.merchantPrefix + 'del?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 修改商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateGoods(goods);
 * ```
 * Goods:
 * ```
 * {
 *  "product_id":"pDF3iY6Kr_BV_CXaiYysoGqJhppQ",
 *  "product_base":{
 *    "category_id":[
 *      "537074298"
 *    ],
 *    "property":[
 *      {"id":"1075741879","vid":"1079749967"},
 *      {"id":"1075754127","vid":"1079795198"},
 *      {"id":"1075777334","vid":"1079837440"}
 *    ],
 *    "name":"testaddproduct",
 *    "sku_info":[
 *      {
 *        "id":"1075741873",
 *        "vid":["1079742386","1079742363"]
 *      }
 *    ],
 *    "main_img": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic0FD3vN0V8PILcibEGb2fPfEOmw/0",
 *    "img":[
 *      "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic0FD3vN0V8PILcibEGb2fPfEOmw/0"
 *    ],
 *    "detail":[
 *      {"text":"testfirst"},
 *      {"img": 4whpV1VZl2iccsvYbHvnphkyGtnvjD3ul1UcLcwxrFdwTKYhH9Q5YZoCfX4Ncx655ZK6ibnlibCCErbKQtReySaVA/0"},
 *      {"text":"testagain"}
 *    ],
 *    "buy_limit":10
 *  },
 *  "sku_list":[
 *    {
 *      "sku_id":"1075741873:1079742386",
 *      "price":30,
 *      "icon_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl28bJj62XgfHPibY3ORKicN1oJ4CcoIr4BMbfA8LqyyjzOZzqrOGz3f5K Wq1QGP3fo6TOTSYD3TBQjuw/0",
 *      "product_code":"testing",
 *      "ori_price":9000000,
 *      "quantity":800
 *    },
 *    {
 *      "sku_id":"1075741873:1079742363",
 *      "price":30,
 *      "icon_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl28bJj62XgfHPibY3ORKicN1oJ4CcoIr4BMbfA8LqyyjzOZzqrOGz3f5K Wq1QGP3fo6TOTSYD3TBQjuw/0",
 *      "product_code":"testingtesting",
 *      "ori_price":9000000,
 *      "quantity":800
 *    }
 *  ],
 *  "attrext":{
 *    "location":{
 *      "country":"中国",
 *      "province":"广东省",
 *      "city":"广州市",
 *      "address":"T.I.T创意园"
 *    },
 *    "isPostFree":0,
 *    "isHasReceipt":1,
 *    "isUnderGuaranty":0,
 *    "isSupportReplace":0
 *  },
 *  "delivery_info":{
 *    "delivery_type":0,
 *    "template_id":0,
 *    "express":[
 *      {"id":10000027,"price":100},
 *      {"id":10000028,"price":100},
 *      {"id":10000029,"price":100}
 *    ]
 *  }
 * }
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {Object} goods 商品信息
 */
exports.updateGoods = async function (goods) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'update?access_token=' + accessToken;
  return this.request(url, postJSON(goods));
};

/**
 * 查询商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getGoods(productId);
 * ```
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "product_info":{
 *    "product_id":"pDF3iY6Kr_BV_CXaiYysoGqJhppQ",
 *    "product_base":{
 *      "name":"testaddproduct",
 *      "category_id":[537074298],
 *      "img":[
 *        "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic0FD3vN0V8PILcibEGb2fPfEOmw/0"
 *      ],
 *      "property":[
 *        {"id":"品牌","vid":"Fujifilm/富⼠士"},
 *        {"id":"屏幕尺⼨寸","vid":"1.8英⼨寸"},
 *        {"id":"防抖性能","vid":"CCD防抖"}
 *      ],
 *      "sku_info":[
 *        {
 *          "id":"1075741873",
 *          "vid":[
 *            "1079742386",
 *            "1079742363"
 *          ]
 *        }
 *      ],
 *      "buy_limit":10,
 *      "main_img": 4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic 0FD3vN0V8PILcibEGb2fPfEOmw/0",
 *      "detail_html": "<div class=\"item_pic_wrp\" style= \"margin-bottom:8px;font-size:0;\"><img class=\"item_pic\" style= \"width:100%;\" alt=\"\" src=\"http://mmbiz.qpic.cn/mmbiz/ 4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic 0FD3vN0V8PILcibEGb2fPfEOmw/0\" ></div><p style=\"margin-bottom: 11px;margin-top:11px;\">test</p><div class=\"item_pic_wrp\" style=\"margin-bottom:8px;font-size:0;\"><img class=\"item_pic\" style=\"width:100%;\" alt=\"\" src=\"http://mmbiz.qpic.cn/mmbiz/ 4whpV1VZl2iccsvYbHvnphkyGtnvjD3ul1UcLcwxrFdwTKYhH9Q5YZoCfX4Ncx655 ZK6ibnlibCCErbKQtReySaVA/0\" ></div><p style=\"margin-bottom: 11px;margin-top:11px;\">test again</p>"
 *    },
 *    "sku_list":[
 *      {
 *        "sku_id":"1075741873:1079742386",
 *        "price":30,
 *        "icon_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl2iccsvYbHvnphkyGtnvjD3ulEKogfsiaua49pvLfUS8Ym0GSYjViaLic0FD3vN0V8PILcibEGb2fPfEOmw/0",
 *        "quantity":800,
 *        "product_code":"testing",
 *        "ori_price":9000000
 *      },
 *      {
 *        "sku_id":"1075741873:1079742363",
 *        "price":30,
 *        "icon_url": "http://mmbiz.qpic.cn/mmbiz/4whpV1VZl28bJj62XgfHPibY3ORKicN1oJ4CcoIr4BMbfA8LqyyjzOZzqrOGz3f5KWq1QGP3fo6TOTSYD3TBQjuw/0",
 *        "quantity":800,
 *        "product_code":"testingtesting",
 *        "ori_price":9000000
 *      }
 *    ],
 *    "attrext":{
 *      "isPostFree":0,
 *      "isHasReceipt":1,
 *      "isUnderGuaranty":0,
 *      "isSupportReplace":0,
 *      "location":{
 *        "country":"中国",
 *        "province":"广东省",
 *        "city":"⼲州市",
 *        "address":"T.I.T创意园"
 *      }
 *    },
 *    "delivery_info":{
 *      "delivery_type":1,
 *      "template_id":103312920
 *    }
 *  }
 * }
 * ```
 * @param {String} productId 商品Id
 */
exports.getGoods = async function (productId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'get?product_id=' + productId + '&access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

/**
 * 获取指定状态的所有商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.deleteGoods(productId);
 * ```
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "products_info": [
 *    {
 *      "product_base": ...,
 *      "sku_list": ...,
 *      "attrext": ...,
 *      "delivery_info": ...,
 *      "product_id": "pDF3iY-mql6CncpbVajaB_obC321",
 *      "status": 1
 *    }
 *  ]
 * }
 * ```
 * @param {Number} status 状态码。(0-全部, 1-上架, 2-下架)
 */
exports.getGoodsByStatus = async function (status) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {status: status};
  var url = this.merchantPrefix + 'getbystatus?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 商品上下架
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateGoodsStatus(productId, status);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {String} productId 商品Id
 * @param {Number} status 状态码。(0-全部, 1-上架, 2-下架)
 */
exports.updateGoodsStatus = async function (productId, status) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    product_id: productId,
    status: status
  };
  var url = this.merchantPrefix + 'modproductstatus?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 获取指定分类的所有子分类
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getSubCats(catId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "cate_list": [!
 *    {"id": "537074292","name": "数码相机"},
 *    {"id": "537074293","name": "家⽤用摄像机"},
 *    {"id": "537074298",! "name": "单反相机"}
 *  ]
 * }
 * ```
 * @param {Number} catId 大分类ID
 */
exports.getSubCats = async function (catId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    cate_id: catId
  };
  var url = this.merchantPrefix + 'category/getsub?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 获取指定子分类的所有SKU
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getSKUs(catId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "sku_table": [
 *    {
 *      "id": "1075741873",
 *      "name": "颜⾊色",
 *      "value_list": [
 *        {"id": "1079742375", "name": "撞⾊色"},
 *        {"id": "1079742376","name": "桔⾊色"}
 *      ]
 *    }
 *  ]
 * }
 * ```
 * @param {Number} catId 大分类ID
 */
exports.getSKUs = async function (catId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    cate_id: catId
  };
  var url = this.merchantPrefix + 'category/getsku?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 获取指定分类的所有属性
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getProperties(catId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "properties": [
 *    {
 *      "id": "1075741879",
 *      "name": "品牌",
 *      "property_value": [
 *        {"id": "200050867","name": "VIC&#38"},
 *        {"id": "200050868","name": "Kate&#38"},
 *        {"id": "200050971","name": "M&#38"},
 *        {"id": "200050972","name": "Black&#38"}
 *      ]
 *    },
 *    {
 *      "id": "123456789",
 *      "name": "颜⾊色",
 *      "property_value": ...
 *    }
 *  ]
 * }
 * ```
 * @param {Number} catId 分类ID
 */
exports.getProperties = async function (catId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    cate_id: catId
  };
  var url = this.merchantPrefix + 'category/getproperty?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

