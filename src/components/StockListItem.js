/**
 * 股票列表项
 * Created by jiagang on 15/11/2.
 */
import React, {StyleSheet, View, TouchableHighlight} from 'react-native';
import BaseComponent from './BaseComponent.js';
import StockFormatText from './StockFormatText.js';
import * as baseStyle from './baseStyle.js';

export default class StockListItem extends BaseComponent {

  static defaultProps = {
    data: {
      Obj: null,
      ZhongWenJianCheng: null,
      ZuiXinJia: 0,
      ZhangFu: 0,
      ChengJiaoLiang: 0
    }
  };
  static propTypes = {
    data: React.PropTypes.object
  };

  styleSheet = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    stockLabel: {
      flex: 1,
      flexDirection: 'column'
    },
    name: {
      color: baseStyle.DEFAULT_TEXT_COLOR,
      fontWeight: '200',
      fontSize: 18,
      marginBottom: 5
    },
    code: {
      color: baseStyle.GRAY,
      fontSize: 12
    },
    price: {
      fontSize: 20,
      color: '#777'
    },
    priceUp: {
      color: baseStyle.UP_COLOR
    },
    priceDown: {
      color: baseStyle.DOWN_COLOR
    },
    ratio: {
      fontSize: 18,
      backgroundColor: baseStyle.GRAY,
      color: baseStyle.WHITE,
      width: 100,
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft: 20,
      textAlign: 'center'
    },
    ratioUp: {
      backgroundColor: baseStyle.UP_BACKGROUND_COLOR
    },
    ratioDown: {
      backgroundColor: baseStyle.DOWN_BACKGROUND_COLOR
    }
  });

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress && this.props.onPress(this.props)} underlayColor={baseStyle.LIGHTEN_GRAY}>
        <View style={this.getStyles('container')}>
          <View style={this.getStyles('stockLabel')}>
            <StockFormatText style={this.getStyles('name')}>{this.props.ZhongWenJianCheng}</StockFormatText>
            <StockFormatText style={this.getStyles('code')}>{this.props.Obj}</StockFormatText>
          </View>
          <StockFormatText style={this.getUpDownStyle('price', this.props.ZhangFu)}>{this.props.ZuiXinJia}</StockFormatText>
          <StockFormatText style={this.getUpDownStyle('ratio', this.props.ZhangFu)} unit="%" sign={true}>{this.props.ZhangFu}</StockFormatText>
        </View>
      </TouchableHighlight>
    );
  }
}