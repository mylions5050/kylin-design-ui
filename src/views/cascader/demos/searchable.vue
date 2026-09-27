<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'

const value = ref('')
const values = ref<(string | number)[]>([])
</script>

<template>
  <div class="demo-searchable">
    <KCascader
      v-model="value"
      :options="regionOptions"
      filterable
      clearable
      placeholder="输入关键字搜索"
    />
    <div class="demo-searchable__gap" />
    <KCascader
      v-model="values"
      :options="regionOptions"
      multiple
      filterable
      placeholder="多选搜索"
    />
    <span class="demo-searchable__tip">
      filterable 开启后触发器可输入关键字，面板平铺展示匹配叶子的完整路径（不区分大小写）；多选勾选后面板保持展开可继续输入。
    </span>
  </div>
</template>

<style scoped>
.demo-searchable {
  max-width: 420px;
}

.demo-searchable .demo-searchable__gap {
  height: 16px;
}

.demo-searchable__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
