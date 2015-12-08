/**
 * 股票列表
 * Created by jiagang on 15/11/2.
 */
import React, {ListView, View} from 'react-native';
import BaseComponent from './BaseComponent.js';
import baseStyle from './baseStyle.js';

import StockListItem from './StockListItem.js';

export default class StockList extends BaseComponent {

  constructor(props) {
    super(props);

    // 初始状态
    this.state = {
      dataSource: new ListView.DataSource(this).cloneWithRows(props.data)
    }
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  _renderRow(rowData) {
    return (
      <StockListItem key={rowData.Obj} {...rowData} onPress={this.props.onItemPress}></StockListItem>
    )
  }

  componentWillReceiveProps(nextProp) {
    nextProp.data && this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProp.data)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.dataSource !== nextState.dataSource;
  }

  render() {
    return (
      <ListView
        renderHeader={this.props.renderHeader}
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow || this._renderRow.bind(this)}>
      </ListView>
    );
  }
}