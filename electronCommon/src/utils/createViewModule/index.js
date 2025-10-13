/**
 * 创建fn，const风格view模块
 */
const { limitArgs } = require("./limitArgs");
const { createFileCreateDirectory, getCreatePath } = require("./createModule");
console.log("创建view模块");

const parmas = process.argv.slice(2);
limitArgs(parmas, 1);
createFileCreateDirectory(parmas);

console.log("创建流程结束");
console.log("----------------------------------");

// setTimeout(() => {}, 1000);
