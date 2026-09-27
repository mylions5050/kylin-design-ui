<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'

const selectedFruit = ref<string>('')
</script>

<template>
  <div class="flex-wrap gap16">
    <KRadio v-model="selectedFruit" value="apple" label="苹果" />
    <KRadio v-model="selectedFruit" value="banana" label="香蕉" :disabled="true" />
    <KRadio v-model="selectedFruit" value="orange" label="橙子" />
  </div>
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
</style>
