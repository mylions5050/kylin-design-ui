<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const tooltipValue = ref('')

const tooltipOptions: SelectOption[] = [
  { label: '管理员', value: 'admin', tooltip: '系统管理员，拥有最高权限' },
  { label: '编辑者', value: 'editor', tooltip: '可以编辑内容，但不能删除' },
  { label: '查看者', value: 'viewer', tooltip: '只能查看内容，无法编辑' },
  { label: '访客', value: 'guest', tooltip: '临时访问权限，部分功能受限' },
]
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>角色选择:</label>
      <KSelect v-model="tooltipValue" :options="tooltipOptions" filterable placeholder="悬停选项查看角色说明" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>