/**
 * 打开外部链接的webView页面
 * Created by jiagang on 15/12/11.
 */
import React, {View, Text} from 'react-native';
import BasePage from './BasePage.js';
import DzhWebView from 'DzhWebView';
import PageHeader from '../components/PageHeader.js';

export default class ExternalWebViewPage extends BasePage {

  onBack() {
    if (this._currentUrl && this._currentUrl !== this.props.url) {
      this._webView.goBack();
    } else {
      this.props.navigator.pop()
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <PageHeader onBack={this.onBack.bind(this)} title={this.props.title}></PageHeader>
        <DzhWebView
          onNavigationStateChange={(event) => {
            event.url && (this._currentUrl = event.url)
          }}
          ref={webView => webView && (this._webView = webView)}
          style={{flex: 1}}
          url={this.props.url}></DzhWebView>
      </View>
    )
  }
}