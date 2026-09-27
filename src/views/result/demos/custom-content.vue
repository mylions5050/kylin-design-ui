<script setup lang="ts">
import { ref } from 'vue'
import KResult from '@/components/result/index'
import KButton from '@/components/button/index'

// 支付结果：点击按钮重置，演示 extra 操作区的交互
const paid = ref(true)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>extra 操作区放主/次按钮组:</label>
      <KResult
        :icon="paid ? 'success' : 'error'"
        :title="paid ? '订单支付成功' : '订单支付失败'"
        sub-title="预计 1-3 个工作日内发货，请注意查收物流信息"
      >
        <template #extra>
          <KButton type="primary" @click="paid = !paid">
            {{ paid ? '模拟支付失败' : '重新支付' }}
          </KButton>
          <KButton>查看订单</KButton>
        </template>
      </KResult>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";
</style>
