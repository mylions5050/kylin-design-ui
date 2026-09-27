import { defineComponent, ref } from 'vue'
import KDatePicker from '@/components/date-picker/date-picker'
import type { DateMark } from '@/components/date-picker/index'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const marks: DateMark[] = [
  { date: '01-15', label: '报名', type: 'label', tooltip: '第一季度报名截止日期' },
  { date: '03-20', label: '初试', type: 'label', tooltip: '笔试 9:00 - 11:00', style: { fontWeight: 'bold' } },
  { date: '04-10', label: '复试', type: 'label', tooltip: '面试 14:00 - 17:00' },
  { date: '06-01', label: '活动', type: 'label', tooltip: '儿童节特别活动', color: '#67c23a', style: { fontWeight: 'bold', fontSize: '11px' } },
  { date: '08-18', label: '年会', type: 'label', color: '#e6a23c', tooltip: '年度总结大会暨晚宴' },
  { date: '12-31', label: '总结', type: 'label', tooltip: '提交年终总结报告', color: '#909399' },
]

export default defineComponent({
  name: 'RenderDateLabelDemo',
  setup() {
    const date = ref<Dayjs | null>(null)

    return () => (
      <div class="demo-group" style="display:flex;flex-direction:column;gap:16px;">
        <div class="demo-item" style="display:flex;align-items:center;gap:12px;">
          <label style="min-width:120px;font-size:14px;color:var(--k-color-text-secondary);flex-shrink:0;">日程文字:</label>
          <KDatePicker v-model={date.value} dateMarks={marks} placeholder="选择日期" />
          <span class="event-log" style="font-family:monospace;color:var(--k-color-primary);font-size:14px;">
            {date.value ? date.value.format('YYYY-MM-DD') : '未选择'}
          </span>
        </div>
      </div>
    )
  },
})