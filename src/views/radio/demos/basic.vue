<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'

const selectedFruit = ref<string>('')
</script>

<template>
  <div class="flex-wrap gap16">
    <KRadio v-model="selectedFruit" value="apple" label="苹果" />
    <KRadio v-model="selectedFruit" value="banana" label="香蕉" />
    <KRadio v-model="selectedFruit" value="orange" label="橙子" />
  </div>
  <p class="state">当前选择：{{ selectedFruit }}</p>
</template>

<style scoped lang="scss">
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.gap16 {
  gap: 16px;
}

.state {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
