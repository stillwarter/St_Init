import { createIpcMethod } from "../../utils/ipc/ipcRenderHandle";

// export const planPreloadList = {
//   createPlanJson: createIpcMethod("create-planJson", true),
//   getPlanJson: createIpcMethod("get-planJsonCtx", true),
// };

export function initManangeFilePreload(processName) {
  const createChannelName = "create-" + processName + "Json";
  const getJsonName = "get-" + processName + "JsonCtx";
  const createProperty = "create" + processName + "Json";
  const getProperty = "get" + processName + "Json";

  const obj = {};
  obj[getProperty] = createIpcMethod(getJsonName, true);
  obj[createProperty] = createIpcMethod(createChannelName, true);

  return obj;
}
