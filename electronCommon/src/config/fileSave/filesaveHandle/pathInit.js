import { tempfileList } from "../filesaveConfig";
import { getFilePath } from "./pathResolver";

export function usefilepathInit() {
  const pathlist = tempfileList;
  if (pathlist.length) {
    for (const item of pathlist) {
      const { processName, path } = item;
      process[processName] = getFilePath(path);
      console.log(
        "file路径已在process已构建",
        processName + ":" + process[processName]
      );
    }
  }
}
