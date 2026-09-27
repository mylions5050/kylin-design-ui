<script setup lang="ts">
import KCard from '@/components/card/index'
import KButton from '@/components/button/index'
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="card-grid">
    <KCard>
      <template #header>
        <div class="custom-header">
          <span>自定义头部</span>
          <KTag type="primary" size="small">推荐</KTag>
        </div>
      </template>
      <p class="card-text">头部和底部都支持 slot 自定义。</p>
      <p class="card-text">可以放按钮、标签、图标等任意内容。</p>
      <template #footer>
        <div class="custom-footer">
          <KButton size="small" type="default">取消</KButton>
          <KButton size="small" type="primary">确定</KButton>
        </div>
      </template>
    </KCard>
  </div>
</template>

<style scoped lang="scss">
.card-grid {
  max-width: 480px;
}

.card-text {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--k-color-text);
  line-height: 22px;

  &:last-child {
    margin-bottom: 0;
  }
}

.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.custom-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}
</style>
