var expect = require('expect.js');
var config = require('./config');
var API = require('../');

describe('api_menu.js', function () {
  var api = new API(config.appid, config.appsecret);

  it('createMenu should ok', function* () {
    var menu = JSON.stringify(require('./fixture/menu.json'));
    var result = yield* api.createMenu(menu);
    expect(result).to.have.property('errcode', 0);
    expect(result).to.have.property('errmsg', 'ok');
  });

  it('getMenu should ok', function* () {
    var menu = yield* api.getMenu();
    expect(menu).to.have.property('menu');
    expect(menu.menu).to.have.property('button');
    expect(menu.menu.button).to.have.length(3);
  });

  it('removeMenu should ok', function* () {
    var result = yield* api.removeMenu();
    expect(result).to.have.property('errcode', 0);
    expect(result).to.have.property('errmsg', 'ok');
  });

  it('getMenuConfig should ok', function* () {
    var result = yield* api.getMenuConfig();
    expect(result).to.have.property('errcode', 0);
    expect(result).to.have.property('errmsg', 'ok');
  });
});
