import { defineComponent, type PropType } from 'vue'
import { createBem } from '@/utils/create-bem'
import InfoPopover from '@/components/info-popover/index'
import iconInfo from '@/assets/icons/info.svg?url'
import type { BaseTableColumn } from '../types'
import './header-info.scss'

const [b, e] = createBem('header-info')

export default defineComponent({
  name: 'HeaderInfo',
  props: {
    col: { type: Object as PropType<BaseTableColumn<any>>, required: true },
  },
  setup(props) {
    return () => (
      <span class={b()}>
        <span class={e('title')}>{props.col.title}</span>
        {props.col.headerInfo && (
          <InfoPopover
            title={props.col.headerInfo.title}
            description={props.col.headerInfo.description}
            placement={props.col.headerInfo.placement ?? 'center'}
            trigger={props.col.headerInfo.trigger ?? 'hover'}
          >
            <button type="button" class={e('btn')} aria-label="More info">
              <img src={iconInfo} alt="" class={e('icon')} />
            </button>
          </InfoPopover>
        )}
      </span>
    )
  },
})
