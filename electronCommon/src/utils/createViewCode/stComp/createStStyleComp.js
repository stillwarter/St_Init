/**
 * 创建st风格组件
 */
import { setVueModule, setConstJs, setFnJs } from "./stModule.js";

/* 常量配置 */
const ST_VIEW_BASEPATH = "src/views"; // 基础视图路径
const MAX_PARAM_COUNT = 1; // 最大参数数量
const QUESTION = [
  {
    type: "input",
    name: "param",
    message: "请输入组件名称或路径：",
    validate: (value) => {
      if (value.trim() === "") {
        return "参数不能为空，请重新输入！";
      }
      return true;
    },
  },
];

/**
 * 入口：创建st组件
 * @param {Object} source - 依赖工具集 { getTimeNow, createDirectory, createFile, inquirer, path }
 */
export async function createStComp(source) {
  // 校验依赖是否齐全
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

  try {
    const { getTimeNow } = source;
    console.log(getTimeNow(), "开始创建st组件");

    // 获取并校验参数
    const param = await getSingleParam(source.inquirer);
    if (!limitArgs(param, MAX_PARAM_COUNT)) {
      console.error(getTimeNow(), "参数错误");
      return 0;
    }

    // 创建目录和文件
    await createFileAndDirectory(param, source);
    console.log(getTimeNow(), "创建完成");
  } catch (err) {
    console.error(`创建失败：${err.message}`);
    process.exit(1);
  }
}

/**
 * 获取用户输入的单个参数
 * @param {Object} inquirer - inquirer实例
 * @returns {string} 用户输入的参数
 */
async function getSingleParam(inquirer) {
  const answers = await inquirer.default.prompt(QUESTION); // 移除.default（通常inquirer直接导出prompt）
  return answers.param.trim(); // 去除首尾空格
}

/**
 * 限制参数数量
 * @param {string} args - 原始参数（可能包含空格）
 * @param {number} maxCount - 最大允许数量
 * @returns {boolean} 是否通过校验
 */
function limitArgs(args, maxCount) {
  const paramList = args.split(/\s+/).filter(Boolean); // 按空格分割并过滤空值
  if (paramList.length > maxCount) {
    throw new Error(
      `参数数量超出限制：最多允许${maxCount}个，实际传入${paramList.length}个`
    );
  }
  return true;
}

/**
 * 创建目录和文件
 * @param {string} itemPath - 组件路径/名称
 * @param {Object} source - 依赖工具集
 */
async function createFileAndDirectory(itemPath, source) {
  const { getTimeNow, createDirectory, createFile, path } = source;
  console.log(getTimeNow(), "创建文件路径和对应变量和功能函数");

  // 获取完整路径
  const targetPath = getCreatePath(itemPath, path);
  await createDirectory(targetPath); // 创建目录

  // 创建Vue文件、常量文件、函数文件
  await createVueRelatedFiles(targetPath, path, createFile);
}

/**
 * 计算组件的目标路径
 * @param {string} paramsPath - 输入的参数路径
 * @param {Object} pathModule - path模块
 * @returns {string} 完整的目标目录路径
 */
function getCreatePath(paramsPath, pathModule) {
  if (!paramsPath) {
    throw new Error("参数不能为空");
  }
  const cwd = process.cwd();
  // 使用path.join处理跨平台路径拼接
  return pathModule.join(cwd, ST_VIEW_BASEPATH, paramsPath);
}

/**
 * 创建Vue相关文件（.vue + Const.js + Fn.js）
 * @param {string} dirPath - 目标目录路径
 * @param {Object} pathModule - path模块
 * @param {Function} createFile - 创建文件的工具函数
 */
async function createVueRelatedFiles(dirPath, pathModule, createFile) {
  const baseName = pathModule.basename(dirPath); // 获取目录名作为基础名称

  // 1. 创建Vue文件
  const vueFilePath = pathModule.join(dirPath, `${baseName}.vue`);
  const vueContent = setVueModule(baseName);
  await createFile(vueFilePath, vueContent);

  // 2. 创建常量文件
  const constFilePath = pathModule.join(dirPath, `${baseName}Const.js`);
  const constContent = setConstJs(baseName);
  await createFile(constFilePath, constContent);

  // 3. 创建函数文件
  const fnFilePath = pathModule.join(dirPath, `${baseName}Fn.js`);
  const fnContent = setFnJs(baseName);
  await createFile(fnFilePath, fnContent);
}
