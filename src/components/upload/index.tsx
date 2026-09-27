import {
  defineComponent,
  ref,
  watch,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import KProgress from '@/components/progress/index'
import { ajax } from './ajax'
import {
  genFileUid,
  type UploadFile,
  type UploadRawFile,
  type UploadUserFile,
} from './types'
import './index.scss'

const [b, e, m] = createBem('k-upload')

/**
 * KUpload —— 通过点击选择文件并上传（交互参考 Element Plus Upload）。
 *
 * 结构：触发区（default 插槽）→ tip 提示插槽 → 文件列表。
 * 点击触发区打开文件选择框，选择后进入文件列表并按 autoUpload 自动/手动上传。
 *
 * 文件状态流转：ready（待上传）→ uploading（上传中，展示进度条）→
 * success（成功，绿色对勾）/ fail（失败，红色叉号）。
 *
 * 常用钩子：
 *  - beforeUpload：上传前校验格式与大小，返回 false 或 rejected Promise 阻止上传；
 *  - beforeRemove：删除前确认，返回 false 或 rejected Promise 阻止删除；
 *  - limit / onExceed：限制文件个数，超出时触发 exceed 事件且不添加文件；
 *    配合 expose 的 clearFiles + handleStart 可实现"新文件覆盖旧文件"。
 *
 * 组件实例方法（ref 调用）：
 *  - submit()：手动上传所有 ready 状态文件（autoUpload 为 false 时配合使用）；
 *  - clearFiles()：清空文件列表；
 *  - abort(file?)：中断上传中请求，不传则全部中断；
 *  - handleStart(file)：把一个原始 File 手动加入列表（exceed 覆盖场景用）。
 */
export default defineComponent({
  name: 'KUpload',
  props: {
    /** 上传地址（POST） */
    action: { type: String, required: true },
    /** 上传请求头 */
    headers: { type: Object as PropType<Record<string, string>>, default: undefined },
    /** 上传时附带的额外表单参数 */
    data: { type: Object as PropType<Record<string, unknown>>, default: undefined },
    /** 上传文件的字段名（后端接收的 form 字段） */
    name: { type: String, default: 'file' },
    /** 是否携带 cookie 凭证（跨域场景） */
    withCredentials: { type: Boolean, default: false },
    /** 是否支持多选文件 */
    multiple: { type: Boolean, default: false },
    /** 接受的文件类型（原生 input accept，如 "image/png,image/jpeg" 或 ".jpg,.png"） */
    accept: { type: String, default: '' },
    /** 最大允许上传个数；超出时触发 exceed 且不添加文件 */
    limit: { type: Number, default: undefined },
    /** 是否在选取文件后立即自动上传；false 时通过 ref 调用 submit() 手动上传 */
    autoUpload: { type: Boolean, default: true },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 初始文件列表（v-model:file-list） */
    fileList: { type: Array as PropType<UploadUserFile[]>, default: () => [] },
    /** 是否显示上传文件列表 */
    showFileList: { type: Boolean, default: true },
    /** 上传前钩子：(rawFile) => boolean | Promise；返回 false 或 reject 阻止该文件上传 */
    beforeUpload: { type: Function as PropType<(rawFile: UploadRawFile) => boolean | Promise<boolean | void>>, default: undefined },
    /** 删除前钩子：(file) => boolean | Promise；返回 false 或 reject 阻止删除 */
    beforeRemove: { type: Function as PropType<(file: UploadFile) => boolean | Promise<boolean | void>>, default: undefined },
  },
  emits: [
    /** 文件列表变化（v-model:file-list） */
    'update:fileList',
    /** 任何状态变化都会触发：(file, fileList) */
    'change',
    /** 文件被移除：(file, fileList) */
    'remove',
    /** 单个文件上传成功：(response, file, fileList) */
    'success',
    /** 单个文件上传失败：(error, file, fileList) */
    'error',
    /** 上传进度变化：(event, file, fileList) */
    'progress',
    /** 点击文件名（自行实现预览逻辑）：(file) */
    'preview',
    /** 文件个数超出 limit：(files, fileList)，files 为本次超出未添加的原始 File 数组 */
    'exceed',
  ],
  setup(props, { slots, emit, expose }) {
    const inputRef = ref<HTMLInputElement>()
    /** 组件内部维护的文件列表（source of truth，变化后同步 v-model:file-list） */
    const uploadFiles = ref<UploadFile[]>([])
    /** uid → abort 函数，用于中断上传 */
    const abortMap = new Map<number, () => void>()

    /** 外部 fileList 回写后与内部列表比对，避免无意义的重建（内部对象带完整状态） */
    watch(
      () => props.fileList,
      (val) => {
        const inner = uploadFiles.value
        if (val.length === inner.length && val.every((f, i) => (f.uid ?? -1) === inner[i].uid)) return
        uploadFiles.value = val.map((f) => ({
          name: f.name,
          url: f.url,
          size: f.size,
          status: f.status ?? 'success',
          percentage: f.status === 'uploading' ? 0 : undefined,
          uid: f.uid ?? genFileUid(),
        }))
      },
      { immediate: true }
    )

    /** 把内部列表同步到 v-model:file-list（浅拷贝防止外部直接改内部对象） */
    const syncOut = () => {
      emit('update:fileList', uploadFiles.value.map((f) => ({ ...f })))
    }

    const emitChange = (file: UploadFile) => {
      syncOut()
      emit('change', file, uploadFiles.value)
    }

    /** 触发系统文件选择框 */
    const handleClick = () => {
      if (props.disabled) return
      inputRef.value?.click()
    }

    /** input change：选择文件后进入列表，按需自动上传 */
    const handleChange = (ev: Event) => {
      const target = ev.target as HTMLInputElement
      const files = Array.from(target.files ?? [])
      target.value = '' // 允许重复选择同一文件
      if (!files.length) return

      // limit 校验：超出时不添加任何文件，交由业务在 onExceed 中处理
      if (props.limit != null && props.limit - uploadFiles.value.length < files.length) {
        const overflow = props.limit - uploadFiles.value.length
        emit('exceed', files.slice(Math.max(overflow, 0)), uploadFiles.value)
        return
      }

      files.forEach(async (file) => {
        const raw = Object.defineProperty(file, 'uid', { value: genFileUid() }) as UploadRawFile
        if (props.beforeUpload) {
          let ok: boolean | void
          try {
            ok = await props.beforeUpload(raw)
          } catch {
            return // 钩子抛错视为阻止
          }
          if (ok === false) return
        }
        const item: UploadFile = {
          name: raw.name,
          size: raw.size,
          status: 'ready',
          percentage: 0,
          uid: raw.uid,
          raw,
        }
        uploadFiles.value.push(item)
        emitChange(item)
        if (props.autoUpload) upload(item)
      })
    }

    /** 上传单个文件（XHR，带进度与中断） */
    const upload = (file: UploadFile) => {
      if (!file.raw) return
      file.status = 'uploading'
      file.percentage = 0
      abortMap.set(
        file.uid,
        ajax({
          action: props.action,
          headers: props.headers,
          data: props.data,
          name: props.name,
          file: file.raw,
          withCredentials: props.withCredentials,
          onProgress: (ev) => {
            file.percentage = Math.floor((ev.loaded / ev.total) * 100) || 0
            emit('progress', ev, file, uploadFiles.value)
            emitChange(file)
          },
          onSuccess: (response) => {
            file.status = 'success'
            file.percentage = 100
            file.response = response
            abortMap.delete(file.uid)
            emit('success', response, file, uploadFiles.value)
            emitChange(file)
          },
          onError: (err) => {
            file.status = 'fail'
            file.error = err
            abortMap.delete(file.uid)
            emit('error', err, file, uploadFiles.value)
            emitChange(file)
          },
        })
      )
    }

    /** 移除文件（beforeRemove 校验通过后中断上传并移除） */
    const handleRemove = async (file: UploadFile) => {
      if (props.disabled) return
      if (props.beforeRemove) {
        let ok: boolean | void
        try {
          ok = await props.beforeRemove(file)
        } catch {
          return
        }
        if (ok === false) return
      }
      abortMap.get(file.uid)?.()
      abortMap.delete(file.uid)
      const idx = uploadFiles.value.indexOf(file)
      if (idx > -1) uploadFiles.value.splice(idx, 1)
      emit('remove', file, uploadFiles.value)
      emitChange(file)
    }

    /** 手动把一个原始 File 加入列表（uid 缺失时自动生成） */
    const handleStart = (file: File) => {
      const raw = file as UploadRawFile
      if (raw.uid == null) raw.uid = genFileUid()
      const item: UploadFile = {
        name: raw.name,
        size: raw.size,
        status: 'ready',
        percentage: 0,
        uid: raw.uid,
        raw,
      }
      uploadFiles.value.push(item)
      emitChange(item)
      if (props.autoUpload) upload(item)
    }

    expose({
      /** 上传所有 ready 状态的文件（autoUpload 为 false 时手动触发） */
      submit: () => {
        uploadFiles.value.filter((f) => f.status === 'ready').forEach(upload)
      },
      /** 清空文件列表 */
      clearFiles: () => {
        abortMap.forEach((abort) => abort())
        abortMap.clear()
        uploadFiles.value = []
        syncOut()
      },
      /** 中断指定文件的上传；不传则中断全部 */
      abort: (file?: UploadFile) => {
        if (file) {
          abortMap.get(file.uid)?.()
          abortMap.delete(file.uid)
        } else {
          abortMap.forEach((abort) => abort())
          abortMap.clear()
        }
      },
      handleStart,
    })

    const renderList = () => (
      <ul class={e('list')}>
        {uploadFiles.value.map((file) => (
          <li key={file.uid} class={[e('list-item'), file.status === 'fail' && m('fail')]}>
            <KIcon name={file.url ? 'picture' : 'file-common'} size={14} class={e('list-item-icon')} />
            <span class={e('list-item-name')} title={file.name} onClick={() => emit('preview', file)}>
              {file.name}
            </span>
            {file.status === 'uploading' ? (
              <span class={e('list-item-percentage')}>{file.percentage ?? 0}%</span>
            ) : file.status === 'success' ? (
              <KIcon name="success-filling" size={14} class={[e('list-item-status'), 'is-success']} />
            ) : file.status === 'fail' ? (
              <KIcon name="error" size={14} class={[e('list-item-status'), 'is-error']} />
            ) : null}
            <KIcon name="close" size={14} class={e('list-item-close')} onClick={() => handleRemove(file)} />
            {file.status === 'uploading' && (
              <div class={e('list-item-progress')}>
                <KProgress percentage={file.percentage ?? 0} strokeWidth={4} showText={false} />
              </div>
            )}
          </li>
        ))}
      </ul>
    )

    return () => (
      <div class={[b(), props.disabled && 'is-disabled']}>
        <div class={e('trigger')} onClick={handleClick}>
          {slots.default?.()}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={props.accept || undefined}
          multiple={props.multiple}
          class={e('input')}
          onChange={handleChange}
        />
        {slots.tip && <div class={e('tip')}>{slots.tip()}</div>}
        {props.showFileList && uploadFiles.value.length > 0 && renderList()}
      </div>
    )
  },
})
