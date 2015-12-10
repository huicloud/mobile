/**
 * 配置信息（直接放在全局）
 * Created by jiagang on 15/11/4.
 */

// 云服务器配置信息配置到全局
global.DZHYUN_ADDRESS = 'ws://v2.yundzh.com/ws?token=85dc0ade19b74a1ba4718112fd4b97fb';

// 开发联调环境
//global.DZHYUN_ADDRESS = 'ws://10.15.144.101:80/ws';

// 测试联调环境
//global.DZHYUN_ADDRESS = 'ws://10.15.144.80/ws';

global.DZHYUN_DATA_TYPE = 'pb';

// 日志记录级别，可取值为all|info|debug|warn|error|none
global.LOG_LEVEL = 'all';