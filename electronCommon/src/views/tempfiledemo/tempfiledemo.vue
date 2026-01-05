<script setup>
import { ref, onUnmounted, watch } from "vue";
import { createtempfiledemoConst } from "./tempfiledemoConst";
import { createtempfiledemoFn } from "./tempfiledemoFn";

// 初始化常量和函数
let tempfiledemoConst = createtempfiledemoConst({ ref });
const { searchText } = tempfiledemoConst;
let tempfiledemoFn = createtempfiledemoFn({ tempfiledemoConst });
const { searchFile } = tempfiledemoFn;
// 组件卸载时清理
onUnmounted(() => {
  tempfiledemoConst = null;
  tempfiledemoFn = null;
});

const testinfo = async () => {
  let a = await window.electronAPI.getplanJson();
  console.log(a, "a");
};
testinfo();
</script>

<template>
  <div class="fullbox flexbox">
    <div class="left">
      <a-input-search
        v-model:value="searchText"
        class="searchbox"
        @search="searchFile"
      ></a-input-search>

      <div class="demofilebox"></div>
    </div>
    <div class="right"></div>
  </div>
</template>

<style lang="less" scoped>
.left {
  width: 70%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .searchbox {
    width: 90%;
  }
}
.right {
  width: 30%;
  height: 100%;
  padding: 20px;
}
</style>
