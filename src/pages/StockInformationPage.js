/**
 * Created by jiagang on 15/11/23.
 */
import React, {View, Text} from 'react-native';
import BasePage from './BasePage.js';
import PageHeader from '../components/PageHeader.js';

export default class StockInformationPage extends BasePage {
  render() {
    return (
      <View style={{flex: 1}}>
        <PageHeader onBack={() => this.props.navigator.pop()} title="详细信息"></PageHeader>
      </View>
    );
  }
}