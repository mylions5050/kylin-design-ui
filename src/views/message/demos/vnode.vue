<script setup lang="ts">
import { h } from 'vue'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import { message } from '@/components/message/useMessage'

// 第一个参数支持 VNode，内容里可以嵌图标、加粗等富文本
const showVNode = () =>
  message.success(
    h('span', null, [
      h('span', null, '内容支持 VNode：'),
      h(KIcon, { name: 'favorite-filling', style: 'color: #ed0442; vertical-align: -2px' }),
      h('b', { style: 'margin-left: 4px' }, '加粗文字'),
    ]),
  )
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showVNode">VNode 内容</KButton>
  </div>
</template>
