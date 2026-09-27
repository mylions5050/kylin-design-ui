<script setup lang="ts">
import { computed, ref } from 'vue'
import KTab from '@/components/tab/index'
import KTabPane from '@/components/tab/pane'
import KCheckbox from '@/components/checkbox/index'
import KSelect from '@/components/select/index'
import type { SelectOption } from '@/components/select/types'

const active = ref('one')
const anim = ref(true)
const underlineRound = ref(true)

// 紫色主题色
const activeColor = ref('#7c3aed')

const colorOptions: SelectOption[] = [
  { label: '紫罗兰', value: '#7c3aed' },
  { label: '靛蓝', value: '#4f46e5' },
  { label: '天蓝', value: '#0ea5e9' },
  { label: '石墨青', value: '#0d9488' },
]

const heightOptions: SelectOption[] = [
  { label: '2px', value: '2' },
  { label: '3px', value: '3' },
  { label: '4px', value: '4' },
]

const underlineHeight = ref('3')

const customIndicator = computed(() => {
  const style: Record<string, string> = {
    background: activeColor.value,
    height: `${underlineHeight.value}px`,
  }
  if (underlineRound.value) style.borderRadius = '2px'
  return style
})
</script>

<template>
  <div class="custom-demo">
    <div class="toolbar">
      <div class="field">
        <span class="field__label">主题色</span>
        <KSelect v-model="activeColor" :options="colorOptions" size="small" style="width: 110px" />
      </div>
      <div class="field">
        <span class="field__label">下划线高度</span>
        <KSelect v-model="underlineHeight" :options="heightOptions" size="small" style="width: 90px" />
      </div>
      <div class="field">
        <KCheckbox v-model:checked="underlineRound">圆角</KCheckbox>
      </div>
      <div class="field">
        <KCheckbox v-model:checked="anim">指示条滑行动画</KCheckbox>
      </div>
    </div>

    <KTab
      v-model="active"
      :active-color="activeColor"
      :indicator-transition="anim"
      :indicator-style="customIndicator"
    >
      <!-- 自定义标题插槽：激活项加粗换色（呼应主题色） -->
      <template #label="{ label, active }">
        <span class="custom-title" :class="{ 'is-active': active }">{{ label }}</span>
      </template>

      <KTabPane k="one" label="首页">首页的内容</KTabPane>
      <KTabPane k="list" label="列表">列表的内容</KTabPane>
      <KTabPane k="mine" label="我的">我的的内容</KTabPane>
    </KTab>
  </div>
</template>

<style scoped lang="scss">
.custom-demo {
  .toolbar {
    display: flex;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
    font-size: 13px;
    color: var(--k-color-text-secondary);
  }

  .field {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &__label {
      white-space: nowrap;
    }
  }

  .custom-title {
    font-weight: 400;
    color: inherit;
    transition: color 0.2s;

    &.is-active {
      font-weight: 700;
      color: #7c3aed;
      letter-spacing: 0.5px;
    }
  }
}
</style>
