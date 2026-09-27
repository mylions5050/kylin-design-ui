<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const selectedSize = ref<string>('')
</script>

<template>
  <div class="flex-col gap12">
    <KRadioGroup v-model="selectedSize" size="small">
      <KRadio value="small" label="小号" />
      <KRadio value="default" label="默认" />
      <KRadio value="large" label="大号" />
    </KRadioGroup>
    <KRadioGroup v-model="selectedSize" size="default">
      <KRadio value="small" label="小号" />
      <KRadio value="default" label="默认" />
      <KRadio value="large" label="大号" />
    </KRadioGroup>
    <KRadioGroup v-model="selectedSize" size="large">
      <KRadio value="small" label="小号" />
      <KRadio value="default" label="默认" />
      <KRadio value="large" label="大号" />
    </KRadioGroup>
  </div>
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
</style>
