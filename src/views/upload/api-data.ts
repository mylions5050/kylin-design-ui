import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

/** KUpload Props 表格数据 */
export const apiProps: ApiPropRow[] = [
  {
    name: 'action',
    type: 'string',
    default: '—',
    required: true,
    desc: '上传地址（POST 请求，multipart/form-data）。',
  },
  {
    name: 'headers',
    type: 'Record<string, string>',
    default: '—',
    required: false,
    desc: '上传请求头（如 Authorization）。',
  },
  {
    name: 'data',
    type: 'Record<string, unknown>',
    default: '—',
    required: false,
    desc: '上传时附带的额外表单参数。',
  },
  {
    name: 'name',
    type: 'string',
    default: "'file'",
    required: false,
    desc: '上传文件的字段名（后端接收的 form 字段）。',
  },
  {
    name: 'withCredentials',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '跨域时是否携带 cookie 凭证。',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否支持多选文件。',
  },
  {
    name: 'accept',
    type: 'string',
    default: "''",
    required: false,
    desc: '接受的文件类型（原生 input accept），如 "image/png,image/jpeg" 或 ".jpg,.png"。',
  },
  {
    name: 'limit',
    type: 'number',
    default: '—',
    required: false,
    desc: '最大允许上传个数；超出时触发 exceed 且不添加文件。',
  },
  {
    name: 'autoUpload',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否在选取文件后立即自动上传；false 时通过 ref 调用 submit() 手动上传。',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    desc: '是否禁用（禁用后不可选择、不可删除）。',
  },
  {
    name: 'fileList',
    type: 'UploadUserFile[]',
    default: '[]',
    required: false,
    desc: '初始文件列表，支持 v-model:file-list；元素结构 { name, url?, size? }。',
  },
  {
    name: 'showFileList',
    type: 'boolean',
    default: 'true',
    required: false,
    desc: '是否显示上传文件列表（头像等场景关闭后自行接管展示）。',
  },
  {
    name: 'beforeUpload',
    type: '(rawFile) => boolean | Promise',
    default: '—',
    required: false,
    desc: '上传前钩子：返回 false 或 rejected Promise 阻止该文件上传（校验格式 / 大小）。',
  },
  {
    name: 'beforeRemove',
    type: '(file) => boolean | Promise',
    default: '—',
    required: false,
    desc: '删除前钩子：返回 false 或 rejected Promise 阻止删除（二次确认场景）。',
  },
]

/** KUpload Events 表格数据 */
export const apiEvents: ApiEventRow[] = [
  { name: 'update:fileList', desc: '文件列表变化（v-model:file-list）。' },
  { name: 'change', desc: '任何状态变化（ready / uploading / success / fail / 移除）都会触发：(file, fileList)。' },
  { name: 'remove', desc: '文件被移除：(file, fileList)。' },
  { name: 'success', desc: '单个文件上传成功：(response, file, fileList)。' },
  { name: 'error', desc: '单个文件上传失败：(error, file, fileList)。' },
  { name: 'progress', desc: '上传进度变化：(event, file, fileList)。' },
  { name: 'preview', desc: '点击文件名触发，自行实现预览逻辑：(file)。' },
  { name: 'exceed', desc: '文件个数超出 limit：(files, fileList)，files 为本次超出未添加的原始 File 数组。' },
]

/** KUpload Slots 表格数据 */
export const apiSlots: ApiSlotRow[] = [
  { name: 'default', desc: '触发上传的区域（通常放 KButton）。' },
  { name: 'tip', desc: '触发区下方的提示说明文字。' },
]
