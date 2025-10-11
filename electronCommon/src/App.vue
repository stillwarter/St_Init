<script setup>
import { computed } from "vue";
import { theme } from "ant-design-vue";
import { useSetStore } from "./store/setting";
const setStore = useSetStore();
const themeState = computed(() => setStore.theme);

const themes = computed(() => {
  return {
    algorithm:
      themeState.value == "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };
});

const testinfo = async () => {
  let a = await window.electronAPI.getplanJson();
  console.log(a, "a");
};
testinfo();
</script>

<template>
  <a-config-provider :theme="themes">
    <router-view></router-view>
  </a-config-provider>
</template>
