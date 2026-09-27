<script setup lang="ts">
import KResult from '@/components/result/index'
import KIcon from '@/components/icon/index'
import KButton from '@/components/button/index'
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>icon 插槽自定义图标 + title / sub-title / extra 插槽自定义内容:</label>
      <KResult>
        <template #icon>
          <KIcon name="lock" :size="64" class="lock-icon" />
        </template>
        <template #title>403 无权限</template>
        <template #sub-title>抱歉，您没有权限访问该页面，请联系管理员开通</template>
        <template #extra>
          <KButton type="primary">返回首页</KButton>
          <KButton>联系管理员</KButton>
        </template>
      </KResult>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.lock-icon {
  color: var(--k-color-warning);
}
</style>
