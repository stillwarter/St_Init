const path = require('path');
const log = require('electron-log');

function setupLogger() {
  const isDev = process.env.NODE_ENV === 'development';

  log.transports.console.level = isDev ? 'debug' : 'info';
  log.transports.file.level = 'info';

  // 把文件日志落到 userData/logs，避免写入项目目录
  log.transports.file.resolvePath = () => {
    // resolvePath 在主进程执行时可安全使用 app.getPath('userData')
    try {
      // 延迟 require electron，避免在非 electron 环境报错
      const { app } = require('electron');
      const logsDir = path.join(app.getPath('userData'), 'logs');
      return path.join(logsDir, 'main.log');
    } catch {
      return path.join(process.cwd(), 'main.log');
    }
  };

  // 统一异常捕获（不弹窗）
  try {
    if (typeof log.catchErrors === 'function') {
      log.catchErrors({ showDialog: false });
    }
  } catch {
    // ignore
  }

  return log;
}

module.exports = setupLogger();

