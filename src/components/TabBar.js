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
      fontSize: 12,
      color: baseStyle.DEFAULT_TEXT_COLOR
    },
    tabBarItemLabelSelected: {}
  });

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    }
  }

  selectTab(index) {
    this._onPressTabBarItem(index);
  }

  _onPressTabBarItem(index, childElement) {

    // 切换到对应的标签页，并且触发事件
    if (this.state.selectedIndex !== index && (this.props.children && index < this.props.children.length)) {
      this.setState({selectedIndex: index});
      this.props.onChangeTab && this.props.onChangeTab(index, childElement);
    }
  }

  _renderTabBarItem(childElement, index) {
    return (
      <TouchableHighlight
        style={{flex: 1}}
        key={index}
        onPress={this._onPressTabBarItem.bind(this, index, childElement)}
        underlayColor="transparent">
        <View style={[this.getStyles('tabBarItem'), (this.state.selectedIndex === index) && this.getStyles('tabBarItemSelected')]}>
          <Text style={[this.getStyles('tabBarItemLabel'), (this.state.selectedIndex === index) && this.getStyles('tabBarItemLabelSelected')]}>{childElement.props.title}</Text>
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
    let children = this.props.children.map((child, index) => {
      if (child.type === StaticTabBarItem || index === this.state.selectedIndex) {
        return React.cloneElement(child, {key: index, selected: this.state.selectedIndex === index});
      }
    });
    return (
      <View style={this.getStyles('container')}>
        {!this.props.tabBarHidden && this._renderTabBar()}
        <View style={{flex: 1}}>
        {children}
        </View>
      </View>
    );
  }
}

export class TabBarItem extends BaseComponent {
  render() {
    return this.props.children || <View></View>;
  }
}

export class StaticTabBarItem extends BaseComponent {
  render() {
    if (this.props.selected) {
      this.rendered = true;
      return (
        <View style={{flex: 1}}>{this.props.children}</View>
      )
    } else if (this.rendered) {
      return (
        <View style={{overflow: 'hidden', position: 'absolute', opacity: 0, height: 0, width: 0}}>{this.props.children}</View>
      )
    } else {
      return <View></View>
    }
  }
}