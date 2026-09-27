import { defineComponent, type PropType } from 'vue'
import KIcon from '@/components/icon/index'
import { useTagClasses } from './composables/useTagClasses'
import './index.scss'

export default defineComponent({
  name: 'KTag',
  props: {
    type: { type: String as PropType<'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'>, default: 'default' },
    size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
    sizeNum: { type: Number, default: 0 },
    rounded: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: undefined },
    backgroundColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
    icon: { type: String, default: undefined },
  },
  emits: ['close', 'click'],
  setup(props, { slots, emit }) {
    const classes = useTagClasses(props)

    function handleClose(e: Event) {
      if (props.disabled) return
      e.stopPropagation()
      emit('close', e)
    }

    function handleClick(e: Event) {
      if (props.disabled) return
      emit('click', e)
    }

    return () => (
      <span
        class={classes.value}
        style={{
          fontSize: props.sizeNum ? `${props.sizeNum}px` : undefined,
          color: props.color,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
        }}
        onClick={handleClick}
      >
        {props.icon && (
          <KIcon name={props.icon} class="tag__icon" />
        )}
        
        {slots.prefix?.()}
        
        {slots.default?.()}
        
        {slots.suffix?.()}
        
        {props.closable && !props.disabled && (
          <KIcon 
            name="close" 
            class="tag__close" 
            onClick={handleClose} 
          />
        )}
      </span>
    )
  },
})