<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KCard from '@/components/card/index'

const card1 = ref(false)
const card2 = ref(false)
const card3 = ref(false)

function loadCard1() {
  card1.value = true
  setTimeout(() => (card1.value = false), 2000)
}
function loadCard2() {
  card2.value = true
  setTimeout(() => (card2.value = false), 2000)
}
function loadCard3() {
  card3.value = true
  setTimeout(() => (card3.value = false), 2000)
}
</script>

<template>
  <div class="demo-row">
    <KCard header="布尔 v-loading" class="demo-card">
      <div class="demo-card__body" v-loading="card1">
        <KButton type="primary" @click="loadCard1">加载 2 秒</KButton>
        <p class="demo-card__hint">v-loading="card1"</p>
      </div>
    </KCard>

    <KCard header="字符串（文案）" class="demo-card">
      <div class="demo-card__body" v-loading="'正在加载中…'">
        <KButton type="success" @click="loadCard2">字符串加载</KButton>
        <p class="demo-card__hint">v-loading="'正在加载中…'"</p>
      </div>
    </KCard>

    <KCard header="对象配置" class="demo-card">
      <div class="demo-card__body" v-loading="{ visible: card3, text: '解析中…', spinnerType: 'circle', type: 'info', opacity: 0.4 }">
        <KButton type="warning" @click="loadCard3">对象加载</KButton>
        <p class="demo-card__hint">v-loading="{ text, spinnerType, type, opacity }"</p>
      </div>
    </KCard>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.demo-card {
  flex: 1 1 200px;
  min-width: 160px;
}
.demo-card__body {
  position: relative;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background: var(--k-color-bg-secondary);
}
.demo-card__hint {
  margin: 0;
  font-size: 12px;
  color: var(--k-color-text-secondary);
  text-align: center;
}
</style>