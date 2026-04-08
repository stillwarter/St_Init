<template>
  <a-form :model="model" ref="formRef" layout="vertical" v-bind="$attrs">
    <a-row :gutter="16">
      <template v-for="item in schema" :key="item.field">
        <a-col v-if="item.show !== false" :span="item.span || 24">
          <a-form-item
            :label="item.label"
            :name="item.field"
            :rules="item.rules"
            v-bind="item.itemProps"
          >
            <component
              :is="getComponent(item.component)"
              v-model:value="model[item.field]"
              v-bind="item.componentProps"
              v-on="item.events || {}"
            >
              <template v-if="item.options && item.component === 'select'">
                <a-select-option
                  v-for="opt in item.options"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </a-select-option>
              </template>
            </component>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
  </a-form>
</template>

<script setup>
import { ref } from "vue";
import {
  Input,
  Select,
  InputNumber,
  Switch,
  DatePicker,
  Checkbox,
  Radio,
} from "ant-design-vue";

const props = defineProps({
  schema: { type: Array, required: true }, // 配置项
  model: { type: Object, required: true }, // 外部传入的数据对象
});

const formRef = ref(null);

// 组件映射表
const componentMap = {
  input: Input,
  textarea: Input.TextArea,
  select: Select,
  number: InputNumber,
  switch: Switch,
  date: DatePicker,
  checkbox: Checkbox.Group,
  radio: Radio.Group,
};

const getComponent = (type) => {
  return typeof type === "string" ? componentMap[type] : type;
};

// 暴露校验方法给父组件
const validate = () => formRef.value.validate();
const resetFields = () => formRef.value.resetFields();

defineExpose({ validate, resetFields });
</script>
