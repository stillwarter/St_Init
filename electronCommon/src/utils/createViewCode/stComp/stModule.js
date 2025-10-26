/**
 * 模板生成工具：生成Vue组件及相关JS文件的模板内容
 */

/**
 * 生成Vue组件模板
 * @param {string} baseName - 基础名称（组件名/模块名）
 * @returns {string} Vue组件代码字符串
 */
export function setVueModule(baseName) {
  // 路径和函数名变量
  const constPath = `./${baseName}Const`;
  const fnPath = `./${baseName}Fn`;
  const createProxyConst = `create${baseName}Const`;
  const createProxyFn = `create${baseName}Fn`;
  const constName = `${baseName}Const`;
  const fnName = `${baseName}Fn`;

  // 使用String.raw避免转义问题，保持模板格式整洁
  return String.raw`
<script setup>
import { ref, onUnmounted, watch } from "vue";
import { ${createProxyConst} } from "${constPath}";
import { ${createProxyFn} } from "${fnPath}";

// 初始化常量和函数
let ${constName} = ${createProxyConst}({ ref });
let ${fnName} = ${createProxyFn}({ ${constName} });

// 组件卸载时清理
onUnmounted(() => {
  ${constName} = null;
  ${fnName} = null;
});
</script>

<template>
  <div>this is ${baseName} page</div>
</template>
`.trimStart(); // 移除开头的空行
}

/**
 * 生成常量定义JS文件模板
 * @param {string} baseName - 基础名称（组件名/模块名）
 * @returns {string} 常量JS代码字符串
 */
export function setConstJs(baseName) {
  const createConstName = `create${baseName}Const`;

  return String.raw`
export function ${createConstName}(context) {
  const { ref } = context;
  return {};
}
`.trimStart();
}

/**
 * 生成函数定义JS文件模板
 * @param {string} baseName - 基础名称（组件名/模块名）
 * @returns {string} 函数JS代码字符串
 */
export function setFnJs(baseName) {
  // 修正原函数名serFnJs为setFnJs，保持一致性
  const createFnName = `create${baseName}Fn`;
  const constName = `${baseName}Const`;

  return String.raw`
export function ${createFnName}(context) {
  const { ${constName} } = context;
  return {};
}
`.trimStart();
}
