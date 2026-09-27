<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'

const selectedFruit = ref<string>('')
</script>

<template>
  <div class="flex-col gap8">
    <div class="flex-wrap gap16">
      <KRadio v-model="selectedFruit" value="apple" label="苹果" size="small" />
      <KRadio v-model="selectedFruit" value="apple" label="苹果" size="default" />
      <KRadio v-model="selectedFruit" value="apple" label="苹果" size="large" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gap8 {
  gap: 8px;
}

.gap16 {
  gap: 16px;
}
</style>
