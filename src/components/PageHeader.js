/**
 * 页面标题
 * Created by jiagang on 15/11/5.
 */
import React, {View, Text, StyleSheet, Image} from 'react-native';
import Button from 'react-native-button';
import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';

export default class PageHeader extends BaseComponent {

  styleSheet = StyleSheet.create({
    container: {
      height: 40,
      backgroundColor: baseStyle.HEADER_BACKGROUND_COLOR,
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
      color: baseStyle.WHITE,
      fontSize: 14
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
      <View style={this.getStyles('container')}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          {this._renderTitle()}
        </View>
        {this._renderBackButton()}
        {this._renderRightComponent()}
      </View>
    );
  }
}