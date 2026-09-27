<script setup lang="ts">
import { ref } from 'vue'
import KImage from '@/components/image/index'

// 占位内容：加载完成前展示占位，默认为 shimmer 微光动画，可自定义插槽内容
const src = ref('https://picsum.photos/id/1039/600/400')
</script>

<template>
  <div class="demo-group">
    <div class="img-list">
      <div class="img-col">
        <span class="col-label">默认占位（shimmer 动画）</span>
        <KImage :src="src" :width="200" :height="140" fit="cover" alt="瀑布" />
      </div>
      <div class="img-col">
        <span class="col-label">#placeholder 自定义占位</span>
        <KImage :src="src" :width="200" :height="140" fit="cover">
          <template #placeholder>
            <span>图片加载中…</span>
          </template>
        </KImage>
      </div>
    </div>
    <div>
      <button class="reload-btn" @click="src = src + '?r=' + Date.now()">重新加载</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.img-list {
  display: flex;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  overflow: hidden;

  /* 容器偏窄时横向滚动，保证每列最小宽度、内容都完整可看 */
  overflow-x: auto;
}

.img-col {
  flex: 1 0 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 10px;

  & + .img-col {
    border-left: 1px solid var(--k-color-border);
  }

  .col-label {
    margin-bottom: 20px;
    color: var(--k-color-text-secondary);
    font-size: 14px;
  }
}

.reload-btn {
  padding: 6px 14px;
  border: 1px solid var(--k-color-border);
  border-radius: 6px;
  background: #fff;
  cursor: pointer;

  &:hover {
    border-color: var(--k-color-primary);
    color: var(--k-color-primary);
  }
}
</style>
