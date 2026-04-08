<script setup>
import { ref, onUnmounted, watch } from "vue";
import { createtempfileitemConst } from "./tempfileitemConst";
import { createtempfileitemFn } from "./tempfileitemFn";

// 初始化常量和函数
let tempfileitemConst = createtempfileitemConst({ ref });
let tempfileitemFn = createtempfileitemFn({ tempfileitemConst });

// 组件卸载时清理
onUnmounted(() => {
  tempfileitemConst = null;
  tempfileitemFn = null;
});
</script>

<template>
  <div>this is tempfileitem page</div>
</template>
