/**
 * 重载全局的console方法，在DEV环境下将指定级别日志直接显示，在生产环境下将指定级别日志记录到文件
 * Created by jiagang on 15/11/23.
 */

let console = global.console, logLevel = global.LOG_LEVEL || 'all',
  levels = {
    'all': 0,
    'info': 1,
    'debug': 2,
    'warn': 3,
    'error': 4,
    'none': 5
  }, nope = () => {};

// 如果debug不存在则将添加debug方法
console.debug = console.debug || console.log;

/**
 * 记录到文件
 * @param type
 * @param args
 */
let logOutputToFile = function (type, ...args) {

  // TODO 待实现，react-native-fs模块无法在已存在文件中添加数据，并且写文件的路径可能有权限问题，考虑自己写原生模块实现
};

Object.keys(levels).forEach((level) => {
  let func = console[level];
  if (func) {
    if (levels[level] >= levels[logLevel]) {
      if (__DEV__) {
        // 开发环境直接输出到控制台
      } else {
        // 生产环境输出到控制台同时记录到文件
        console[level] = (...args) => {
          func.apply(this, args);
        }
      }
    } else {
      console[level] = logOutputToFile.bind(console, level);
    }
  }
});