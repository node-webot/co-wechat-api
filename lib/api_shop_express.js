'use strict';

const { postJSON } = require('./util');

/**
 * 增加邮费模板
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.addExpress(express);
 * ```
 * Express:
 * ```
 * {
 *  "delivery_template": {
 *    "Name": "testexpress",
 *    "Assumer": 0,
 *    "Valuation": 0,
 *    "TopFee": [
 *      {
 *        "Type": 10000027,
 *        "Normal": {
 *          "StartStandards": 1,
 *          "StartFees": 2,
 *          "AddStandards": 3,
 *          "AddFees": 1
 *        },
 *        "Custom": [
 *          {
 *            "StartStandards": 1,
 *            "StartFees": 100,
 *            "AddStandards": 1,
 *            "AddFees": 3,
 *            "DestCountry": "中国",
 *            "DestProvince": "广东省",
 *            "DestCity": "广州市"
 *          }
 *        ]
 *      },
 *      {
 *        "Type": 10000028,
 *        "Normal": {
 *          "StartStandards": 1,
 *          "StartFees": 3,
 *          "AddStandards": 3,
 *          "AddFees": 2
 *        },
 *        "Custom": [
 *          {
 *            "StartStandards": 1,
 *            "StartFees": 10,
 *            "AddStandards": 1,
 *            "AddFees": 30,
 *            "DestCountry": "中国",
 *            "DestProvince": "广东省",
 *            "DestCity": "广州市"
 *          }
 *        ]
 *      },
 *      {
 *        "Type": 10000029,
 *        "Normal": {
 *          "StartStandards": 1,
 *          "StartFees": 4,
 *          "AddStandards": 3,
 *          "AddFees": 3
 *        },
 *        "Custom": [
 *          {
 *            "StartStandards": 1,
 *            "StartFees": 8,
 *            "AddStandards": 2,
 *            "AddFees": 11,
 *            "DestCountry": "中国",
 *            "DestProvince": "广东省",
 *            "DestCity": "广州市"
 *          }
 *        ]
 *      }
 *    ]
 *  }
 * }
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "template_id": 123456
 * }
 * ```
 * @param {Object} express 邮费模版
 */
exports.addExpressTemplate = async function (express) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'express/add?access_token=' + accessToken;
  return this.request(url, postJSON(express));
};

/**
 * 修改邮费模板
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.deleteExpressTemplate(templateId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {Number} templateId 邮费模版ID
 */
exports.deleteExpressTemplate = async function (templateId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    template_id: templateId
  };
  var url = this.merchantPrefix + 'express/del?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 修改邮费模板
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateExpressTemplate(template);
 * ```

 * Express:
 * ```
 * {
 *  "template_id": 123456,
 *  "delivery_template": ...
 * }
 * ```
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {Object} template 邮费模版
 */
exports.updateExpressTemplate = async function (template) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'express/del?access_token=' + accessToken;
  return this.request(url, postJSON(template));
};

/**
 * 获取指定ID的邮费模板
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getExpressTemplateById(templateId);
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "template_info": {
 *    "Id": 103312916,
 *    "Name": "testexpress",
 *    "Assumer": 0,
 *    "Valuation": 0,
 *    "TopFee": [
 *      {
 *        "Type": 10000027,
 *        "Normal": {
 *          "StartStandards": 1,
 *          "StartFees": 2,
 *          "AddStandards": 3,
 *          "AddFees": 1
 *        },
 *        "Custom": [
 *          {
 *            "StartStandards": 1,
 *            "StartFees": 1000,
 *            "AddStandards": 1,
 *            "AddFees": 3,
 *            "DestCountry": "中国",
 *            "DestProvince": "广东省",
 *            "DestCity": "广州市"
 *          }
 *        ]
 *      },
 *      ...
 *    ]
 *  }
 * }
 * ```
 * @param {Number} templateId 邮费模版Id
 */
exports.getExpressTemplateById = async function (templateId) {
  const { accessToken } = await this.ensureAccessToken();
  var data = {
    template_id: templateId
  };
  var url = this.merchantPrefix + 'express/getbyid?access_token=' + accessToken;
  return this.request(url, postJSON(data));
};

/**
 * 获取所有邮费模板的未封装版本
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getAllExpressTemplates();
 * ```

 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "templates_info": [
 *    {
 *      "Id": 103312916,
 *      "Name": "testexpress1",
 *      "Assumer": 0,
 *      "Valuation": 0,
 *      "TopFee": [...],
 *    },
 *    {
 *      "Id": 103312917,
 *      "Name": "testexpress2",
 *      "Assumer": 0,
 *      "Valuation": 2,
 *      "TopFee": [...],
 *    },
 *    {
 *      "Id": 103312918,
 *      "Name": "testexpress3",
 *      "Assumer": 0,
 *      "Valuation": 1,
 *      "TopFee": [...],
 *    }
 *  ]
 * }
 * ```
 */
exports.getAllExpressTemplates = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.merchantPrefix + 'express/getall?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};
