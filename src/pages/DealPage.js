/**
 * 交易页面
 * Created by jiagang on 15/10/29.
 */
import React, {View, Text} from 'react-native';
import Button from 'react-native-button';
import BasePage from './BasePage.js';

export default class DealPage extends BasePage {
  render() {
    return (
      <View>
        <Text style={{fontSize: 20, textAlign: 'center'}}>这将是交易页面</Text>
        <Button onPress={() => this.props.navigator.pop()}>返回</Button>
      </View>
    )
  }
}