/**
 * Created by jiagang on 15/11/4.
 */
import React, {Component} from 'react-native';

export default class BasePage extends Component {

  constructor(props) {
    super(props);

    this._isActived = true;
  }

  componentDidMount() {
    let navigator = this.props.navigator,
      navigationContext = navigator.navigationContext;

    this._willFocusListener = navigationContext.addListener('willfocus', (event) => {

      // 触发willfocus时，如果currentPage是this的话，表示要从当前页跳转到其它页面，此时将触发pageWillDeactive
      if (navigator.currentPage === this) this.pageWillDeactive();

      // 如果route中的page存在则触发page的pageWillActive
      if (event.data.route.page === this) this.pageWillActive();
    });

    this._didFocusListener = navigationContext.addListener('didfocus', (event) => {

      // 触发didfocus时，如果currentPage是this的话，表示跳转到当前页面，此时将触发pageDidActive
      if (event.data.route.page === this) {
        navigator.currentPage = this;
        this.pageDidActive();
      }
    });

    // 认定初始创建挂载上的页面一定是要跳转到的页面
    navigator.currentPage = this;
    navigationContext.currentRoute.page = this;

    // 组件挂载完成触发页面的pageWillActive
    this.pageWillActive();
  }

  componentWillUnmount() {
    this._willFocusListener.remove();
    this._didFocusListener.remove();
  }

  shouldComponentUpdate() {
    return this._isActived;
  }

  // 页面将要切换到当前页面时触发（切换动画前）
  pageWillActive() {
    console.debug('pageWillActive', this.constructor.name);
  }

  // 页面已经切换到当前页面时触发（切换动画后）
  pageDidActive() {
    console.debug('pageDidActive', this.constructor.name);
    this._isActived = true;
  }

  // 页面将要从当前页面切换到其它页面时触发（切换动画前）
  pageWillDeactive() {
    console.debug('pageWillDeactive', this.constructor.name);
    this._isActived = false;
  }
}