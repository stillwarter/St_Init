import { Stconfig } from "../../config/stconfig";
import { initManangeFile } from "./fileManageInit";

function setFileManageList() {
  const result = [];
  const advanceFileList = Stconfig.basePath;
  for (const item of advanceFileList) {
    result.push(...initManangeFile(item.processName));
  }
  return result;
}

export const fileMainList = setFileManageList();
