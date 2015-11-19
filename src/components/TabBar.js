/**
 * 标签页组件
 * Created by jiagang on 15/11/12.
 */
import React, {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';

export default class TabBar extends BaseComponent {

  styleSheet = StyleSheet.create({
    container: {
      flex: 1
    },
    tabBar: {
      height: 30,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR
    },
    tabBarItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 4,
      borderBottomColor: 'transparent'
    },
    tabBarItemSelected: {
      borderBottomColor: baseStyle.DARK_GRAY
    },
    tabBarItemLabel: {
      color: baseStyle.DEFAULT_TEXT_COLOR
    }
  });

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    }
  }

  componentDidMount() {

  }

  _onPressTabBarItem(childElement, index) {

    // 切换到对应的标签页，并且触发事件
    if (this.state.selectedIndex !== index) {
      this.setState({selectedIndex: index});
      this.props.onChangeTab && this.props.onChangeTab(childElement, index);
    }
  }

  _renderTabBarItem(childElement, index) {
    return (
      <TouchableHighlight
        style={{flex: 1}}
        key={index}
        onPress={this._onPressTabBarItem.bind(this, childElement, index)}
        underlayColor={baseStyle.DEFAULT_BACKGROUND_COLOR}
        >
        <View style={[this.getStyles('tabBarItem'), (this.state.selectedIndex === index) && this.getStyles('tabBarItemSelected')]}>
          <Text style={this.getStyles('tabBarItemLabel')}>{childElement.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderTabBar() {

    // 根据多个children创建出bar
    return (
      <View style={this.getStyles('tabBar')}>
        {(this.props.children || []).map((childElement, index) => this._renderTabBarItem(childElement, index))}
      </View>
    );
  }

  render() {
    return (
      <View style={this.getStyles('container')}>
        {this._renderTabBar()}
        {React.cloneElement(this.props.children[this.state.selectedIndex])}
      </View>
    );
  }
}

export class TabBarItem extends BaseComponent {
  render() {
    return this.props.children;
  }
}