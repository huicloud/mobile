/**
 * Home页的标签的基类
 * Created by jiagang on 15/10/29.
 */

import React, {View, Component, Image} from 'react-native';
import Button from 'react-native-button';

import PageHeader from '../../components/PageHeader.js';
import * as baseStyle from '../../components/baseStyle.js';

export default class BaseTab extends Component {

  /**
   * 统一的头部标题栏，左侧自定义，右侧统一为交易和搜索按钮
   */
  renderHeader() {
    return (
      <PageHeader
        title={this.renderHeaderLeftBar() || this.title}
        rightComponent={
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Button onPress={() => this.props.navigator.push({component: 'SearchPage'})}>
              <Image source={{ uri: 'main_page_search', isStatic: true }} style={{width: 30, height: 30, margin: 5}}></Image>
            </Button>
          </View>
        }></PageHeader>
    );
  }

  renderHeaderLeftBar() {
  }

  renderFooter() {
  }

  renderContent() {
  }

  render() {
    return (
      <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
        <View>{this.renderHeader()}</View>
        <View style={{flex: 1}}>{this.renderContent()}</View>
        <View>{this.renderFooter()}</View>
      </View>
    );
  }
}