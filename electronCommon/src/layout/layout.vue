<script setup>
import basefooter from './footer/baseFooter.vue'
import { goTo } from '../utils/routerSkip'
import { ref, computed } from 'vue'
import { Stconfig } from '../config/stconfig'
const layoutconfig = ref(Stconfig.layout)

const layoutstyle = computed(() => ({
  '--adminfooter-height': layoutconfig.value.footerheight
}))

/* layout 默认进入main页面 */
goTo('main')
</script>

<template>
  <!-- 其他组件 -->
  <div :style="layoutstyle">
    <div class="routerviewbox">
      <a-card class="routerviewbox">
        <RouterView></RouterView>
      </a-card>
    </div>
    <basefooter />
  </div>
</template>

<style lang="less">
.footerbox {
  height: var(--adminfooter-height);
}
</style>

<style lang="less" scoped>
.routerviewbox {
  height: calc(100vh - var(--adminfooter-height));
  border-radius: 0;
}

/deep/ .ant-card-body {
  padding: 0;
  border-radius: 0 0 8px 8px;
  height: 100%;
}
</style>
