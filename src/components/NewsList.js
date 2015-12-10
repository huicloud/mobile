/**
 * 新闻列表
 * Created by jiagang on 15/11/12.
 */

import React, {View, Text, TouchableHighlight, StyleSheet, ListView} from 'react-native';

import DZHYunComponent from './dzhyun/DZHYunComponent.js';
import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';
import DateFormatText from './DateFormatText.js';
import Loading from './Loading.js';

export default class NewsList extends BaseComponent {

  styleSheet = StyleSheet.create({
    container: {
    },
    loading: {
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingIcon: {
      width: 24,
      height: 24,
      marginTop: 3,
      marginBottom: 3,
      marginLeft: 10,
      marginRight: 10
    },
    loadingLabel: {
      fontSize: 14,
      color: baseStyle.DEFAULT_TEXT_COLOR
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    listItemTitle: {
      fontSize: 20,
      //fontWeight: '200',
      marginBottom: 10,
      color: baseStyle.DEFAULT_TEXT_COLOR
    },
    listItemContext: {
      marginBottom: 10,
      fontSize: 14,
      color: baseStyle.GRAY
    },
    listItemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    ...Object.assign.apply(Object, ['listItemSource', 'listItemTime'].map(name => ({[name]: {fontSize: 12, color: baseStyle.GRAY}})))
  });

  constructor(props) {
    super(props);

    // 初始状态
    this.state = {
    }
  }

  componentWillReceiveProps(nextProp) {
    nextProp.data && this.setState({
      dataSource: (this.state.dataSource || new ListView.DataSource(this)).cloneWithRows(nextProp.data)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.dataSource !== nextState.dataSource;
  }


  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={this.props.onPressItem && this.props.onPressItem.bind(this, rowData)}
        underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        <View style={this.getStyles('listItem')}>
          <Text style={this.getStyles('listItemTitle')}>{rowData.title}</Text>
          {/*<Text style={this.getStyles('listItemContext')}>{rowData.context}</Text>*/}
          <View style={this.getStyles('listItemFooter')}>
            <Text style={this.getStyles('listItemSource')}>{rowData.source}</Text>
            <DateFormatText style={this.getStyles('listItemTime')} format="MM-DD HH:mm">{rowData.date}</DateFormatText>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderFooter() {

    // 如果loading为true则在底部显示加载中样式
    return (this.props.loading === true) && (
      <Loading style={{loading: {height: 1500}}}></Loading>
    );
  }

  render() {
    if (!this.state.dataSource) {
      return this._renderFooter();
    }
    return (
      <ListView
        style={this.getStyles('container')}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        onEndReached={this.props.onEndReached}
        renderFooter={this._renderFooter.bind(this)}
        >
      </ListView>
    );
  }
}

export class DZHYunNewsList extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: '/news/stock'
  };

  constructor(props) {
    super(props);

    this.defaultParams = {
      sort: 'DESC',
      start: -10
    };

    this.state = {
      data: null,
      loading: true
    };

    this._hasMore = true;
  }

  adapt(data) {
    let result = data && data[0] && data[0].Data;

    // 如果数据长度小于请求的count则表示没有更多数据了
    this._hasMore = !(result.length < this.defaultParams.count);

    this.setState({loading: false});

    return (this.state.data || []).concat(result);
  }

  _onEndReached(event) {

    // 判断是否还有数据，有数据则显示加载中，然后继续加载后面数据
    if (this._hasMore) {
      this.setState({loading: true});

      this.defaultParams.start = this.defaultParams.start || 0
    }
  }

  render() {
    return (
      <NewsList
        style={this.props.style}
        data={this.state.data}
        onEndReached={this._onEndReached.bind(this)}
        loading={this.state.loading}
        onPressItem={this.props.onPressItem}
        ></NewsList>
    );
  }
}

export class DZHYunAnnouncementList extends DZHYunNewsList {
  static defaultProps = {
    serviceUrl: '/announcemt/stock'
  };
  constructor(props) {
    super(props);
    this.defaultParams = {
      sort: 'DESC',
      start: -10
    };
  }
}