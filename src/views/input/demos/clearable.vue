<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'

const inputClearable = ref('可清除')
const customClearValue = ref('示例内容')
const inputPassword = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>可清除输入框:</label>
      <KInput v-model="inputClearable" clearable placeholder="输入内容后可点击清除" />
    </div>
    <div class="demo-item">
      <label>自定义清除图标:</label>
      <KInput v-model="customClearValue" clearable clear-icon="delete" placeholder="使用不同清除图标" />
    </div>
    <div class="demo-item">
      <label>密码可清除:</label>
      <KInput v-model="inputPassword" type="password" clearable show-password placeholder="密码输入框" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>
