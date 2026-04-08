<script setup>
import { ref, onUnmounted, watch } from "vue";
import { createtempfiledemoConst } from "./tempfiledemoConst";
import { createtempfiledemoFn } from "./tempfiledemoFn";
import modaldemo from "../stmodal/modaldemo.vue";
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

const modaldemoRef = ref(null);
const updataFile = () => {
  console.log(12,modaldemoRef.value);
  
  modaldemoRef.value.openModal();
};
</script>

<template>
  <div class="fullbox flexbox">
    <div class="left">
      <a-input-search
        v-model:value="searchText"
        class="searchbox"
        @search="searchFile"
      ></a-input-search>

      <div class="fnbtnbox">
        <a-button @click="updataFile">新增</a-button>
      </div>
    </div>
    <div class="right"></div>

    <modaldemo ref="modaldemoRef" />
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

.fnbtnbox {
  margin-top: 12px;
  width: 90%;
  display: flex;
}
</style>
