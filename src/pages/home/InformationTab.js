import React, {Platform} from 'react-native';
import BaseTab from './BaseTab.js';

import * as baseStyle from '../../components/baseStyle.js';
import {DZHYunNewsList, DZHYunAnnouncementList} from '../../components/NewsList.js';
import TabBar, {TabBarItem} from '../../components/TabBar.js';

import {PDFModule} from 'NativeModules';

export default class InformationTab extends BaseTab {

  title = '资讯';
  constructor(props) {
    super(props);
  }

  openNewsPage(title, news) {

    // 判断是android版时直接下载pdf后打开
    Platform.OS === 'android' && news.context.substr(-4).toLowerCase() === '.pdf' ? PDFModule.open(news.context) :this.props.navigator.push({component: 'NewsDetailPage', news, title})
  }

  renderContent() {
    return (
      <TabBar style={{container: {backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR}}}>
        <TabBarItem title="新闻"><DZHYunNewsList params={{start: -20}} onPressItem={this.openNewsPage.bind(this, '新闻')}></DZHYunNewsList></TabBarItem>
        <TabBarItem title="公告"><DZHYunAnnouncementList params={{start: -20}} onPressItem={this.openNewsPage.bind(this, '公告')}></DZHYunAnnouncementList></TabBarItem>
      </TabBar>
    );
  }
}