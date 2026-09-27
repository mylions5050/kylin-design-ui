<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const sizeValue = ref(true)
</script>

<template>
  <div class="row">
    <KSwitch v-model="sizeValue" size="small" />
    <KSwitch v-model="sizeValue" size="default" />
    <KSwitch v-model="sizeValue" size="large" />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
