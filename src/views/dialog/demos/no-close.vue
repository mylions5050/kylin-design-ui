<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'

// 不显示关闭按钮
const noCloseVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="noCloseVisible = true">不显示关闭按钮</KButton>
  </div>

  <KDialog
    v-model="noCloseVisible"
    title="无关闭按钮"
    :show-close="false"
    @confirm="noCloseVisible = false"
    @cancel="noCloseVisible = false"
  >
    右上角没有关闭按钮，只能通过底部按钮关闭。
  </KDialog>
</template>
