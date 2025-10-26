import fs from "fs-extra";
import path from "node:path";
import matter from "gray-matter";
/**
 * 创建文件夹
 * @param {string} dirPath - 文件夹路径
 * @param {boolean} [recursive=true] - 是否递归创建父目录
 * @returns {Promise<void>}
 */
export async function createDirectory(dirPath, recursive = true) {
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

export async function createFile(filePath, content = "", overwrite = false) {
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

/**
 * 获取某文件的文本内容
 * @param {string} filePath - 文件路径
 * @param {string} [encoding='utf8'] - 编码格式
 * @returns {Promise<string>} 文件内容
 */
export async function getFileContent(filePath, encoding = "utf8") {
  try {
    // 检查路径是否存在
    await fs.access(filePath);

    // 检查是否为文件
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      throw new Error(`${filePath} 不是一个有效的文件`);
    }

    const filesourcedata = await fs.readFile(filePath, encoding);
    const parsed = matter(filesourcedata);
    return {
      mdHead: parsed.data,
      mdContent: parsed.content,
    };
  } catch (err) {
    console.error(`获取文件内容失败 ${filePath}:`, err.message);
    return 0;
    // throw err;
  }
}
