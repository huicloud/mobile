/**
 * 数据订阅，根据传入参数props去订阅云平台数据，当props变化时，取消之前的订阅，再次创建新的订阅
 * 成功接收到数据时将传递给children
 * Created by jiagang on 15/11/2.
 */
import DZHYunComponent from './DZHYunComponent.js';

export default class DataSubscribe extends DZHYunComponent {
  constructor(props) {
    super(props);

    this.defaultParams = {
      sub: 1
    };
  }
}