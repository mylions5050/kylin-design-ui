<script setup lang="ts">
import KImage from '@/components/image/index'

// fit 决定图片如何适应固定尺寸的容器，同原生 object-fit；同一张图放进相同容器直观对比
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<template>
  <div class="demo-group">
    <div class="fit-list">
      <div class="fit-col" v-for="fit in fits" :key="fit">
        <span class="fit-label">{{ fit }}</span>
        <KImage
          src="https://picsum.photos/id/1024/400/500"
          :width="130"
          :height="130"
          :fit="fit"
          alt="小鸟"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.fit-list {
  display: flex;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  overflow: hidden;

  /* 容器偏窄时横向滚动，保证每列最小宽度、五种 fit 都完整可看 */
  overflow-x: auto;
}

.fit-col {
  flex: 1 0 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 10px;

  & + .fit-col {
    border-left: 1px solid var(--k-color-border);
  }

  .fit-label {
    margin-bottom: 20px;
    color: var(--k-color-text-secondary);
    font-size: 14px;
  }
}
</style>
