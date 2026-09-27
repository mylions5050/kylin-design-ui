<script setup lang="ts">
import KInput from '@/components/input/index'
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>小尺寸:</label>
      <KInput size="small" placeholder="小尺寸输入框" />
    </div>
    <div class="demo-item">
      <label>默认尺寸:</label>
      <KInput placeholder="默认尺寸输入框" />
    </div>
    <div class="demo-item">
      <label>大尺寸:</label>
      <KInput size="large" placeholder="大尺寸输入框" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>
