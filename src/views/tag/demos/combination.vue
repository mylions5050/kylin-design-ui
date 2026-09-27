<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="col">
    <div class="row">
      <KTag type="primary">NEW</KTag>
      <KTag type="success">HOT</KTag>
      <KTag type="warning">推荐</KTag>
      <KTag type="error">紧急</KTag>
    </div>
    <div class="row">
      <KTag dark type="primary">深色主要</KTag>
      <KTag dark type="success" size="small">小尺寸成功</KTag>
      <KTag dark type="warning" size="large">大尺寸警告</KTag>
    </div>
    <div class="row">
      <KTag plain type="primary" rounded>圆角主要</KTag>
      <KTag plain type="success" rounded icon="check-bold">圆角成功</KTag>
      <KTag plain type="warning" rounded icon="warning">圆角警告</KTag>
      <KTag plain type="error" rounded closable>圆角错误</KTag>
    </div>
    <div class="row">
      <KTag size="small" type="primary">小标签</KTag>
      <KTag type="success" icon="user">用户</KTag>
      <KTag type="warning" size="large" rounded>大圆角</KTag>
      <KTag type="error" disabled>禁用态</KTag>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
