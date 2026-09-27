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
  <div class="delay-demos">
    <div class="delay-demo-item">
      <h4>延迟 200ms</h4>
      <KScrollBar height="150px" :hide-delay="200" style="border: 1px solid var(--k-color-border); border-radius: 12px; background: white;">
        <div class="demo-content-delay">
          <div
            v-for="card in cards.slice(0, 8)"
            :key="card.id"
            class="delay-card"
            :style="{ background: card.gradient }"
          >
            <span>{{ card.colorName }}</span>
          </div>
        </div>
      </KScrollBar>
    </div>

    <div class="delay-demo-item">
      <h4>延迟 1000ms</h4>
      <KScrollBar height="150px" :hide-delay="1000" style="border: 1px solid var(--k-color-border); border-radius: 12px; background: white;">
        <div class="demo-content-delay">
          <div
            v-for="card in cards.slice(0, 8)"
            :key="card.id"
            class="delay-card"
            :style="{ background: card.gradient }"
          >
            <span>{{ card.colorName }}</span>
          </div>
        </div>
      </KScrollBar>
    </div>

    <div class="delay-demo-item">
      <h4>延迟 2000ms</h4>
      <KScrollBar height="150px" :hide-delay="2000" style="border: 1px solid var(--k-color-border); border-radius: 12px; background: white;">
        <div class="demo-content-delay">
          <div
            v-for="card in cards.slice(0, 8)"
            :key="card.id"
            class="delay-card"
            :style="{ background: card.gradient }"
          >
            <span>{{ card.colorName }}</span>
          </div>
        </div>
      </KScrollBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-content-delay {
  padding: 16px;
}

.delay-demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;

  .delay-demo-item {
    h4 {
      margin: 0 0 12px;
      font-size: 14px;
      font-weight: 600;
      color: var(--k-color-text);
    }
  }
}

.delay-card {
  height: 60px;
  border-radius: 8px;
  padding: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 8px;

  span {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
