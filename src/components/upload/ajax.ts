import type { AjaxOption } from './types'

/**
 * 基于 XMLHttpRequest 的上传（不用 fetch：需要上传进度事件与请求中断能力）。
 * 返回 abort 函数，调用后中断当前请求（不再触发 onError）。
 */
export function ajax(option: AjaxOption): () => void {
  const xhr = new XMLHttpRequest()

  xhr.onprogress = (e) => option.onProgress?.(e)
  xhr.onerror = () => option.onError?.(new Error('网络错误，上传失败'))
  xhr.ontimeout = () => option.onError?.(new Error('请求超时，上传失败'))

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      option.onError?.(new Error(`上传失败（${xhr.status}）`))
      return
    }
    // 优先按 JSON 解析，失败则返回原文
    let response: unknown = xhr.response
    try {
      if (typeof response === 'string' && response) response = JSON.parse(response)
    } catch {
      /* 非 JSON 响应，保留原文 */
    }
    option.onSuccess?.(response)
  }

  const formData = new FormData()
  formData.append(option.name, option.file, option.file.name)
  if (option.data) {
    for (const key of Object.keys(option.data)) {
      formData.append(key, String(option.data[key]))
    }
  }

  xhr.open('POST', option.action, true)
  if (option.withCredentials) xhr.withCredentials = true
  if (option.headers) {
    for (const key of Object.keys(option.headers)) {
      xhr.setRequestHeader(key, option.headers[key])
    }
  }
  xhr.send(formData)

  return () => xhr.abort()
}
