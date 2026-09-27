<script setup lang="ts">
import { ref } from 'vue'
import KCascader from '@/components/cascader/index'
import { regionOptions } from './data'
import { message } from '@/components/message/useMessage'

const value = ref<(string | number)[]>(['xihu', 'haishu'])

const onCheck = (paths: unknown[]) => {
  message.info(`已选 ${paths.length} 项`)
}
</script>

<template>
  <div class="demo-multiple">
    <KCascader
      v-model="value"
      :options="regionOptions"
      multiple
      :max-tag-count="2"
      placeholder="请选择地区"
      @check="onCheck"
    />
    <span class="demo-multiple__tip">
      面板内 KCheckbox 勾选，父级半选联动；触发器以 KTag 回显路径，超出的折叠为 +N。
    </span>
  </div>
</template>

<style scoped>
.demo-multiple {
  max-width: 420px;
}

.demo-multiple__tip {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: var(--k-color-text-secondary);
}
</style>
