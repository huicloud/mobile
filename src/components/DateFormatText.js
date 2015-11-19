/**
 * 日期格式化组件，输入参数支持Date类型，秒数，毫秒数
 * Created by jiagang on 15/11/10.
 */
import React, {Text, Component} from 'react-native';
import moment from 'moment';

moment.locale('zh_cn');

export default class DateFormatText extends Component {

  formatText() {
    let {dateTime, inputFormat='YYYYMMDDHHmmss', children, format='dateTime'} = this.props, suffix = '';

    if (dateTime === undefined) dateTime = children;
    else suffix = children || '';

    let momentResult = this._parse(dateTime, inputFormat);
    if (momentResult.isValid()) {
      return this._format(this._parse(dateTime, inputFormat), format) + suffix;
    } else {
      return '--';
    }
  }

  _parse(dateTime, format) {
    if (dateTime instanceof Date) {
      return moment(dateTime);
    } else if (typeof dateTime === 'number') {
      return moment(new Date(dateTime < 100000000000 ? dateTime * 1000 : dateTime));
    } else {
      return moment(dateTime, format);
    }
  }

  _format(date, format) {
    switch (format) {
      case 'dateTime': return this._formatDateTime(date, true);
      case 'date': return this._formatDateTime(date, false);
      case 'time': return moment(date).format('HH:mm:ss');
      default: return moment(date).format(format);
    }
  }

  _formatDateTime(date, withTime) {
    let dateMoment = moment(date),
      todayStartTime = moment().startOf('day'),
      lastDayStartTime = todayStartTime.subtract(1, 'day'),
      thisWeekStartTime = moment().startOf('week'),
      thisYearStartTime = moment().startOf('year');

    if (!dateMoment.isBefore(todayStartTime)) {
      return withTime === true ? dateMoment.format('HH:mm:ss') : '今天';
    } else if (!dateMoment.isBefore(lastDayStartTime)) {
      return '昨天';
    } else if (!dateMoment.isBefore(thisWeekStartTime)) {
      return dateMoment.format('dddd');
    } else if (!dateMoment.isBefore(thisYearStartTime)) {
      return dateMoment.format('MM-DD');
    } else {
      return dateMoment.format('YYYY-MM-DD');
    }
  }

  render() {
    return (
      <Text style={this.props.style}>{this.formatText()}</Text>
    )
  }
}