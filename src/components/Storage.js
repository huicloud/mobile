/**
 * 用于存储数据，存储在内存中，第一次从AsyncStorage取得数据后在内存中管理, 找寻一定的时机去更新AsyncStorage
 * Created by jiagang on 15/11/3.
 */

import React, {Component, AsyncStorage, View} from 'react-native';
import EventEmitter from 'EventEmitter';
import Subscribable from 'Subscribable';

const _internalStorage = {};

export default class Storage extends Component {

  static eventEmitter = new EventEmitter();

  static _getKey(key) {
    return 'yunapp:' + key;
  }

  static _getEventType(key, type) {
    return [key, type].join('-');
  }

  static async _getItem(key) {
    let item = await AsyncStorage.getItem(Storage._getKey(key));
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  static async getItem(key) {
    if (_internalStorage.hasOwnProperty(key)) {
      return _internalStorage[key];
    } else {
      return _internalStorage[key] = await Storage._getItem(key);
    }
  }

  static async _setItem(key, value) {
    return await AsyncStorage.setItem(Storage._getKey(key), JSON.stringify(value));
  }

  static async setItem(key, value) {
    _internalStorage[key] = value;
    Storage.eventEmitter.emit(Storage._getEventType(key, 'update'), value);
    Storage._setItem(key, value);
    return true;
  }

  static async _removeItem(key) {
    return await AsyncStorage.removeItem(Storage._getKey(key));
  }

  static async removeItem(key) {
    delete _internalStorage[key];
    Storage.eventEmitter.emit(Storage._getEventType(key, 'remove'));
    Storage.removeItem(Storage._getKey(key));
    return true;
  }

  constructor(props) {
    super(props);

    Object.assign(this, Subscribable.Mixin);

    //Storage.removeItem(props.storageKey);
    this.state = {
      data: null
    };
  }

  setItem(value) {
    return Storage.setItem(this.props.storageKey, value);
  }

  /**
   *
   * @returns {Promise}
   */
  getItem() {
    return Storage.getItem(this.props.storageKey);
  }

  removeItem() {
    return Storage.removeItem(this.props.storageKey);
  }

  addListener(type, listener) {
    this.addListenerOn(Storage.eventEmitter, Storage._getEventType(this.props.storageKey, type), listener);
  }

  componentDidMount() {

    // 初始设置为传入对象
    this.setState({data: this.props.data});

    // 绑定事件
    this.addListener('update', (value) => {
      this.props.onUpdate && this.props.onUpdate(value);
      this.setState({data: value});
    });
    this.addListener('remove', () => {
      this.props.onRemove && this.props.onRemove();
      this.setState({data: null});
    });

    // 根据prop中的key初始请求存储中的数据
    this.getItem().then((value) => {
      this.props.onInitial && this.props.onInitial(value);
      this.setState({data: value});
    });
  }

  componentWillReceiveProps(nextProps) {

    // 接收到新的props时更新storage，更新规则默认为直接覆盖
    nextProps.data && this.setItem(nextProps.data).then(() => {
      this.setState(nextProps.data);
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.data !== nextState.data;
  }

  render() {
    if (this.props.children) {
      let child = React.Children.only(this.props.children);
      return React.cloneElement(child, {
        [this.props.propName || 'data']: this.state.data
      });
    }
    return <View></View>;
  }
}