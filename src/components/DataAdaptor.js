/**
 * 数据适配器，将输入数据经过自定方法转换后输出
 * Created by jiagang on 15/11/4.
 */

import React, {Component} from 'react-native';

export default class DataAdaptor extends Component {
  static defaultProps = {
    input: 'data'
  };

  constructor(props) {
    super(props);

    this.state = {
      outputData: null
    }
  }

  _getInputData(props) {
    let inputProp = props.input, inputData;
    switch(typeof inputProp) {
      case 'string':
        inputData = props[inputProp];
        break;
      case 'function':
        inputData = inputProp();
        break;
      default:
        inputData = inputProp;
    }
    return inputData;
  }

  _internalAdapt(props) {
    let inputData = this._getInputData(props),
      adaptFun = props.asyncAdapt || props.adapt || this.adapt;
    return Promise.resolve(adaptFun(inputData)).then(outputData => {
      this.setState({outputData});
      return outputData;
    });
  }

  componentWillReceiveProps(nextProps) {
    this._internalAdapt(nextProps);
  }

  adapt(input) {
    return input;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.outputData !== nextState.outputData;
  }

  render() {
    let outputProp = this.props.output || 'data',
      outputData = this.state.outputData;
    if (typeof outputProp === 'function') {
      outputProp(outputData);
      outputProp = 'data';
    }
    if (this.props.children) {
      let child = React.Children.only(this.props.children);
      return React.cloneElement(child, {
        [outputProp]: this.state.outputData
      });
    }
    return <View></View>;
  }
}
