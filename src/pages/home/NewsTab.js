import React, {View, ScrollView} from 'react-native';
import BaseTab from './BaseTab.js';
import StaticImage from '../../components/StaticImage.js';
import {HeaderTabBar} from '../../components/PageHeader.js';
import TabBar, {TabBarItem, StaticTabBarItem} from '../../components/TabBar.js';

export default class NewsTab extends BaseTab {
  constructor(props) {
    super(props);

    this.state = {};
  }
  title = '资讯';
  renderHeaderLeftBar() {

    // 显示tab
    return (
      <HeaderTabBar
        style={{marginRight: 40}}
        tabItems={['要闻', '自选', '专题', '收藏', '研报', '盘面']}
        refTabBar={this.state.tabBar}>
      </HeaderTabBar>
    );
  }
  renderContent() {
    return (
      <View style={{flex: 1}}>
        <TabBar tabBarHidden={true} style={{container: {backgroundColor: '#EEF1F6'}}} ref={(ref) => ref && !this.state.tabBar && (this.setState({tabBar: ref}))}>
          <StaticTabBarItem>
            <ScrollView style={{flex: 1}}>
              <StaticImage imageSource={require('../../images/news.png')}></StaticImage>
            </ScrollView>
          </StaticTabBarItem>
          <StaticTabBarItem>
            <ScrollView style={{flex: 1}}>
              <StaticImage imageSource={require('../../images/personal-news.png')}></StaticImage>
            </ScrollView>
          </StaticTabBarItem>
        </TabBar>
      </View>
    );
  }
}