/**
 * 交易模块（模拟）
 * Created by jiagang on 15/11/23.
 */
import Storage from '../components/Storage.js';
import StockStorageManager from './StockStorageManager.js';

export default class DealModule {

  constructor(account) {
    this.account = account;
    this.dealStorage = new Storage({storageKey: this._getStorageKey()});
    this.dealStorage.componentWillMount();
  }

  _getStorageKey() {
    return 'deal.' + this.account;
  }

  // 初始化缓存
  _initStorage() {

    let initData = {
      initTotalAssets: 100000,      // 投入总资产10万元
      restMoney: 100000,            // 剩余资金
      keepStocks: []                // 持有股票列表
    };

    this.dealStorage.setItem(initData);
    return initData;
  }

  _getDealInfo() {
    return this.dealStorage.getItem().then(data => data || this._initStorage());
  }

  // 持股市值等于股票现价乘以持有量（不考虑手续费）
  getMarketValue(stock) {
    return stock.ZuiXinJia * stock.ChiYouLiang;
  }

  // 盈亏等于现价减去买入均价乘以持有量
  getProfitLoss(stock) {
    return (stock.ZuiXinJia - stock.MaiRuJunJia) * stock.ChiYouLiang;
  }

  // 盈亏率等于现价减去买入均价除以买入均价
  getProfitLossRatio(stock) {
    return (stock.ZuiXinJia - stock.MaiRuJunJia) / stock.MaiRuJunJia;
  }

  // 总市值
  getTotalMarketValue() {
    return this.getKeepStocks().then(stocks => {
      return stocks.reduce((lastValue, stock) => this.getMarketValue(stock) + (lastValue || 0), 0);
    });
  }

  // 总盈亏
  getTotalProfitLoss() {
    return this.getKeepStocks().then(stocks => {
      return stocks.reduce((lastValue, stock) => this.getProfitLoss(stock) + (lastValue || 0), 0);
    });
  }

  // 总成本
  getTotalCost() {
    return this.getKeepStocks().then(stocks => {
      return stocks.reduce((lastValue, stock) => (stock.MaiRuJunJia * stock.ChiYouLiang) + (lastValue || 0), 0);
    });
  }

  // 总盈亏比
  getTotalProfitLossRatio() {
    return Promise.all([this.getTotalProfitLoss(), this.getTotalCost()]).then(([totalProfitLoss, totalCost]) => {
      return (totalProfitLoss / totalCost) || 0;
    });
  }

  // 当前总资产等于股票市值加上剩余资金
  getTotalAssets() {
    return Promise.all([this._getDealInfo(), this.getTotalMarketValue()]).then(([{restMoney}, totalMarketValue]) => {
      return restMoney + totalMarketValue;
    });
  }

  // 剩余可用资金
  getRestMoney() {
    return this._getDealInfo().then(({restMoney}) => restMoney);
  }

  // 持股信息（添加缓存的股票信息）
  getKeepStocks() {
    return Promise.all([this._getDealInfo(), StockStorageManager.getKeepStocks()]).then(([{keepStocks}, stocks]) => {
      let map = keepStocks.length > 0 ? Object.assign.apply(Object, keepStocks.map(stock => {
        return {[stock.Obj]: stock};
      })) : {};

      return stocks.map((stock) => {
        return Object.assign({}, map[stock.Obj], stock);
      });
    });
  }

  // 买入股票
  buy(stockCode, buyPrice, volume) {

    return this._getDealInfo().then(({initTotalAssets, restMoney, keepStocks}) => {
      let costMoney = parseInt(buyPrice * volume);

      // 判断是否有足够金额，足够则直接买入成功，不够则买入失败
      if (restMoney >= costMoney) {
        restMoney = restMoney - costMoney;

        // 更新持股信息，买入均价和持股数
        let stock = keepStocks.find(stock => stock.Obj === stockCode);

        if (!stock) {
          stock = {Obj: stockCode, MaiRuJunJia: 0, ChiYouLiang: 0};
          keepStocks.push(stock);
          StockStorageManager.addKeepStock({Obj: stockCode});
        }

        let lastAvgPrice = stock.MaiRuJunJia, lastVolumn = stock.ChiYouLiang;
        stock.ChiYouLiang = lastVolumn + volume;
        stock.MaiRuJunJia = Math.round((lastAvgPrice * lastVolumn + costMoney) * 100 / stock.ChiYouLiang) / 100;

        // 更新数据
        this._update(initTotalAssets, restMoney, keepStocks);
      } else {
        throw('剩余金额不足');
      }
    });
  }

  // 卖出股票
  sell(stockCode, sellValue, volumn) {

    return this._getDealInfo().then(({initTotalAssets, restMoney, keepStocks}) => {

      // 判断是否持有足够的股票
      let stockIndex = keepStocks.findIndex(stock => stock.Obj === stockCode),
        stock = keepStocks[stockIndex] || {Obj: stockCode, MaiRuJunJia: 0, ChiYouLiang: 0};

      if (stock.ChiYouLiang >= volumn) {
        let lastAvgPrice = stock.MaiRuJunJia,
          lastVolumn = stock.ChiYouLiang,
          sellStockValue = parseInt(sellValue * volumn);

        restMoney = restMoney + sellStockValue;
        stock.ChiYouLiang = lastVolumn - volumn;
        stock.MaiRuJunJia = Math.round((lastAvgPrice * lastVolumn - sellStockValue) * 100 / stock.ChiYouLiang) / 100;

        // 持股量为0时从持股中移出
        if (stock.ChiYouLiang === 0) {
          keepStocks.splice(stockIndex, 1);
          StockStorageManager.removeKeepStock(stock)
        }

        // 更新数据
        this._update(initTotalAssets, restMoney, keepStocks);
      } else {
        reject('持有股不足');
      }
    });
  }

  _update(initTotalAssets, restMoney, keepStocks) {
    this.dealStorage.setItem({initTotalAssets, restMoney, keepStocks});
  }

  addUpdateListener(listener) {
    this.dealStorage.addListener('update', listener);
    return this.dealStorage._subscribableSubscriptions[this.dealStorage._subscribableSubscriptions.length - 1];
  }
}

export let dealModule = new DealModule('default');