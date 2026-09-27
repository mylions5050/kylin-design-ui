<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'

const input1 = ref('')
const input2 = ref('Hello Vue3')
const inputNumber = ref('')
const inputPassword = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>普通输入框:</label>
      <KInput v-model="input1" placeholder="请输入内容" />
    </div>
    <div class="demo-item">
      <label>有默认值:</label>
      <KInput v-model="input2" placeholder="请输入内容" />
    </div>
    <div class="demo-item">
      <label>数字输入框:</label>
      <KInput v-model="inputNumber" type="number" placeholder="请输入数字" />
    </div>
    <div class="demo-item">
      <label>密码输入框:</label>
      <KInput v-model="inputPassword" type="password" placeholder="请输入密码" show-password />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>
