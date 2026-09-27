<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import { disabledData } from './data'

const targetKeys = ref([])
</script>

<template>
  <div class="demo-transfer">
    <KTransfer v-model="targetKeys" :data-source="disabledData" status="error" />
    <KTransfer v-model="targetKeys" :data-source="disabledData" status="warning" />
  </div>
</template>

<style scoped>
.demo-transfer {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
