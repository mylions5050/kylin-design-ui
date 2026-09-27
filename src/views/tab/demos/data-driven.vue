<script setup lang="ts">
import { ref } from 'vue'
import KTab from '@/components/tab/index'

const items = ref([
  { key: 'home', label: '首页' },
  { key: 'list', label: '列表' },
  { key: 'mine', label: '我的' },
])
const active = ref('home')
</script>

<template>
  <div>
    <KTab v-model="active" :items="items">
      <template #pane="p">
        这里是 {{ p.label }} 的面板内容
      </template>
    </KTab>
  </div>
</template>
