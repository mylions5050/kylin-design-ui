<script setup lang="ts">
import { ref } from 'vue'
import KBadge from '@/components/badge/index'
import KAvatar from '@/components/avatar/index'
import KButton from '@/components/button/index'
import KSwitch from '@/components/switch/index'

const count = ref(5)
const dot = ref(true)

const increase = () => {
  count.value += 1
}
const decline = () => {
  if (count.value > 0) count.value -= 1
}
const random = () => {
  count.value = Math.floor(Math.random() * 100)
}
</script>

<template>
  <div class="badge-dynamic">
    <div class="badge-row">
      <KBadge :count="count">
        <KAvatar shape="square" size="large" />
      </KBadge>
      <KButton size="small" @click="decline">-</KButton>
      <KButton size="small" @click="increase">+</KButton>
      <KButton size="small" @click="random">随机</KButton>
    </div>
    <div class="badge-row">
      <KBadge :dot="dot">
        <KAvatar shape="square" size="large" />
      </KBadge>
      <KSwitch v-model="dot" />
    </div>
  </div>
</template>

<style scoped>
.badge-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
</style>
