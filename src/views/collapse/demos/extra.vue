<script setup lang="ts">
import { computed, h, ref } from 'vue'
import KCollapse from '@/components/collapse/index'
import KSwitch from '@/components/switch/index'

// 面板额外内容：extra 渲染在标题栏右侧（箭头之前）；
// extra 里的交互元素记得阻止点击冒泡，避免误触发展开/收起
const wifi = ref(true)
const activeKeys = ref<(string | number)[]>(['1'])

const items = computed(() => [
  {
    key: '1',
    label: '面板额外内容',
    children: '开关放在标题栏右侧的 extra 区域，外层已阻止点击冒泡，点开关不会收起面板。',
    extra: h(
      'span',
      { style: 'display:inline-flex;align-items:center', onClick: (e: MouseEvent) => e.stopPropagation() },
      [h(KSwitch, { modelValue: wifi.value, 'onUpdate:modelValue': (v: boolean) => (wifi.value = v) })],
    ),
  },
])
</script>

<template>
  <KCollapse v-model="activeKeys" :items="items" />
</template>
