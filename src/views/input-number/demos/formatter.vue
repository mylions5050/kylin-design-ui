<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// formatter 只改展示（非输入态），parser 负责把输入还原成数值
const price = ref<number | null>(1234567.89)
const percent = ref<number | null>(25)

const formatThousands = (v: number) => v.toLocaleString('en-US')
const parseThousands = (s: string) => Number(s.replace(/,/g, ''))

const formatPercent = (v: number) => `${v}%`
const parsePercent = (s: string) => Number(s.replace(/%/g, ''))
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>千分位:</label>
      <KInputNumber
        v-model="price"
        :precision="2"
        :formatter="formatThousands"
        :parser="parseThousands"
        style="width: 180px"
      />
      <span class="event-log">当前值：{{ price }}</span>
    </div>
    <div class="demo-item">
      <label>百分比:</label>
      <KInputNumber
        v-model="percent"
        :min="0"
        :max="100"
        :formatter="formatPercent"
        :parser="parsePercent"
      />
      <span class="event-log">当前值：{{ percent }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
