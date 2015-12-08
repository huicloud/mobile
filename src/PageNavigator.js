import React, {Navigator, Platform, Component, BackAndroid, ToastAndroid} from 'react-native';

import BasePage from './pages/BasePage.js';
import HomePage from './pages/HomePage.js';
import DealPage from './pages/DealPage.js';
import SearchPage from './pages/SearchPage.js';
import StockQuotationPage from './pages/StockQuotationPage.js';
import NewsDetailPage from './pages/NewsDetailPage.js';
import StockInformationPage from './pages/StockInformationPage.js';
import BlockDetailPage from './pages/BlockDetailPage.js'

import * as baseStyle from './components/baseStyle.js';

export default class PageNavigator extends Component {

  _componentMap = {
    HomePage,
    DealPage,
    SearchPage,
    StockQuotationPage,
    StockInformationPage,
    NewsDetailPage,
    BlockDetailPage
  };

  _renderScene(route, navigator) {
    if (route.component) {
      let component = route.component;
      if (typeof component === 'string') {
        component = this._componentMap[component];
      }
      if (component.prototype instanceof BasePage) {
        return route._currentElement = React.createElement(component, Object.assign({}, route, {navigator}));
      } else if (React.isValidElement(component)) {
        return route._currentElement = React.cloneElement(component, Object.assign({}, route, {navigator}));
      }
    }
    console.warn('无法跳转到对应的页面', route);
  }

  componentDidMount() {

    // 注册android后退按钮事件监听
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {

        // 判断是否在根route
        if (this._navigator.getCurrentRoutes().length <= 1) {

          // 判断是否是第二次点击
          if (this._clickOnce) {
            BackAndroid.exitApp();
          } else {
            ToastAndroid.show('再按一次回退将退出应用', 1000);
            this._clickOnce = true;

            // 1秒后还原为false
            setTimeout(() => {
              this._clickOnce = false;
            }, 2000);
            return true;
          }
        } else {
          this._navigator.pop();
          return true;
        }
      });
    }
  }

  render() {
    return (
      <Navigator
        ref={(navigator) => this._navigator = navigator}
        initialRoute={{component: HomePage}}
        renderScene={this._renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          let anmi = Navigator.SceneConfigs.HorizontalSwipeJump;
          if (Platform.OS !== 'ios') {
            anmi.springFriction = 0;
            anmi.gestures = {};
            anmi.defaultTransitionVelocity = 10;
          }
          return anmi;
        }}>
      </Navigator>
    );
  }
}