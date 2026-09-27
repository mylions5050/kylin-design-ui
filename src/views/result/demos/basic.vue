<script setup lang="ts">
import KResult from '@/components/result/index'
</script>

<template>
  <div class="demo-group">
    <KResult
      icon="success"
      title="提交成功"
      sub-title="您的申请已提交，审核结果将通过站内信通知您"
    />
    <KResult
      icon="info"
      title="信息提示"
      sub-title="当前账户存在未完成的订单，请先完成后再发起新订单"
    />
    <KResult
      icon="warning"
      title="操作警告"
      sub-title="该操作会影响线上数据，请谨慎执行"
    />
    <KResult
      icon="error"
      title="提交失败"
      sub-title="服务器开小差了，请稍后重试"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.demo-group > * + * {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px dashed var(--k-color-border);
}
</style>
