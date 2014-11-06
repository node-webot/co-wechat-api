var API = require('wechat-api');
var thunkify = require('thunkify');

Object.keys(API.prototype).forEach(function (key) {
  if (key.indexOf('_') === 0) {
    var method = key.slice(1);
    API.prototype[method] = thunkify(API.prototype[method]);
  }
});
var keys = ['uploadImage', 'uploadVoice', 'uploadVideo', 'uploadThumb'];

keys.forEach(function (key) {
  API.prototype[key] = thunkify(API.prototype[key]);
});

module.exports = API;
