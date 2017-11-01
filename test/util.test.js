'use strict';

const path = require('path');
const fs = require('fs');

const expect = require('expect.js');

const util = require('../lib/util');

const filepath = path.join(__dirname, 'fixture/invalid.json');
const str = fs.readFileSync(filepath, 'utf8').trim();

describe('util', function () {
  it('json parse with invalid chars', function () {
    expect(() => {
      JSON.parse(str);
    }).to.throwException(/Unexpected token/);

    expect(() => {
      JSON.parse(util.replaceJSONCtlChars(str));
    }).not.to.throwException();
  });
});
