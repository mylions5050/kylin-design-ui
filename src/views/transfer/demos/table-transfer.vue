<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from '@/components/transfer/index'
import KTable from '@/components/table/index'
import KTag from '@/components/tag/index'
import KPagination from '@/components/pagination/index'
import type { TransferItem, TransferDirection, TransferKey } from '@/components/transfer'
import type { BaseTableColumn } from '@/components/table/types'

interface TableItem extends TransferItem {
  tag: 'CAT' | 'DOG' | 'BIRD'
  description: string
}

const tableData: TableItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: i + 1,
  label: `content${i + 1}`,
  tag: (['CAT', 'DOG', 'BIRD'] as const)[i % 3],
  description: `description of content${i + 1}`,
}))

const targetKeys = ref<TransferKey[]>([])

/** 每页条数（两栏独立翻页） */
const PAGE_SIZE = 10
const sourcePage = ref(1)
const targetPage = ref(1)

const columns: BaseTableColumn<TableItem>[] = [
  { field: 'label', title: 'Name', minWidth: 110 },
  { field: 'tag', title: 'Tag', minWidth: 70 },
  { field: 'description', title: 'Description', minWidth: 170 },
]

/* ================== 分页（两栏各自独立） ================== */
const pageOf = (direction: TransferDirection) =>
  direction === 'left' ? sourcePage.value : targetPage.value

const setPage = (direction: TransferDirection, p: number) => {
  if (direction === 'left') sourcePage.value = p
  else targetPage.value = p
}

/** 切片当前页数据；列表变短时自动把页码收拢到最后一页 */
const paginate = (direction: TransferDirection, items: TableItem[]) => {
  const tp = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  if (pageOf(direction) > tp) setPage(direction, tp)
  const p = Math.min(pageOf(direction), tp)
  return items.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE)
}

const onPageChange = (direction: TransferDirection, payload: { page: number }) =>
  setPage(direction, payload.page)

/* ================== 表格勾选 → 穿梭勾选对账（批量，全选一次到位） ================== */
/** diff 出增删，只同步当前列表内的项，用 onItemSelectAll 批量调（单次状态更新） */
const syncSelection = (
  nextKeys: (string | number)[],
  items: TableItem[],
  onItemSelectAll: (keys: TransferKey[], selected: boolean) => void,
  selectedKeys: TransferKey[],
) => {
  const itemKeys = new Set(items.map((i) => i.key))
  const next = new Set(nextKeys.filter((k) => itemKeys.has(k)))
  const prev = new Set(selectedKeys)
  const added = [...next].filter((k) => !prev.has(k))
  const removed = [...prev].filter((k) => !next.has(k))
  if (added.length) onItemSelectAll(added, true)
  if (removed.length) onItemSelectAll(removed, false)
}
</script>

<template>
  <div class="transfer-box">
    <KTransfer
      v-model="targetKeys"
      :data-source="tableData"
      equal-width
      :list-style="{ height: '100%' }"
    >
      <template #default="{ direction, filteredItems, selectedKeys, onItemSelectAll }">
        <KTable
          :columns="columns"
          :data="paginate(direction, filteredItems)"
          row-key="key"
          multiple
          :selected-keys="selectedKeys"
          @update:selected-keys="
            (keys) => syncSelection(keys, filteredItems, onItemSelectAll, selectedKeys)
          "
        >
          <template #cell-tag="{ row }">
            <KTag type="primary" size="small">{{ row.tag }}</KTag>
          </template>
        </KTable>
        <KPagination
          size="small"
          :current-page="pageOf(direction)"
          :page-size="PAGE_SIZE"
          :total="filteredItems.length"
          @change="onPageChange(direction, $event)"
        />
      </template>
    </KTransfer>
  </div>
</template>

<style scoped>
/* 模拟右侧内容区：外层固定高度，穿梭框 height 100% 填满 */
.transfer-box {
  height: 560px;
}

/* 表格区拉伸填满面板富余高度，分页贴底；行少时空白留在表格内部（antd 同款） */
.transfer-box :deep(.k-transfer .base-table) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.demo-transfer :deep(.k-transfer .base-table > .scrollbar) {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
