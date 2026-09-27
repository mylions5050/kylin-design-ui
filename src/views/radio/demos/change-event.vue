<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const selectedColor = ref<string>('')
const changeLog = ref<string>('')

function logChange(value: string) {
  changeLog.value = `选择：${value}`
}
</script>

<template>
  <KRadioGroup v-model="selectedColor" @change="logChange">
    <KRadio value="red" label="红色" />
    <KRadio value="blue" label="蓝色" />
    <KRadio value="green" label="绿色" />
  </KRadioGroup>
  <p class="state">{{ changeLog }}</p>
</template>

<style scoped lang="scss">
.state {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
