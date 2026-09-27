import { defineComponent, ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import type { DateMark } from '@/components/date-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const marks: DateMark[] = [
  { date: '01-01', label: '元旦', type: 'dot' },
  { date: '02-14', label: '情人节', type: 'dot' },
  { date: ['10-01', '10-07'], label: '国庆', type: 'dot', tooltip: '国庆节假期 10月1日 - 10月7日' },
  { date: '12-25', label: '圣诞节', type: 'dot' },
  { date: '06-18', label: '购物节', type: 'dot', color: '#e6a23c', tooltip: '618 年中大促' },
]

export default defineComponent({
  name: 'RenderDateDemo',
  setup() {
    const date = ref<Dayjs | null>(null)

    return () => (
      <div class="demo-group" style="display:flex;flex-direction:column;gap:16px;">
        <div class="demo-item" style="display:flex;align-items:center;gap:12px;">
          <label style="min-width:120px;font-size:14px;color:var(--k-color-text-secondary);flex-shrink:0;">节日标记:</label>
          <KDatePicker v-model={date.value} dateMarks={marks} placeholder="选择日期" />
          <span class="event-log" style="font-family:monospace;color:var(--k-color-primary);font-size:14px;">
            {date.value ? date.value.format('YYYY-MM-DD') : '未选择'}
          </span>
        </div>
      </div>
    )
  },
})