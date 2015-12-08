/**
 * Created by jiagang on 15/10/29.
 */
import React, {View, Text, Image, ScrollView, TouchableHighlight, StyleSheet, Platform} from 'react-native';

import BasePage from './BasePage.js';
import Button from '../components/Button.js';
import * as baseStyle from '../components/baseStyle.js';
import Storage from '../components/Storage.js';
import PageHeader from '../components/PageHeader.js';
import {DZHYunDynaComponent} from '../components/DynaComponent.js';
import {DZHYunBuySellComponent} from '../components/BuySellComponent.js'
import {DZHYunNewsList, DZHYunAnnouncementList} from '../components/NewsList.js';
import TabBar, {TabBarItem, StaticTabBarItem} from '../components/TabBar.js';
import {DZHMinChart} from '../components/MinChart.js';
import {DZHKlineChart} from '../components/KlineChart.js';

import StockStorageManager from '../modules/StockStorageManager.js';
import {dealModule} from '../modules/DealModule.js';
import DzhWebView from 'DzhWebView';
import {PDFModule} from 'NativeModules';

let tabStyle = StyleSheet.create({
  container: {margin: 4},
  tabBar: {borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: '#3E6AC5', borderColor: '#3E6AC5', marginBottom: 4},
  tabBarItem: {borderRightWidth: 1, borderRightColor: '#3E6AC5', borderBottomWidth: 0},
  tabBarItemLabel: {fontSize: 14},
  tabBarItemSelected: {backgroundColor: '#3E6AC5'},
  tabBarItemLabelSelected: {color: baseStyle.WHITE}
});
export default class DetailPage extends BasePage {

  constructor(props) {
    super(props);

    this.state = {
      obj: null,
      type: null,
      isPersonalStock: null,
      f10Url: ''
    }
  }

  pageWillActive() {
    super.pageWillActive();

    // 切换前加载动态行情数据
    this.preLoad = true;

    let obj = this.props.Obj;
    this.setState({obj, f10Url: this.makeF10Url(obj)});

    // 判断是否自选股
    StockStorageManager.isPersonalStocks(obj).then(result => {
      this.setState({isPersonalStock: result});
    });
  }

  pageDidActive() {
    super.pageDidActive();

    let obj = this.props.Obj;

    // 记录股票查看历史
    StockStorageManager.view({Obj: obj, ZhongWenJianCheng: this.props.ZhongWenJianCheng});

    // 切换后加载分时图和新闻数据
    this.postLoad = true;

    this.forceUpdate();
  }

  //componentDidMount() {
  //  super.componentDidMount();
  //  let obj = this.props.Obj;
  //  StockStorageManager.view({Obj: obj, ZhongWenJianCheng: this.props.ZhongWenJianCheng});
  //
  //  this.setState({obj: obj});
  //
  //  // 判断是否自选股
  //  StockStorageManager.isPersonalStocks(obj).then(result => {
  //    this.setState({isPersonalStock: result});
  //  });
  //}

  _renderTitle() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: baseStyle.WHITE, fontSize: 16}}>{this.props.ZhongWenJianCheng}</Text>
          <Text style={{color: baseStyle.WHITE, fontSize: 12}}>{this.props.Obj}</Text>
        </View>
      </View>
    );
  }

  openNewsPage(title, news) {

    // 判断是android版时直接下载pdf后打开
    Platform.OS === 'android' && news.context.substr(-4).toLowerCase() === '.pdf' ? PDFModule.open(news.context) :this.props.navigator.push({component: 'NewsDetailPage', news, title})
  }

  buy() {
    dealModule.buy(this.state.obj, this._dyna.state.data.ZuiXinJia, 1000);
  }

  sell() {
    dealModule.sell(this.state.obj, this._dyna.state.data.ZuiXinJia, 1000);
  }

  addPersonalStock() {
    StockStorageManager.addPersonalStock({Obj: this.state.obj});
    this.setState({isPersonalStock: true});

    console.debug('添加自选股', this.state.obj);
  }

  removePersonalStock() {
    StockStorageManager.removePersonalStock({Obj: this.state.obj});
    this.setState({isPersonalStock: false});

    console.debug('移出自选股', this.state.obj);
  }

  makeF10Url(obj) {
    var market = obj.substr(0, 2);
    var code = obj.substr(2,6);
    var url = "http://mnews.gw.com.cn/wap/data/ipad/stock/" +
      market + "/" +  // market
      code.substr(4,2) + "/" +  // hash
      code + "/" +  // code
      "f10/f10.html?themeStyleVs=1";
    //var url = "http://softf9.eastmoney.com/v2/?fc=" + obj.substr(2,6);
    //var dc = market == "SH" ? "01" : "00";
    //url += dc;
    return url;
  }

  render() {

    let personalButton;
    if (this.state.isPersonalStock !== null) {

      // 已经是自选股了，则为移出按钮，否则是添加按钮
      personalButton = this.state.isPersonalStock ? (
        <Button onPress={() => this.removePersonalStock()}>
          <Image source={{ uri: 'icon_del', isStatic: true }} style={{width: 32, height: 32, margin: 5}}></Image>
        </Button>
      ) : (
        <Button onPress={() => this.addPersonalStock()}>
          <Image source={{ uri: 'icon_addstock', isStatic: true }} style={{width: 32, height: 32, margin: 5}}></Image>
        </Button>
      );
    }
    return (
      <View style={{flex: 1}}>
        <PageHeader
          onBack={this.props.back || (() => this.props.navigator.popToTop())}
          title={this._renderTitle()}
          rightComponent={
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            {personalButton}
            <Button onPress={() => this.props.navigator.push({component: 'SearchPage'})}>
              <Image source={{ uri: 'main_page_search', isStatic: true }} style={{width: 30, height: 30, margin: 5}}></Image>
            </Button>
          </View>
        }></PageHeader>
        <ScrollView style={{backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR, flex: 1}} scrollEventThrottle={16} onScroll={
        (event) => console.log(event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height === event.nativeEvent.contentSize.height)
        }>
          <View style={{flex: 1}}>
            {/*<TouchableHighlight
              style={{flex: 1}}
              onPress={() => this.props.navigator.push({component: 'StockInformationPage'})}
              underlayColor={baseStyle.HIGH_LIGHT_COLOR}>*/}
              <View>
                <DZHYunDynaComponent onData={(data) => {
                  if (this.state.type !== data.LeiXing) {
                    this.setState({type: data.LeiXing})
                  }
                }}ref={(ref) => this._dyna = ref} params={this.preLoad && this.state.obj && {obj: this.state.obj}} dynaData={this.state}></DZHYunDynaComponent>
                {/*<Image source={{ uri: 'account_right', isStatic: true }} style={{position: 'absolute', top: 35, right: 15, width: 10, height: 15}}></Image>*/}
              </View>
            {/*</TouchableHighlight>*/}
            <TabBar style={tabStyle}>
              <TabBarItem title="分时">
                <View style={{height: 200, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{flex: 1}}>
                    <DZHMinChart params={this.postLoad && this.state.obj && {obj: this.state.obj}}></DZHMinChart>
                  </View>
                  {this.state.type === 1 && (
                    <View style={{width: 100}}>
                      <DZHYunBuySellComponent params={this.postLoad && this.state.obj && {obj: this.state.obj}}></DZHYunBuySellComponent>
                    </View>
                  )}
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
                  <DZHKlineChart params={this._isActived && this.state.obj && {obj: this.state.obj, period: 'month'}} name={this.props.ZhongWenJianCheng}></DZHKlineChart>
                </View>
              </TabBarItem>
            </TabBar>
          </View>
          {this.state.type === 1 && (
            <TabBar style={tabStyle}>
              <StaticTabBarItem title="新闻"><DZHYunNewsList params={this.postLoad && this.state.obj && {obj: this.state.obj}} onPressItem={this.openNewsPage.bind(this, '新闻')}></DZHYunNewsList></StaticTabBarItem>
              <StaticTabBarItem title="公告"><DZHYunAnnouncementList params={this.state.obj && {obj: this.state.obj}} onPressItem={this.openNewsPage.bind(this, '公告')}></DZHYunAnnouncementList></StaticTabBarItem>
              <StaticTabBarItem title="F10">
                <View style={{flex:1, height:500}}>
                  <DzhWebView url={this.state.f10Url} style={{flex: 1}}></DzhWebView>
                </View>
              </StaticTabBarItem>
            </TabBar>
          )}
        </ScrollView>
        {this.state.type === 1 && (
          <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-between', height: 50, backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR, borderTopWidth: 1, borderTopColor: baseStyle.DEFAULT_BORDER_COLOR}}>
            <Button onPress={this.buy.bind(this)} containerStyle={{backgroundColor: '#1CA1DA', justifyContent: 'center'}} style={{color: '#fff'}}>买入</Button>
            <Button onPress={this.sell.bind(this)} containerStyle={{backgroundColor: '#EFA62C', justifyContent: 'center'}} style={{color: '#fff'}}>卖出</Button>
          </View>
        )}
      </View>
    );
  }
}