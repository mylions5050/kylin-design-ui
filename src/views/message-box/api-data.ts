import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

export type { ApiPropRow, ApiEventRow, ApiSlotRow }

export const apiProps: ApiPropRow[] = [
  { name: 'modelValue', type: 'boolean', default: 'false', required: false, desc: '显隐（v-model，模板受控用法）。' },
  { name: 'title', type: 'string', default: "'提示'", required: false, desc: '标题（转发 KDialog）。' },
  { name: 'message', type: 'string | VNode', default: "''", required: false, desc: '内容：纯文本或 VNode。' },
  { name: 'icon', type: "'success' | 'warning' | 'info' | 'error' | ''", default: '-', required: false, desc: '语义图标；不传不显示。' },
  { name: 'showCancel', type: 'boolean', default: 'false', required: false, desc: '是否显示取消按钮（alert 形态不需要）。' },
  { name: 'confirmText', type: 'string', default: "'确 定'", required: false, desc: '确定按钮文案。' },
  { name: 'cancelText', type: 'string', default: "'取 消'", required: false, desc: '取消按钮文案。' },
  { name: 'confirmLoading', type: 'boolean', default: 'false', required: false, desc: '确定按钮 loading。' },
  { name: 'showInput', type: 'boolean', default: 'false', required: false, desc: '是否显示输入框（prompt 形态）。' },
  { name: 'inputValue', type: 'string', default: "''", required: false, desc: '输入框初始值（每次打开重置）。' },
  { name: 'inputPlaceholder', type: 'string', default: "''", required: false, desc: '输入框 placeholder。' },
  { name: 'inputType', type: "'text' | 'password' | 'textarea' | 'number'", default: "'text'", required: false, desc: '输入框类型。' },
  { name: 'inputValidator', type: '(value: string) => boolean | string', default: '-', required: false, desc: '输入校验函数：返回 true/undefined 合法；返回 string 为错误文案。校验失败时确定按钮禁用。' },
  { name: 'width', type: 'string', default: "'420px'", required: false, desc: '弹框宽度。' },
  { name: 'closeOnClickOverlay', type: 'boolean', default: 'false', required: false, desc: '点击遮罩是否关闭（默认 false 防误触）。' },
  { name: 'maskType', type: "'dimmed' | 'blur'", default: "'dimmed'", required: false, desc: '遮罩类型（透传 KDialog → KOverlay）：dimmed 暗色蒙层（默认）/ blur 毛玻璃（背景不变 + backdrop-filter: blur(4px)）。' },
  { name: 'closeOnPressEscape', type: 'boolean', default: 'true', required: false, desc: 'ESC 是否关闭。' },
  { name: 'customClass', type: 'string', default: '-', required: false, desc: '自定义 class。' },
]

export const apiEmits: ApiEventRow[] = [
  { name: 'confirm', desc: '点击确定；参数为输入值（showInput 时），否则为空字符串。' },
  { name: 'cancel', desc: '点击取消按钮。' },
  { name: 'closed', desc: '关闭动画结束（转发 KDialog）。' },
  { name: 'update:modelValue', desc: '显隐变化（遮罩 / ESC / 关闭按钮 / 取消均会触发）。' },
]

export const apiSlots: ApiSlotRow[] = []

/** 编程式 API 说明（附在 props 表之后） */
export const apiMethods: { name: string; signature: string; desc: string }[] = [
  { name: 'messageBox.alert', signature: "(message?, options?) => Promise", desc: "提醒弹框（只有确定按钮）。确认 resolve({ action: 'confirm' })；关闭按钮 / ESC reject('close')。" },
  { name: 'messageBox.confirm', signature: "(message?, options?) => Promise", desc: "确认弹框（确定 + 取消）。确认 resolve；取消 reject('cancel')；关闭 reject('close')。" },
  { name: 'messageBox.prompt', signature: "(message?, options?) => Promise", desc: '输入弹框。确认 resolve({ action, value })；取消 / 关闭 reject。' },
  { name: 'messageBox.close', signature: '() => void', desc: '关闭当前弹框（若有），按 close 处理。单实例：新调用自动关闭旧的。' },
]
