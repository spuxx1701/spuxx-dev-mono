<script setup lang="ts">
import { ref, watch } from 'vue';
import { VTextField } from 'vuetify/components';

interface Props extends /* @vue-ignore */ VProps<typeof VTextField, 'rules' | 'modelValue'> {
  rules: Array<(v: string) => boolean | string>;
  modelValue: string;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  },
);

const handleInput = (newValue: string) => {
  localValue.value = newValue;
  const { rules } = props;
  if (rules) {
    if (rules.every((rule) => (rule as Function)(newValue) === true)) {
      emit('update:modelValue', newValue);
    }
  } else {
    emit('update:modelValue', newValue);
  }
};
</script>

<template>
  <VTextField
    :bind="$attrs"
    :placeholder="props.modelValue"
    :model-value="localValue"
    :rules="props.rules"
    validate-on="input lazy"
    @update:model-value="handleInput"
  />
</template>
