/**
 * 用于显示股票格式化数据Text组件
 * Created by jiagang on 15/11/3.
 */

import React, {Text, Component} from 'react-native';

const DEFAULT_VALUE = '--';

export default class StockFormatText extends Component {

  /**
   * 格式化文本，将输入的数字参数格式化为指定精度的字符串
   * @param {!number|string|null} data      需要格式化的数字，可以是数字，字符串或者null对象
   * @param {?number} precision             保留小数精度，null则默认取2位小数
   * @param {?''|'K'|'M'|'K/M'|'%'} unit    单位，按自定的单位格式化数据，null则为''为不加单位
   * @param {boolean|string=} useDefault    是否使用默认值，默认显示--，字符串类型表示需要显示的默认值
   * @returns {string}
   */
  static formatNumber(data, precision, unit, useDefault) {

    if (data == null) {
      data = 0;
    }

    let n = Number(data);
    if ((n == 0 || isNaN(n)) && useDefault !== false) {
      return useDefault || DEFAULT_VALUE;
    }

    unit = unit || '';
    precision = precision != null ? precision : 2;

    if (unit === 'K/M') {
      if (n >= 10 * 1000 * 1000) {
        unit = 'M';
      } else if (n >= 10 * 1000) {
        unit = 'K';
      } else {
        unit = '';
      }
    }
    switch(unit) {
      case '%': n = n * 100; break;
      case 'K': n = n / 1000; break;
      case 'M': n = n / (1000 * 1000); break;
      case 100: n = n / 100; unit = ''; break;
    }
    return n.toFixed(precision) + unit;
  }

  formatText() {
    let {children, data, precision, unit, useDefault, sign} = this.props;
    let text, suffix = '';
    if (data === undefined) data = children;
    else suffix = children || '';

    // 字符串直接返回，非字符串则格式化为数字文本
    if (typeof data === 'string') {
      return data;
    } else {
      text = StockFormatText.formatNumber(data, precision, unit, useDefault);
      sign === true && data > 0 && (text = '+' + text);
      return (text !== DEFAULT_VALUE) ? text + suffix : text;
    }
  }

  render() {
    return <Text style={this.props.style}>{this.formatText()}</Text>;
  }
}