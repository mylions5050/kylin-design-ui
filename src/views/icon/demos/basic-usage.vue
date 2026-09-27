<script setup lang="ts">
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="samples">
    <KIcon name="check-item-filling" />
    <span class="row"><KIcon name="user-filling" /> 用户</span>
    <span class="row"><KIcon name="comment-filling" /> 评论</span>
    <span class="row"><KIcon name="notification-filling" /> 通知</span>
  </div>
</template>

<style scoped lang="scss">
// 水平排列容器，gap 拉开不挤压
.samples {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
