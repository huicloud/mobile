/**
 * Created by jiagang on 15/11/16.
 */

import React, {View, Text, StyleSheet} from 'react-native';

import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';

export default class Loading extends BaseComponent {

  static defaultProps = {
    loadingText: '加载中'
  };

  styleSheet = StyleSheet.create({
    loading: {
      flex: 1,
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
    loadingText: {
      fontSize: 14,
      color: baseStyle.DEFAULT_TEXT_COLOR
    }
  });

  render() {
    return (
      <View style={this.getStyles('loading')}>
        <Text style={this.getStyles('loadingText')}>{this.props.children || this.props.loadingText}</Text>
      </View>
    );
  }
}
