<script setup lang="ts">
import KTag from '@/components/tag/index'
</script>

<template>
  <div class="row">
    <KTag color="#52c41a" backgroundColor="#f6ffed" borderColor="#b7eb8f">
      自定义绿色
    </KTag>
    <KTag color="#1890ff" backgroundColor="#e6f7ff" borderColor="#91d5ff">
      自定义蓝色
    </KTag>
    <KTag color="#f5222d" backgroundColor="#fff2f0" borderColor="#ffccc7">
      自定义红色
    </KTag>
    <KTag color="#722ed1" backgroundColor="#f9f0ff" borderColor="#d3adf7">
      自定义紫色
    </KTag>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
