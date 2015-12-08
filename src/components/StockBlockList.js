/**
 * 股票板块列表
 * Created by jiagang on 15/11/27.
 */
import React, {View, Text, StyleSheet} from 'react-native';
import BaseComponent from './BaseComponent.js';
import * as baseStyle from './baseStyle.js';
import StockFormatText from './StockFormatText.js';

import DZHYunComponent from './dzhyun/DZHYunComponent';
import {connection} from './dzhyun/DZHYunConnection.js';

export default class StockBlockList extends BaseComponent {

  styleSheet = StyleSheet.create({
    item: {

    },
    itemName: {

    },
    itemRatio: {

    },
    itemRatioUp: {

    },
    itemRatioDown: {

    },
    itemTop: {

    }
  });

  constructor(props) {
    super(props);

    // props.showTopStock boolean类型 是否显示领涨股,默认不显示,设置为true时,需要在rowData中有LingZhangGu字段对应领涨股信息
    this.state = {};
  }

  _renderRow(rowData) {

    let itemStyle = this.getStyles('item');
    itemStyle.push({width: this.itemWidth});
    return (
      <View style={itemStyle}>
        <Text style={this.getStyles('itemName')}>rowData.ZhongWenJianCheng</Text>
        <StockFormatText style={this.getUpDownStyle('itemRatio', rowData.ZhangFu)}>rowData.ZhangFu</StockFormatText>
      </View>
    )
  }

  render() {
    return (
      this.state.dataSource && (<ListView
        onLayout={(event) => {

          // View布局事件得到容器宽度,将根据该容器宽度计算摆放3个元素需要的单个元素宽度
          this.itemWidth = event.nativeEvent.width / 3 - 1;
        }}
        renderHeader={this.props.renderHeader}
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow || this._renderRow.bind(this)}>
      </ListView>)
    );
  }
}

export class DZHYunStockBlockList extends DZHYunComponent {

  static blockNameMap = {};
  static defaultProps = {
    serviceUrl: '/sort/range'
  };


  defaultParams = {
    field: 'ZhangFu',
    market: 'B$',
    start: 0,
    count: 3
  };
  constructor(props) {
    super(props);
  }

  // 从缓存中查询股票名称
  // @return {Object}
  _queryBlockNameFromCache(blockObjs) {
    return Object.assign.apply(Object, blockObjs.map((obj => {
      return {
        Obj: DZHYunStockBlockList.blockNameMap[obj]
      }
    })));
  }

  // 查询板块名称
  _queryBlockName(blockObjs) {

    return new Promise((resolve, reject) => {
      // 避免重复请求数据,将请求过的名称缓存下,每次先从缓存中查找,没有的时候才请求数据
      let nameMap = this._queryBlockNameFromCache(blockObjs);

      // 筛选找到没有缓存名称的对象
      let needRequestObjs = nameMap.filter(name => name['ZhongWenJianCheng'] == null).map(name => name['Obj']);
      if (needRequestObjs.length > 0) {
        connection.request('/stkdata', {obj: blockObjs, field: ['ZhongWenJianCheng', 'ZhangFu']}, data => {

          // 请求到的名称存入缓存后再次查询
          data.forEach(eachData => DZHYunStockBlockList.blockNameMap[eachData['Obj']] = eachData['ZhongWenJianCheng']);
          resolve(this._queryBlockNameFromCache(blockObjs));
        });
      } else {
        resolve(names);
      }
    });
  }

  adapt(data) {

    // 对于请求到的板块,查询板块名称
    this._queryBlockName(data.map(eachData => eachData.Obj)).then((blocks) => {

      // 将data和blocks格式化为有'Obj','ZhongWenJianCheng','ZhangFu'字段的对象数组
      blocks
    });

    return false;
  }
}