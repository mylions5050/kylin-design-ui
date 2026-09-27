<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 基础用法
const basicVisible = ref(false)

// 事件日志
const eventLog = ref('无')

const handleOpen = () => {
  eventLog.value = 'open 事件触发'
}

const handleClose = () => {
  eventLog.value = 'close 事件触发'
}

const handleConfirm = () => {
  eventLog.value = 'confirm 事件触发'
}

const handleCancel = () => {
  eventLog.value = 'cancel 事件触发'
}
</script>

<template>
  <div>
    <KButton type="primary" @click="basicVisible = true">打开对话框</KButton>
  </div>
  <div>
    <span class="event-log">事件日志: {{ eventLog }}</span>
  </div>

  <KDialog
    v-model="basicVisible"
    title="基础对话框"
    @open="handleOpen"
    @close="handleClose"
    @confirm="basicVisible = false; handleConfirm()"
    @cancel="basicVisible = false; handleCancel()"
  >
    这是一段基础对话框的内容。
  </KDialog>
</template>

<style scoped lang="scss">
.event-log {
  font-family: monospace;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
