/**
 * 创建view模块
 */
// const { vueModule } = require("./module");
import { setVueModule, setConstJs, serFnJs } from "./module.js";
import path from "node:path";

export async function createFileCreateDirectory(decpath) {
  const path = getCreatePath(decpath);
  await createDirectory(path);
  console.log("创建组件和对应函数");
  createVue(path);
}

export function getCreatePath(parmaspath) {
  if (!parmaspath) {
    process.exit(1);
  } else {
    const cwd = process.cwd();
    return cwd + "//" + "src//views//" + parmaspath;
  }
}

async function createVue(decpath) {
  const dirname = path.normalize(decpath);
  const basename = path.basename(dirname);
  const vuepath = setVuePath(dirname, basename);
  const vueModule = setVueModule(basename);
  await createFile(vuepath, vueModule);

  const vueConstJsPath = setConstJsPath(dirname, basename);
  const vueFnJsPath = setFnJsPath(dirname, basename);
  const vueConstModule = setConstJs(basename);
  const vueFnModule = serFnJs(basename);
  await createFile(vueConstJsPath, vueConstModule);
  await createFile(vueFnJsPath, vueFnModule);
}

function setVuePath(dirname, basename) {
  const aimpath = dirname + "//" + basename + ".vue";
  return path.normalize(aimpath);
}

function setConstJsPath(dirname, basename) {
  const aimpath = dirname + "//" + basename + "Const.js";
  return path.normalize(aimpath);
}
function setFnJsPath(dirname, basename) {
  const aimpath = dirname + "//" + basename + "Fn.js";
  return path.normalize(aimpath);
}

/* --------------------------------------------------------------------- */
import fs from "fs-extra";
// const fs = require(".fs-extra");
/**
 * 创建文件夹
 * @param {string} dirPath - 文件夹路径
 * @param {boolean} [recursive=true] - 是否递归创建父目录
 * @returns {Promise<void>}
 */
async function createDirectory(dirPath, recursive = true) {
  try {
    // 记录操作前的路径是否存在
    const existedBefore = await fs.pathExists(dirPath);
    if (existedBefore) {
      console.log("已经存在该view模块，需要删除后才能重新创建");
      process.exit(1);
    }
    // 确保目录存在
    await fs.ensureDir(dirPath, { recursive });

    console.log(`文件夹创建成功: ${dirPath}`);

    // 返回成功信息对象
    return {
      success: true,
      dirPath: dirPath,
      recursive: recursive,
      existedBefore: existedBefore, // 操作前目录是否已存在
      message: existedBefore
        ? `文件夹已存在: ${dirPath}`
        : `文件夹已创建: ${dirPath}`,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`创建文件夹失败 ${dirPath}:`, err.message);
    throw err;
  }
}

async function createFile(filePath, content = "", overwrite = false) {
  try {
    // 检查文件是否已存在
    const exists = await fs.pathExists(filePath);
    if (exists && !overwrite) {
      throw new Error(`文件已存在: ${filePath}`);
    }

    // 确保目录存在
    await fs.ensureDir(path.dirname(filePath));

    // 写入文件
    await fs.writeFile(filePath, content);
    console.log(`文件创建成功: ${filePath}`);

    return {
      success: true,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`创建文件失败 ${filePath}:`, err.message);
    throw err;
  }
}
