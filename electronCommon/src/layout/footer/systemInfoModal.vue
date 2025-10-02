<script setup>
import { ref, defineExpose } from "vue";
const openData = ref(null);
const modalState = ref(false);

const showModal = (v) => {
  modalState.value = true;
  openData.value = v;
};
defineExpose({
  showModal,
});
</script>

<template>
  <a-modal v-model:open="modalState" title="系统信息" @ok="handleOk">
    <div v-for="(item, index) in openData" :key="index">
      {{ item.des }}:{{ item.value }}
    </div>
  </a-modal>
</template>
