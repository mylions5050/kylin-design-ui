<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from '@/components/input-number/index'

// status 控制边框与聚焦阴影颜色，适合表单校验场景
const primaryValue = ref<number | null>(10)
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(15)
const successValue = ref<number | null>(8)
const infoValue = ref<number | null>(3)
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>primary:</label>
      <KInputNumber v-model="primaryValue" status="primary" />
    </div>
    <div class="demo-item">
      <label>error:</label>
      <KInputNumber v-model="errorValue" status="error" placeholder="必填" />
    </div>
    <div class="demo-item">
      <label>warning:</label>
      <KInputNumber v-model="warningValue" status="warning" />
    </div>
    <div class="demo-item">
      <label>success:</label>
      <KInputNumber v-model="successValue" status="success" />
    </div>
    <div class="demo-item">
      <label>info:</label>
      <KInputNumber v-model="infoValue" status="info" />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";
</style>
