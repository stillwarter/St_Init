/**
 * 模板
 */
export function setVueModule(basepath) {
  const constpath = `./${basepath}Const`;
  const fnpath = `./${basepath}Fn`;
  const createProxyConst = `create${basepath}Const`;
  const createProxyFn = `create${basepath}Fn`;

  const constName = `${basepath}Const`;
  const fnName = `${basepath}Fn`;

  const end = `
<script setup>
import { ref, onUnmounted, watch } from "vue";
import { ${createProxyConst} } from "${constpath}";
import { ${createProxyFn} } from "${fnpath}";

let ${constName} = ${createProxyConst}({ ref });
let ${fnName} = ${createProxyFn}({ ${constName} });

onUnmounted(() => {
  ${constName} = null;
  ${fnName} = null;
});
</script>

<template>
  <div>this is ${basepath}page</div>
</template>
`;
  return end;
}

export function setConstJs(basepath) {
  const createConstName = `create${basepath}Const`;
  const end = `
export function ${createConstName}(context) {
    const { ref } = context;
    return {};
}
`;
  return end;
}

export function serFnJs(basepath) {
  const createConstFn = `create${basepath}Fn`;
  const end = `
export function ${createConstFn}(context) {
    const { ${basepath}Const } = context;
    return {};
}
`;
  return end;
}
