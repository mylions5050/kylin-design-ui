<script setup lang="ts">
import KScrollBar from '@/components/scrollbar/index'

// 生成美观的色块数据
const colorBlocks = [
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', name: '紫罗兰' },
  { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', name: '樱花粉' },
  { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', name: '天空蓝' },
  { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', name: '薄荷绿' },
  { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', name: '日落黄' },
  { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', name: '奶油色' },
  { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', name: '蜜桃粉' },
  { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', name: '珊瑚橙' },
]

// 生成水平滚动内容
const horizontalItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  gradient: colorBlocks[i % colorBlocks.length].bg,
  title: colorBlocks[i % colorBlocks.length].name,
  width: 160 + (i % 3) * 40, // 160, 200, 240
}))
</script>

<template>
  <KScrollBar height="120px" style="width: 100%; border: 1px solid var(--k-color-border); border-radius: 12px; background: white;">
    <div class="demo-content-horizontal">
      <div
        v-for="item in horizontalItems"
        :key="item.id"
        class="horizontal-card"
        :style="{
          background: item.gradient,
          minWidth: item.width + 'px'
        }"
      >
        <span>{{ item.title }}</span>
      </div>
    </div>
  </KScrollBar>
</template>

<style scoped lang="scss">
.demo-content-horizontal {
  display: flex;
  gap: 16px;
  padding: 20px;
}

.horizontal-card {
  height: 80px;
  border-radius: 12px;
  padding: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  font-size: 14px;
}
</style>
