import React, {ScrollView, View, Text, Component, TouchableHighlight, StyleSheet} from 'react-native';
import BaseTab from './BaseTab.js';

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

export default class PersonalStocksTab extends BaseTab {

  title = '自选股';
  constructor(props) {
    super(props);
  }

  renderContent() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <PersonalStocksList navigator={this.props.navigator}></PersonalStocksList>
        </ScrollView>
        <OverView></OverView>
      </View>
    );
  }
}

class PersonalStocksList extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: "/quote/dyna"
  };

  defaultParams = {
    sub: 1,
    field: ['ZuiXinJia', 'ZhangFu']
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
      let stock = eachData.Data;
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
      <TouchableHighlight key={rowData.Obj} onPress={() => this._onItemPress(rowData)} underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        <View style={{borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR}}>
          <StockListItem {...rowData} style={{container: {borderBottomWidth: 0}}}></StockListItem>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 5}}>
            {this._renderKeepItem('持仓:', rowData.ChiYouLiang, {precision: 0})}
            {this._renderKeepItem('市值:', dealModule.getMarketValue(rowData), {precision: 0})}
            {this._renderKeepItem('股本:', rowData.MaiRuJunJia)}
            {this._renderKeepItem('盈亏比:', dealModule.getProfitLossRatio(rowData), {unit: '%', useDefault: false}, profitLossRatio > 0 ? {color: baseStyle.UP_COLOR} : profitLossRatio < 0 ? {color: baseStyle.DOWN_COLOR} : null)}
            <View style={{width: 60}}>
              <Button style={{fontSize: 12}} onPress={() => dealModule.sell(rowData.Obj, rowData.ZuiXinJia, rowData.ChiYouLiang)}>全部卖出</Button>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderStockList(title, data, renderRow) {
    return data && data.length > 0 && (
      <View>
        <View style={{backgroundColor: baseStyle.LIGHTEN_GRAY, borderBottomWidth: 1, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, paddingVertical: 5, paddingHorizontal: 10}}>
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

class OverView extends Component {

  styleSheet = StyleSheet.create({
    grid: {
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    cell: {
      flex: 1,
      justifyContent: 'center'
    },
    cellText: {
      color: baseStyle.GRAY,
      textAlign: 'center',
      margin: 2,
      fontSize: 14
    },
    borderLeft: {
      borderLeftWidth: 1,
      borderLeftColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    borderRight: {
      borderRightWidth: 1,
      borderRightColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    borderTop: {
      borderTopWidth: 1,
      borderTopColor: baseStyle.DEFAULT_BORDER_COLOR
    }
  });

  constructor(props) {
    super(props);

    this._onUpdate = this._onUpdate.bind(this);

    this.state = {};

    this.loading = true;
  }

  componentDidMount() {

    // 监听股票信息缓存变化
    this._updateListener = StockStorageManager.addUpdateListener(this._onUpdate);

    // 监听交易信息更新
    this._dealUpdateListener = dealModule.addUpdateListener(this._onUpdate);

    this._onUpdate();
  }

  componentWillUnmount() {
    this._updateListener.remove();
    this._dealUpdateListener.remove();
  }

  _onUpdate() {

    Promise.all([
      dealModule.getTotalProfitLoss(),
      dealModule.getTotalProfitLossRatio(),
      dealModule.getTotalMarketValue(),
      dealModule.getTotalAssets(),
      dealModule.getRestMoney()
    ]).then(([totalProfitLoss, totalProfitLossRatio, totalMarketValue, totalAsserts, restMoney]) => {

      this.loading = false;
      this.setState({totalProfitLoss, totalProfitLossRatio, totalMarketValue, totalAsserts, restMoney});
    });
  }

  _renderGridCell(name, data, props) {
    return (
      <View style={[this.styleSheet.cell, this.styleSheet.borderBottom, this.styleSheet.borderRight]}>
        <Text style={this.styleSheet.cellText}>{name}</Text>
        <StockFormatText style={this.styleSheet.cellText} {...props} useDefault={false}>{data}</StockFormatText>
      </View>
    );
  }

  render() {
    if (this.loading) {
      return <View></View>;
    }
    return (
      <View style={[this.styleSheet.grid, this.styleSheet.borderTop, {height: 100}]}>
        <View style={[this.styleSheet.row, this.styleSheet.borderLeft]}>
          <View style={[this.styleSheet.cell, this.styleSheet.borderBottom, this.styleSheet.borderRight, {flex: null}]}>
            <View style={[
              {flex: 1, flexDirection: 'column', width: 90, height: 90, margin: 5, borderRadius: 45, alignItems: 'center', justifyContent: 'center'},
              {backgroundColor: this.state.totalProfitLoss > 0 ? baseStyle.UP_COLOR : this.state.totalProfitLoss < 0 ? baseStyle.DOWN_COLOR : baseStyle.GRAY}
            ]}>
              <StockFormatText style={{color: baseStyle.WHITE, fontSize: 18}} unit="%" useDefault={false}>{this.state.totalProfitLossRatio}</StockFormatText>
              <Text style={{color: baseStyle.LIGHTEN_GRAY, fontSize: 10}}>总收益</Text>
            </View>
          </View>
          <View style={[this.styleSheet.cell]}>
            <View style={[this.styleSheet.row]}>
              {this._renderGridCell('总资产', this.state.totalAsserts)}
              {this._renderGridCell('总盈亏', this.state.totalProfitLoss)}
            </View>
            <View style={[this.styleSheet.row]}>
              {this._renderGridCell('总市值', this.state.totalMarketValue)}
              {this._renderGridCell('可用资金', this.state.restMoney)}
            </View>
          </View>
        </View>
      </View>
    );
  }
}