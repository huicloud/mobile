/**
 * 股票存储信息管理，用于管理持仓股，自选股和历史查看股票管理（内部存储在一个列表中）
 * Created by jiagang on 15/11/24.
 */
import Storage from '../components/Storage.js';

let stockStorage = new Storage({storageKey: 'stock.list'});
stockStorage.componentWillMount();

export default {

  // 查看一个股票，将其记录到历史最前面
  view(stock) {
    this.getAllStocks().then((stocks) => {
      let index = stocks.findIndex(eachStock => stock.Obj === eachStock.Obj);
      stock = Object.assign(index >= 0 ? stocks.splice(index, 1)[0] : {}, stock);
      stocks.unshift(stock);
      stockStorage.setItem(stocks);
    });
  },

  addFlagToStock(stock, flag) {
    this.getAllStocks().then((stocks) => {
      let foundStock = stocks.find(eachStock => stock.Obj === eachStock.Obj);
      if (foundStock) {
        Object.assign(foundStock, stock, {[flag]: true});
      } else {
        stocks.unshift(Object.assign(stock, {[flag]: true}));
      }
      stockStorage.setItem(stocks);
    });
  },

  removeFlagToStock(stock, flag) {
    this.getAllStocks().then((stocks) => {
      let foundStock = stocks.find(eachStock => stock.Obj === eachStock.Obj);
      foundStock && delete foundStock[flag];
      stockStorage.setItem(stocks);
    });
  },

  // 添加自选股
  addPersonalStock(stock) {
    this.addFlagToStock(stock, 'personal');
  },

  // 移出自选股
  removePersonalStock(stock) {
    this.removeFlagToStock(stock, 'personal');
  },

  addKeepStock(stock) {
    this.addFlagToStock(stock, 'keep');
  },

  removeKeepStock(stock) {
    this.removeFlagToStock(stock, 'keep');
  },

  updateStocks(input) {
    this.getAllStocks().then((stocks) => {
      // 先转成map
      let map = {};
      input.forEach((eachData) => {
        map[eachData.Obj] = eachData;
      });
      stocks = (stocks || []).map((stock) => {
        let newData = map[stock.Obj];
        return newData ? Object.assign({}, stock, newData) : stock;
      });
      stockStorage.setItem(stocks);
    });
  },

  getStockByCode(stockCode) {
    return this.getAllStocks().then(stocks => stocks.find(stock => stock.Obj === stockCode));
  },

  getAllStocks() {

    // 当缓存数据不存在时初始数据
    return stockStorage.getItem().then(data => data || [{Obj: 'SH000001', ZhongWenJianCheng: '上证指数'}, {Obj: 'SH600000', ZhongWenJianCheng: '浦发银行'}, {Obj: 'SH601519', ZhongWenJianCheng: '大智慧'}]);
  },

  getStocksByGroup(flag) {
    return this.getAllStocks().then(stocks => stocks.filter(stock => stock[flag] === true));
  },

  getPersonalStocks() {
    return this.getStocksByGroup('personal');
  },

  getKeepStocks() {
    return this.getStocksByGroup('keep');
  },

  // 判断是否是自选股
  isPersonalStocks(stockCode) {
    return this.getPersonalStocks().then(stocks => !!stocks.find(stock => stock.Obj === stockCode));
  },

  // 判断是否是持仓股
  isKeepStocks(stockCode) {
    return this.getKeepStocks().then(stocks => !!stocks.find(stock => stock.Obj === stockCode));
  },

  getAllStocksByGroup() {
    return this.getAllStocks().then(stocks => {
      let personal = [], keep = [], other = [];
      stocks.forEach(stock => {
        stock.keep ? keep.push(stock) : stock.personal ? personal.push(stock) : other.push(stock);
      });
      return {personal, keep, other};
    });
  },

  addUpdateListener(listener) {
    stockStorage.addListener('update', listener);
    return stockStorage._subscribableSubscriptions[stockStorage._subscribableSubscriptions.length - 1];
  }
};