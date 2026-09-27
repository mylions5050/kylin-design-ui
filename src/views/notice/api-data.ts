import type { ApiEventRow } from '@/components/api-table/types'

/**
 * KNotice 为命令式调用（useNotice），无 Props / Slots。
 * 以下以 notice 对象导出的方法为准。
 */
export const apiEvents: ApiEventRow[] = [
  {
    name: 'notice.success(message, description?, duration?, action?, options?)',
    desc: '弹出成功通知，返回通知 id（number）。',
  },
  {
    name: 'notice.error(message, description?, duration?, action?, options?)',
    desc: '弹出错误通知，返回通知 id。',
  },
  {
    name: 'notice.info(message, description?, duration?, action?, options?)',
    desc: '弹出信息通知，返回通知 id。',
  },
  {
    name: 'notice.warning(message, description?, duration?, action?, options?)',
    desc: '弹出警告通知，返回通知 id。',
  },
  {
    name: 'notice.loading(message, description?, duration?, options?)',
    desc: '弹出加载通知，duration 默认为 0（不自动消失），返回通知 id。',
  },
  {
    name: 'notice.dismiss(id)',
    desc: '手动关闭指定 id 的通知。',
  },
  {
    name: 'notice.update(id, type, message, description?)',
    desc: '更新指定 id 通知的类型 / 标题 / 描述（loading 转结果等场景）。',
  },
  {
    name: 'notice.clear()',
    desc: '清空所有通知。',
  },
  {
    name: 'useNotices()',
    desc: '返回 { notices, dismiss, pause, resume }：notices 为当前队列响应式数组，pause / resume 可暂停 / 恢复自动关闭计时。',
  },
]
