/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DzhChannel
 */
'use strict';

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var RCTDzhChannelModule = require('NativeModules').DzhChannelModule;

var Platform = require('Platform');
var DzhChannelBase = require('DzhChannelBase');
var DzhChannelEvent = require('DzhChannelEvent');

var DzhChannelId = 0;
var CLOSE_NORMAL = 1000;

/**
 * Browser-compatible DzhChannels implementation.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/DzhChannel
 */
class DzhChannel extends DzhChannelBase {
  _socketId: number;
  _subs: any;

  connectToSocketImpl(url: string): void {
    this._socketId = DzhChannelId++;

    RCTDzhChannelModule.connect(url, this._socketId);

    this._registerEvents(this._socketId);
  }

  closeConnectionImpl(code?: number, reason?: string): void {
    this._closeDzhChannel(this._socketId, code, reason);
  }

  cancelConnectionImpl(): void {
    this._closeDzhChannel(this._socketId);
  }

  sendStringImpl(message: string): void {
    RCTDzhChannelModule.send(message, this._socketId);
  }

  sendArrayBufferImpl(): void {
    // TODO
    console.warn('Sending ArrayBuffers is not yet supported');
  }

  _closeDzhChannel(id: number, code?: number, reason?: string): void {
    if (Platform.OS === 'android') {
      /*
       * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
       */
      var statusCode = typeof code === 'number' ? code : CLOSE_NORMAL;
      var closeReason = typeof reason === 'string' ? reason : '';
      RCTDzhChannelModule.close(statusCode, closeReason, id);
    } else {
      RCTDzhChannelModule.close(id);
    }
  }

  _unregisterEvents(): void {
    this._subs.forEach(e => e.remove());
    this._subs = [];
  }

  _registerEvents(id: number): void {
    this._subs = [
      RCTDeviceEventEmitter.addListener('dzhChannelMessage', ev => {
        if (ev.id !== id) {
          return;
        }
        var event = new DzhChannelEvent('message', {
          data: ev.data
        });
        this.onmessage && this.onmessage(event);
        this.dispatchEvent(event);
      }),
      RCTDeviceEventEmitter.addListener('dzhChannelOpen', ev => {
        if (ev.id !== id) {
          return;
        }
        this.readyState = this.OPEN;
        var event = new DzhChannelEvent('open');
        this.onopen && this.onopen(event);
        this.dispatchEvent(event);
      }),
      RCTDeviceEventEmitter.addListener('dzhChannelClosed', ev => {
        if (ev.id !== id) {
          return;
        }
        this.readyState = this.CLOSED;
        var event = new DzhChannelEvent('close');
        event.code = ev.code;
        event.reason = ev.reason;
        this.onclose && this.onclose(event);
        this.dispatchEvent(event);
        this._unregisterEvents();
        this._closeDzhChannel(id);
      }),
      RCTDeviceEventEmitter.addListener('dzhChannelFailed', ev => {
        if (ev.id !== id) {
          return;
        }
        var event = new DzhChannelEvent('error');
        event.message = ev.message;
        this.onerror && this.onerror(event);
        this.dispatchEvent(event);
        this._unregisterEvents();
        this.readyState === this.OPEN && this._closeDzhChannel(id);
      })
    ];
  }
}

module.exports = DzhChannel;
