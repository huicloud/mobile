/**
 * 页面标题
 * Created by jiagang on 15/11/5.
 */
import React, {View, Text, StyleSheet, Image, Platform, StatusBarIOS} from 'react-native';
import Button from 'react-native-button';
import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';
import TabBar, {StaticTabBarItem} from './TabBar.js';

// 设置IOS版本状态栏
Platform.OS === 'ios' && StatusBarIOS.setStyle('light-content');

export default class PageHeader extends BaseComponent {

  styleSheet = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    backButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 40,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      textAlign: 'center',
      color: baseStyle.WHITE,
      fontSize: 18
    },
    rightComponent: {
      position: 'absolute',
      top: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center'
    }
  });

  _renderBackButton() {
    return (typeof this.props.onBack === 'function') && (
      <View style={this.getStyles('backButton')}>
        <Button onPress={this.props.onBack}>
          <Image source={{ uri: 'back', isStatic: true }} style={{width: 24, height: 24, margin: 5}}></Image>
        </Button>
      </View>
    )
  }

  _renderTitle() {
    if (React.isValidElement(this.props.title)) {
      return this.props.title;
    } else if (typeof this.props.title === 'function') {
      return this.props.title();
    } else if (typeof this.props.title === 'string') {
      return <Text style={this.getStyles('title')}>{this.props.title}</Text>;
    }
  }

  _renderRightComponent() {
    return (
      <View style={this.getStyles('rightComponent')}>
        {this.props.rightComponent}
      </View>
    );
  }

  render() {
    return (
      <View style={[{backgroundColor: baseStyle.HEADER_BACKGROUND_COLOR, height: 40}, Platform.OS === 'ios' && {paddingTop: 20, height: 60}]}>
        <View style={this.getStyles('container')}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
            {this._renderTitle()}
          </View>
          {this._renderBackButton()}
          {this._renderRightComponent()}
        </View>
      </View>
    );
  }
}

export class HeaderTabBar extends BaseComponent {
  render() {
    return (
      <View style={[{flex: 1}, this.props.style]}>
        <TabBar
          style={{
          tabBar: {flex: 1, backgroundColor: baseStyle.BLACK, borderBottomWidth: 0, borderRadius: 15, marginVertical: 2, marginLeft: 4},
          tabBarItem: {borderBottomWidth: 0, margin: 2},
          tabBarItemLabel: {color: baseStyle.WHITE, fontSize: 16},
          tabBarItemSelected: {backgroundColor: '#3E6AC5', borderRadius: 10},
          tabBarItemLabelSelected: {color: baseStyle.WHITE}
          }}
          onChangeTab={(index) => {
            this.props.onChangeTab && this.props.onChangeTab(index);
            this.props.refTabBar && this.props.refTabBar.selectTab(index);
          }}>
          {this.props.tabItems.map((itemTitle, index) => <StaticTabBarItem key={index} title={itemTitle}></StaticTabBarItem>)}
        </TabBar>
      </View>
    );
  }
}