<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const selectedFruit = ref<string>('')
const selectedColor = ref<string>('')
const changeLog = ref<string>('')

function logChange(value: string) {
  changeLog.value = `选择：${value}`
}
</script>

<template>
  <div class="flex-col gap12">
    <KRadioGroup v-model="selectedFruit" size="small" @change="logChange">
      <KRadio value="apple" label="苹果" />
      <KRadio value="banana" label="香蕉" :disabled="true" />
      <KRadio value="orange" label="橙子" />
    </KRadioGroup>
    <KRadioGroup v-model="selectedColor" :disabled="false" size="default">
      <KRadio value="red" label="红色" />
      <KRadio value="blue" label="蓝色" />
      <KRadio value="green" label="绿色" />
    </KRadioGroup>
  </div>
  <p class="state">{{ changeLog }}</p>
</template>

<style scoped lang="scss">
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gap12 {
  gap: 12px;
}

.state {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
