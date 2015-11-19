/**
 * Created by jiagang on 15/10/29.
 */
import React, {View, Image, TextInput, Platform} from 'react-native';

import BasePage from './BasePage.js';
import PageHeader from '../components/PageHeader.js';

import * as baseStyle from '../components/baseStyle.js';
import Storage from '../components/Storage.js';
import {DZHSearchStockList} from '../components/SearchStockList.js';

export default class SearchPage extends BasePage {

  constructor(props) {
    super(props);

    this.state = {
      searchKey: props.searchKey
    };
  }

  _onChangeText(searchKey) {
    this.setState({searchKey});
  }

  render() {
    return (
      <View style={{backgroundColor: baseStyle.DEFAULT_BACKGROUND_COLOR, flex: 1}}>
        <PageHeader onBack={() => this.props.navigator.pop()} title="股票查询"></PageHeader>
        <View style={{margin: 5, borderColor: baseStyle.DEFAULT_BORDER_COLOR, borderWidth: 1, height: 34, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Image source={{uri: 'main_page_search', isStatic: true}} style={{width: 24, height: 24, margin: 5}}></Image>
          <TextInput
            style={[{flex: 1, color: baseStyle.DEFAULT_TEXT_COLOR, fontSize: 14}, Platform.OS === 'android' && {height: 44}]}
            textAlignVertical="bottom"
            keyboardType="default"
            placeholder="输入股票代码或者拼音首字母"
            placeholderTextColor={baseStyle.GRAY}
            onChangeText={(text) => this._onChangeText(text)}
            autoFocus={true}
            underlineColorAndroid="transparent"
            defaultValue={Platform.OS === 'android' ? (' ' || 'android版必须设置默认值才会显示颜色') : null}></TextInput>
        </View>
        <Storage storageKey={'history.stocks'} onInitial={(data) => this.setState({historyData: data})}></Storage>
        <DZHSearchStockList
          onItemPress={(data) => this.props.navigator.push({component: 'DetailPage', ...data})}
          style={{flex: 1}}
          params={this.state.searchKey && {input: this.state.searchKey}}
          historyData={this.state.historyData}></DZHSearchStockList>
      </View>
    );
  }
}