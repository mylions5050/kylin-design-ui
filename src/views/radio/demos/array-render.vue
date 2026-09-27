<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const selectedColor = ref<string>('')

const colors = [
  { label: '红色', value: 'red' },
  { label: '蓝色', value: 'blue' },
  { label: '绿色', value: 'green' },
  { label: '黄色', value: 'yellow' },
]
</script>

<template>
  <KRadioGroup v-model="selectedColor">
    <KRadio v-for="item in colors" :key="item.value" :value="item.value" :label="item.label" />
  </KRadioGroup>
  <p class="state">当前：{{ selectedColor }}</p>
</template>

<style scoped lang="scss">
.state {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
