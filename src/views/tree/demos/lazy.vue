<script setup lang="ts">
import KTree from '@/components/tree/index'
import type { TreeNodeData } from '@/components/tree/index'

/** 模拟后端接口：node 为 null 返回根层，否则返回该节点的子层 */
const mockApi = (node: TreeNodeData | null): Promise<TreeNodeData[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (!node) {
        resolve([
          { id: 'r1', label: '浙江省', icon: 'folder-close' },
          { id: 'r2', label: '江苏省', icon: 'folder-close' },
        ])
      } else if (node.id === 'r1') {
        resolve([
          { id: 'r1-1', label: '杭州市' },
          { id: 'r1-2', label: '宁波市' },
        ])
      } else {
        // leaf: true 表示已知无下级，展开时不再发起请求
        resolve([
          { id: `${node.id}-a`, label: `${node.label} · 区域A`, leaf: true },
          { id: `${node.id}-b`, label: `${node.label} · 区域B`, leaf: true },
        ])
      }
    }, 600)
  })
</script>

<template>
  <div class="demo-tree">
    <KTree :data="[]" :load="mockApi" />
    <p class="demo-tree__tip">首次进入加载根层；展开未携带子级的节点时按需拉取。</p>
  </div>
</template>

<style scoped>
.demo-tree {
  max-width: 320px;
}
.demo-tree__tip {
  margin-top: 12px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
