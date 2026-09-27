<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from '@/components/switch/index'

const labelValue = ref(true)
</script>

<template>
  <div class="col">
    <div class="row">
      <KSwitch v-model="labelValue" show-label />
      <span class="desc">默认标签（On/Off）</span>
    </div>
    <div class="row">
      <KSwitch
        v-model="labelValue"
        show-label
        active-text="开启"
        inactive-text="关闭"
      />
      <span class="desc">自定义标签文本</span>
    </div>
    <div class="row">
      <KSwitch
        v-model="labelValue"
        show-label
        size="large"
        active-text="YES"
        inactive-text="NO"
      />
      <span class="desc">大号尺寸 + 英文标签</span>
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
