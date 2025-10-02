// process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
import { app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { ipcMain } from "electron-better-ipc";
import { Stconfig } from "./config/stconfig";
import { MainEventList } from "./main/index";
import { registerIpcHandlers } from "./utils/ipc/ipcMainHandle";
if (started) {
  app.quit();
}

// 确保应用单实例运行
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // 主窗口创建
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: Stconfig.projname,
    icon: path.join(__dirname, "penicon.ico"),
    // frame: false, // 不显示边框和工具栏
    autoHideMenuBar: true, // 隐藏菜单栏
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
    fullscreen: false,
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.on("did-finish-load", () => {
      // 可选：仅在需要时通过代码打开
      mainWindow.webContents.openDevTools();
    });
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  // mainWindow.webContents.openDevTools();

  // 窗口事件监听
  mainWindow.on("closed", () => {
    // 在Windows上，通常会将窗口引用置空
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  registerIpcHandlers(MainEventList);
  // app.setAppUserModelId("catbox");
  createWindow();
});

// app.on("before-quit", (event) => {
//   // 在这里进行关闭前的操作
//   console.log("应用即将关闭，执行清理操作...");
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });
