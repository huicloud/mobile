/**
 * Created by jiagang on 15/12/2.
 */
import React, {Image, View, Component} from 'react-native';

export default class StaticImage extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }
  _onLayout(type, event) {

    // 避免重复布局
    if (this._layout === true) return;

    if (type === 1) {
      this._layoutWidth = event.nativeEvent.layout.width;
    } else if (type === 2) {
      this._imageWidth =  event.nativeEvent.layout.width;
      this._imageHeight =  event.nativeEvent.layout.height;
    }

    // 两个宽度都得到后,计算图片的应该展示的宽高
    if (this._layoutWidth && this._imageWidth) {
      let layoutWidth = this._layoutWidth,
        layoutHeight = layoutWidth / this._imageWidth * this._imageHeight;

      this._layout = true;
      this.setState({layoutWidth, layoutHeight});
    }
  }

  componentWillReceiveProps(nextProps) {
    this._layout = false;
  }

  render() {
    return (
      <View style={this.props.style} onLayout={this._onLayout.bind(this, 1)}>
        <Image
          onLayout={this._onLayout.bind(this, 2)}
          style={[this.props.imageStyle, this.state.layoutWidth ? {width: this.state.layoutWidth, height: this.state.layoutHeight} : {opacity: 0}]} resizeMode={Image.resizeMode.stretch} source={this.props.imageSource}></Image>
      </View>
    );
  }
}