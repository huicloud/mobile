/**
 * 基础组件
 * Created by jiagang on 15/11/2.
 */
import React, {Component} from 'react-native';

export default class BaseComponent extends Component {

  static defaultProps = {

    // 全局传入的主题样式
    theme: {},

    // 组件创建时传入的样式
    style: {}
  };
  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.object
  };

  // 组件本身样式，应该在每个组件中定义
  styleSheet = {
  };

  getStyles(name) {
    if (Array.isArray(name)) return Array.prototype.concat.apply([], name.map(eachName => this.getStyles(eachName)));
    return [
      this.styleSheet && this.styleSheet[name],
      this.props.theme && this.props.theme[this.constructor.name] && this.props.theme[this.constructor.name][name],
      this.props.style && this.props.style[name]
    ];
  }

  getUpDownStyle(name, value) {
    let styles = [this.getStyles(name)];
    if (value > 0) styles.push(this.getStyles(name + 'Up'));
    else if (value < 0) styles.push(this.getStyles(name + 'Down'));
    return styles;
  }
}
