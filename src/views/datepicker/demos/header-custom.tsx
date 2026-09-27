import { defineComponent, ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import KIcon from '@/components/icon/index'
import type { Dayjs } from 'dayjs'

export default defineComponent({
  name: 'HeaderCustomDemo',
  setup() {
    const date = ref<Dayjs | null>(null)

    return () => (
      <div class="demo-group" style="display:flex;flex-direction:column;gap:16px;">
        <div class="demo-item" style="display:flex;align-items:center;gap:12px;">
          <label style="min-width:120px;font-size:14px;color:var(--k-color-text-secondary);flex-shrink:0;">
            自定义头部:
          </label>
          {/* 单箭头（上一月/下一月）与双箭头（上一年/下一年）均可替换，这里统一换成系统 KIcon */}
          <KDatePicker
            v-model={date.value}
            placeholder="选择日期"
            renderHeaderPrev={() => <KIcon name="direction-left" size={16} />}
            renderHeaderNext={() => <KIcon name="direction-right" size={16} />}
            renderHeaderPrevYear={() => <KIcon name="arrow-double-left" size={16} />}
            renderHeaderNextYear={() => <KIcon name="arrow-double-right" size={16} />}
            renderHeaderTitle={(label) => (
              <span style="color:var(--k-color-primary);font-weight:600;">{label}</span>
            )}
          />
          <span class="event-log" style="font-family:monospace;color:var(--k-color-primary);font-size:14px;">
            {date.value ? date.value.format('YYYY-MM-DD') : '未选择'}
          </span>
        </div>
      </div>
    )
  },
})