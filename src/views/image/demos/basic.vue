<script setup lang="ts">
import KImage from '@/components/image/index'

// 基础用法：width / height 控制容器尺寸，图片加载完成后淡入显示
</script>

<template>
  <div class="demo-group">
    <div class="basic-row">
      <KImage
        src="https://picsum.photos/id/1015/600/400"
        :width="320"
        :height="200"
        fit="cover"
        alt="山间河流"
      />
      <KImage
        src="https://picsum.photos/id/1018/600/400"
        :width="200"
        :height="200"
        fit="cover"
        alt="雪山"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.basic-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}
</style>
