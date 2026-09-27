<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import { mockData } from './data'

const targetKeys = ref([])

const onSearch = (direction: string, value: string) => {
  console.log(`搜索方向：${direction}，关键字：${value}`)
}
</script>

<template>
  <div class="demo-transfer">
    <KTransfer v-model="targetKeys" :data-source="mockData" show-search @search="onSearch" />
  </div>
</template>
