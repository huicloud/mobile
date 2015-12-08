import React, {Component} from 'react-native';
import './config.js';
import './util/log.js';
import PageNavigator from './PageNavigator.js';

export default class App extends Component {
  render() {
    return (
      <PageNavigator></PageNavigator>
    )
  }
}