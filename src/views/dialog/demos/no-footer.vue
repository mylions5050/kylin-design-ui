<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 无 footer
const noFooterVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="noFooterVisible = true">无底部按钮</KButton>
  </div>

  <KDialog
    v-model="noFooterVisible"
    title="提示"
    :show-cancel="false"
    @confirm="noFooterVisible = false"
  >
    这是一条没有底部按钮的提示信息，点击右上角关闭或按 Esc 关闭。
  </KDialog>
</template>
