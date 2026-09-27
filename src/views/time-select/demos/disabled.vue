<script setup lang="ts">
import { ref } from 'vue'
import KTimeSelect from '@/components/time-select/index'

const value = ref('10:00')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>禁用:</label>
      <KTimeSelect v-model="value" disabled />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
