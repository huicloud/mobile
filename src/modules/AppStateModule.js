/**
 * 模拟AppStateIOS模块，实现addEventListener和removeEventListener方法，监听应用状态change事件
 * Created by jiagang on 15/12/7.
 * @providesModule AppStateModule
 */
import React, {Platform, AppStateIOS} from 'react-native';
import invariant from 'invariant';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

let AppStateModule;
if (Platform.OS === 'ios') {
  AppStateModule = AppStateIOS;
} else {
  const STATE_ACTIVE = 'active';
  const STATE_BACKGROUND = 'background';

  let _currentState = STATE_ACTIVE,
    _changeState = (state) => {
      _currentState = state;
      RCTDeviceEventEmitter.emit('stateChange', _currentState);
    };
  RCTDeviceEventEmitter.addListener('hostResume', () => _changeState(STATE_ACTIVE));

  RCTDeviceEventEmitter.addListener('hostPause', () => _changeState(STATE_BACKGROUND));

  AppStateModule = {
    addEventListener(type, listener) {
      invariant(type === 'change', '不支持监听change以外其它类型的事件');
      RCTDeviceEventEmitter.addListener('stateChange', listener);
    },
    removeEventListener(type, listener) {
      invariant(type === 'change', '不支持监听change以外其它类型的事件');
      RCTDeviceEventEmitter.removeListener('stateChange', listener);
    },
    get currentState() {
      return _currentState;
    }
  }
}
export default AppStateModule;