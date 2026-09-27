<script setup lang="ts">
import { ref, computed } from 'vue'
import KIcon from '@/components/icon/index'
import { iconNames } from '../icon-names'

const query = ref('')
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? iconNames.filter((n) => n.includes(q)) : iconNames
})

// 一次性渲染过多单元格会卡，这里封顶 600 个；搜索后结果变少自然全显示。
const CAP = 600
const visible = computed(() => filtered.value.slice(0, CAP))

const copied = ref('')
let copyTimer: ReturnType<typeof setTimeout> | null = null
const copy = (name: string) => {
  navigator.clipboard?.writeText(name)
  copied.value = name
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copied.value = ''
  }, 1200)
}
</script>

<template>
  <input v-model="query" class="search" placeholder="搜索图标名，如 check / arrow / mail" />
  <p class="count">匹配 {{ filtered.length }} / {{ iconNames.length }}</p>
  <div class="grid">
    <div v-for="n in visible" :key="n" class="cell" @click="copy(n)">
      <KIcon :name="n" :size="24" />
      <span>{{ n }}</span>
    </div>
  </div>
  <p v-if="filtered.length > CAP" class="more">
    仅显示前 {{ CAP }} 个，输入更精确的关键词缩小范围。
  </p>
  <p v-if="copied" class="copied">已复制：{{ copied }}</p>
</template>

<style scoped lang="scss">
.search {
  width: 320px;
  max-width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d3ddec;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #0a96e6;
  }
}

.count,
.more,
.copied {
  margin: 8px 0 0;
  font-size: 13px;
  color: #6a7e9c;
}

.copied {
  color: #0a96e6;
}

// 固定一行 7 列；minmax(0,1fr) + cell min-width:0 让长名字走省略号不撑破
.grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  gap: 8px;
  padding: 16px 10px;
  border: 1px solid #e5e6eb;
  border-radius: 6px;
  font-size: 12px;
  color: #6a7e9c;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: #0a96e6;
    color: #0a96e6;
  }

  span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
