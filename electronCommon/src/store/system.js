// src/stores/counter.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // 1. State (状态) - 用 ref() 定义
  const count = ref(0);

  // 2. Getters (计算属性) - 用 computed() 定义
  const doubleCount = computed(() => count.value * 2);

  // 3. Actions (方法) - 用 function 定义
  function increment() {
    count.value++;
  }

  function $reset() {
    count.value = 0;
  }

  // 必须把想暴露出去的属性和方法 return 出来
  return { count, doubleCount, increment, $reset };
});
