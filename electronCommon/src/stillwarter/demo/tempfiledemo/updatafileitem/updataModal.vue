<script setup>
import { ref } from "vue";
import useformdemo from "../../stform/useformdemo.vue";
const modaltitle = ref("test");
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

/**
 * 目前先做属性输入框，不做复杂的富文本输入
 */
</script>

<template>
  <a-modal
    :title="modaltitle"
    :width="500"
    v-model:open="modalState"
    :cancelText="'取消'"
    :okText="'确认'"
    @ok="sureModal"
    @cancel="closeModal"
  >
    <useformdemo />
  </a-modal>
</template>
