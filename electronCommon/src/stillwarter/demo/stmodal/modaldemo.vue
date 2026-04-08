<script setup>
import { ref } from "vue";
const modaltitle = ref("文件新增/更新");
const modalState = ref(false);
function openModal() {
  modalState.value = true;
}
function sureModal() {}
function closeModal() {
  modalState.value = false;
}
defineExpose({
  openModal,
});

import useformdemo from "../stform/useformdemo.vue";
</script>

<template>
  <a-modal
    :title="modaltitle"
    :width="500"
    :open="modalState"
    :cancelText="'取消'"
    :okText="'确认'"
    @ok="sureModal"
    @cancel="closeModal"
  >
    123
    <useformdemo />
  </a-modal>
</template>
