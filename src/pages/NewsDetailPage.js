/**
 * Created by jiagang on 15/11/16.
 */
import React, {View, Platform} from 'react-native';

import DzhWebView from 'DzhWebView';
import RdFileReader from 'RdFileReader';

import BasePage from './BasePage.js';
import PageHeader from '../components/PageHeader.js';
import Loading from '../components/Loading.js';
import * as baseStyle from '../components/baseStyle.js';

export default class NewsDetailPage extends BasePage {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {

    // 判断新闻内容是pdf则直接打开，zlib则请求新闻数据后展示
    let contextUrl = this.props.news.context || '';
    if (contextUrl.substr(-5) === '.zlib') {
      RdFileReader.readFromUrl(contextUrl, (text) => {
        this.setState({loading: false, html: `<html><head><meta charset="utf-8"/></head>${text}</html>`});
      });
    } else if (Platform.OS === 'android') {
      this.setState({loading: false, html: `<html><head><meta charset="utf-8"/></head><body><p><a href="${contextUrl}">${contextUrl}</a></p></body></html>`});
    } else {
      this.setState({loading: false, url: this.props.news.context});
    }
  }

  onHtmlEvent(event) {
    console.log(event);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <PageHeader onBack={() => this.props.navigator.pop()} title="新闻"></PageHeader>
        {this.state.loading ? <Loading></Loading> : (
          <DzhWebView
            ref={webView => webView && (this._webView = webView)}
            style={{flex: 1}}
            url={this.state.url}
            html={this.state.html}
            onHtmlEvent={this.onHtmlEvent.bind(this)}></DzhWebView>
        )}
      </View>
    );
  }
}