<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import { mockData } from './data'
import { message } from '@/components/message/useMessage'

const targetKeys = ref([3, 5])

const onChange = (keys: (string | number)[], direction: string, moveKeys: (string | number)[]) => {
  message.success(`change：方向 ${direction}，移动 ${moveKeys.join('、')}，当前 ${keys.length} 项`)
}
</script>

<template>
  <div class="demo-transfer">
    <KTransfer v-model="targetKeys" :data-source="mockData" @change="onChange" />
    <span class="demo-transfer__tip">当前值：{{ targetKeys.join('、') || '—' }}</span>
  </div>
</template>
