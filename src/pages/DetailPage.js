/**
 * Created by jiagang on 15/10/29.
 */
import React, {View, Text, Image, ScrollView} from 'react-native';
import Button from 'react-native-button';

import BasePage from './BasePage.js';
import * as baseStyle from '../components/baseStyle.js';
import Storage from '../components/Storage.js';
import PageHeader from '../components/PageHeader.js';
import {DZHYunDynaComponent} from '../components/DynaComponent.js';
import {DZHYunBuySellComponent} from '../components/BuySellComponent.js'
import {DZHYunNewsList, DZHYunAnnouncementList} from '../components/NewsList.js';
import TabBar, {TabBarItem} from '../components/TabBar.js';
import {DZHMinChart} from '../components/MinChart.js';
import {DZHKlineChart} from '../components/KlineChart.js';

export default class DetailPage extends BasePage {

  constructor(props) {
    super(props);

    this.state = {
      obj: null
    }
  }

  componentDidMount() {
    let obj = this.props.Obj,
      storageKey = 'history.stocks';
    if (obj) {
      Storage.getItem(storageKey).then((data) => {
        data = data || [];
        let itemIndex = data.findIndex((eachData) => eachData.Obj === obj),
          item = (itemIndex >= 0 ? data[itemIndex] : {});
        itemIndex >= 0 && data.splice(itemIndex, 1);
        data.unshift(Object.assign(item, { Obj: obj, ZhongWenJianCheng: this.props.ZhongWenJianCheng }));

        Storage.setItem(storageKey, data);
      })
    }
    this.setState({obj: obj});
  }

  componentWillUnmount() {
    //console.log('unmount', this.props.Obj);
  }

  _renderTitle() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{color: baseStyle.WHITE, fontSize: 16}}>{this.props.ZhongWenJianCheng}</Text>
          <Text style={{color: baseStyle.WHITE, fontSize: 12}}>{this.props.Obj}</Text>
        </View>
      </View>
    );
  }

  openNewsPage(news, event) {
    this.props.navigator.push({component: 'NewsDetailPage', news})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <PageHeader
          onBack={() => this.props.navigator.popToTop()}
          title={this._renderTitle()}
          rightComponent={
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Button onPress={() => this.props.navigator.push({component: 'SearchPage'})}>
              <Image source={{ uri: 'main_page_search', isStatic: true }} style={{width: 30, height: 30, margin: 5}}></Image>
            </Button>
          </View>
        }></PageHeader>
        <ScrollView style={{backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR, flex: 1}} scrollEventThrottle={16} onScroll={
        (event) => console.log(event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height === event.nativeEvent.contentSize.height)
        }>
          <View style={{flex: 1}}>
            <DZHYunDynaComponent params={this.state.obj && {obj: this.state.obj}} dynaData={this.state}></DZHYunDynaComponent>
            <TabBar>
              <TabBarItem title="分时">
                <View style={{height: 200, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{flex: 1}}>
                    <DZHMinChart params={this.state.obj && {obj: this.state.obj}}></DZHMinChart>
                  </View>
                  <View style={{width: 100}}>
                    <DZHYunBuySellComponent params={this.state.obj && {obj: this.state.obj}}></DZHYunBuySellComponent>
                  </View>
                </View>
              </TabBarItem>
              <TabBarItem title="日K">
                <View style={{height: 200}}>
                  <DZHKlineChart params={this.state.obj && {obj: this.state.obj}} name={this.props.ZhongWenJianCheng}></DZHKlineChart>
                </View>
              </TabBarItem>
              <TabBarItem title="周K">
                <View style={{height: 200}}>
                  <DZHKlineChart params={this.state.obj && {obj: this.state.obj, period: 'week'}} name={this.props.ZhongWenJianCheng}></DZHKlineChart>
                </View>
              </TabBarItem>
              <TabBarItem title="月K">
                <View style={{height: 200}}>
                  <DZHKlineChart params={this.state.obj && {obj: this.state.obj, period: 'month'}} name={this.props.ZhongWenJianCheng}></DZHKlineChart>
                </View>
              </TabBarItem>
            </TabBar>
          </View>
          <TabBar style={{container: {marginTop: 10}}}>
            <TabBarItem title="新闻"><DZHYunNewsList params={this.state.obj && {obj: this.state.obj}} onPressItem={this.openNewsPage.bind(this)}></DZHYunNewsList></TabBarItem>
            <TabBarItem title="公告"><DZHYunAnnouncementList params={this.state.obj && {obj: this.state.obj}} onPressItem={this.openNewsPage.bind(this)}></DZHYunAnnouncementList></TabBarItem>
          </TabBar>
        </ScrollView>
      </View>
    );
  }
}