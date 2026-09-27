<script setup lang="ts">
import { ref } from 'vue'
import KDropdown from '@/components/dropdown/index'
import KButton from '@/components/button/index'

const visible = ref(false)
const onOpenChange = (v: boolean) => {
  visible.value = v
}
</script>

<template>
  <div class="demo-overlay">
    <KDropdown trigger="click" @open-change="onOpenChange">
      <KButton>自定义面板</KButton>
      <template #overlay>
        <div class="demo-overlay__panel">
          <p class="demo-overlay__title">操作确认</p>
          <p class="demo-overlay__desc">overlay 插槽可完全自定义下拉面板内容，菜单显隐回调 openChange 已同步。</p>
          <p class="demo-overlay__state">当前状态：{{ visible ? '已展开' : '已收起' }}</p>
        </div>
      </template>
    </KDropdown>
  </div>
</template>

<style scoped>
.demo-overlay__panel {
  width: 240px;
}

.demo-overlay__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--k-color-text);
}

.demo-overlay__desc {
  margin-top: 6px;
  font-size: 13px;
  line-height: 20px;
  color: var(--k-color-text-secondary);
}

.demo-overlay__state {
  margin-top: 8px;
  font-size: 13px;
  color: var(--k-color-primary);
}
</style>
