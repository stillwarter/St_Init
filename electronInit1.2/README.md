# Electron + Vue 3 + Vite (JS) Starter

一个基于 Electron + Vite + Vue 3（JavaScript）的简单初始项目结构，适合作为桌面应用的起点。

## 安装

```bash
npm install
```

## 开发模式运行

一条命令同时启动 Vite（5173）与 Electron：

```bash
npm run dev
```

> 第一次运行前请确保已经安装依赖。

## 生产构建

```bash
npm run build
```

这会打包前端并使用 `electron-builder` 生成可分发的应用（可根据需要在 `package.json` 中继续完善配置）。

## 结构说明

- `electron/main.js`：主进程入口，创建窗口等。
- `electron/preload.js`：预加载脚本，通过 `contextBridge` 向渲染进程暴露安全 API。
- `renderer/`：基于 Vite + Vue 3 的前端代码。
- `vite.config.js`：Vite 配置，root 指向 `renderer`。
