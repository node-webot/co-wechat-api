var util = require('./util');

var postJSON = util.postJSON;

exports.transferMessage = function* (deviceType, deviceId, openid, content) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/transmsg?access_token=' + token.accessToken;
  var info = {
    "device_type": deviceType,
    "device_id": deviceId,
    "open_id": openid,
    "content": new Buffer(content).toString('base64')
  };
  return yield* this.request(url, postJSON(info));
};

exports.transferStatus = function* (deviceType, deviceId, openid, status) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/transmsg?access_token=' + token.accessToken;
  var info = {
    "device_type": deviceType,
    "device_id": deviceId,
    "open_id": openid,
    "msg_type": "2",
    "device_status": status
  };
  return yield* this.request(url, postJSON(info));
};

exports.createDeviceQRCode = function* (deviceIds) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/create_qrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/create_qrcode?access_token=' + token.accessToken;
  var info = {
    "device_num": deviceIds.length,
    "device_id_list": deviceIds
  };
  return yield* this.request(url, postJSON(info));
};

exports.authorizeDevices = function* (devices, optype) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/authorize_device?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/authorize_device?access_token=' + token.accessToken;
  var data = {
    "device_num": devices.length,
    "device_list": devices,
    "op_type": optype
  };
  return yield* this.request(url, postJSON(data));
};

exports.getDeviceQRCode = function* (devices, optype) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/getqrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/getqrcode?access_token=' + token.accessToken;
  return yield* this.request(url, {dataType: 'json'});
};

exports.bindDevice = function* (deviceId, openid, ticket) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/bind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/bind?access_token=' + token.accessToken;
  var data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  return yield* this.request(url, postJSON(data));
};

exports.unbindDevice = function* (deviceId, openid, ticket) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/unbind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/unbind?access_token=' + token.accessToken;
  var data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  return yield* this.request(url, postJSON(data));
};


exports.compelBindDevice = function* (deviceId, openid) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/compel_bind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/compel_bind?access_token=' + token.accessToken;
  var data = {
    device_id: deviceId,
    openid: openid
  };
  return yield* this.request(url, postJSON(data));
};

exports.compelUnbindDevice = function* (deviceId, openid) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/compel_unbind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/compel_unbind?access_token=' + token.accessToken;
  var data = {
    device_id: deviceId,
    openid: openid
  };
  return yield* this.request(url, postJSON(data));
};

exports.getDeviceStatus = function* (deviceId) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_stat?access_token=ACCESS_TOKEN&device_id=DEVICE_ID
  var url = 'https://api.weixin.qq.com/device/get_stat?access_token=' + token.accessToken + "&device_id=" + deviceId;
  return yield* this.request(url, {dataType: 'json'});
};

exports.verifyDeviceQRCode = function* (ticket) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/verify_qrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/verify_qrcode?access_token=' + token.accessToken;
  var data = {
    ticket: ticket,
  };
  return yield* this.request(url, postJSON(data));
};

exports.getOpenID = function* (deviceId, deviceType) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_openid?access_token=ACCESS_TOKEN&device_type=DEVICE_TYPE&device_id=DEVICE_ID
  var url = 'https://api.weixin.qq.com/device/get_openid?access_token=' + token.accessToken + "&device_id=" + deviceId + "&device_type=" + deviceType;
  return yield* this.request(url, {dataType: 'json'});
};

exports.getBindDevice = function* (openid) {
  var token = yield* this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_bind_device?access_token=ACCESS_TOKEN&openid=OPENID
  var url = 'https://api.weixin.qq.com/device/get_bind_device?access_token=' + token.accessToken + "&openid=" + openid;
  return yield* this.request(url, {dataType: 'json'});
};
