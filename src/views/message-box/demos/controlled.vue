<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KMessageBox from '@/components/message-box/index'

// 模板受控用法：v-model 控制显隐，监听 confirm / cancel 事件
const visible = ref(false)
const result = ref('')

const onConfirm = () => {
  visible.value = false
  result.value = '已确认'
}
const onCancel = () => {
  visible.value = false
  result.value = '已取消'
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="visible = true">打开受控弹框</KButton>
    <span v-if="result" class="result-text">结果：{{ result }}</span>
  </div>

  <KMessageBox
    v-model="visible"
    title="受控用法"
    icon="success"
    message="这是模板里直接使用的 KMessageBox，v-model 控制显隐，confirm / cancel 事件处理结果。"
    show-cancel
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<style scoped>
.result-text {
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
