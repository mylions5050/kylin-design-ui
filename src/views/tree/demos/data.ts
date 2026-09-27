import type { TreeNodeData } from '@/components/tree/index'

/** 各 Demo 共用的树数据源 */
export const treeData: TreeNodeData[] = [
  {
    id: '1',
    label: '前端工程',
    icon: 'folder-close',
    children: [
      {
        id: '1-1',
        label: '组件库',
        icon: 'folder-close',
        children: [
          { id: '1-1-1', label: 'Button 按钮', icon: 'file-common' },
          { id: '1-1-2', label: 'Tree 树形控件', icon: 'file-common' },
        ],
      },
      {
        id: '1-2',
        label: '官网 C 端',
        icon: 'folder-close',
        children: [{ id: '1-2-1', label: '首页', icon: 'file-common' }],
      },
    ],
  },
  {
    id: '2',
    label: '管理端项目',
    icon: 'folder-close',
    children: [
      { id: '2-1', label: '实习计划', icon: 'file-common' },
      { id: '2-2', label: '评测工具', icon: 'file-common' },
    ],
  },
  { id: '3', label: '说明文档.md', icon: 'file-common' },
]
