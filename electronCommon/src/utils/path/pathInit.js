/**
 * config里配置的需要管理的文件路径对其进行初始化操作，写入到process里
 */

import { Stconfig } from "../../config/stconfig";
import { getFilePathTwo } from "./pathResolver";

export function basePathInit() {
  const pathlist = Stconfig.basePath;
  if (pathlist.length) {
    for (const item of pathlist) {
      const { processName, path } = item;
      process[processName] = getFilePathTwo(path);
    }
  }
}
