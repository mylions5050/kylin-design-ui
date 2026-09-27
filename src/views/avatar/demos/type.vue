<script setup lang="ts">
import KAvatar from '@/components/avatar/index'

const imgUrl = 'https://api.dicebear.com/10.x/lorelei/svg?seed=Felix'
const brokenUrl = 'https://example.com/not-exist.png'
</script>

<template>
  <div class="avatar-type">
    <div class="avatar-row">
      <KAvatar icon="user-filling" />
      <KAvatar>U</KAvatar>
      <KAvatar :size="40">USER</KAvatar>
      <KAvatar :src="imgUrl" alt="用户头像" />
      <KAvatar :src="imgUrl" :size="40" style="background-color: #87d068" icon="user-filling" />
      <KAvatar style="background-color: #fde3cf; color: #f56a00">U</KAvatar>
      <KAvatar style="background-color: #87d068" icon="user-filling" />
      <KAvatar style="background-color: #1677ff" icon="camera" />
    </div>
    <div class="avatar-row">
      <!-- 图片加载失败：自动回退到 icon -->
      <KAvatar :src="brokenUrl" icon="user-filling" />
      <!-- 图片加载失败：无 icon 时回退到默认用户图标 -->
      <KAvatar :src="brokenUrl" />
    </div>
  </div>
</template>

<style scoped>
.avatar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
</style>
