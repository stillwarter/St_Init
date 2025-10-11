import { initManangeFilePreload } from "./filemanageInitPreload";
import { Stconfig } from "../../config/stconfig";
function setFileManageProloadList() {
  const result = {};
  const advanceFileList = Stconfig.basePath;
  for (const item of advanceFileList) {
    Object.assign(result, initManangeFilePreload(item.processName));
  }
  return result;
}

export const filePreloadList = setFileManageProloadList();
