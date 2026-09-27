<script setup lang="ts">
import { ref, computed } from 'vue'
import KCheckbox from '@/components/checkbox/index'

// 半选场景：水果多选，全选框在部分选中时显示半选态
const fruits = ['Apple', 'Banana', 'Cherry']
const picked = ref<string[]>(['Apple'])
const allFruit = computed({
  get: () => picked.value.length === fruits.length,
  set: (v: boolean) => {
    picked.value = v ? [...fruits] : []
  },
})
const someFruit = computed(
  () => picked.value.length > 0 && picked.value.length < fruits.length,
)
function toggleFruit(f: string) {
  picked.value = picked.value.includes(f)
    ? picked.value.filter((x) => x !== f)
    : [...picked.value, f]
}
</script>

<template>
  <div class="col">
    <KCheckbox v-model:checked="allFruit" :indeterminate="someFruit">
      全选
    </KCheckbox>
    <div class="row indent">
      <KCheckbox
        v-for="f in fruits"
        :key="f"
        :checked="picked.includes(f)"
        @change="() => toggleFruit(f)"
      >
        {{ f }}
      </KCheckbox>
    </div>
    <p class="state">已选：{{ picked.length ? picked.join('、') : '无' }}</p>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.state {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
