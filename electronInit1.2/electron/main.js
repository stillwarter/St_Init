const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const IS_DEV = process.env.NODE_ENV === 'development' || !!process.env.DEBUG;
const DEV_SERVER_URL = `http://localhost:${process.env.VITE_DEV_SERVER_PORT || 5173}`;

// 单实例锁定
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit();
}

const { loadDevEnv, getDevServerUrl } = require('./config/dev-config.js');
const log = require('./logger.js');

// 初始化环境
if (process.env.NODE_ENV === 'development') {
  loadDevEnv();
}
const isDev = process.env.NODE_ENV === 'development';
const devServerUrl = getDevServerUrl();

function createWindow() {
  log.info('[主进程] 创建主窗口');
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, '../build/icon.ico'),
    autoHideMenuBar: true, // 自动隐藏菜单栏（Win）
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: IS_DEV, // 仅在开发环境启用
      webSecurity: !IS_DEV // 开发时可能需要禁用部分安全限制
    }
  });

  // 开发环境：Vite服务
  if (isDev) {
    log.info('[主进程] 连接到开发服务器:', devServerUrl);
    ipcMain.on('vue-devtools-ready', () => {
      log.info('[主进程] vue devtools已就绪:');
    });
    mainWindow.loadURL(devServerUrl).catch((err) => {
      log.error('[主进程] 开发服务器连接失败:', err.message);
      showErrorPage(mainWindow, '开发服务器未启动，请运行npm run dev');
    });
    return;
  }

  // 生产环境：本地文件加载
  loadProductionPage(mainWindow);
}

// 加载生产环境的HTML文件（关键修复）
function loadProductionPage(window) {
  const htmlPath = path.join(__dirname, '..', 'dist', 'index.html');
  log.info('[主进程] 加载生产文件:', htmlPath);

  if (fs.existsSync(htmlPath)) {
    window.loadFile(htmlPath).catch((err) => {
      log.error('[主进程] 文件加载失败:', err.message);
      showErrorPage(window, `文件缺失: ${path.basename(htmlPath)}`);
    });
  } else {
    log.error('[主进程] HTML文件不存在:', htmlPath);
    showErrorPage(window, '资源文件缺失: index.html');
  }
}

// 错误处理页面
function showErrorPage(window, message) {
  const errorHtml = `
    <html>
      <body style="background:#1a1a1a;color:#fff;padding:2rem;font-family:Arial">
        <h1 style="color:#ff6b6b">应用启动失败</h1>
        <p style="font-size:1.2rem">${message}</p>
        <small style="color:#888">目录: ${__dirname}</small>
      </body>
    </html>
  `;
  window.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
}

// 应用生命周期
app.whenReady().then(() => {
  log.info('[主进程] 应用启动完成，环境:', isDev ? '开发' : '生产');
  createWindow();

  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    log.info('[主进程] 退出应用');
    app.quit();
  }
});

// IPC通信
ipcMain.handle('ping', () => 'pong from main process');

// 全局错误处理
process.on('uncaughtException', (err) => log.error('[主进程] 未捕获异常:', err));
process.on('unhandledRejection', (reason) => log.error('[主进程] 未处理拒绝:', reason));
