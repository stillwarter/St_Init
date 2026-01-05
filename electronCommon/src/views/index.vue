<script setup>
import routeHelper from "../utils/routerhelper/routerhelper";
function goDemo(demoname) {
  routeHelper.push(demoname);
}
</script>

<template>
  <div class="index">
    <h1>electron-base</h1>
    <p>stilwarter</p>
    <span>2025-08-18</span>

    <div class="demobtnbox">
      <a-button @click="goDemo('tempfiledemo')">临时文件示例</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.index {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  p {
    font-size: 18px;
  }
  span {
    font-size: 12px;
  }

  .demobtnbox {
    margin-top: 20px;
  }
}
</style>
