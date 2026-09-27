<script setup lang="ts">
import { ref } from 'vue'
import KCheckbox from '@/components/checkbox/index'

const sizes = [12, 16, 20, 24] as const
const sizeChecked = ref(true)
</script>

<template>
  <div class="row">
    <KCheckbox
      v-for="s in sizes"
      :key="s"
      v-model:checked="sizeChecked"
      :size="s"
    >
      {{ s }}px
    </KCheckbox>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
