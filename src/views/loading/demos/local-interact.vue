<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KLoading from '@/components/loading/index'

const boxA = ref(false)
const boxB = ref(false)
</script>

<template>
  <KButton type="primary" @click="boxA = true">区块 A 加载</KButton>
  <KButton type="success" @click="boxB = true">区块 B 加载</KButton>

  <div class="demo-row" style="margin-top: 16px">
    <div class="demo-cell">
      <p>区块 A 内容</p>
      <KLoading v-model="boxA" local type="success" text="区块 A 加载中…" />
    </div>
    <div class="demo-cell">
      <p>区块 B 内容</p>
      <KLoading v-model="boxB" local type="warning" spinner-type="circle" text="区块 B 加载中…" />
    </div>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
}
.demo-cell {
  position: relative;
  flex: 1;
  height: 120px;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  padding: 12px;
}
</style>
