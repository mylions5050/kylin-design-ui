<script setup lang="ts">
import KProgress from '@/components/progress/index'
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>type="circle" 环形:</label>
      <div class="circle-row">
        <KProgress type="circle" :percentage="0" />
        <KProgress type="circle" :percentage="25" />
        <KProgress type="circle" :percentage="100" status="success" />
        <KProgress type="circle" :percentage="70" status="warning" />
        <KProgress type="circle" :percentage="50" status="exception" />
      </div>
    </div>
    <div class="demo-item">
      <label>type="dashboard" 仪表盘:</label>
      <div class="circle-row">
        <KProgress type="dashboard" :percentage="10" />
        <KProgress type="dashboard" :percentage="80" :color="[
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#1677ff', percentage: 80 },
        ]" />
      </div>
    </div>
    <div class="demo-item">
      <label>icon-size 自定义状态图标大小（不传时按 width 自适应）:</label>
      <div class="circle-row">
        <KProgress type="circle" :percentage="100" status="success" :icon-size="20" />
        <KProgress type="circle" :percentage="100" status="success" :icon-size="40" />
        <KProgress type="circle" :percentage="50" status="exception" :icon-size="40" />
      </div>
    </div>
    <div class="demo-item">
      <label>插槽自定义中心内容（作用域 { percentage, status }）:</label>
      <div class="circle-row">
        <KProgress type="circle" :percentage="100" status="success">
          <KIcon name="good" style="font-size: 28px; color: var(--k-color-success)" />
        </KProgress>
        <KProgress type="circle" :percentage="70">
          <span style="font-size: 20px; font-weight: 600">70 分</span>
        </KProgress>
      </div>
    </div>
    <div class="demo-item">
      <label>自定义尺寸 width / 环宽 strokeWidth:</label>
      <div class="circle-row">
        <KProgress type="circle" :percentage="60" :width="90" :stroke-width="10" />
        <KProgress type="circle" :percentage="60" :width="126" :stroke-width="4" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../date-picker/demos/common.scss";

.circle-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
