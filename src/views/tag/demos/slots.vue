<script setup lang="ts">
import KTag from '@/components/tag/index'
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="col">
    <div class="row">
      <KTag type="primary">
        默认slot内容
      </KTag>
      <KTag type="success">
        <strong>支持HTML标签</strong>
      </KTag>
      <KTag type="warning" rounded>
        <template #prefix>
          <KIcon name="adjust" class="tag__slot" />
        </template>
        前缀slot
      </KTag>
      <KTag type="error" closable>
        主内容
        <template #suffix>
          <KIcon name="rise-filling" class="tag__slot" />
        </template>
      </KTag>
    </div>
    <div class="row">
      <KTag type="primary" size="large" rounded>
        <template #prefix>
          <KIcon name="pin" class="tag__slot" />
        </template>
        完整自定义
        <template #suffix>
          <KIcon name="favorite-filling" class="tag__slot" />
        </template>
      </KTag>
      <KTag dark type="success">
        <template #prefix>
          <KIcon name="check-bold" class="tag__slot" />
        </template>
        图标前缀
      </KTag>
      <KTag plain type="warning" size="small">
        小尺寸
        <template #suffix>
          <KIcon name="star" class="tag__slot" />
        </template>
      </KTag>
      <KTag dark type="error" closable>
        <template #prefix>
          <KIcon name="warning-filling" class="tag__slot" />
        </template>
        可关闭复杂内容
      </KTag>
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
