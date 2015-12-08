import React, {View, ScrollView} from 'react-native';
import BaseTab from './BaseTab.js';
import StaticImage from '../../components/StaticImage.js';
import homeImageSource from '../../images/home.png';

export default class HomeTab extends BaseTab {
  constructor(props) {
    super(props);
  }
  title = '金融云';
  renderContent() {
    return (
      <ScrollView style={{flex: 1}}>
        <StaticImage imageSource={homeImageSource}></StaticImage>
      </ScrollView>
    );
  }
}