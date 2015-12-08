/**
 * 动态行情组件, 传入的参数中存在obj则提供自动订阅更新数据，否则仅仅是展示传入的参数dynaData中的数据
 * Created by jiagang on 15/11/10.
 */
import React, {View, Text, StyleSheet} from 'react-native';

import DZHYunComponent from './dzhyun/DZHYunComponent.js';
import BaseComponent from './BaseComponent.js';
import StockFormatText from './StockFormatText.js';
import DateFormatText from './DateFormatText.js';
import * as baseStyle from './baseStyle.js';

const UP_STYLE = {
  color: baseStyle.UP_COLOR
}, DOWN_STYLE = {
  color: baseStyle.DOWN_COLOR
};

export default class DynaComponent extends BaseComponent {
  static defaultProps = {
    dynaData: {}
  };

  styleSheet = StyleSheet.create(Object.assign({
      container: {
        //flex: 1
        borderBottomWidth: 1,
        borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      price: {
        fontSize: 40,
        margin: 10,
        marginTop: 5,
        marginBottom: 5,
        color: baseStyle.DEFAULT_TEXT_COLOR
      },
      updn: {
        fontSize: 12,
        color: baseStyle.DEFAULT_TEXT_COLOR
      },
      updnRatio: {
        fontSize: 12,
        color: baseStyle.DEFAULT_TEXT_COLOR
      },
      time: {
        marginLeft: 10,
        fontSize: 12,
        color: baseStyle.DEFAULT_TEXT_COLOR
      },
      grid: {
        marginTop: 10
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: baseStyle.DEFAULT_BORDER_COLOR
      },
      cell: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: baseStyle.DEFAULT_BORDER_COLOR
      },
      cellText: {
        color: baseStyle.DEAULT_TEXT_COLOR,
        textAlign: 'center',
        margin: 2
      }
    }, Object.assign.apply(Object, ['price', 'updn', 'updnRatio'].map((name) => {
      return {[`${name}Up`]: UP_STYLE, [`${name}Down`]: DOWN_STYLE};
    })))
  );

  _renderGridCell(name, data, props) {
    return (
      <View style={this.getStyles('cell')}>
        <Text style={this.getStyles('cellText')}>{name}</Text>
        <StockFormatText style={this.getStyles('cellText')} {...props}>{data}</StockFormatText>
      </View>
    );
  }

  render() {
    return (
      <View style={this.getStyles('container')}>
        <View style={this.getStyles('priceContainer')}>
          <StockFormatText style={this.getUpDownStyle('price', this.props.dynaData.ZhangFu)}>{this.props.dynaData.ZuiXinJia}</StockFormatText>
          <View>
            <StockFormatText style={this.getUpDownStyle('updn', this.props.dynaData.ZhangFu)} sign={true}>{this.props.dynaData.ZhangDie}</StockFormatText>
            <StockFormatText style={this.getUpDownStyle('updnRatio', this.props.dynaData.ZhangFu)} unit="%" sign={true}>{this.props.dynaData.ZhangFu / 100}</StockFormatText>
          </View>
        </View>
        <DateFormatText style={this.getStyles('time')} format="YYYY-MM-DD HH:mm:ss">{this.props.dynaData.ShiJian}</DateFormatText>
        <View style={this.getStyles('grid')}>
          <View style={this.getStyles('row')}>
            {this._renderGridCell('今开', this.props.dynaData.KaiPanJia)}
            {this._renderGridCell('昨收', this.props.dynaData.ZuoShou)}
            {this._renderGridCell('最高', this.props.dynaData.ZuiGaoJia)}
            {this._renderGridCell('最低', this.props.dynaData.ZuiDiJia)}
          </View>
          <View style={this.getStyles('row')}>
            {this._renderGridCell('成交量(股)', this.props.dynaData.ChengJiaoLiang, {unit: 'K/M'})}
            {this._renderGridCell('市盈率', this.props.dynaData.ShiYingLv)}
            {this._renderGridCell('总市值', this.props.dynaData.ZongShiZhi, {unit: 'K/M'})}
            {this._renderGridCell('换手率(%)', this.props.dynaData.HuanShou)}
          </View>
        </View>
      </View>
    );
  }
}

export class DZHYunDynaComponent extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: '/stkdata'
  };

  defaultParams = {
    sub: 1,
    field: ['ZuiXinJia', 'ZhangDie', 'ZhangFu', 'ShiJian', 'KaiPanJia', 'ZuoShou', 'ZuiGaoJia', 'ZuiDiJia', 'ChengJiaoLiang', 'HuanShou', 'ShiYingLv', 'ZongShiZhi', 'LeiXing']
  };

  constructor(props) {
    super(props);

    this.state = {
      data: props.dynaData
    }
  }

  adapt(data) {
    return data && data[0];
  }

  render() {

    // 使用
    return (
      <DynaComponent dynaData={this.state.data}></DynaComponent>
    );
  }
}