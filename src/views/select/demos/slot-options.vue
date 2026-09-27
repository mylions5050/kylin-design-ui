<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select/index'
import KOption from '@/components/select/option'
import KOptionGroup from '@/components/select/option-group'

const basicValue = ref('')
const tooltipValue = ref('')
const groupValue = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>基础 KOption:</label>
      <KSelect v-model="basicValue" placeholder="使用 KOption 组件">
        <KOption label="选项1" value="option1" />
        <KOption label="选项2" value="option2" />
        <KOption label="选项3" value="option3" />
        <KOption label="禁用选项" value="disabled" disabled />
      </KSelect>
    </div>
    <div class="demo-item">
      <label>带提示的 KOption:</label>
      <KSelect v-model="tooltipValue" placeholder="悬停查看提示">
        <KOption label="管理员" value="admin" tooltip="系统管理员，拥有最高权限" />
        <KOption label="编辑者" value="editor" tooltip="可以编辑内容，但不能删除" />
        <KOption label="查看者" value="viewer" tooltip="只能查看内容，无法编辑" />
        <KOption label="访客" value="guest" tooltip="临时访问权限，部分功能受限" />
      </KSelect>
    </div>
    <div class="demo-item">
      <label>分组选项:</label>
      <KSelect v-model="groupValue" placeholder="分组选项示例">
        <KOptionGroup label="用户角色">
          <KOption label="超级管理员" value="super_admin" />
          <KOption label="管理员" value="admin" />
          <KOption label="普通用户" value="user" />
        </KOptionGroup>
        <KOptionGroup label="权限级别">
          <KOption label="只读权限" value="read" />
          <KOption label="读写权限" value="write" />
          <KOption label="完全权限" value="full" />
        </KOptionGroup>
      </KSelect>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./common.scss";
</style>