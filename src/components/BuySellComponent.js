/**
 * 买卖盘组件
 * Created by jiagang on 15/11/11.
 */

import React, {View, Text, StyleSheet} from 'react-native';

import DZHYunComponent from './dzhyun/DZHYunComponent.js';
import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';
import StockFormatText from './StockFormatText.js';

export default class BuySellComponent extends BaseComponent {
  static defaultProps = {
    data: {}
  };

  styleSheet = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cell: {
      flex: 1,
      color: baseStyle.GRAY,
      fontSize: 10
    },
    priceUp: {
      color: baseStyle.UP_COLOR
    },
    priceDown: {
      color: baseStyle.DOWN_COLOR
    },
    split: {
      borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR,
      borderBottomWidth: 1
    }
  });

  _renderItem(title, price, volumn) {
    let up = (price || 0) - (this.props.data.ZuoShou || 0);
    return (
      <View key={title} style={this.getStyles('row')}>
        <Text style={this.getStyles('cell')}>{title}</Text>
        <StockFormatText style={[this.getStyles('cell'), this.getUpDownStyle('price', up)]}>{price}</StockFormatText>
        <StockFormatText style={this.getStyles(['cell', 'volume'])} unit={100} precision={0}>{volumn}</StockFormatText>
      </View>
    );
  }

  _renderSellList() {
    return [5, 4, 3, 2, 1].map(num => this._renderItem(`卖${num}`, this.props.data[`WeiTuoMaiChuJia${num}`], this.props.data[`WeiTuoMaiChuLiang${num}`]));
  }

  _renderBuyList() {
    return [1, 2, 3, 4, 5].map(num => this._renderItem(`买${num}`, this.props.data[`WeiTuoMaiRuJia${num}`], this.props.data[`WeiTuoMaiRuLiang${num}`]));
  }

  render() {
    return (
      <View style={this.getStyles('container')}>
        {this._renderSellList()}
        <View style={this.getStyles('split')}></View>
        {this._renderBuyList()}
      </View>
    );
  }
}

export class DZHYunBuySellComponent extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: '/stkdata'
  };

  constructor(props) {
    super(props);

    this.defaultParams = {
      sub: 1,
      field: ['ZuoShou'].concat(...([1,2,3,4,5].map(num => [`WeiTuoMaiChuJia${num}`, `WeiTuoMaiChuLiang${num}`, `WeiTuoMaiRuJia${num}`, `WeiTuoMaiRuLiang${num}`])))
    };
  }

  adapt(data) {
    return data && data[0];
  }

  render() {
    return <BuySellComponent data={this.state.data}></BuySellComponent>;
  }
}