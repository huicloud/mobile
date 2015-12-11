import React, {View, ScrollView, Text, TouchableHighlight, Image} from 'react-native';
import BaseTab from './BaseTab.js';
import StaticImage from '../../components/StaticImage.js';
import homeImageSource from '../../images/home.png';

import adv1 from '../../images/adv1.png';
import icon1 from '../../images/icons/icon1.png';
import icon2 from '../../images/icons/icon2.png';
import icon3 from '../../images/icons/icon3.png';
import icon4 from '../../images/icons/icon4.png';
import icon5 from '../../images/icons/icon5.png';
import icon6 from '../../images/icons/icon6.png';
import icon7 from '../../images/icons/icon7.png';
import icon8 from '../../images/icons/icon8.png';
import icon9 from '../../images/icons/icon9.png';
import icon10 from '../../images/icons/icon10.png';
import icon11 from '../../images/icons/icon11.png';
import finance1 from '../../images/finance1.png';
import finance2 from '../../images/finance2.png';
import invest1 from '../../images/invest1.png';
import invest2 from '../../images/invest2.png';
import invest3 from '../../images/invest3.png';
import invest4 from '../../images/invest4.png';
import invest5 from '../../images/invest5.png';

import * as baseStyle from '../../components/baseStyle.js';

export default class HomeTab extends BaseTab {
  constructor(props) {
    super(props);
  }
  title = '金融云';

  _renderItem(title, icon, url) {
    return (
      <TouchableHighlight
        style={{flex: 1}}
        onPress={() => url && this.props.navigator.push({component: 'ExternalWebViewPage', url, title})}
        underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        <View style={{alignItems: 'center', paddingVertical: 10}}>
          <StaticImage style={{width: 40, height: 40, margin: 5}} imageSource={icon}></StaticImage>
          <Text style={{fontSize: 18}}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderTipItem(image, title, content) {
    return (
      <TouchableHighlight
        underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
        <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: baseStyle.LIGHTEN_GRAY, flexDirection: 'row', alignItems: 'stretch'}}>
          <StaticImage imageSource={image} style={{flex: 1}}></StaticImage>
          <View style={{flex: 3, flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18, marginBottom: 10, color: baseStyle.DEFAULT_TEXT_COLOR}}>{title}</Text>
            <Text style={{fontSize: 16, color: baseStyle.GRAY}}>{content}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{fontSize: 12, color: baseStyle.GRAY}}>12-01</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderContent() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: baseStyle.LIGHTEST_GRAY}}>
        <View>
          <StaticImage imageSource={adv1}></StaticImage>
        </View>
        <View style={{backgroundColor: baseStyle.WHITE}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            {this._renderItem('慧问', icon3, 'http://htg.yundzh.com?DZHSPECIAL=40')}
            {this._renderItem('路演直播', icon2, 'http://htg.yundzh.com/ttch?DZHSPECIAL=40')}
            {this._renderItem('微视频', icon6, 'http://shipin.yundzh.com?DZHSPECIAL=40')}
            {this._renderItem('新股申购', icon5, 'http://mnews.gw.com.cn/wap/news/xgfx/ns/ns_sg.html')}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10}}>
            {this._renderItem('理财产品', icon1)}
            {this._renderItem('资金持仓', icon4)}
            {this._renderItem('港股通', icon7)}
            {this._renderItem('OTC产品', icon8)}
          </View>
        </View>
        <View style={{backgroundColor: baseStyle.WHITE, marginTop: 10}}>
          <View style={{paddingVertical: 10, paddingHorizontal: 10, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, borderBottomWidth: 1}}>
            <View style={{borderLeftWidth: 8, borderLeftColor: '#FD851A'}}>
              <Text style={{paddingHorizontal: 8, color: '#FD851A', fontSize: 18}}>最新推荐</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
            <View style={{flex: 1, margin: 5, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: baseStyle.DEFAULT_BORDER_COLOR}} >
              <StaticImage imageSource={finance1}></StaticImage>
            </View>
            <View style={{flex: 1, margin: 5, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: baseStyle.DEFAULT_BORDER_COLOR}} >
              <StaticImage imageSource={finance2}></StaticImage>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: baseStyle.WHITE, marginTop: 10}}>
          <View style={{paddingVertical: 10, paddingHorizontal: 10, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, borderBottomWidth: 1}}>
            <View style={{borderLeftWidth: 8, borderLeftColor: '#C42823'}}>
              <Text style={{paddingHorizontal: 8, color: '#C42823', fontSize: 18}}>通知公告</Text>
            </View>
          </View>
          <TouchableHighlight
            underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
            <View style={{padding: 14}}>
              <Text style={{fontSize: 18}}>基金最新持仓动向最权威的基金持仓</Text>
              <Text style={{fontSize: 14, color: baseStyle.LIGHT_GRAY}}>2015-12-01 10:50:00</Text>
              <Image source={{ uri: 'account_right', isStatic: true }} style={{position: 'absolute', top: 25, right: 10, width: 10, height: 15}}></Image>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{backgroundColor: baseStyle.WHITE, marginTop: 10}}>
          <View style={{paddingVertical: 10, paddingHorizontal: 10, borderBottomColor: baseStyle.DEFAULT_BORDER_COLOR, borderBottomWidth: 1}}>
            <View style={{borderLeftWidth: 8, borderLeftColor: '#334787'}}>
              <Text style={{paddingHorizontal: 8, color: '#334787', fontSize: 18}}>投资锦囊</Text>
            </View>
          </View>
          {this._renderTipItem(invest1, '投资"中国元"时代', '人民币纳入SDR, 是国际化道路迈出的一大步')}
          {this._renderTipItem(invest2, 'PMI小幅下滑, 制造业仍疲惫', '11月PMI新发布, 有哪些新变化')}
          {this._renderTipItem(invest3, '人民币加入SDR, 布局优质成长', '盘中波动恐加大, 适度波段, 但整体向上趋势不变')}
          {this._renderTipItem(invest4, '中小票吃香, 短期beta为主', '电子行业关注短期机会, 长线公司坚持持有')}
          {this._renderTipItem(invest5, '重点行业: 房地产, 有色金属等', '坏消息不断, 怎么办')}
        </View>
        <View style={{backgroundColor: baseStyle.WHITE, marginTop: 10}}>
          <TouchableHighlight
            underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
            <View style={{paddingVertical: 12, paddingHorizontal: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <StaticImage style={{width: 30, height: 30, marginRight: 5}} imageSource={icon10}></StaticImage>
                <Text style={{paddingHorizontal: 8, color: '#3656BE', fontSize: 18}}>问卷调查</Text>
                <Image source={{ uri: 'account_right', isStatic: true }} style={{position: 'absolute', top: 8, right: 0, width: 10, height: 15}}></Image>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{backgroundColor: baseStyle.WHITE, marginTop: 10}}>
          <TouchableHighlight
            underlayColor={baseStyle.HIGH_LIGHT_COLOR}>
            <View style={{paddingVertical: 12, paddingHorizontal: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <StaticImage style={{width: 30, height: 30, marginRight: 5}} imageSource={icon11}></StaticImage>
                <Text style={{paddingHorizontal: 8, color: '#C12722', fontSize: 18}}>意见反馈</Text>
                <Image source={{ uri: 'account_right', isStatic: true }} style={{position: 'absolute', top: 8, right: 0, width: 10, height: 15}}></Image>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}