<script setup lang="ts">
import { ref } from 'vue'
import KTab from '@/components/tab/index'
import KTabPane from '@/components/tab/pane'
import KSelect from '@/components/select/index'
import KCheckbox from '@/components/checkbox/index'
import type { SelectOption } from '@/components/select/types'

const active = ref('a')
const stretch = ref(false)
const itemPadding = ref('10px 16px')
const itemMargin = ref('')
const indicator = ref<'full' | 'label'>('full')

const paddingOptions: SelectOption[] = [
  { label: '4px 8px', value: '4px 8px' },
  { label: '10px 16px', value: '10px 16px' },
  { label: '14px 24px', value: '14px 24px' },
]

const marginOptions: SelectOption[] = [
  { label: '无', value: '' },
  { label: '0 4px', value: '0 4px' },
  { label: '0 12px', value: '0 12px' },
]

const indicatorOptions: SelectOption[] = [
  { label: '整条（full）', value: 'full' },
  { label: '跟随文字（label）', value: 'label' },
]
</script>

<template>
  <div class="settings-demo">
    <div class="toolbar">
      <div class="field">
        <KCheckbox v-model:checked="stretch">均分（stretch）</KCheckbox>
      </div>

      <div class="field">
        <span class="field__label">内边距</span>
        <KSelect v-model="itemPadding" :options="paddingOptions" size="small" style="width: 108px" />
      </div>

      <div class="field">
        <span class="field__label">外边距</span>
        <KSelect v-model="itemMargin" :options="marginOptions" size="small" style="width: 108px" />
      </div>

      <div class="field">
        <span class="field__label">指示条</span>
        <KSelect v-model="indicator" :options="indicatorOptions" size="small" style="width: 136px" />
      </div>
    </div>

    <KTab
      v-model="active"
      :stretch="stretch"
      :item-padding="itemPadding"
      :item-margin="itemMargin"
      :indicator="indicator"
    >
      <KTabPane k="a" label="选项一">选项一的内容</KTabPane>
      <KTabPane k="b" label="选项二">选项二的内容</KTabPane>
      <KTabPane k="c" label="选项三">选项三的内容</KTabPane>
      <KTabPane k="d" label="选项四">选项四的内容</KTabPane>
    </KTab>
  </div>
</template>

<style scoped lang="scss">
.settings-demo {
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
}
</style>
