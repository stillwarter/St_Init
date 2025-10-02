<script setup>
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useSetStore } from './store/setting'
const setStore = useSetStore()
const themeState = computed(() => setStore.theme)

const themes = computed(() => {
  return {
    algorithm:
      themeState.value == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }
})


</script>

<template>
  <a-config-provider :theme="themes">
    <router-view></router-view>
  </a-config-provider>
</template>
