import React, {View, Text, ScrollView, ListView, Image, TouchableHighlight, Platform, Component} from 'react-native';
import BaseTab from './BaseTab.js';
import StaticImage from '../../components/StaticImage.js';
import {HeaderTabBar} from '../../components/PageHeader.js';
import TabBar, {TabBarItem, StaticTabBarItem} from '../../components/TabBar.js';
import * as baseStyle from '../../components/baseStyle.js'
import DZHYunComponent from '../../components/dzhyun/DZHYunComponent.js';
import {connection} from '../../components/dzhyun/DZHYunConnection';
import DateFormatText from '../../components/DateFormatText.js';
import StockStorageManager from '../../modules/StockStorageManager';
import StockFormatText from '../../components/StockFormatText.js';

import newsImage1 from '../../images/news1.png';
import newsImage2 from '../../images/news2.png';
import newsImage3 from '../../images/news3.png';
import newsImage4 from '../../images/news4.png';
import newsImage5 from '../../images/news5.png';

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
        <TabBar tabBarHidden={true} style={{container: {backgroundColor: '#EAEDF3'}}} ref={(ref) => ref && !this.state.tabBar && (this.setState({tabBar: ref}))}>
          <StaticTabBarItem>
            <NewsList params={{}} navigator={this.props.navigator}></NewsList>
          </StaticTabBarItem>
          <TabBarItem>
            <PersonStockNewsList navigator={this.props.navigator}></PersonStockNewsList>
          </TabBarItem>
        </TabBar>
      </View>
    );
  }
}

class NewsList extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: "/news/center"
  };

  defaultParams = {
    sub: 1,
    start: -20,
    sort: 'DESC'
  };

  constructor(props) {
    super(props);

    this._data = [];
    this._total = null;

    this.state = {
      message: '加载中...'
    }
  }

  adapt(data, top = true) {

    let result = data && data[0] && data[0].data;
    this._total = data && data[0].TotalCount;

    // 订阅到的数据追加到列表数据前面
    if (result) {
      result && this.addData(result, top);
    } else {
      this.setState({message: '没有更多数据'});
    }
    return false;
  }

  addData(data, top) {

    top ? this._data.unshift(...data) : this._data.push(...data);

    let dataSource = this.state.dataSource || new ListView.DataSource(this);
    this.setState({dataSource: dataSource.cloneWithRows(this._data)});
  }

  _getImageSource(news, rowNum) {
    switch(rowNum % 5) {
      case 0: return newsImage1;
      case 1: return newsImage2;
      case 2: return newsImage3;
      case 3: return newsImage4;
      case 4: return newsImage5;
    }
  }

  openNewsPage(news) {

    // 判断是android版时直接下载pdf后打开
    Platform.OS === 'android' && news.context.substr(-4).toLowerCase() === '.pdf' ? PDFModule.open(news.context) :this.props.navigator.push({component: 'NewsDetailPage', news, title: news.title})
  }

  _renderRow(rowData, sectionID , rowID) {
    return (
      <TouchableHighlight
        onPress={this.openNewsPage.bind(this, rowData)}
        underlayColor={baseStyle.HIGH_LIGHT_COLOR}
        style={{borderBottomColor: baseStyle.LIGHT_GRAY, borderBottomWidth: 1}}>
        <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, flexDirection: 'row', alignItems: 'stretch'}}>
          <StaticImage imageSource={this._getImageSource(rowData, rowID)} style={{flex: 1}}></StaticImage>
          <View style={{flex: 3, flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between'}}>
            <Text style={{flex: 1, fontSize: 20, marginBottom: 10, color: baseStyle.DEFAULT_TEXT_COLOR}}>{rowData.title}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 12, color: baseStyle.GRAY}}>{rowData.source}</Text>
              <DateFormatText style={{fontSize: 12, color: baseStyle.GRAY}} format="MM-DD HH:mm">{rowData.date}</DateFormatText>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  _hasMore() {
    return !this._total || this._total > this._data.length;
  }

  _onEndReached() {

    // 如果有更多数据,则再查询更多数据
    if (this._hasMore()) {
      this._loadMoreData();
    }
  }

  _loadMoreData() {
    let start = Math.max(this._total - this._data.length - 20, 0),
      count = Math.min(this._total - this._data.length, 20);
    connection.request(this.props.serviceUrl, {start, count, sort: 'DESC'}, (data) => this.adapt(data, false));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    if (this.state.dataSource) {
      return (
        <ListView
          style={{flex: 1}}
          initialListSize={20}
          pageSize={5}
          scrollRenderAheadDistance={20}
          dataSource={this.state.dataSource}
          onEndReached={this._onEndReached.bind(this)}
          renderRow={this._renderRow.bind(this)}>
        </ListView>
      );
    }
    return (
      <Text style={{padding: 20, color: baseStyle.GRAY, textAlign: 'center'}}>{this.state.message}</Text>
    );
  }
}

// 自选股票的新闻和公告列表
class PersonStockNewsList extends Component {

  constructor(props) {
    super(props);

    this._data = null;

    this.state = {
      message: '加载中...'
    }
  }

  _requestData(serviceUrl, objs) {
    return new Promise((resolve, reject) => {
      connection.request(serviceUrl, {sub: 1, start: -10, obj: objs, sort: 'DESC'}, (data) => {
        if (data && !(data instanceof Error)) {

          if (this._data) {

            // 添加数据
            this.addData(data, true);
          } else {
            let result = [];
            data && data.forEach((eachStock) => {
              let data = eachStock.Data, obj = eachStock.Obj;
              data.forEach((eachNews) => {
                eachNews['Obj'] = obj;
                result.push(eachNews);
              })
            });
            resolve(result);
          }
        } else {
          resolve();
        }
      })
    })
  }

  componentDidMount() {

    // 订阅自选股和持仓股的新闻和公告
    Promise.all([StockStorageManager.getPersonalStocks(), StockStorageManager.getKeepStocks()]).then(([personalStocks, keepStocks]) => {

      // TODO 由于请求股指时会错误,因此暂时将上证和深证和创业板编号排除
      let excepts = ['SH000001', 'SZ399001', 'SZ399006'];
      let stocks, stockMap = {};
      let objSet = new Set((stocks = [].concat(personalStocks || [], keepStocks || [])).map((stock) => (stockMap[stock.Obj] = stock, stock.Obj)).filter((obj) => excepts.indexOf(obj) < 0));

      this._stockMap = stockMap;
      if (objSet.size > 0) {
        let objs = Array.from(objSet);

        Promise.all([this._requestData('/news/stock', objs), this._requestData('/announcemt/stock', objs)]).then(([news, announcement]) => {

          // 新闻和公告合并按照时间排序
          let data = [].concat(news || [], announcement || []).sort((d1, d2) => d2.date - d1.date);

          this.addData(data);
        });
      } else {
        this.setState({message: '没有自选股新闻和公告'});
      }
    });
  }

  addData(data, top) {

    this._data = this._data || [];
    top ? this._data.unshift(...data) : this._data.push(...data);

    let dataSource = this.state.dataSource || new ListView.DataSource(this);
    this.setState({dataSource: dataSource.cloneWithRows(this._data)});
  }

  openNewsPage(news) {

    // 判断是android版时直接下载pdf后打开
    Platform.OS === 'android' && news.context.substr(-4).toLowerCase() === '.pdf' ? PDFModule.open(news.context) :this.props.navigator.push({component: 'NewsDetailPage', news, title: news.title})
  }

  _renderRow(rowData, sectionID , rowID) {
    let stock = this._stockMap[rowData.Obj];
    let up = stock.ZhangFu, color = up > 0 ? baseStyle.UP_COLOR : up < 0 ? baseStyle.DOWN_COLOR : baseStyle.GRAY;
    return (
      <TouchableHighlight
        onPress={this.openNewsPage.bind(this, rowData)}
        underlayColor={baseStyle.HIGH_LIGHT_COLOR}
        style={{borderBottomColor: baseStyle.LIGHT_GRAY, borderBottomWidth: 1}}>
        <View>
          <View style={{padding: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={{color: baseStyle.GRAY}}>{stock.ZhongWenJianCheng}</Text>
            <Text style={{color, marginLeft: 20}}>{stock.ZuiXinJia}</Text>
            <StockFormatText unit='%' sign={true} style={{color, marginLeft: 20}}>{stock.ZuiXinJia / 100}</StockFormatText>
          </View>
          <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, flexDirection: 'row', alignItems: 'stretch'}}>
            <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text style={{flex: 1, fontSize: 20, marginBottom: 10, color: baseStyle.DEFAULT_TEXT_COLOR}}>{rowData.title}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 12, color: baseStyle.GRAY}}>{rowData.source}</Text>
                <DateFormatText style={{fontSize: 12, color: baseStyle.GRAY}} format="MM-DD HH:mm">{rowData.date}</DateFormatText>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  render() {
    if (this.state.dataSource) {
      return (
        <ListView
          style={{flex: 1}}
          initialListSize={20}
          pageSize={5}
          scrollRenderAheadDistance={20}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}>
        </ListView>
      );
    }
    return (
      <Text style={{padding: 20, color: baseStyle.GRAY, textAlign: 'center'}}>{this.state.message}</Text>
    );
  }
}