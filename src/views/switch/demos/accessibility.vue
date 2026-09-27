<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const basicValue = ref(true)
</script>

<template>
  <div class="row">
    <KSwitch v-model="basicValue" aria-label="邮件通知开关" />
    <span class="desc">aria-label 描述功能</span>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.desc {
  font-size: 13px;
  color: #8c8c8c;
  font-style: italic;
}
</style>
