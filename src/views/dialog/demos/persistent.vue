<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 点击遮罩不关闭
const persistentVisible = ref(false)

const eventLog = ref('无')

const handleCancel = () => {
  eventLog.value = 'cancel 事件触发'
}
</script>

<template>
  <div>
    <KButton type="primary" @click="persistentVisible = true">禁止遮罩关闭</KButton>
  </div>

  <KDialog
    v-model="persistentVisible"
    title="提示"
    :close-on-click-overlay="false"
    @cancel="persistentVisible = false; handleCancel()"
  >
    点击遮罩层不会关闭，只能通过按钮或 Esc 关闭。
  </KDialog>
</template>
