const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const { loadDevEnv, getDevServerUrl } = require('../scripts/dev-config');
const log = require('./logger');

if (process.env.NODE_ENV === 'development') {
  loadDevEnv();
}

const isDev = process.env.NODE_ENV === 'development';
const devServerUrl = getDevServerUrl();
const openDevTools = process.env.OPEN_DEVTOOLS === '1';

function createWindow() {
  log.info('[主进程] 创建浏览器窗口');
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    log.info('[主进程] web上下文加载完成');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    log.error('[主进程] 胃部上下文加载失败', {
      errorCode,
      errorDescription,
      validatedURL
    });
  });

  if (isDev) {
    log.info('[主进程] 载入dev url:', devServerUrl);
    mainWindow.loadURL(devServerUrl);
    if (openDevTools) {
      mainWindow.webContents.openDevTools();
    }
  } else {
    const filePath = path.join(__dirname, '..', 'dist', 'index.html');
    log.info('[主进程] 载入生产环境文件:', filePath);
    mainWindow.loadFile(filePath);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    log.info('[主进程] 所有窗口关闭，离开app');
    app.quit();
  }
});

ipcMain.handle('ping', async () => {
  // 保持低侵入，仅用于开发演示
  return 'pong from main process 123';
});

process.on('uncaughtException', (err) => {
  log.error('[主进程] uncaughtException:', err);
});

process.on('unhandledRejection', (reason) => {
  log.error('[主进程] unhandledRejectionccc:', reason);
});
