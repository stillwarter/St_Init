import { setIpcMainModule } from "./stIpcModule.js";
import {
  getImprotPartRegex,
  matchListToString,
  replaceImportPart,
} from "./ipcReplace.js";

/* 常量配置 */
const ST_MAINIPC_BASEPATH = "src/main";
const ST_PRELOADIPC_BASEPATH = "src/preload";
const QUESTION = [
  {
    type: "input",
    name: "param",
    message: "请输入模块名称：",
    validate: (value) => {
      const valuelen = value.split(" ").length;
      if (value.trim() === "") {
        return "参数不能为空，请重新输入！";
      }
      if (valuelen <= 1) {
        return "参数必须多于一个，用空格隔开。";
      }
      return true;
    },
  },
];

/**
 * @param {Object} source 引入资源
 * 1.依赖校验，输出开始日志
 * 2.
 */
export async function createStIpcModule(source) {
  // 1.依赖校验，输出开始日志
  const requiredDeps = [
    "getTimeNow",
    "createDirectory",
    "createFile",
    "inquirer",
    "path",
  ];
  const missingDeps = requiredDeps.filter((dep) => !source[dep]);
  if (missingDeps.length > 0) {
    throw new Error(`缺少必要依赖：${missingDeps.join(", ")}`);
  }
  const { getTimeNow, inquirer, path, createDirectory, createFile } = source;
  console.log(getTimeNow(), "1.依赖校验，开始创建stIpc模块");
  // 2.调用inquirer获取输入参数
  const parmas = await getSingleParam(getTimeNow, inquirer);
  // STTODO
  const paramList = parmas.split(" ");
  const filename = paramList[0];
  const fnNameList = paramList.slice(1);
  const uniqueArrFnNameList = [...new Set(fnNameList)];

  // await createMainFileDir(source, filename, uniqueArrFnNameList);
  // process.exit(1);
}

/**
 * @param {inquirer} inquirer
 * @returns {answers}
 * @description 调用inquirer获取输入参数
 */
async function getSingleParam(getTimeNow,inquirer) {
  console.log(getTimeNow(), "2.调用inquirer获取输入参数");

  const answers = await inquirer.default.prompt(QUESTION);
  return answers.param.trim(); // 去除首尾空格
}

async function createMainFileDir(source, filename, fnNameList) {
  const {
    getTimeNow,
    inquirer,
    path,
    createDirectory,
    createFile,
    getFileContent,
  } = source;
  const cwd = process.cwd();
  const aim = path.join(cwd, ST_MAINIPC_BASEPATH, filename);
  //   await createDirectory(aim);
  const createMainIpcFileSource = {
    aim,
    path,
    filename,
    createFile,
    fnNameList,
    getFileContent,
  };
  await createMainIpcFile(createMainIpcFileSource);
}

function createPreloadFileDir() {}

async function createMainIpcFile({
  aim,
  path,
  filename,
  createFile,
  fnNameList,
  getFileContent,
}) {
  const mainfilename = path.join(aim, filename + "Main.js");
  const maincontent = setIpcMainModule(fnNameList);
  //   await createFile(mainfilename, maincontent);
  await updataMainIndex(path, getFileContent);
}

function createPreloadFie() {}

async function updataMainIndex(path, getFileContent) {
  const cwd = process.cwd();
  const aim = path.join(cwd, ST_MAINIPC_BASEPATH, "index.js");
  const getback = await getFileContent(aim);
  const content = getback.mdContent;
  //   console.log(content);
  replaceImportStatement(content, 123);
}

function updataPreloadIndex() {}

function replaceImportStatement(content, newImport) {
  //   const aim = matchListToString(getImprotPartRegex(content));
  const replacelist = getImprotPartRegex(content);

  // const c = content.replace(aim.join(','), 2);
  // console.log(c);
  let a = null;
  replacelist.map((item) => {
    if (a) {
      a = a.toString().replace(item, "");
    } else {
      a = content.toString().replace(item, "");
    }
  });
  console.log(a);
}

// function replaceImportStatement(code, newImport) {
//   // 正则表达式：匹配 import 语句（兼容默认导入和命名导入，修正原语法错误）
//   // 支持：import xxx from 'path' 或 import { xxx } from 'path'
//   const importRegex =
//     /^import\s+(?:['"](\w+)['"]|\{.*?\})\s+from\s+['"](.*?)['"];?/gm;

//   const n = `imoprt a from 'b'`;
//   const oldcontentimport = code.match(importRegex);
//   const newcontentimport = [...oldcontentimport, n];
//   // 替换匹配到的 import 语句
//   const replacedCode = code.replace(
//     oldcontentimport.join(","),
//     newcontentimport.join(",").replace(",", "")
//   );
//   //   console.log(oldcontentimport.join(","), 1);
//   //   console.log(newcontentimport.join(","), 2);

//   console.log(replacedCode);

//   return replacedCode;
// }
