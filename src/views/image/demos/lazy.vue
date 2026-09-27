<script setup lang="ts">
import KImage from '@/components/image/index'

// 懒加载：滚动到视口内才真正发起图片请求，加载前停留在 shimmer 占位态
const images = [
  'https://picsum.photos/id/1015/600/400',
  'https://picsum.photos/id/1016/600/400',
  'https://picsum.photos/id/1018/600/400',
  'https://picsum.photos/id/1039/600/400',
]
</script>

<template>
  <div class="demo-group">
    <div class="lazy-list">
      <template v-for="(img, i) in images" :key="img">
        <p class="lazy-tip">向下滚动，第 {{ i + 1 }} 张图在进入视口后才开始加载：</p>
        <KImage :src="img" :width="360" :height="200" fit="cover" lazy alt="风景图" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.lazy-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 420px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;

  /* 防止 flex 列容器把图片压缩变形，保证懒加载前占位高度真实 */
  .k-image {
    flex-shrink: 0;
  }
}

.lazy-tip {
  margin: 8px 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
}
</style>
