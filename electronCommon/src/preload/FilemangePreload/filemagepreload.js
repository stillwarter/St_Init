import { initManangeFilePreload } from "./filemanageInitPreload";
import { tempfileList } from "../../config/fileSave/filesaveConfig";
function setFileManageProloadList() {
  const result = {};
  for (const item of tempfileList) {
    Object.assign(result, initManangeFilePreload(item.processName));
  }
  return result;
}

export const filePreloadList = setFileManageProloadList();
