<script setup lang="ts">
import { ref } from 'vue'
import KDialog from '@/components/dialog/index'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'

// 自定义内容
const customVisible = ref(false)
</script>

<template>
  <div>
    <KButton type="primary" @click="customVisible = true">自定义内容</KButton>
  </div>

  <KDialog v-model="customVisible" title="确认删除" @cancel="customVisible = false">
    <div class="custom-content">
      <KIcon name="delete-filling" size="48" color="var(--k-color-error)" />
      <p class="custom-content__text">确定要删除这条记录吗？</p>
      <p class="custom-content__desc">删除后无法恢复，请谨慎操作。</p>
    </div>
    <template #footer>
      <KButton @click="customVisible = false">再想想</KButton>
      <KButton type="error" @click="customVisible = false">确认删除</KButton>
    </template>
  </KDialog>
</template>

<style scoped lang="scss">
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  text-align: center;

  &__text {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--k-color-text);
  }

  &__desc {
    margin: 0;
    font-size: 14px;
    color: var(--k-color-text-secondary);
  }
}
</style>
