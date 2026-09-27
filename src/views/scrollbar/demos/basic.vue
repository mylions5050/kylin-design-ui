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

// 生成卡片数据
const cards = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `卡片 ${i + 1}`,
  gradient: colorBlocks[i % colorBlocks.length].bg,
  colorName: colorBlocks[i % colorBlocks.length].name,
}))
</script>

<template>
  <KScrollBar height="200px" style="width: 100%; border: 1px solid var(--k-color-border); border-radius: 12px; background: white;">
    <div class="demo-content-vertical">
      <div class="color-grid">
        <div
          v-for="card in cards.slice(0, 18)"
          :key="card.id"
          class="color-card"
          :style="{ background: card.gradient }"
        >
          <h3>{{ card.title }}</h3>
          <p>{{ card.colorName }}</p>
        </div>
      </div>
    </div>
  </KScrollBar>
</template>

<style scoped lang="scss">
.demo-content-vertical {
  padding: 20px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.color-card {
  height: 120px;
  border-radius: 12px;
  padding: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 4px;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 12px;
    opacity: 0.9;
  }
}
</style>
