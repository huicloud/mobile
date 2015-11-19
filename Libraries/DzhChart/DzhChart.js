/**
 * Created by jiagang on 15/11/13.
 * @providesModule DZHChart
 */
import React, {Component, PropTypes, requireNativeComponent} from 'react-native';

var iface = {
  name: 'DzhChart',
  propTypes: {
    chartData: PropTypes.string
  }
};

var NativeDzhChart = requireNativeComponent('RCTDzhChart', iface);

export default class DZHChart extends Component {
  render() {
    return <NativeDzhChart style={this.props.style} chartData={JSON.stringify(this.props.chartData)}></NativeDzhChart>
  }
}