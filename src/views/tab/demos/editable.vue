<script setup lang="ts">
import { ref } from 'vue'
import KTab from '@/components/tab/index'

interface TabItem {
  key: string
  label: string
  closable: boolean
}

const tabs = ref<TabItem[]>([
  { key: 'tab1', label: '选项卡 1', closable: true },
  { key: 'tab2', label: '选项卡 2', closable: true },
  { key: 'tab3', label: '选项卡 3', closable: false },
])

const active = ref('tab1')
let seq = 4

function onAdd() {
  const key = `tab${seq}`
  tabs.value.push({ key, label: `选项卡 ${seq}`, closable: true })
  active.value = key
  seq++
}

function onRemove({ key }: { key: string }) {
  const idx = tabs.value.findIndex((t) => t.key === key)
  if (idx === -1) return
  tabs.value.splice(idx, 1)
  // 关闭的是当前激活项时，激活切到相邻项
  if (active.value === key) {
    const next = tabs.value[idx] ?? tabs.value[idx - 1] ?? tabs.value[0]
    if (next) active.value = next.key
  }
}
</script>

<template>
  <div>
    <p class="tip">
      可添加（addable）、可关闭（closable）；关闭通过 tab-remove 事件移除，添加通过 add 事件新增。
    </p>
    <KTab
      v-model="active"
      :items="tabs"
      addable
      @add="onAdd"
      @tab-remove="onRemove"
    >
      <template #pane="p">
        {{ p.label }} 的面板内容
        <button class="close-this" @click="onRemove({ key: p.key })">关闭</button>
      </template>
    </KTab>
  </div>
</template>

<style scoped>
.tip {
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}

.close-this {
  margin-left: 8px;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--k-color-info);
  background: var(--k-color-info-light);
  border: 1px solid var(--k-color-info-light);
  border-radius: 4px;
  cursor: pointer;
}
</style>
