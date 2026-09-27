<script setup lang="ts">
/**
 * 亮 / 暗主题切换开关（Loading 演示页内部复用）。
 * v-model 为 boolean：true=暗色（默认），false=亮色。
 * 暗色遮罩半透明黑、亮色遮罩半透明白，通过 KSwitch 一键切换对比。
 */
import KSwitch from '@/components/switch/index'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

function onChange(v: boolean) {
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="theme-switch">
    <span class="theme-switch__label">{{ modelValue ? '暗色' : '亮色' }}</span>
    <KSwitch
      :model-value="modelValue"
      show-label
      :active-text="'暗'"
      :inactive-text="'亮'"
      @update:model-value="onChange"
    />
  </div>
</template>

<style scoped lang="scss">
.theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &__label {
    font-size: 13px;
    color: var(--k-color-text-secondary);
  }
}
</style>
