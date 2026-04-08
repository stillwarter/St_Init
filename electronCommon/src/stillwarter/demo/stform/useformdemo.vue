<template>
  <a-modal v-model:open="visible" @ok="handleSave" title="动态配置表单">
    <SchemaForm ref="dynamicFormRef" :model="formData" :schema="mySchema" />
  </a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
import SchemaForm from "./formdemo.vue";

const visible = ref(true);
const dynamicFormRef = ref(null);

// 1. 数据模型
const formData = reactive({
  name: "",
  role: "user",
  age: 25,
});

// 2. 表单配置（可以来自 API）
const mySchema = [
  {
    label: "名称",
    field: "name",
    component: "input",
    rules: [{ required: true, message: "请输入名称" }],
    componentProps: { placeholder: "请输入姓名" },
  },
  {
    label: "角色",
    field: "role",
    component: "select",
    options: [
      { label: "管理员", value: "admin" },
      { label: "普通用户", value: "user" },
    ],
  },
  {
    label: "年龄",
    field: "age",
    component: "number",
    span: 12, // 占据一半宽度
    componentProps: { min: 0 },
  },
];

// 3. 提交处理
const handleSave = async () => {
  try {
    await dynamicFormRef.value.validate();
    console.log("最终提交数据:", formData);
  } catch (err) {
    console.error("验证失败");
  }
};
</script>
