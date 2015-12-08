/**
 * Created by jiagang on 15/11/13.
 */
import React, {StyleSheet} from 'react-native';
import DZHChart from 'DZHChart';

import DZHYunComponent from './dzhyun/DZHYunComponent.js';
import * as baseStyle from './baseStyle.js';
import BaseComponent from './BaseComponent.js';
import Loading from './Loading.js';

export default class MinChart extends BaseComponent {

  styleSheet = StyleSheet.create({
    chart: {
      flex: 1
    }
  });

  render() {
    return (
      <DZHChart style={this.getStyles('chart')} chartData={{
        chartType: 'min',
        stkInfo: this.props.stkInfo,
        color: {
          ShangZhangYanSe: '#E43636',
          XiaDieYanSe: '#489F28',
          BeiJingYanSe: baseStyle.DEFAULT_BACKGROUND_COLOR
        },
        chartData: this.props.chartData
      }}></DZHChart>
    );
  }
}

import {connection} from './dzhyun/DZHYunConnection.js';

export class DZHMinChart extends DZHYunComponent {

  static defaultProps = {
    serviceUrl: '/quote/min'
  };

  constructor(props) {
    super(props);

    this.defaultParams = {
      sub: 1
    };
  }

  _requestLastClose(props) {
    return new Promise((resolve, reject) => connection.request('/stkdata', {obj: props.params.obj, field: ['ZuoShou', 'ZhongWenJianCheng']}, (data) => {
      data = data[0];
      if (data) {
        this.setState({stkInfo: {Obj: props.params.obj, MingCheng: data.ZhongWenJianCheng, ZuoShou: data.ZuoShou || 0}});
        resolve();
      }
    }));
  }

  _query(props) {

    // 先查询昨收和其它股票信息，查询完成后再订阅分时数据
    if (props.params) {
      this._requestLastClose(props).then(() => super._query(props));
    }
  }

  adapt(data) {

    if (data.length > 0) {

      // 当请求到分时数据时,判断当昨收为0时,重新请求昨收
      if (this.state.stkInfo.ZuoShou === 0) {
        this._requestLastClose(this.props);
      }

      data = data[0].Data || [];

      // 将查询出的分时数据转换成chart需要的完整数据
      if (!this._minTime) {

        this._minTime = [];
        this._minData = [];

        let start = data.length > 0 && data[0].ShiJian * 1000;

        // 默认开始时间当天9:30
        let now = start ? new Date(start) : new Date();
        now.setHours(9);
        now.setMinutes(30);
        now.setSeconds(0);
        now.setMilliseconds(0);

        let startTime = now.getTime(), time = startTime, oneMinute = 1 * 60 * 1000;

        for (let i = 0, length = 4 * 60; i <= length; i++) {
          let shiJian = parseInt(time / 1000);
          this._minTime.push(shiJian);
          this._minData.push({
            ShiJian: shiJian,
            ChengJiaoJia: null,
            ChengJiaoLiang: null,
            ChengJiaoE: null,
            JunJia: null
          });
          time = time + oneMinute;

          // 中午跳过90分钟
          if (i === (2 * 60)) {
            time += 90 * oneMinute;
          }
        }
      }

      data.forEach((eachData) => {
        let time = eachData.ShiJian,
          index = this._minTime.indexOf(time);
        if (index >= 0) {
          this._minData[index] = eachData;
        }
      });
      return Object.assign([], this._minData);
    }
    return false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    if (!this.state.data) {
      return <Loading></Loading>;
    } else {
      return <MinChart style={this.props.style} chartData={this.state.data} stkInfo={this.state.stkInfo}></MinChart>;
    }
  }
}