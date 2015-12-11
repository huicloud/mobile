/**
 * 股票列表项
 * Created by jiagang on 15/11/2.
 */
import React, {StyleSheet, View, TouchableHighlight, Animated, Dimensions} from 'react-native';
import BaseComponent from './BaseComponent.js';
import StockFormatText from './StockFormatText.js';
import * as baseStyle from './baseStyle.js';

var deviceWidth = Dimensions.get('window').width;

export default class StockListItem extends BaseComponent {

  styleSheet = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 44,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    stockLabel: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    name: {
      color: baseStyle.DEFAULT_TEXT_COLOR,
      //fontWeight: '200',
      fontSize: 16,
      marginBottom: 4
    },
    code: {
      color: baseStyle.GRAY,
      fontSize: 10
    },
    priceContainer: {
      flex: 1,
      paddingVertical: 5
    },
    riseMark: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    riseMarkUp: {
      backgroundColor: baseStyle.UP_COLOR
    },
    riseMarkDown: {
      backgroundColor: baseStyle.DOWN_COLOR
    },
    price: {
      textAlign: 'right',
      fontSize: 16,
      color: '#777',
      paddingRight: 10,
    },
    priceUp: {
      color: baseStyle.UP_COLOR
    },
    priceDown: {
      color: baseStyle.DOWN_COLOR
    },
    ratioContainer: {
      backgroundColor: baseStyle.GRAY,
      paddingHorizontal: 2,
      paddingVertical: 5,
      width: deviceWidth < 350 ? 75 : 100,
      marginLeft: 20
    },
    ratioContainerUp: {
      backgroundColor: baseStyle.UP_BACKGROUND_COLOR
    },
    ratioContainerDown: {
      backgroundColor: baseStyle.DOWN_BACKGROUND_COLOR
    },
    ratio: {
      fontSize: 16,
      color: baseStyle.WHITE,
      textAlign: 'center'
    },
    rise: {
      fontSize: 16,
      color: '#777',
      textAlign: 'right',
      width: deviceWidth < 350 ? 60 : 80,
    },
    riseUp: {
      color: baseStyle.UP_COLOR
    },
    riseDown: {
      color: baseStyle.DOWN_COLOR
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      riseMarkOpacity: new Animated.Value(0),
      rise: 0
    }
  }

  componentWillReceiveProps(nextProps) {

    // 判断价格变化,显示上涨或者下跌动画效果
    if (nextProps.Obj === this.props.Obj && nextProps.ZuiXinJia !== this.props.ZuiXinJia) {
      this.state.riseMarkOpacity.setValue(1);
      Animated.timing(
        this.state.riseMarkOpacity,
        {
          toValue: 0,
          duration: 500,
          delay: 0
        }
      ).start();
      this.setState({rise: nextProps.ZuiXinJia - this.props.ZuiXinJia});
    }
  }

  _renderZhongWenJianCheng() {
    return (
      <View key="ZhongWenJianCheng" style={this.getStyles('stockLabel')}>
        <StockFormatText style={this.getStyles('name')}>{this.props.ZhongWenJianCheng}</StockFormatText>
        <StockFormatText style={this.getStyles('code')}>{this.props.Obj}</StockFormatText>
      </View>
    );
  }

  _renderZuiXinJia() {
    return (
      <View key="ZuiXinJia" style={this.getStyles('priceContainer')}>
        <Animated.View style={this.getUpDownStyle('riseMark', this.state.rise, {opacity: this.state.riseMarkOpacity})}></Animated.View>
        <StockFormatText style={this.getUpDownStyle('price', this.props.ZhangFu)}>{this.props.ZuiXinJia}</StockFormatText>
      </View>
    );
  }

  _renderZhangDie() {
    return <StockFormatText key="ZhangDie" style={this.getUpDownStyle('rise', this.props.ZhangDie)} sign={true}>{this.props.ZhangDie}</StockFormatText>;
  }

  _renderZhangFu() {
    return (
      <View key="ZhangFu" style={this.getUpDownStyle('ratioContainer', this.props.ZhangFu)}>
        <StockFormatText style={this.getStyles('ratio')} unit="%" sign={true}>{this.props.ZhangFu / 100}</StockFormatText>
      </View>
    );
  }

  _renderZhenFu() {
    return (<StockFormatText key="ZhenFu" unit="%" style={{textAlign: 'center', fontSize: 16, marginLeft: 20, width: 100}}>{this.props.ZhenFu / 100}</StockFormatText>);
  }

  _renderHuanShou() {
    return (<StockFormatText key="HuanShou" unit="%" style={{textAlign: 'center', fontSize: 16, marginLeft: 20, width: 100}}>{this.props.HuanShou / 100}</StockFormatText>);
  }

  render() {

    // 判断如果props中column中字段存在,则展示指定的字段,最多4列,默认展示[名称,现价,涨跌,涨幅]
    let column = (this.props.column || ['ZhongWenJianCheng', 'ZuiXinJia', 'ZhangDie', 'ZhangFu']).slice(0, 4),
      result = (
        <View style={this.getStyles('container')}>
          {column.map((eachColumn) => this['_render' + eachColumn]())}
        </View>
      );
    return this.props.onPress ? (
      <TouchableHighlight onPress={() => this.props.onPress && this.props.onPress(this.props)} underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        {result}
      </TouchableHighlight>
    ) : result;
  }
}