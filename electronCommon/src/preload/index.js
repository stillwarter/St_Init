import { createIpcMethod } from "../utils/ipc/ipcRenderHandle";
import { filePreloadList } from "./FilemangePreload/filemagepreload";

export const ipcRenderList = {
  getsystemInfo: createIpcMethod("get-system-info"),
  ...filePreloadList,
};
