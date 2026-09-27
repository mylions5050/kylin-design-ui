<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const selectedFruit = ref<string>('')

const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
]
</script>

<template>
  <div class="col">
    <KRadioGroup v-model="selectedFruit" class="column">
      <KRadio v-for="item in fruits" :key="item.value" :value="item.value" :label="item.label" />
    </KRadioGroup>
  </div>
</template>

<style scoped lang="scss">
.col {
  width: 200px;
}

.column {
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
</style>
