<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'

const inputTextarea = ref('')
const testLongText = ref('这是一段很长很长的文本内容，用来测试textarea的换行和滚动功能。')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>普通文本域:</label>
      <KInput v-model="inputTextarea" type="textarea" placeholder="请输入多行文本" />
    </div>
    <div class="demo-item">
      <label>限制高度:</label>
      <KInput type="textarea" :rows="2" placeholder="固定2行高度" />
    </div>
    <div class="demo-item">
      <label>字符限制:</label>
      <KInput v-model="testLongText" type="textarea" :maxlength="50" show-word-limit placeholder="多行文本字符限制" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>
