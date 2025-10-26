/**
 * 快速创建view code
 */
const dayjs = require("dayjs");
const inquirer = require("inquirer");
const { createFile, createDirectory, getFileContent } = require("./filehand");
const { createStComp } = require("./stComp/createStStyleComp");
const { createStIpcModule } = require("./electronIpc/createStIpcModule");
const path = require("node:path");
console.log(getTimeNow(), "开始创建view code");

function getTimeNow() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}
// 定义选项
const questions = [
  {
    type: "list", // 单选列表类型
    name: "command", // 结果的键名
    message: "请选择创建类型：", // 提示信息
    choices: [
      { name: "st风格vue组件", value: "stComp" },
      { name: "st风格Ipc模块", value: "stIpcModule" },
      { name: "ant组件", value: "antComp" },
      { name: "文件管理组件", value: "fileComp" },
    ],
  },
];

// 递归执行选择（可选，让用户可重复选择）
async function selectCommand() {
  const answers = await inquirer.default.prompt(questions);
  const source = {
    getTimeNow,
    createDirectory,
    createFile,
    inquirer,
    path,
    getFileContent,
  };
  switch (answers.command) {
    case "stComp":
      await createStComp(source);
      break;
    case "stIpcModule":
      await createStIpcModule(source);
      break;
    case "antComp":
      console.log("文件生成完成");
      //   await selectCommand();
      break;
    case "fileComp":
      console.log("缓存清理完成");
      //   await selectCommand();
      break;
    case "exit":
      console.log("再见！");
      process.exit(0); // 退出程序
  }
}

// 启动交互
selectCommand();
