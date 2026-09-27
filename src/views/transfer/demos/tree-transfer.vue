<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import KTree from '@/components/tree/index'
import type { TransferItem, TransferKey } from '@/components/transfer'
import type { TreeNodeData } from '@/components/tree/types'

interface CityItem extends TransferItem {
  group: string
}

const cityData: CityItem[] = [
  { key: 'hz', label: '杭州', group: '华东' },
  { key: 'sh', label: '上海', group: '华东' },
  { key: 'nj', label: '南京', group: '华东' },
  { key: 'sz', label: '深圳', group: '华南' },
  { key: 'gz', label: '广州', group: '华南' },
  { key: 'cd', label: '成都', group: '西南' },
]

const targetKeys = ref<TransferKey[]>(['hz'])

/** 把当前方向的过滤结果按 group 组装成树（叶子 id = item.key） */
const buildTree = (items: CityItem[]): TreeNodeData[] => {
  const groups = new Map<string, TreeNodeData[]>()
  items.forEach((i) => {
    if (!groups.has(i.group)) groups.set(i.group, [])
    groups.get(i.group)!.push({ id: String(i.key), label: i.label })
  })
  return Array.from(groups.entries()).map(([group, children]) => ({
    id: `group-${group}`,
    label: group,
    children,
  }))
}

/** 树勾选 → 穿梭勾选对账：只同步叶子（item key），diff 出增删调 onItemSelect */
const syncSelection = (
  treeKeys: string[],
  items: CityItem[],
  onItemSelect: (key: TransferKey, selected: boolean) => void,
  selectedKeys: TransferKey[],
) => {
  const leafIds = new Set(items.map((i) => String(i.key)))
  const next = new Set(treeKeys.filter((k) => leafIds.has(k)))
  const prev = new Set(selectedKeys.map(String).filter((k) => leafIds.has(k)))
  next.forEach((k) => {
    if (!prev.has(k)) onItemSelect(k, true)
  })
  prev.forEach((k) => {
    if (!next.has(k)) onItemSelect(k, false)
  })
}
</script>

<template>
  <div class="demo-transfer">
    <KTransfer v-model="targetKeys" :data-source="cityData" :list-height="280">
      <template #default="{ filteredItems, selectedKeys, onItemSelect }">
        <KTree
          :data="buildTree(filteredItems)"
          show-checkbox
          default-expand-all
          :checked-keys="selectedKeys.map(String)"
          @update:checked-keys="
            (keys) => syncSelection(keys, filteredItems, onItemSelect, selectedKeys)
          "
        />
      </template>
    </KTransfer>
  </div>
</template>
