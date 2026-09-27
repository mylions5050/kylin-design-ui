<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const basicValue = ref(true)
const sizeValue = ref(true)
const colorValue = ref(true)
</script>

<template>
  <div class="col">
    <div class="row">
      <KSwitch v-model="basicValue" />
      <span class="desc">基础样式</span>
    </div>
    <div class="row">
      <KSwitch :model-value="false" />
      <span class="desc">默认关闭</span>
    </div>
    <div class="row">
      <KSwitch v-model="sizeValue" size="large" show-label active-text="ON" inactive-text="OFF" />
      <span class="desc">大尺寸 + 英文标签</span>
    </div>
    <div class="row">
      <KSwitch v-model="sizeValue" disabled />
      <span class="desc">禁用且开启</span>
    </div>
    <div class="row">
      <KSwitch :model-value="false" disabled />
      <span class="desc">禁用且关闭</span>
    </div>
    <div class="row">
      <KSwitch
        v-model="colorValue"
        size="small"
        active-color="#52c41a"
        inactive-color="#fa541c"
      />
      <span class="desc">小尺寸 + 自定义颜色</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.desc {
  font-size: 13px;
  color: #8c8c8c;
  font-style: italic;
}
</style>
