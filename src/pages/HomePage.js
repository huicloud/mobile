import React, {Text, Image, Platform} from 'react-native';

import TabNavigator, {Item as TabNavigatorItem} from 'react-native-tab-navigator';

import BasePage from './BasePage.js';
import PersonalStocksTabs from './home/PersonalStocksTab.js';
import InformationTab from './home/InformationTab.js';
import * as baseStyle from '../components/baseStyle.js';
import HomeTab from './home/HomeTab.js';
import QuotationTab from './home/QuotationTab.js';
import TradeTab from './home/TradeTab.js';
import NewsTab from './home/NewsTab.js';
import HallTab from './home/HallTab.js';

export default class HomePage extends BasePage {

  // HomePage应该是唯一的，只会存在一个对象，因此考虑可以讲state设置在class的prototype上
  state = {
    selectedTab: 'home'
  };

  _renderTabNavigatorItem(name, title, subTitle, tabContent) {
    return (
      <TabNavigatorItem
        selected={this.state.selectedTab === name}
        title={subTitle}
        titleStyle={[{fontSize: 10, color: baseStyle.PAGE_TAB_TEXT_COLOR, marginBottom: 6}, Platform.OS === 'android' && {marginTop: -2}]}
        selectedTitleStyle={{color: baseStyle.PAGE_TAB_HIGHLIGHT_TEXT_COLOR}}
        renderIcon={() => <Text style={{fontSize: 18, color: baseStyle.PAGE_TAB_TEXT_COLOR}}>{title}</Text>}
        renderSelectedIcon={() => <Text style={{fontSize: 18, color: baseStyle.PAGE_TAB_HIGHLIGHT_TEXT_COLOR}}>{title}</Text>}
        onPress={() => this.setState({ selectedTab: name })}>
        {tabContent}
      </TabNavigatorItem>
    )
  }

  render() {
    return (
      <TabNavigator tabBarStyle={{backgroundColor: baseStyle.PAGE_TAB_BACKGROUND_COLOR}} sceneStyle={{backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR}}>
        {this._renderTabNavigatorItem('home', '首页', 'Home', <HomeTab navigator={this.props.navigator}></HomeTab>)}
        {this._renderTabNavigatorItem('quotation', '行情', 'Markets', <QuotationTab navigator={this.props.navigator}></QuotationTab>)}
        {this._renderTabNavigatorItem('trade', '交易', 'Trade', <TradeTab navigator={this.props.navigator}></TradeTab>)}
        {this._renderTabNavigatorItem('news', '资讯', 'News', <NewsTab navigator={this.props.navigator}></NewsTab>)}
        {this._renderTabNavigatorItem('hall', '掌厅', 'Hall', <HallTab navigator={this.props.navigator}></HallTab>)}
      </TabNavigator>
    );
  }
}
