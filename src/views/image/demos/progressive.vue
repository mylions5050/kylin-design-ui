<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import KImage from '@/components/image/index'
import KProgress from '@/components/progress/index'
import KButton from '@/components/button/index'

// 渐进加载：通过 #placeholder 插槽自定义占位内容（水彩动画 / 文字 / 进度条）
const reloadKey = ref(0)
const reloadImages = () => {
  reloadKey.value++
}

// 加版本参数强制绕过缓存，重新加载时才能看到占位效果
const ver = computed(() => reloadKey.value)
const pic = (id: number) => `https://picsum.photos/id/${id}/600/400?v=${ver.value}`

// 模拟生成：进度 0 → 100，完成后展示图片
const genPercent = ref(0)
const genDone = ref(false)
let genTimer: ReturnType<typeof setInterval> | null = null

const startGenerate = () => {
  if (genTimer) return
  genDone.value = false
  genPercent.value = 0
  genTimer = setInterval(() => {
    genPercent.value = Math.min(100, genPercent.value + Math.floor(Math.random() * 8) + 3)
    if (genPercent.value >= 100) {
      clearInterval(genTimer!)
      genTimer = null
      genDone.value = true
    }
  }, 150)
}

onBeforeUnmount(() => {
  if (genTimer) clearInterval(genTimer)
})
</script>

<template>
  <div class="demo-group">
    <div class="progressive-row">
      <!-- 水彩墨水动画占位 -->
      <KImage
        :key="`a-${reloadKey}`"
        class="tile"
        :src="pic(1019)"
        :width="200"
        :height="200"
        fit="cover"
        alt="水彩动画占位"
      >
        <template #placeholder>
          <div class="watercolor" />
        </template>
      </KImage>

      <!-- 自定义文字占位 -->
      <KImage
        :key="`b-${reloadKey}`"
        class="tile"
        :src="pic(1016)"
        :width="200"
        :height="200"
        fit="cover"
        alt="文字占位"
      >
        <template #placeholder>
          <span class="loading-text">loading...</span>
        </template>
      </KImage>

      <!-- 静态进度条占位 -->
      <KImage
        :key="`c-${reloadKey}`"
        class="tile"
        :src="pic(1018)"
        :width="200"
        :height="200"
        fit="cover"
        alt="进度条占位"
      >
        <template #placeholder>
          <div class="gen-box">
            <KProgress :percentage="50" :show-text="false" />
            <span class="gen-text">50%</span>
          </div>
        </template>
      </KImage>

      <!-- 模拟生成：进度完成后展示图片 -->
      <KImage
        v-if="genDone"
        class="tile"
        :src="pic(64)"
        :width="200"
        :height="200"
        fit="cover"
        alt="生成结果"
      />
      <div v-else class="tile gen-tile">
        <div class="gen-box">
          <KProgress :percentage="genPercent" :show-text="false" />
          <span class="gen-text">Generating {{ genPercent }}%</span>
        </div>
      </div>
    </div>

    <div class="progressive-actions">
      <KButton type="primary" @click="reloadImages">重新加载图片</KButton>
      <KButton type="primary" @click="startGenerate">开始生成</KButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.progressive-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

.tile {
  border-radius: 8px;
}

/* 水彩墨水动画：渐变底色缓慢流动 */
.watercolor {
  width: 100%;
  height: 100%;
  background: linear-gradient(115deg, #c7d2fe, #e9d5ff 35%, #fbcfe8 60%, #bfdbfe);
  background-size: 200% 200%;
  animation: watercolor-move 2.4s ease-in-out infinite;
}

@keyframes watercolor-move {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.loading-text {
  color: var(--k-color-text-secondary);
  font-size: 15px;
}

/* 进度条占位 / 生成中的模拟块，共用同一套水彩底色 */
.gen-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 72%;
}

.gen-text {
  color: var(--k-color-text-secondary);
  font-size: 15px;
}

.gen-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background: linear-gradient(115deg, #c7d2fe, #e9d5ff 35%, #fbcfe8 60%, #bfdbfe);
}

.progressive-actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}
</style>
