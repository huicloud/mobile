/**
 * 继承react-native-button组件，修改为填满父容器按钮
 * Created by jiagang on 15/11/23.
 */
import React from 'react-native';
import ReactNativeButton from 'react-native-button';

export default class Button extends ReactNativeButton {
  render() {
    let element = super.render();
    return React.cloneElement(element, {style: [{flex: 1}, this.props.containerStyle]});
  }
}