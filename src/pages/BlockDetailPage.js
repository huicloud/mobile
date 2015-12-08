/**
 * 板块详情页面,板块中股票列表
 * Created by jiagang on 15/12/3.
 */
import React, {View, Text, ListView, Component} from 'react-native';
import Button from 'react-native-button';
import BasePage from './BasePage.js';
import DZHYunComponent from '../components/dzhyun/DZHYunComponent.js';
import StockListItem from '../components/StockListItem.js';
import * as baseStyle from '../components/baseStyle.js';
import PageHeader from '../components/PageHeader.js';
import StockFormatText from '../components/StockFormatText.js';

import {BlockStorageManager} from './home/QuotationTab.js';

export default class BlockDetailPage extends BasePage {

  componentDidMount() {
    super.componentDidMount();

    // 定时10秒重新刷新一次数据
    this._intervalId = setInterval(() => {
      this.refs['header'].refresh();
      this.refs['list'].refresh();
    }, 10 * 1000);
  }

  componentWillUnmount() {
    this._intervalId && clearInterval(this._intervalId);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR}}>
        <PageHeader onBack={() => this.props.navigator.pop()} title="板块详情"></PageHeader>
        <View style={{borderBottomWidth: 1, borderBottomColor: baseStyle.LIGHTEN_GRAY, backgroundColor: baseStyle.LIGHTEST_GRAY, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          {['名称', '最新', '涨幅', '涨跌'].map((name, index) => {
            return <Text key={index} style={{color: baseStyle.GRAY, textAlign: 'center', flex: 1}}>{name}</Text>
          })}
        </View>
        <BlockListHeader params={{obj: this.props.Obj}} ref="header"></BlockListHeader>
        <BlockList Obj={this.props.Obj} navigator={this.props.navigator} ref="list"></BlockList>
      </View>
    )
  }
}

class ListItem extends Component {
  static _InternalListItem = class extends StockListItem {
    _renderZhangFu() {
      return (
        <StockFormatText key="ZhangFu" style={this.getUpDownStyle('rise', this.props.ZhangDie)} unit="%" sign={true}>{this.props.ZhangFu / 100}</StockFormatText>
      );
    }
  };

  render() {
    return (
      <View style={this.props.style}>
        <ListItem._InternalListItem {...this.props} style={{rise: {flex: 1, textAlign: 'center'}}} column={['ZhongWenJianCheng', 'ZuiXinJia', 'ZhangFu', 'ZhangDie']}></ListItem._InternalListItem>
      </View>
    );
  }
}

class BlockListHeader extends DZHYunComponent {
  static defaultProps = {
    serviceUrl: "/stkdata"
  };

  defaultParams = {
    //sub: 1,
    field: ['ZhongWenJianCheng', 'ZuiXinJia', 'ZhangFu', 'ZhangDie']
  };

  adapt(data) {
    return data && data[0];
  }

  render() {
    return <ListItem style={{backgroundColor: baseStyle.LIGHTEST_GRAY}} {...this.state.data}></ListItem>;
  }
}

class BlockList extends DZHYunComponent {
  static defaultProps = {
    serviceUrl: "/stkdata"
  };

  defaultParams = {
    //sub: 1,
    field: ['ZhongWenJianCheng', 'ZuiXinJia', 'ZhangFu', 'ZhangDie'],
    //orderby: 'ZhangFu',
    desc: true,
    mode: 2
  };

  _query(props) {
    BlockStorageManager.getBlockPath(props.Obj).then((blockPath) => {
      super._query(Object.assign({}, props, {params: {gql: `block=${blockPath}`}}));
    });
  }

  adapt(data) {

    // 按涨幅排序
    return data && data.sort((d1, d2) => (d2.ZhangFu || -9999) - (d1.ZhangFu || -9999));
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  _onItemPress(data) {
    this.props.navigator.push({component: 'StockQuotationPage', back: (() => this.props.navigator.pop()).bind(this), ...data});
  }

  _renderRow(rowData) {
    return <ListItem {...rowData} onPress={this._onItemPress.bind(this, rowData)}></ListItem>;
  }

  render() {
    if (this.state.data) {
      this.dataSource = (this.dataSource || new ListView.DataSource(this)).cloneWithRows(this.state.data);
    }
    return (
      this.dataSource ?
      <ListView
        style={{flex: 1}}
        initialListSize={20}
        pageSize={5}
        scrollRenderAheadDistance={20}
        dataSource={this.dataSource}
        renderRow={this._renderRow.bind(this)}>
      </ListView> : <View></View>
    )
  }
}