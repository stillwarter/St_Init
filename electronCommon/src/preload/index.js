import { createIpcMethod } from "../utils/ipc/ipcRenderHandle";

export const ipcRenderList = {
  getsystemInfo: createIpcMethod("get-system-info"),
};
