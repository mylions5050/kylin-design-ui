<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'

/** 字段名与默认约定不同的数据（name / code / sub） */
const data = [
  {
    name: '前端方向',
    code: 'fe',
    sub: [
      { name: '框架', code: 'framework', sub: [
        { name: 'Vue', code: 'vue' },
        { name: 'React', code: 'react' },
      ] },
      { name: '工程化', code: 'build', sub: [
        { name: 'Vite', code: 'vite' },
        { name: 'Webpack', code: 'webpack' },
      ] },
    ],
  },
  {
    name: '后端方向',
    code: 'be',
    sub: [
      { name: 'Java', code: 'java' },
      { name: 'Go', code: 'go' },
    ],
  },
]

const value = ref('')
</script>

<template>
  <div class="demo-field-names">
    <KCascader
      v-model="value"
      :options="data"
      :field-names="{ label: 'name', value: 'code', children: 'sub' }"
      placeholder="自定义字段名"
    />
    <span class="demo-field-names__tip">
      fieldNames 指定 label / value / children 对应的字段名，无需改造数据结构。
    </span>
  </div>
</template>

<style scoped>
.demo-field-names {
  max-width: 360px;
}

.demo-field-names__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
