import { fileMainList } from "./filemange/fileManageMain";
import { a } from "./filemange/fileManageMain";

export const MainEventList = [
  {
    channel: "get-system-info",
    type: "answer",
    description: "获取系统信息",
    handler: async () => {
      return {
        platform: {
          des: "平台",
          value: process.platform,
        },
        version: {
          des: "版本号",
          value: process.version,
        },
      };
    },
  },
  ...fileMainList,
];
