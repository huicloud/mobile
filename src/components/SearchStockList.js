/**
 * 股票查询列表，根据输入参数的关键字进行搜索后展示成列表
 * Created by jiagang on 15/11/6.
 */
import React, {View, Text, ScrollView, TouchableHighlight} from 'react-native';

import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';
import DZHYunComponent from './dzhyun/DZHYunComponent.js';

export default class SearchStockList extends BaseComponent {

  _renderListItem(itemData) {
    return (
      <TouchableHighlight key={itemData.Obj} onPress={() => this.props.onItemPress && this.props.onItemPress(itemData)} underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row', alignItems: 'center', height: 36, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, borderBottomWidth: 1}}>
          <Text style={{color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 15, flex: 1}}>{itemData.Obj}</Text>
          <Text style={{color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 15, flex: 1}}>{itemData.ZhongWenJianCheng}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <View style={{height: 32, paddingLeft: 10, backgroundColor: baseStyle.DARK_GRAY, flexDirection: 'row', alignItems: "center"}}>
          <Text style={{fontSize: 13, color: baseStyle.WHITE}}>{this.props.title}</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps={true}>{
          this.props.data && this.props.data.map((itemData) => this._renderListItem(itemData))
        }</ScrollView>
      </View>
    );
  }
}

export class DZHSearchStockList extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: '/kbspirit'
  };

  constructor(props) {
    super(props);

    this.defaultParams = {
      type: 0,
      count: 10
    };

    this.title = '最近浏览';
    this.state = {
      data: null
    }
  }

  adapt(data) {
    this.title = '查询结果';
    let result = (data[0] && data[0].JieGuo && data[0].JieGuo[0].ShuJu) || [];
    return result.map((eachData) => {
      return {Obj: eachData.DaiMa, ZhongWenJianCheng: eachData.MingCheng}
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params) {
      super.componentWillReceiveProps(nextProps);
    } else {
      this.title = '最近浏览';
      this.setState({data: nextProps.historyData});
    }
  }

  render() {
    return <SearchStockList {...this.props} {...this.state} title={this.title}></SearchStockList>;
  }
}