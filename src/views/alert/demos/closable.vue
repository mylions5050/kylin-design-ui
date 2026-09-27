<script setup lang="ts">
import { ref } from 'vue'
import KAlert from '@/components/alert/index'

const visible = ref(true)
</script>

<template>
  <KAlert v-if="visible" type="primary" closable @close="visible = false">点 X 关闭我</KAlert>
  <KAlert v-else type="success">已关闭（刷新恢复）</KAlert>
</template>
