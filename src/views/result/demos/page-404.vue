<script setup lang="ts">
import KResult from '@/components/result/index'
import KIcon from '@/components/icon/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>经典 404 页面（纯插槽组合）:</label>
      <KResult>
        <template #icon>
          <span class="page-404">404</span>
        </template>
        <template #title>页面不存在</template>
        <template #sub-title>您访问的页面可能已被移除或地址有误</template>
        <template #extra>
          <KButton type="primary">返回首页</KButton>
          <KButton>
            联系客服
            <KIcon name="customer-service" style="margin-left: 4px" />
          </KButton>
        </template>
      </KResult>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.page-404 {
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  color: var(--k-color-primary);
  letter-spacing: 4px;
}
</style>
