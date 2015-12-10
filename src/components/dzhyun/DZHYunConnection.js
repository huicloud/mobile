/**
 * 大智慧云平台服务
 * Created by jiagang on 15/11/5.
 */
import DZHChannel from 'DzhChannel';

export default class DZHYunConnection {

  static CONNECTION = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  dataType = 'pb';

  constructor(options) {
    Object.assign(this, options);

    this.requestQueue = {};
  }

  _createRequest(qid, service, data, subscribe, callback, pauseable) {
    return Object.assign({qid, service, data, subscribe, callback, pauseable}, {
      cancel: this.cancel.bind(this, qid)
    });
  }

  _generateQid() {
    return this._lastQid = (this._lastQid || 0) + 1;
  }

  _createChannel() {

    // TODO 创建https连接请求权限（访问令牌token） /oauth/token/access?appid=&secret_key=&deviceid=

    // TODO 维护token的有效期

    // TODO 带上token创建ws连接 ws://hostname:port/ws?token=xxxx

    // TODO 用客户端的账号权限token到云平台验证并交换得到云平台账号token（用户相关信息需要在请求时带上，其实验证通过后用户权限应该和这个ws连接绑定，可以考虑不用每次请求时带上，是不是和上面的应用权限一样只要连接时带上就可以了呢，等UA实现后再考虑）

    return Promise.resolve().then(() => {
      const channel = this._channel = new DZHChannel(this.address);
      channel.onopen = this._onopen.bind(this);
      channel.onerror = this._onerror.bind(this);
      channel.onclose = this._onclose.bind(this);
      channel.onmessage = this._onmessage.bind(this);
      return channel;
    });
  }

  _onopen() {
    console.debug(Date.now() + ' connection open');

    // 连接open后将请求队列中的请求统一请求一次
    Object.keys(this.requestQueue).forEach(qid => {
      let request = this.requestQueue[qid];
      request.isPause !== true && this._send(this.requestQueue[qid]);
    });
  }

  _onerror() {

    console.debug(Date.now() + ' error');

    // 连接错误则关闭当前连接后1秒后重连接，重试三次
    this._onclose();

    this._reconnectionCount = (this._reconnectionCount || 0) + 1;
    if (this._reconnectionCount <= 3) {
      setTimeout((() => this.getChannel()), 1000);
    } else {
      this._reconnectionCount = 0;
    }
  }

  _onmessage(event) {
    try {
      console.debug(Date.now() + ' rec:' + event.data);
      let data = JSON.parse(event.data) || {},
        qid = data.Qid,
        request = this.requestQueue[qid];
      if (request && request.isPause !== true) {
        let callback = request.callback;
        if (typeof callback === 'function') {
          callback(data.Data);
        }
        if (!request.subscribe) {
          delete this.requestQueue[qid];
        }
      }
    } catch(e) {
    }
  }

  _onclose() {

    // 关闭处理（断线，超时），将当前连接删除
    if (this._channel) {
      delete this._channel.onopen;
      delete this._channel.onclose;
      delete this._channel.onmessage;
      delete this._channel.onerror;

      // android调用close会报错
      // this._channel.close();

      this._channel = null;
      this._openPromise = null;
      this._connectionPromise = null;
    }
  }

  _getRequestUrl(service, data, qid) {

    // 请求参数中添加qid和用户id（token）
    let params = Object.assign({
        qid,
        //_userid: 2441,
        output: this.dataType
      }, data),
      keys = Object.keys(params),
      paramsStr = keys.map((key) => {
        return [key, params[key]].join('=');
      }).join('&');

    return service + '?' + paramsStr;
  }

  getChannel() {

    return this._connectionPromise = this._connectionPromise || Promise.resolve().then(() => {

      // TODO 如果_channel存在并且没有断掉而且token没有过期，则直接返回，否则创建新的连接
      return !this.isClosed() ? this._channel : this._createChannel();
    });
  }

  getReadyState() {
    return this._channel ? this._channel.readyState : DZHYunConnection.CLOSED;
  }

  isClosed() {
    const state = this.getReadyState();
    return state === DZHYunConnection.CLOSED || state === DZHYunConnection.CLOSING;
  }

  isOpened() {
    return this.getReadyState() === DZHYunConnection.OPEN;
  }

  isPause() {
    return this._pause === true;
  }

  request(service, data, callback, pauseable) {
    let qid = this._generateQid(),
      request = this._createRequest(qid, service, data, data.sub === 1, callback, pauseable);

    // 创建连接
    this.getChannel();

    // 判断是否open，open中则直接请求，否则等待open后自动请求
    if (this.isOpened()) {
      this._send(request);
    }
    this.requestQueue[qid] = request;

    return request;
  }

  _send(request) {
    console.debug(Date.now() + ' send:' + this._getRequestUrl(request.service, request.data, request.qid));
    this._channel.send(this._getRequestUrl(request.service, request.data, request.qid));

    // 处理请求超时,如果10秒内未响应请求,则判断为超时,将请求从队列中移除
    request.subscribe !== true && setTimeout(() => {
      let timeoutRequest = this.requestQueue[request.qid];
      if (timeoutRequest && timeoutRequest.isPause !== true) {
        timeoutRequest.callback(new Error('request timeout'));
        delete this.requestQueue[request.qid];
      }
    }, 10 * 1000);

  }

  subscribe(service, data, callback) {
    data = data || [];
    data.sub = 1;
    return this.request(service, data, callback);
  }

  _cancelRequest(qid, keep) {
    if (this.isOpened()) {
      console.debug(Date.now() + ` cancel request[qid=${qid}]`);
      this._channel.send('/cancel?qid=' + qid);
    }
    keep !== true ? delete this.requestQueue[qid] : void(0);
  }

  cancel(qid) {

    // 指定qid则取消指定的request，否则取消全部请求
    if (qid !== undefined) {
      this.requestQueue[qid] && this._cancelRequest(qid);
    } else {
      Object.keys(this.requestQueue).forEach(qid => this._cancelRequest(qid));
    }
  }

  close() {

    // 取消所有请求后，断开连接
    this.cancel();

    this._channel && this._channel.close();
  }

  // 暂停所有请求推送
  // @param {boolean=} keepSubscribe 保持订阅的请求,仅仅不再推送调用订阅的回调方法(慎用),默认false
  pause(keepSubscribe = false) {

    // 取消当前所有的请求,并且设置状态为暂停状态
    Object.keys(this.requestQueue).forEach(qid => {
      let request = this.requestQueue[qid];

      // 如果请求能够暂停则取消请求
      if (request.pauseable !== false) {
        keepSubscribe === false && this._cancelRequest(qid, true);
        request.isPause = true;
      }
    });

    this._pause = true;
  }

  // 恢复暂停的请求推送
  resume() {
    this._pause = false;

    // 连接打开状态则直接将中断的订阅请求重新发送,否则等待重新连接
    if (this.isOpened()) {
      Object.keys(this.requestQueue).forEach(qid => {
        let request = this.requestQueue[qid];
        if (request.isPause === true) {
          request.isPause = false;
          this._send(request);
        }
      });
    } else {
      Object.keys(this.requestQueue).forEach(qid => this.requestQueue[qid].isPause = false);
      this.getChannel();
    }
  }
}

export let connection = new DZHYunConnection({
  address: global.DZHYUN_ADDRESS,
  dataType: global.DZHYUN_DATA_TYPE
});