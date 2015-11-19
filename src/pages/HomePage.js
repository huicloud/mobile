import React, {Text, Image} from 'react-native';

import TabNavigator, {Item as TabNavigatorItem} from 'react-native-tab-navigator';

import BasePage from './BasePage.js';
import PersonalStocksTabs from './home/PersonalStocksTab.js';
import InformationTab from './home/InformationTab.js';
import * as baseStyle from '../components/baseStyle.js';

export default class HomePage extends BasePage {

  // HomePage应该是唯一的，只会存在一个对象，因此考虑可以讲state设置在class的prototype上
  state = {
    selectedTab: 'personal'
  };

  _renderTabNavigatorItem(name, title, iconName, tabContent) {
    return (
      <TabNavigatorItem
        selected={this.state.selectedTab === name}
        title={title}
        titleStyle={{fontSize: 12}}
        selectedTitleStyle={{color: '#059BDE'}}
        renderSelectedIcon={() => <Image source={{ uri: iconName + '_pressed', isStatic: true }} style={{width: 24, height: 24}}></Image>}
        renderIcon={() => <Image source={{ uri: iconName + '_normal', isStatic: true }} style={{width: 24, height: 24}}></Image>}
        onPress={() => this.setState({ selectedTab: name })}>
        {tabContent}
      </TabNavigatorItem>
    )
  }

  render() {
    return (
      <TabNavigator tabBarStyle={{backgroundColor: baseStyle.DARK_GRAY}} sceneStyle={{backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR}}>
        {this._renderTabNavigatorItem('personal', '自选', 'icon_market_zixuan', <PersonalStocksTabs navigator={this.props.navigator}></PersonalStocksTabs>)}
        {this._renderTabNavigatorItem('news', '资讯', 'icon_news', <InformationTab navigator={this.props.navigator}></InformationTab>)}
        {this._renderTabNavigatorItem('market', '市场', 'icon_market', <Text style={{color: baseStyle.BLACK}}>市场</Text>)}
        {this._renderTabNavigatorItem('fund', '基金', 'icon_fund', <Text style={{color: baseStyle.BLACK}}>基金</Text>)}
        {this._renderTabNavigatorItem('user', '我', 'icon_wo', <Text style={{color: baseStyle.BLACK}}>我</Text>)}
      </TabNavigator>
    );
  }
}
