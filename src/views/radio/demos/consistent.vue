<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const selectedFruit = ref<string>('')
</script>

<template>
  <div class="flex-col gap8">
    <KRadioGroup v-model="selectedFruit" size="default">
      <KRadio value="apple" label="苹果" />
      <KRadio value="banana" label="香蕉" />
      <KRadio value="orange" label="橙子" />
    </KRadioGroup>
  </div>
</template>

<style scoped lang="scss">
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gap8 {
  gap: 8px;
}
</style>
