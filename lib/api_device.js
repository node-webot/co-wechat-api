'use strict';

const { postJSON } = require('./util');

exports.transferMessage = async function (deviceType, deviceId, openid, content) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/transmsg?access_token=' + accessToken;
  var info = {
    'device_type': deviceType,
    'device_id': deviceId,
    'open_id': openid,
    'content': new Buffer(content).toString('base64')
  };
  return this.request(url, postJSON(info));
};

exports.transferStatus = async function (deviceType, deviceId, openid, status) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/transmsg?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/transmsg?access_token=' + accessToken;
  var info = {
    'device_type': deviceType,
    'device_id': deviceId,
    'open_id': openid,
    'msg_type': '2',
    'device_status': status
  };
  return this.request(url, postJSON(info));
};

exports.createDeviceQRCode = async function (deviceIds) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/create_qrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/create_qrcode?access_token=' + accessToken;
  var info = {
    'device_num': deviceIds.length,
    'device_id_list': deviceIds
  };
  return this.request(url, postJSON(info));
};

exports.authorizeDevices = async function (devices, optype) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/authorize_device?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/authorize_device?access_token=' + accessToken;
  var data = {
    'device_num': devices.length,
    'device_list': devices,
    'op_type': optype
  };
  return this.request(url, postJSON(data));
};

exports.getDeviceQRCode = async function (devices, optype) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/getqrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/getqrcode?access_token=' + accessToken;
  return this.request(url, {dataType: 'json'});
};

exports.bindDevice = async function (deviceId, openid, ticket) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/bind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/bind?access_token=' + accessToken;
  var data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  return this.request(url, postJSON(data));
};

exports.unbindDevice = async function (deviceId, openid, ticket) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/unbind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/unbind?access_token=' + accessToken;
  var data = {
    ticket: ticket,
    device_id: deviceId,
    openid: openid
  };
  return this.request(url, postJSON(data));
};
exports.compelBindDevice = async function (deviceId, openid) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/compel_bind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/compel_bind?access_token=' + accessToken;
  var data = {
    device_id: deviceId,
    openid: openid
  };
  return this.request(url, postJSON(data));
};

exports.compelUnbindDevice = async function (deviceId, openid) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/compel_unbind?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/compel_unbind?access_token=' + accessToken;
  var data = {
    device_id: deviceId,
    openid: openid
  };
  return this.request(url, postJSON(data));
};

exports.getDeviceStatus = async function (deviceId) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_stat?access_token=ACCESS_TOKEN&device_id=DEVICE_ID
  var url = 'https://api.weixin.qq.com/device/get_stat?access_token=' + accessToken + '&device_id=' + deviceId;
  return this.request(url, {dataType: 'json'});
};

exports.verifyDeviceQRCode = async function (ticket) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/verify_qrcode?access_token=ACCESS_TOKEN
  var url = 'https://api.weixin.qq.com/device/verify_qrcode?access_token=' + accessToken;
  var data = {
    ticket: ticket,
  };
  return this.request(url, postJSON(data));
};

exports.getOpenID = async function (deviceId, deviceType) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_openid?access_token=ACCESS_TOKEN&device_type=DEVICE_TYPE&device_id=DEVICE_ID
  var url = 'https://api.weixin.qq.com/device/get_openid?access_token=' + accessToken + '&device_id=' + deviceId + '&device_type=' + deviceType;
  return this.request(url, {dataType: 'json'});
};

exports.getBindDevice = async function (openid) {
  const { accessToken } = await this.ensureAccessToken();
  // https://api.weixin.qq.com/device/get_bind_device?access_token=ACCESS_TOKEN&openid=OPENID
  var url = 'https://api.weixin.qq.com/device/get_bind_device?access_token=' + accessToken + '&openid=' + openid;
  return this.request(url, {dataType: 'json'});
};
