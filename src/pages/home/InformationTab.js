import React from 'react-native';
import HomeTab from './HomeTab.js';

import * as baseStyle from '../../components/baseStyle.js';
import {DZHYunNewsList, DZHYunAnnouncementList} from '../../components/NewsList.js';
import TabBar, {TabBarItem} from '../../components/TabBar.js';

export default class InformationTab extends HomeTab {

  title = '资讯';
  constructor(props) {
    super(props);
  }

  openNewsPage(news, event) {
    this.props.navigator.push({component: 'NewsDetailPage', news})
  }

  renderContent() {
    return (
      <TabBar style={{container: {backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR}}}>
        <TabBarItem title="新闻"><DZHYunNewsList params={{start: -20}} onPressItem={this.openNewsPage.bind(this)}></DZHYunNewsList></TabBarItem>
        <TabBarItem title="公告"><DZHYunAnnouncementList params={{start: -20}} onPressItem={this.openNewsPage.bind(this)}></DZHYunAnnouncementList></TabBarItem>
      </TabBar>
    );
  }
}