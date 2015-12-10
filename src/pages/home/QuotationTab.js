import React, {ScrollView, View, Text, Component, TouchableHighlight, StyleSheet, ListView, Image} from 'react-native';
import BaseTab from './BaseTab.js';

import TabBar, {TabBarItem, StaticTabBarItem, ScrollableTabBar} from '../../components/TabBar.js';
import Button from '../../components/Button.js';
import StockList from '../../components/StockList.js';
import StockListItem from '../../components/StockListItem.js';
import StockFormatText from '../../components/StockFormatText.js';
import Storage from '../../components/Storage.js';
import DataSubscribe from '../../components/dzhyun/DataSubscribe.js';
import * as baseStyle from '../../components/baseStyle.js';
import DZHYunComponent from '../../components/dzhyun/DZHYunComponent.js';
import StockStorageManager from '../../modules/StockStorageManager.js';
import {dealModule} from '../../modules/DealModule.js';
import {connection} from '../../components/dzhyun/DZHYunConnection';

import StaticImage from '../../components/StaticImage.js';
import {HeaderTabBar} from '../../components/PageHeader.js';

export default class QuotationTab extends BaseTab {
  constructor(props) {
    super(props);

    this.state = {};
  }
  title = '行情';
  renderHeaderLeftBar() {

    // 显示tab
    return (
      <HeaderTabBar
        style={{marginRight: 40}}
        tabItems={['自选', '沪深', '板块', '沪港通', '全球', '全部']}
        refTabBar={() => this.tabBar}>
      </HeaderTabBar>
    );
  }

  renderContent() {
    return (
      <View style={{flex: 1}}>
        <TabBar tabBarHidden={true} style={{container: {backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR}}} ref={(ref) => ref && !this.tabBar && (this.tabBar = ref)}>
          <StaticTabBarItem title="自选">
            <ScrollView>
              <PersonalStocksTab navigator={this.props.navigator}></PersonalStocksTab>
            </ScrollView>
          </StaticTabBarItem>
          <StaticTabBarItem title="沪深"><SHSZMarketTab navigator={this.props.navigator}></SHSZMarketTab></StaticTabBarItem>
          <TabBarItem title="板块"><BlockTab navigator={this.props.navigator}></BlockTab></TabBarItem>
          <StaticTabBarItem title="沪港通"><ScrollView><StaticImage imageSource={require('../../images/global-quotation.png')}></StaticImage></ScrollView></StaticTabBarItem>
          <StaticTabBarItem title="全球"><ScrollView><StaticImage imageSource={require('../../images/global-quotation.png')}></StaticImage></ScrollView></StaticTabBarItem>
          <StaticTabBarItem title="全部"><ScrollView><StaticImage imageSource={require('../../images/whole-quotation.png')}></StaticImage></ScrollView></StaticTabBarItem>
        </TabBar>
      </View>
    );

    //return <View style={{height: 400}}><ScrollableTabBar style={{height: 400}} onChangeTab={(event) => console.log(event)}>
    //  <View tabLabel="test1" style={{width: 414}}><Text>test1</Text></View>
    //  <View tabLabel="test2" style={{width: 414}}><Text>test2</Text></View>
    //  <View tabLabel="test3" style={{width: 414}}><Text>test3</Text></View>
    //</ScrollableTabBar></View>
  }
}


class PersonalStocksTab extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: "/quote/dyna"
  };

  defaultParams = {
    sub: 1,
    field: ['ZuiXinJia', 'ZhangFu', 'ZhangDie']
  };

  constructor(props) {
    super(props);

    // 避免在使用时重复定义
    this._onItemPress = this._onItemPress.bind(this);
    this._renderKeepStockRow = this._renderKeepStockRow.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
  }

  adapt(data) {

    // 订阅查询到的股票数据，转换后更新缓存
    let stocks = data.map(eachData => {
      let stock = eachData.Data || {};
      stock.Obj = eachData.Obj;
      return stock;
    });

    StockStorageManager.updateStocks(stocks);
    return false;
  }

  _onUpdate() {

    // 从缓存中取得股票列表信息
    StockStorageManager.getAllStocksByGroup().then(groups => {

      // 得到需要订阅更新的股票代码（所有持股，5个自选股和5个其他历史）
      let {personal, keep, other} = groups,
        keepStocks = keep, personalStocks = personal.slice(0, 5), historyStocks = other.slice(0, 5),
        stockCodes = [].concat(...[personalStocks, keepStocks, historyStocks].map(group => group.map(stock => stock.Obj)));

      // 如果stockCodes变化了则重新查询
      if (JSON.stringify(this._stockCodes) !== JSON.stringify(stockCodes)) {
        this._stockCodes = stockCodes;
        this._query(Object.assign({}, this.props, {params: {obj: stockCodes}}));
      }

      dealModule.getKeepStocks().then((keepStocks) => {
        this.setState({keepStocks, personalStocks, historyStocks});
      });
    });
  }

  componentDidMount() {

    // 监听股票信息缓存变化
    this._updateListener = StockStorageManager.addUpdateListener(this._onUpdate);

    // 监听交易信息更新
    this._dealUpdateListener = dealModule.addUpdateListener(this._onUpdate);

    // 初始
    this._onUpdate();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this._updateListener.remove();
    this._dealUpdateListener.remove();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  _onItemPress(data) {
    this.props.navigator.push({component: 'StockQuotationPage', ...data});
  }

  _renderKeepItem(label, value, options, style) {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 12}}>{label}</Text>
        <StockFormatText style={[{fontSize: 12}, style]} {...options}>{value}</StockFormatText>
      </View>
    );
  }

  _renderKeepStockRow(rowData) {
    let profitLossRatio = dealModule.getProfitLossRatio(rowData);
    return (
      <TouchableHighlight key={rowData.Obj} onPress={() => this._onItemPress(rowData)}
                          underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        <View style={{borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR}}>
          <StockListItem {...rowData} style={{container: {borderBottomWidth: 0}}}></StockListItem>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 5}}>
            {this._renderKeepItem('持仓:', rowData.ChiYouLiang, {precision: 0})}
            {this._renderKeepItem('市值:', dealModule.getMarketValue(rowData), {precision: 0})}
            {this._renderKeepItem('股本:', rowData.MaiRuJunJia)}
            {this._renderKeepItem('盈亏比:', dealModule.getProfitLossRatio(rowData), {
              unit: '%',
              useDefault: false
            }, profitLossRatio > 0 ? {color: baseStyle.UP_COLOR} : profitLossRatio < 0 ? {color: baseStyle.DOWN_COLOR} : null)}
            <View style={{width: 60}}>
              <Button style={{fontSize: 12}}
                      onPress={() => dealModule.sell(rowData.Obj, rowData.ZuiXinJia, rowData.ChiYouLiang)}>全部卖出</Button>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderStockList(title, data, renderRow) {
    return data && data.length > 0 && (
        <View>
          <View
            style={{backgroundColor: baseStyle.LIGHTEN_GRAY, borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, paddingVertical: 5, paddingHorizontal: 10}}>
            <Text>{title}</Text>
          </View>
          <StockList onItemPress={this._onItemPress} data={data} renderRow={renderRow}></StockList>
        </View>
      );
  }

  render() {
    return (
      <View>
        {this._renderStockList('持仓', this.state.keepStocks, this._renderKeepStockRow)}
        {this._renderStockList('自选股', this.state.personalStocks)}
        {this._renderStockList('最近浏览', this.state.historyStocks)}
      </View>
    );
  }
}

class SHSZMarketTab extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

    // 订阅查询上证,深成和创业版三个股指
    this._request = connection.subscribe('/stkdata', {obj: ['SH000001', 'SZ399001', 'SZ399006'], field: ['ZhongWenJianCheng', 'ZuiXinJia', 'ZhangDie', 'ZhangFu']}, (data) => {
      data.length > 0 && this.setState(Object.assign.apply(Object, data.map(eachData => {
        return {[eachData.Obj]: eachData}
      })));
    });
  }

  componentWillUnmount() {
    this._request && this._request.cancel();
  }

  _onItemPress(data) {
    this.props.navigator.push({component: 'StockQuotationPage', ...data});
  }

  _renderIndex(indexCode) {
    let data = this.state[indexCode] || {}, up = data.ZhangFu || 0;
    return (
      <TouchableHighlight key={indexCode} style={{flex: 1, padding: 8}} underlayColor={baseStyle.HIGH_LIGHT_COLOR} onPress={() => this._onItemPress(data)}>
        <View>
          <View style={[{padding: 4, backgroundColor: baseStyle.GRAY}, up > 0 && {backgroundColor: baseStyle.UP_BACKGROUND_COLOR}, up < 0 && {backgroundColor: baseStyle.DOWN_BACKGROUND_COLOR}]}>
            <StockFormatText style={{textAlign: 'center', color: baseStyle.WHITE, fontSize: 14}}>{data.ZhongWenJianCheng}</StockFormatText>
          </View>
          <StockFormatText style={[{margin: 4, textAlign: 'center', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 16}, up > 0 && {color: baseStyle.UP_COLOR}, up < 0 && {color: baseStyle.DOWN_COLOR}]}>{data.ZuiXinJia}</StockFormatText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <StockFormatText sign={true} style={[{textAlign: 'center', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 10}, up > 0 && {color: baseStyle.UP_COLOR}, up < 0 && {color: baseStyle.DOWN_COLOR}]}>{data.ZhangDie}</StockFormatText>
            <StockFormatText unit='%' sign={true} style={[{textAlign: 'center', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 10}, up > 0 && {color: baseStyle.UP_COLOR}, up < 0 && {color: baseStyle.DOWN_COLOR}]}>{data.ZhangFu / 100}</StockFormatText>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          {['SH000001', 'SZ399001', 'SZ399006'].map((indexCode) => this._renderIndex(indexCode))}
        </View>
        <SortStockList title="涨幅榜" params={{field: "ZhangFu"}} navigator={this.props.navigator}></SortStockList>
        <SortStockList title="跌幅榜" params={{field: "ZhangFu", desc: false}} navigator={this.props.navigator}></SortStockList>
        <SortStockList title="换手率" params={{field: "HuanShou"}} navigator={this.props.navigator}></SortStockList>
        <SortStockList title="振幅" params={{field: "ZhenFu"}} navigator={this.props.navigator}></SortStockList>
      </ScrollView>
    )
  }
}

// TODO 排序结果和行情数据不一致,修改为使用stkdata服务的排序功能
class SortStockList extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: "/sort/range"
  };
  defaultParams = {
    sub: 1,
    market: ['SH','SZ'],
    count: 5,
    desc: true
  };

  constructor(props) {
    super(props);

    // 初始空数据
    this.state = {
      data: new Array(props.params.count || this.defaultParams.count).fill({})
    };
  }

  adapt(data) {

    // 得到排序结果后,再查询对应股票数据(最新价)
    if (data.length > 0) {
      if (this._lastRequest) {
        this._lastRequest.cancel();
        this._lastRequest = null;
      }

      let objs = [];
      let result = data.map(eachData => {
        objs.push(eachData.Obj);
        return {Obj: eachData.Obj, [this.props.params.field]: eachData.Value};
      });
      this._lastRequest = connection.request('/stkdata', {obj: objs, field: ['ZuiXinJia', 'ZhongWenJianCheng', 'ZhangFu']}, (data) => {
        if (data.length > 0) {
          let map = Object.assign.apply(Object, data.map((eachData) => {
            return {[eachData.Obj]: eachData};
          }));
          result = result.map((eachData => {
            let stock = map[eachData.Obj];
            return stock ? Object.assign({}, eachData, stock) : eachData;
          }));
          this.setState({data: result});
        }
      });
      //this.setState({data: result});
    }
    return false;
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this._lastRequest && this._lastRequest.cancel();
  }

  _renderRow(rowData) {
    return <StockListItem {...rowData} column={['ZhongWenJianCheng', 'ZuiXinJia', this.props.params.field]} onPress={this._onItemPress.bind(this, rowData)}></StockListItem>
  }

  _onItemPress(data) {
    this.props.navigator.push({component: 'StockQuotationPage', ...data});
  }

  render() {
    let data = this.state.data;
    return (
      <View>
        <View style={{backgroundColor: baseStyle.LIGHTEN_GRAY, borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, paddingVertical: 5, paddingHorizontal: 10}}>
          <Text>{this.props.title}</Text>
        </View>
        {
          data && data.length > 0 && <StockList data={this.state.data} renderRow={this._renderRow.bind(this)}></StockList>
        }
      </View>
    );
  }
}

// 板块缓存管理,缓存板块的名称,得到板块的路径
export let BlockStorageManager = {
  blockStorage: Storage.getStorageInstance('block'),

  async getBlockName(blockCode) {
    let blocks = await this.blockStorage.getItem() || {};

    // 不存在时去请求
    let block = blocks[blockCode];
    if (!block) {
      block = await this._requestBlock(blockCode);
    }
    return block.ZhongWenJianCheng;
  },

  async _requestBlock(blockCode) {

    // 记录下需要请求的板块code,同时发出
    if (this._request) {

      // 避免请求重复的code
      if (this._request.codes.indexOf(blockCode) < 0) {
        this._request.codes.push(blockCode);
      }
    } else {
      this._request = new Promise((resolve, reject) => {
        setImmediate(() => {
          connection.request('/stkdata', {obj: this._request.codes, field: ['ZhongWenJianCheng']}, async (data) => {

            // 记录缓存
            let blocks = await this.blockStorage.getItem() || {};
            data.forEach((eachData) => blocks[eachData.Obj] = eachData);
            this.blockStorage.setItem(blocks);
            resolve(blocks);
          });
          this._request = null;
        });
      });
      this._request.codes = [blockCode];
    }
    let blocks = await this._request;
    return blocks[blockCode];
  },

  async getBlockPath(blockCode) {
    let blockName = await this.getBlockName(blockCode);
    return '股票\\\\大智慧概念\\\\' + blockName;
  }
};

// 显示领涨或者领跌的3个板块,和其它板块列表
class BlockTab extends DZHYunComponent {

  defaultParams = {
    //sub: 1,
    field: 'ZhangFu',
    market: 'B$',
    //count: 20
  };

  constructor(props) {
    super(props);

    // 初始空数据
    this.state = {
      desc: true,
      topBlocks: new Array(3).fill({})
    };
  }

  _query(desc) {
    //this.setState({topBlocks: new Array(3).fill({}), dataSource: null});
    super._query({serviceUrl: '/sort/range', params: {desc}});

    this.timeoutId && clearTimeout(this.timeoutId);
  }

  componentDidMount() {

    // 初始请求
    this._query(this.state.desc);
  }

  componentWillUnmount() {
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  adapt(data) {
    if (data && data.length > 0) {

      this._needInit && this.setState({topBlocks: new Array(3).fill({}), dataSource: null});
      this._needInit = false;

      // 前三个数据提出来做领涨板块,之后的数据放入listView的datasource
      let topBlocks = data.splice(0, 3),
        dataSource = (this.state.dataSource || new ListView.DataSource(this)).cloneWithRows(data);
      this.setState({topBlocks, dataSource});

      // 定时10秒重新查询
      this.timeoutId = setTimeout(() => {
        this._query(this.state.desc);
      }, 10 * 1000);
    }
    return false;
  }

  shouldComponentUpdate(nextProps, nextState) {

    // 排序变化,重新请求数据
    if (this.state.desc !== nextState.desc) {

      this._query(nextState.desc);

      // 记录需要还原状态状态
      this._needInit = true;
    }
    return this.state !== nextState;
  }

  _renderTopBlocks() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        {this.state.topBlocks.map((topBlock, index) => <BlockItem navigator={this.props.navigator} key={index} Obj={topBlock.Obj} ZhangFu={topBlock.Value}></BlockItem>)}
      </View>
    );
  }

  _renderBlockList() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 30, backgroundColor: baseStyle.LIGHTEN_GRAY, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{color: baseStyle.GRAY, textAlign: 'center', flex: 1}}>名称</Text>
          <Button onPress={() => this.setState({desc: !this.state.desc})}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
              <Text style={{color: baseStyle.GRAY, textAlign: 'center'}}>涨幅</Text>
              <Image style={{width: 10, height: 20, marginHorizontal: 5}} source={{ uri: this.state.desc ? 'arrow_red' : 'arrow_green', isStatic: true }}></Image>
            </View>
          </Button>
          <Text style={{color: baseStyle.GRAY, textAlign: 'center', width: 150}}>领涨股</Text>
        </View>
        {
          this.state.dataSource &&
          <ListView
            style={{flex: 1}}
            initialListSize={20}
            pageSize={5}
            scrollRenderAheadDistance={20}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}>
          </ListView>
        }
      </View>
    )
  }

  _renderRow(rowData) {
    return <BlockListItem navigator={this.props.navigator} Obj={rowData.Obj} ZhangFu={rowData.Value}></BlockListItem>
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this._renderTopBlocks()}
        {this._renderBlockList()}
      </View>
    );
  }
}

class BlockItem extends DZHYunComponent {

  defaultParams = {
    field: 'LingZhangGu'
  };

  _query(props) {
    this.setState({Obj: props.Obj, ZhangFu: props.ZhangFu, ZhongWenJianCheng: null, LingZhangGu: {}});

    // 请求名称
    BlockStorageManager.getBlockName(props.Obj).then((blockName) => {
      this.setState({ZhongWenJianCheng: blockName});
    });
    BlockStorageManager.getBlockPath(props.Obj).then((blockPath) => {
      super._query({serviceUrl: '/blockstat', params: {gql: encodeURIComponent(`block=${blockPath}`)}});
    });
  }

  adapt(data) {
    if (data && data.length > 0) {
      this.setState({
        LingZhangGu: data[0]['LingZhangGu']
      });
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {

    // 板块变化了或者同一个板块的涨幅变了则重新请求领涨股
    if (this.props.Obj !== nextProps.Obj || this.props.ZhangFu !== nextProps.ZhangFu) {
      this._query(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  _onPressBlock() {
    this.props.Obj && this.props.navigator.push({component: 'BlockDetailPage', Obj: this.props.Obj});
  }

  render() {
    let data = this.state || {}, lead = data.LingZhangGu || {}, up = data.ZhangFu || 0, leadUp = lead.ZhangFu || 0;
    return (
      <TouchableHighlight style={{flex: 1, padding: 8}} underlayColor={baseStyle.HIGH_LIGHT_COLOR} onPress={this._onPressBlock.bind(this)}>
        <View>
          <View style={[{padding: 4, backgroundColor: baseStyle.GRAY}, up > 0 && {backgroundColor: baseStyle.UP_BACKGROUND_COLOR}, up < 0 && {backgroundColor: baseStyle.DOWN_BACKGROUND_COLOR}]}>
            <StockFormatText style={{textAlign: 'center', color: baseStyle.WHITE, fontSize: 14}}>{data.ZhongWenJianCheng}</StockFormatText>
          </View>
          <StockFormatText sign={true} unit='%' style={[{margin: 4, textAlign: 'center', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 16}, up > 0 && {color: baseStyle.UP_COLOR}, up < 0 && {color: baseStyle.DOWN_COLOR}]}>{data.ZhangFu / 100}</StockFormatText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <StockFormatText style={{textAlign: 'center', color: baseStyle.GRAY, fontSize: 10}}>{lead.ZhongWenJianCheng}</StockFormatText>
            <StockFormatText unit='%' sign={true} style={[{textAlign: 'center', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 10}, leadUp > 0 && {color: baseStyle.UP_COLOR}, leadUp < 0 && {color: baseStyle.DOWN_COLOR}]}>{lead.ZhangFu / 100}</StockFormatText>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class BlockListItem extends BlockItem {
  render() {
    let data = this.state || {}, lead = data.LingZhangGu || {}, up = data.ZhangFu || 0, leadUp = lead.ZhangFu || 0;
    return (
      <TouchableHighlight underlayColor={baseStyle.HIGH_LIGHT_COLOR} onPress={this._onPressBlock.bind(this)}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR}}>
          <View style={{flex: 1}}>
            <StockFormatText style={{textAlign: 'left', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 16}}>{data.ZhongWenJianCheng}</StockFormatText>
            <StockFormatText style={{textAlign: 'left', color: baseStyle.GRAY, fontSize: 10}}>{data.Obj}</StockFormatText>
          </View>
          <StockFormatText sign={true} unit='%' style={[{flex: 1, textAlign: 'center', color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 14}, up > 0 && {color: baseStyle.UP_COLOR}, up < 0 && {color: baseStyle.DOWN_COLOR}]}>{data.ZhangFu / 100}</StockFormatText>
          <View style={[{flex: 1, padding: 4, backgroundColor: baseStyle.LIGHT_GRAY}, leadUp > 0 && {backgroundColor: baseStyle.UP_BACKGROUND_COLOR}, leadUp < 0 && {backgroundColor: baseStyle.DOWN_BACKGROUND_COLOR}]}>
            <StockFormatText style={{textAlign: 'center', color: baseStyle.WHITE, fontSize: 14}}>{lead.ZhongWenJianCheng}</StockFormatText>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <StockFormatText style={{textAlign: 'center', color: baseStyle.WHITE, fontSize: 10}}>{lead.ZuiXinJia}</StockFormatText>
              <StockFormatText unit='%' sign={true} style={{textAlign: 'center', color: baseStyle.WHITE, fontSize: 10}}>{lead.ZhangFu / 100}</StockFormatText>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}