/**
 * @providesModule YunSdk
 * @flow
 */
'use strict';

var NativeYunSdk = require('NativeModules').YunSdk;

/**
 * High-level docs for the YunSdk iOS API can be written here.
 */

var YunSdk = {
  test: function() {
    NativeYunSdk.test();
  }
};

module.exports = YunSdk;
