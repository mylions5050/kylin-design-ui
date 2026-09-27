import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type PropType,
} from 'vue'
import { createBem } from '@/utils/create-bem'
import KIcon from '@/components/icon/index'
import KImageViewer from '@/components/image-viewer/index'
import './index.scss'

const [b, e, m] = createBem('k-image')

/**
 * Image 图片 —— 展示一张图片，支持加载占位、加载失败回退与懒加载。
 * 结构对齐 Element Plus / Ant Design Image：
 *  - 加载中默认展示 shimmer 微光占位动画，可通过 #placeholder 插槽自定义
 *  - 加载失败默认展示图标 + "加载失败"，可通过 #error 插槽自定义
 *  - 图片加载完成后淡入显示，避免生硬闪现
 *  - lazy 时通过 IntersectionObserver 进入视口（或 scroll-container 指定容器）才开始加载
 *  - 传入 preview-src-list 后点击图片打开全屏预览器（KImageViewer）
 *
 * 用法：<KImage src="https://..." :width="320" :height="213" fit="cover" />
 */
export default defineComponent({
  name: 'KImage',
  props: {
    /** 图片地址，同原生 img 的 src */
    src: { type: String, default: '' },
    /** 原生 alt 描述文本 */
    alt: { type: String, default: '' },
    /** 确定图片如何适应容器框，同原生 object-fit */
    fit: {
      type: String as PropType<'' | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
      default: '',
    },
    /** 容器宽度，数字按 px 处理，也可传任意 CSS 宽度字符串 */
    width: { type: [Number, String] as PropType<number | string>, default: undefined },
    /** 容器高度，数字按 px 处理，也可传任意 CSS 高度字符串 */
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    /** 是否懒加载：进入视口后才真正发起图片请求 */
    lazy: { type: Boolean, default: false },
    /** 懒加载的滚动容器：CSS 选择器字符串或 HTMLElement，不传则使用视口 */
    scrollContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: undefined,
    },
    /** 开启图片预览：传入大图地址列表后，点击图片打开全屏预览器 */
    previewSrcList: { type: Array as PropType<string[]>, default: () => [] },
    /** 打开预览器时默认定位的图片下标 */
    initialIndex: { type: Number, default: 0 },
    /** 预览器层级 */
    zIndex: { type: Number, default: undefined },
    /** 点击预览器画布空白处是否关闭预览 */
    hideOnClickModal: { type: Boolean, default: false },
    /** 是否可以通过 ESC 关闭预览 */
    closeOnPressEscape: { type: Boolean, default: true },
  },
  emits: ['load', 'error', 'show', 'hide', 'switch'],
  setup(props, { emit, slots }) {
    /* ====================== 图片加载状态 ====================== */
    const containerRef = ref<HTMLElement>()
    const loading = ref(true)
    const failed = ref(false)

    watch(
      () => props.src,
      () => {
        loading.value = true
        failed.value = false
      },
    )

    const handleLoad = () => {
      loading.value = false
      failed.value = false
      emit('load')
    }

    const handleError = () => {
      loading.value = false
      failed.value = true
      emit('error')
    }

    /* ====================== 懒加载 ====================== */
    /** 是否已被 IntersectionObserver 判定进入视口 */
    const intersected = ref(false)
    let observer: IntersectionObserver | null = null

    const disconnectLazy = () => {
      observer?.disconnect()
      observer = null
    }

    const setupLazy = () => {
      if (!props.lazy || observer) return
      /* 环境不支持时直接退化为立即加载 */
      if (typeof IntersectionObserver === 'undefined') {
        intersected.value = true
        return
      }
      let root: HTMLElement | null = null
      if (props.scrollContainer) {
        root =
          typeof props.scrollContainer === 'string'
            ? document.querySelector<HTMLElement>(props.scrollContainer)
            : props.scrollContainer
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            intersected.value = true
            disconnectLazy()
          }
        },
        { root },
      )
      if (containerRef.value) observer.observe(containerRef.value)
    }

    onMounted(setupLazy)
    onBeforeUnmount(disconnectLazy)

    /** 懒加载未触发时不下发真实 src，img 不渲染、停留在占位态 */
    const realSrc = computed(() => (props.lazy && !intersected.value ? '' : props.src))

    /* ====================== 图片预览 ====================== */
    const previewVisible = ref(false)
    const isPreviewable = computed(() => props.previewSrcList.length > 0)

    const handleImgClick = () => {
      if (!isPreviewable.value) return
      previewVisible.value = true
      emit('show')
    }

    /* ====================== 渲染 ====================== */
    const containerStyle = computed(() => {
      const style: Record<string, string> = {}
      if (props.width != null) {
        style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }
      if (props.height != null) {
        style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
      }
      return style
    })

    return () => (
      <div ref={containerRef} class={b()} style={containerStyle.value}>
        {props.src && !failed.value && (
          <img
            class={[
              e('inner'),
              props.fit && e(`inner--${props.fit}`),
              m('loaded', !loading.value),
              m('previewable', isPreviewable.value),
            ]}
            src={realSrc.value || undefined}
            alt={props.alt}
            onLoad={handleLoad}
            onError={handleError}
            onClick={handleImgClick}
          />
        )}
        {loading.value && !failed.value && (
          <div class={[e('placeholder'), m('shimmer', !slots.placeholder)]}>
            {slots.placeholder ? slots.placeholder() : null}
          </div>
        )}
        {failed.value && (
          <div class={e('error')}>
            {slots.error ? (
              slots.error()
            ) : (
              <span class={e('error-inner')}>
                <KIcon name="picture" size={24} />
                <span>加载失败</span>
              </span>
            )}
          </div>
        )}
        {isPreviewable.value && (
          <KImageViewer
            modelValue={previewVisible.value}
            onUpdate:modelValue={(v: boolean) => {
              previewVisible.value = v
            }}
            urlList={props.previewSrcList}
            initialIndex={props.initialIndex}
            zIndex={props.zIndex}
            hideOnClickModal={props.hideOnClickModal}
            closeOnPressEscape={props.closeOnPressEscape}
            onClose={() => emit('hide')}
            onSwitch={(i: number) => emit('switch', i)}
          />
        )}
      </div>
    )
  },
})
