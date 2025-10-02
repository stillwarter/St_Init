import { registerIpcApis } from "./utils/ipc/ipcRenderHandle";
import { ipcRenderList } from "./preload/index";

registerIpcApis("electronAPI", { ...ipcRenderList });
