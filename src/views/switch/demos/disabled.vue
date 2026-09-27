<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const disabledValue = ref(false)
const basicValue = ref(true)
</script>

<template>
  <div class="row">
    <KSwitch v-model="disabledValue" disabled />
    <KSwitch v-model="basicValue" disabled />
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
