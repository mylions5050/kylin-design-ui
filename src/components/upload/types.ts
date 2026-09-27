/** 上传文件的状态 */
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

/** 带唯一 uid 的原始 File 对象 */
export interface UploadRawFile extends File {
  uid: number
}

/**
 * 组件内部流转的文件对象。
 * percentage 为上传进度（0-100，仅 uploading 状态有意义）。
 */
export interface UploadFile {
  name: string
  /** 上传完成后的文件 URL（回显 / 预览用） */
  url?: string
  status: UploadStatus
  /** 上传进度百分比 0-100 */
  percentage?: number
  /** 文件大小（字节） */
  size?: number
  /** 服务端返回的响应内容 */
  response?: unknown
  /** 上传失败时的错误信息 */
  error?: Error
  /** 原始 File 对象（选择文件后才有） */
  raw?: UploadRawFile
  /** 唯一标识 */
  uid: number
}

/**
 * 用户初始传入的文件对象（v-model:file-list 的元素类型）。
 * status / percentage / response 等由组件内部维护，无需传入。
 */
export interface UploadUserFile {
  name: string
  url?: string
  size?: number
  status?: UploadStatus
  uid?: number
}

/** 上传请求配置（ajax 用） */
export interface AjaxOption {
  /** 上传地址 */
  action: string
  /** 请求头 */
  headers?: Record<string, string>
  /** 上传时附带的额外表单参数 */
  data?: Record<string, unknown>
  /** 文件字段名 */
  name: string
  file: UploadRawFile
  /** 发送 cookie 凭证 */
  withCredentials?: boolean
  onProgress?: (e: ProgressEvent) => void
  onSuccess?: (response: unknown) => void
  onError?: (err: Error) => void
}

/** uid 自增种子：同毫秒内也保证唯一 */
let uidSeed = 0

/** 生成文件唯一 uid */
export function genFileUid(): number {
  return Date.now() + uidSeed++
}
