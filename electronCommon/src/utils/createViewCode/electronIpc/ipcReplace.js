/**
 * 针对ipc文件的替换函数
 * 1.获取原引入部分
 * 2.添加新引入部分
 * 3.清除原引入部分
 * 4.增加新引入部分
 */

/**
 * @param {*} content
 * @returns
 * @description 第一步，获取原引入部分
 */
export function getImprotPartRegex(content) {
  const importRegex =
    // /^import\s+(?:['"](\w+)['"]|\{.*?\})\s+from\s+['"](.*?)['"];?/gm;
    // /import\s+([\s\S]*?)\s+from\s+['"](.*?)['"];?|import\s+['"](.*?)['"];?/g;
    /import\s+[\s\S]*?from\s+['"][^'"]+['"];?|import\s+['"][^'"]+['"];?/g;
  return content.match(importRegex);
}

/**
 * @param {Array} oldImportpart
 * @param {Array} newImportlist
 * @returns {Array} aimlist
 * @description 第二步，获取新引入部分
 */
export function setNewImportPart(oldImportpart, newImportlist) {
  newImportlist.map((item) => {
    oldImportpart.push(item);
  });
  const aim = oldImportpart;
  return aim;
}

export function matchListToString(list) {
  return list.join(",").replace(",", "");
}

export function replaceImportPart(content, oldimport, newimport) {
  return content.replace(oldimport, newimport);
}
