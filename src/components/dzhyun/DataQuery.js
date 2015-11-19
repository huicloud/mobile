/**
 * Created by jiagang on 15/11/2.
 */
import DZHYunComponent from './DZHYunComponent.js';

export default class DataQuery extends DZHYunComponent {
  constructor(props) {
    super(props);

    this.defaultParams = {
      sub: 0
    };
  }
}