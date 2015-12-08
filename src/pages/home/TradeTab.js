import React, {View, ScrollView} from 'react-native';
import BaseTab from './BaseTab.js';
import StaticImage from '../../components/StaticImage.js';
import tradeImageSource from '../../images/trade.png';

export default class TradeTab extends BaseTab {
  constructor(props) {
    super(props);
  }
  title = '交易';
  renderContent() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
        <StaticImage imageSource={tradeImageSource}></StaticImage>
      </ScrollView>
    );
  }
}