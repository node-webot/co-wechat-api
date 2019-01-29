'use strict';

const API = require('../');
const expect = require('expect.js');

describe('api_user', function () {
  describe('batchGetUsers', function () {
    var api = new API('appid', 'appsecret');
    api.ensureAccessToken = async () => ({accessToken: 'accessToken'});
    it('should have default language "zh_CN"', function () {
      api.request = (url, req) => {
        const data = JSON.parse(req.data);
        const isExpectedLang = data.user_list.every((item) => item.lang === 'zh_CN');
        expect(isExpectedLang).to.be.ok();
      };
      api.batchGetUsers(['openId1', 'openId2']);
    });
    it('should use the language if set', function () {
      api.request = (url, req) => {
        const data = JSON.parse(req.data);
        const isExpectedLang = data.user_list.every((item) => item.lang === 'en');
        expect(isExpectedLang).to.be.ok();
      };
      api.batchGetUsers(['openId1', 'openId2'], 'en');
    });
  });
});
