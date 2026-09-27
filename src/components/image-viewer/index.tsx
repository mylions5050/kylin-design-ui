import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  Transition,
  watch,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import KOverlay from '@/components/overlay/index'
import './index.scss'

const [b, e] = createBem('k-image-viewer')

/** 缩放范围与步进 */
const MIN_SCALE = 0.25
const MAX_SCALE = 5
const ZOOM_STEP = 0.2

/**
 * ImageViewer 图片预览器 —— 全屏预览弹层，配合 KImage 使用，也可独立使用。
 * 结构对齐 Element Plus 的 ElImageViewer：
 *  - 工具栏：缩小 / 放大 / 1:1（原始尺寸）切换 / 左旋转 / 右旋转
 *  - 多图时展示左右切换箭头与「当前 / 总数」指示器，循环切换
 *  - 键盘：ESC 关闭（close-on-press-escape）、左右方向键切换图片
 *  - 鼠标滚轮缩放；点击画布空白处可关闭（hide-on-click-modal）
 *  - 打开期间锁定 body 滚动，关闭后还原
 *
 * 用法：<KImageViewer v-model="visible" :url-list="urls" :initial-index="0" />
 */
export default defineComponent({
  name: 'KImageViewer',
  props: {
    /** 是否显示预览器（v-model） */
    modelValue: { type: Boolean, default: false },
    /** 预览的图片地址列表 */
    urlList: { type: Array as PropType<string[]>, default: () => [] },
    /** 打开时默认定位的图片下标 */
    initialIndex: { type: Number, default: 0 },
    /** 预览器层级，透传给遮罩 */
    zIndex: { type: Number, default: undefined },
    /** 是否可以通过按下 ESC 关闭 */
    closeOnPressEscape: { type: Boolean, default: true },
    /** 是否点击画布空白处关闭（点击图片与工具栏不会关闭） */
    hideOnClickModal: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'close', 'switch'],
  setup(props, { emit }) {
    const index = ref(0)
    const scale = ref(1)
    const rotate = ref(0)
    /** 是否处于 1:1 原始尺寸模式（影响工具栏图标状态） */
    const isOriginal = ref(false)
    const imgRef = ref<HTMLImageElement>()

    const isMultiple = computed(() => props.urlList.length > 1)
    const currentUrl = computed(() => props.urlList[index.value] || '')

    const imgStyle = computed(() => ({
      transform: `scale(${scale.value}) rotate(${rotate.value}deg)`,
    }))

    let prevBodyOverflow = ''

    const close = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    const resetTransform = () => {
      scale.value = 1
      rotate.value = 0
      isOriginal.value = false
    }

    /* ====================== 切换 / 缩放 / 旋转 ====================== */

    /** 循环切换：最后一张的下一张回到第一张 */
    const switchTo = (delta: number) => {
      const len = props.urlList.length
      if (len < 2) return
      const next = (index.value + delta + len) % len
      if (next === index.value) return
      index.value = next
      resetTransform()
      emit('switch', next)
    }

    const setScale = (v: number) => {
      scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v))
    }

    const zoomIn = () => setScale(scale.value + ZOOM_STEP)
    const zoomOut = () => setScale(scale.value - ZOOM_STEP)

    /**
     * 1:1 / 适应窗口切换：
     * 切到原始尺寸时，按 naturalWidth 与当前「未缩放的适配宽度」换算目标缩放值，
     * 让图片以接近物理像素的大小展示；切回时重置为适应窗口
     */
    const toggleOriginal = () => {
      const img = imgRef.value
      if (!img) return
      if (!isOriginal.value) {
        const rect = img.getBoundingClientRect()
        // 旋转 90/270° 时视觉宽高互换，取高度参与换算
        const swapped = Math.abs(rotate.value) % 180 !== 0
        const fitW = (swapped ? rect.height : rect.width) / scale.value
        if (fitW > 0 && img.naturalWidth > 0) {
          setScale(img.naturalWidth / fitW)
        }
        isOriginal.value = true
      } else {
        setScale(1)
        isOriginal.value = false
      }
    }

    const rotateLeft = () => {
      rotate.value -= 90
    }
    const rotateRight = () => {
      rotate.value += 90
    }

    const handleWheel = (ev: WheelEvent) => {
      ev.preventDefault()
      if (ev.deltaY < 0) zoomIn()
      else zoomOut()
    }

    /** 点击画布空白处（图片以外的区域）关闭 */
    const handleCanvasClick = (ev: MouseEvent) => {
      if (ev.target === ev.currentTarget && props.hideOnClickModal) close()
    }

    /* ====================== 键盘操作 ====================== */

    const handleKeydown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && props.closeOnPressEscape) {
        close()
      } else if (ev.key === 'ArrowLeft') {
        switchTo(-1)
      } else if (ev.key === 'ArrowRight') {
        switchTo(1)
      }
    }

    /* ====================== 显隐副作用：定位、锁滚动、键盘监听 ====================== */

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          const len = props.urlList.length
          index.value = len ? Math.min(Math.max(props.initialIndex, 0), len - 1) : 0
          resetTransform()
          prevBodyOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
          window.addEventListener('keydown', handleKeydown)
        } else {
          document.body.style.overflow = prevBodyOverflow
          window.removeEventListener('keydown', handleKeydown)
        }
      },
    )

    onBeforeUnmount(() => {
      document.body.style.overflow = prevBodyOverflow
      window.removeEventListener('keydown', handleKeydown)
    })

    /* ====================== 渲染 ====================== */

    return () => (
      <KOverlay
        modelValue={props.modelValue}
        background="rgba(0, 0, 0, 0.5)"
        zIndex={props.zIndex}
        closeOnClick={false}
        duration={300}
        onUpdate:modelValue={(v: boolean) => emit('update:modelValue', v)}
      >
        <Transition name="k-image-viewer-fade" appear>
          {props.modelValue ? (
            <div class={b()}>
              <div class={e('canvas')} onWheel={handleWheel} onClick={handleCanvasClick}>
                {currentUrl.value ? (
                  <img
                    ref={imgRef}
                    key={currentUrl.value}
                    class={e('img')}
                    src={currentUrl.value}
                    style={imgStyle.value}
                    alt=""
                    draggable={false}
                  />
                ) : null}
              </div>
              {isMultiple.value ? (
                <div class={[e('btn'), e('prev')]} onClick={() => switchTo(-1)}>
                  <KIcon name="arrow-left-bold" size={22} />
                </div>
              ) : null}
              {isMultiple.value ? (
                <div class={[e('btn'), e('next')]} onClick={() => switchTo(1)}>
                  <KIcon name="arrow-right-bold" size={22} />
                </div>
              ) : null}
              <div class={[e('btn'), e('close')]} onClick={close}>
                <KIcon name="close" size={22} />
              </div>
              {isMultiple.value ? (
                <div class={e('counter')}>
                  {index.value + 1} / {props.urlList.length}
                </div>
              ) : null}
              <div class={e('toolbar')}>
                <div class={e('tool')} onClick={zoomOut}>
                  {/* 注意：本项目 iconfont 的 zoom-in 字形是减号镜、zoom-out 是加号镜，与语义相反，此处按视觉取用 */}
                  <KIcon name="zoom-in" size={20} />
                </div>
                <div class={e('tool')} onClick={zoomIn}>
                  <KIcon name="zoom-out" size={20} />
                </div>
                <div class={e('tool')} onClick={toggleOriginal}>
                  <KIcon name={isOriginal.value ? 'fullscreen-shrink' : 'fullscreen-expand'} size={20} />
                </div>
                <div class={e('tool')} onClick={rotateLeft}>
                  <span class={e('flip')}>
                    <KIcon name="refresh" size={20} />
                  </span>
                </div>
                <div class={e('tool')} onClick={rotateRight}>
                  <KIcon name="refresh" size={20} />
                </div>
              </div>
            </div>
          ) : null}
        </Transition>
      </KOverlay>
    )
  },
})
