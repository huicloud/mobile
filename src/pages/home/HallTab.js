import React, {View, ScrollView} from 'react-native';
import BaseTab from './BaseTab.js';
import StaticImage from '../../components/StaticImage.js';
import hallImageSource from '../../images/hall.png';

export default class HallTab extends BaseTab {
  constructor(props) {
    super(props);
  }
  title = '掌厅';
  renderContent() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F3F3F7'}}>
        <StaticImage imageSource={hallImageSource}></StaticImage>
      </ScrollView>
    );
  }
}