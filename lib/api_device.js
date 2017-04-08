'use strict';

const { postJSON } = require('./util');

exports.transferMessage = async function (deviceType, deviceId, openid, content) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/transmsg?access_token=' + token.accessToken;
  var info = {
    'device_type': deviceType,
    'device_id': deviceId,
    'open_id': openid,
    'content': new Buffer(content).toString('base64')
  };
  return await this.request(url, postJSON(info));
};

exports.transferStatus = async function (deviceType, deviceId, openid, status) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/transmsg?access_token=' + token.accessToken;
  var info = {
    'device_type': deviceType,
    'device_id': deviceId,
    'open_id': openid,
    'msg_type': '2',
    'device_status': status
  };
  return await this.request(url, postJSON(info));
};

exports.createDeviceQRCode = async function (deviceIds) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/create_qrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/create_qrcode?access_token=' + token.accessToken;
  var info = {
    'device_num': deviceIds.length,
    'device_id_list': deviceIds
  };
  return await this.request(url, postJSON(info));
};

exports.authorizeDevices = async function (devices, optype) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/authorize_device?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/authorize_device?access_token=' + token.accessToken;
  var data = {
    'device_num': devices.length,
    'device_list': devices,
    'op_type': optype
  };
  return await this.request(url, postJSON(data));
};

exports.getDeviceQRCode = async function (devices, optype) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/getqrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/getqrcode?access_token=' + token.accessToken;
  return await this.request(url, {dataType: 'json'});
};

exports.bindDevice = async function (deviceId, openid, ticket) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/bind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/bind?access_token=' + token.accessToken;
  var data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  return await this.request(url, postJSON(data));
};

exports.unbindDevice = async function (deviceId, openid, ticket) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/unbind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/unbind?access_token=' + token.accessToken;
  var data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  return await this.request(url, postJSON(data));
};
exports.compelBindDevice = async function (deviceId, openid) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/compel_bind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/compel_bind?access_token=' + token.accessToken;
  var data = {
    device_id: deviceId,
    openid: openid
  };
  return await this.request(url, postJSON(data));
};

exports.compelUnbindDevice = async function (deviceId, openid) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/compel_unbind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/compel_unbind?access_token=' + token.accessToken;
  var data = {
    device_id: deviceId,
    openid: openid
  };
  return await this.request(url, postJSON(data));
};

exports.getDeviceStatus = async function (deviceId) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_stat?access_token=ACCESS_TOKEN&device_id=DEVICE_ID
  var url = 'https://api.weixin.qq.com/device/get_stat?access_token=' + token.accessToken + '&device_id=' + deviceId;
  return await this.request(url, {dataType: 'json'});
};

exports.verifyDeviceQRCode = async function (ticket) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/verify_qrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/verify_qrcode?access_token=' + token.accessToken;
  var data = {
    ticket: ticket,
  };
  return await this.request(url, postJSON(data));
};

exports.getOpenID = async function (deviceId, deviceType) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_openid?access_token=ACCESS_TOKEN&device_type=DEVICE_TYPE&device_id=DEVICE_ID
  var url = 'https://api.weixin.qq.com/device/get_openid?access_token=' + token.accessToken + '&device_id=' + deviceId + '&device_type=' + deviceType;
  return await this.request(url, {dataType: 'json'});
};

exports.getBindDevice = async function (openid) {
  var token = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_bind_device?access_token=ACCESS_TOKEN&openid=OPENID
  var url = 'https://api.weixin.qq.com/device/get_bind_device?access_token=' + token.accessToken + '&openid=' + openid;
  return await this.request(url, {dataType: 'json'});
};
