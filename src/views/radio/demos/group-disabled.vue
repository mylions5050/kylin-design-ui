<script setup lang="ts">
import { ref } from 'vue'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'

const disabledFruit = ref<string>('')
</script>

<template>
  <div>
    <KRadioGroup v-model="disabledFruit" :disabled="true">
      <KRadio value="apple" label="苹果" />
      <KRadio value="banana" label="香蕉" />
      <KRadio value="orange" label="橙子" />
    </KRadioGroup>
    <p class="desc">整个组被禁用</p>
  </div>
</template>

<style scoped lang="scss">
.desc {
  margin: 8px 0 0;
  font-size: 13px;
  color: #888;
  font-style: italic;
}
</style>
