<script setup>
import { computed } from "vue";
import { useSetStore } from "./store/setting";
import { getThemeConfig } from "./config/theme/themeConfig";
const setStore = useSetStore();
const themeState = computed(() => setStore.theme);

const themes = computed(() => {
  return getThemeConfig(themeState.value);
});

// const testinfo = async () => {
//   let a = await window.electronAPI.getplanJson();
//   console.log(a, "a");
// };
// testinfo();
</script>

<template>
  <a-config-provider :theme="themes">
    <div :class="themeState == 'dark' ? 'darkWarp' : 'dayWarp'">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
