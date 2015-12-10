import React, {Component} from 'react-native';
import './config.js';
import './util/log.js';
import PageNavigator from './PageNavigator.js';
import AppStateModule from 'AppStateModule';
import {connection} from './components/dzhyun/DZHYunConnection.js';

// 监听应用状态变化,当应用切换到后台时,暂停请求推送,切换激活状态时再将请求订阅恢复
AppStateModule.addEventListener('change', function(currentState) {
  if (currentState === 'background') {
    connection.pause();
  } else {
    connection.resume();
  }
});

export default class App extends Component {
  render() {
    return (
      <PageNavigator></PageNavigator>
    )
  }
}