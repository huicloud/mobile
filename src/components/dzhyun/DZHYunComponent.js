/**
 * 大智慧数据查询组件基类
 * 根据传入参数进行查询或者订阅，初始
 * Created by jiagang on 15/11/11.
 */

import React, {View, Component} from 'react-native';

import {connection} from './DZHYunConnection.js';

export default class DZHYunComponent extends Component {
  static defaultProps = {
    propName: 'data'
  };

  defaultParams = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  // 查询参数格式化，将object格式化为json字符串，将array格式化为逗号分隔字符串
  _formatQueryParams(params) {
    let result = {};
    Object.keys(params).map((key) => {
      let value = params[key];
      if (Array.isArray(value)) {
        result[key] = value.join(',');
      } else if (typeof value === 'object') {
        result[key] = JSON.stringify(value);
      } else {
        result[key] = value;
      }
    });
    return result;
  }

  // 重新请求数据后渲染
  refresh() {
    this._lastQueryProps && this._query(this._lastQueryProps);
  }

  cancel() {
    this._request && this._request.cancel();
    this._request = null;
  }

  // 返回false则表示不更新
  adapt(data) {
    let {adapt} = this.props;
    return (typeof adapt === 'function') ? adapt(data) : data;
  }

  _query(props) {

    // 取消上次请求
    this.cancel();

    // 重新请求
    if (props.params) {

      // 记录上一次请求参数
      this._lastQueryProps = props;
      this._request = connection.request(props.serviceUrl, this._formatQueryParams(Object.assign({}, this.defaultParams, props.params)), (data) => {
        if (!(data instanceof Error)) {
          Promise.resolve(this.adapt(data)).then((data) => {
            if (data !== false) {

              this.setState({data});

              // 触发事件
              let onData = this.props.onData;
              (typeof onData === 'function') && onData(data);
            }
          });
        }
      });
    }
  }

  componentDidMount() {
    this._query(this.props);
  }

  componentWillUnmount() {
    this.cancel();
  }

  componentWillReceiveProps(nextProps) {

    // 判断是否需要重新订阅数据
    if (this.props.serviceUrl !== nextProps.serviceUrl || JSON.stringify(this.props.params) !== JSON.stringify(nextProps.params)) {
      this._query(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.data !== nextState.data;
  }

  render() {
    if (this.props.children) {
      let child = React.Children.only(this.props.children);

      return React.cloneElement(child, this.state.data && {
          [this.props.propName || 'data']: this.state.data
        });
    }
    return <View></View>;
  }
}