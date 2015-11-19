/**
 * Created by jiagang on 15/11/4.
 */
import React, {Component} from 'react-native';

export default class BasePage extends Component {

  constructor(props) {
    super(props);

    this._isActived = true;

    props.navigator.navigationContext.addListener('willfocus', (event) => {
    });
  }

  shouldComponentUpdate() {
    return this._isActived;
  }

  pageWillActive() {

  }

  pageDidActive() {

  }

  pageWillDeactive() {

  }

  pageDidDeactive() {

  }
}