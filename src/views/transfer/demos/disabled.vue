<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import { disabledData } from './data'

const targetKeys = ref([1])
</script>

<template>
  <div class="demo-transfer">
    <KTransfer v-model="targetKeys" :data-source="disabledData" :titles="['可选内容', '已选内容']" />
  </div>
</template>
