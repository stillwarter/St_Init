import {
  overwriteFileContent,
  readAllFilesContent,
} from "../../utils/fileHandle";
import path from "path";

export function initManangeFile(processName) {
  const createChannelName = "create-" + processName + "Json";
  const getJsonName = "get-" + processName + "JsonCtx";

  return [
    {
      channel: createChannelName,
      type: "answer",
      description: "创建计划json文件",
      handler: async ({ filename, content }) => {
        const jsonpath = path.join(process[processName], filename);
        const result = overwriteFileContent(jsonpath, content);
        return result;
      },
    },
    {
      channel: getJsonName,
      type: "answer",
      description: "获取所有计划内容",
      handler: async () => {
        const path = process[processName];
        const result = await readAllFilesContent(path);
        return result;
      },
    },
  ];
}
