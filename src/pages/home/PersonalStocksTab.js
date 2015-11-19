import React, {ScrollView, View, Text, Component} from 'react-native';
import HomeTab from './HomeTab.js';

import StockList from '../../components/StockList.js';
import Storage from '../../components/Storage.js';
import DataSubscribe from '../../components/dzhyun/DataSubscribe.js';
import * as baseStyle from '../../components/baseStyle.js';

export default class PersonalStocksTab extends HomeTab {

  title = '自选股';
  constructor(props) {
    super(props);
  }

  renderContent() {
    return (
      <ScrollView>
        {/* <PersonalStocksList navigator={this.props.navigator}></PersonalStocksList> */}
        <HistoryStocksList navigator={this.props.navigator}></HistoryStocksList>
      </ScrollView>
    );
  }
}

class PersonalStocksList extends Component {

  storageKey = 'personal.stocks';
  title = '自选股';

  constructor(props) {
    super(props);

    this.state = {
      stockCodes: null
    }
  }

  componentDidMount() {

    // 从存储中查询出历史数据后设置到订阅的股票参数
    this.storage.getItem().then(data => {
      this.setState({stockCodes: data && data.length > 0 && data.map(eachData => eachData.Obj)});
    });
  }

  render() {
    return (
      <View>
        <Text style={{color: baseStyle.GRAY}}>{this.title}</Text>
        <DataSubscribe
          serviceUrl="/quote/dyna"
          propName="data"
          params={this.state.stockCodes && {obj: this.state.stockCodes}}
          adapt={(input) => {
            if (input) {

              // 先转成map
              let map = {};
              input.forEach((eachData) => {
                eachData.Data.Obj = eachData.Obj;
                map[eachData.Obj] = eachData.Data;
              });
              return (this._stocks || []).map((stock) => {
                let newData = map[stock.Obj];
                return Object.assign({}, stock, newData);
              });
            }
          }}>
            <Storage
              storageKey={this.storageKey}
              propName="data"
              ref={(storage) => {this.storage = storage}}
              onInitial={(data) => {this._stocks = data;}}
              onUpdate={(updateData) => {
                this._stocks = updateData;

                // 更新数据后如果stockCode变化，则重设stockCode
                let newStockCodes = (updateData ? updateData.map((eachData) => eachData.Obj) : []);
                if (JSON.stringify(newStockCodes) !== JSON.stringify(this.state.stockCodes)) {
                  this.setState({
                    stockCodes: newStockCodes
                  });
                }
              }}>
              <StockList onItemPress={(data) => this.props.navigator.push({component: 'DetailPage', ...data})}></StockList>
            </Storage>
        </DataSubscribe>
      </View>
    );
  }
}

class HistoryStocksList extends PersonalStocksList {
  storageKey = 'history.stocks';
  title = '最新浏览';
}