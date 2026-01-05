import { initManangeFile } from "./tempFileManageInit";
import { tempfileList } from "../../../config/fileSave/filesaveConfig";

function setTempFileManageList() {
  const result = [];
  for (const item of tempfileList) {
    result.push(...initManangeFile(item.processName));
  }
  return result;
}

export const tempfileMainList = setTempFileManageList();
