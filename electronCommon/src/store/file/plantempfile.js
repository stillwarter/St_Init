/**
 * plan 临时文件夹 store
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const filelist = ref([]);

  const filelistrever = computed(() => [...filelist.value].reverse);

  async function getFileList() {
    filelist.value = await window.electronAPI.getplanJson();
  }

  async function setTempFile() {
    count.value = 0;
  }

  // 必须把想暴露出去的属性和方法 return 出来
  return { count, filelistrever, getFileList, setTempFile };
});
