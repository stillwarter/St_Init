<script setup>
import { computed, ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import systemInfoModal from "./systemInfoModal.vue";
import { useSetStore } from "../../store/setting";
import fontMove from "../../stillwarter/catboxComponent/fontMove.vue";
import { Stconfig } from "../../config/stconfig";
const setStore = useSetStore()
const themeState = computed(() => setStore.theme)
const systemInfoModalRef = ref(null);
const systemInfo = ref("");
const stwordState = computed(() => Stconfig.stwords)

const getSystemInfo = async () => {
  systemInfo.value = await window.electronAPI.getsystemInfo();
  systemInfoModalRef.value.showModal(systemInfo.value);
};

const toggleDark = () => {
  themeState.value == 'dark' ? setStore.themeDefault() : setStore.themeDark()
}

</script>

<template>
  <a-card class="footerbox">
    <a-tooltip placement="topLeft" title="系统信息">
      <iconify-icon icon="tdesign:system-setting" width="18" height="18" @click="getSystemInfo"></iconify-icon>
    </a-tooltip>

    <a-tooltip v-if="themeState == 'dark'" placement="topLeft" title="日间模式">
      <iconify-icon icon="solar:moon-stars-bold" width="18" height="18" @click="toggleDark"></iconify-icon>
    </a-tooltip>

    <a-tooltip v-else placement="topLeft" title="夜晚模式"><iconify-icon icon="solar:sun-2-bold" width="18" height="18"
        @click="toggleDark">
      </iconify-icon>
    </a-tooltip>

    <systemInfoModal ref="systemInfoModalRef" />

    <div v-if="stwordState" class="wordbox">
      <fontMove />
    </div>
  </a-card>

</template>

<style lang="less" scoped>
.footerbox {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 0 !important;
  position: relative;

  svg {
    cursor: pointer;
    margin-right: 8px;
  }

  svg:hover {
    color: #4493f8;
  }
}

.wordbox {
  position: absolute;
  right: 10px;
}

/deep/ .ant-card-body {
  padding: 0;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
}
</style>
