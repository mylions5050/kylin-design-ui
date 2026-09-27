<script setup lang="ts">
import { ref } from 'vue'
import KIcon from '@/components/icon/index'
import { figmaIconNames } from '@/assets/icons-figma'

const copied = ref('')
let copyTimer: ReturnType<typeof setTimeout> | null = null
const copy = (name: string) => {
  navigator.clipboard?.writeText(name)
  copied.value = name
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = ''
  }, 1200)
}
</script>

<template>
  <div v-if="figmaIconNames.length" class="grid figma-grid">
    <div v-for="n in figmaIconNames" :key="n" class="cell" @click="copy(n)">
      <KIcon :name="n" :size="28" />
      <span>{{ n }}</span>
    </div>
  </div>
  <p v-else class="more">暂无：把 .svg 放进 src/assets/icons-figma/ 即自动出现。</p>
</template>

<style scoped lang="scss">
.more,
.copied {
  margin: 8px 0 0;
  font-size: 13px;
  color: #6a7e9c;
}

// 特色图标（Figma）数量少，用自适应列宽填满，不强行 7 列
.grid {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.figma-grid {
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  gap: 8px;
  padding: 16px 10px;
  border: 1px solid #e5e6eb;
  border-radius: 6px;
  font-size: 12px;
  color: #6a7e9c;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: #0a96e6;
    color: #0a96e6;
  }

  span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
