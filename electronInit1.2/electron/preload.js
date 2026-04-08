const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
  ping: () => ipcRenderer.invoke('ping')
});
