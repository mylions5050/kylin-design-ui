<script setup lang="ts">
import KImage from '@/components/image/index'

// 图片预览：preview-src-list 传入大图列表，点击图片打开全屏预览器
const urls = [
  'https://picsum.photos/id/1015/1200/800',
  'https://picsum.photos/id/1018/1200/800',
  'https://picsum.photos/id/1024/1200/800',
  'https://picsum.photos/id/1039/1200/800',
]
</script>

<template>
  <div class="demo-group">
    <div class="preview-list">
      <KImage
        v-for="(url, i) in urls"
        :key="url"
        :src="url"
        :width="150"
        :height="105"
        fit="cover"
        :preview-src-list="urls"
        :initial-index="i"
        hide-on-click-modal
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
