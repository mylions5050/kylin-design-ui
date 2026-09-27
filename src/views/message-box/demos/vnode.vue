<script setup lang="ts">
import { h } from 'vue'
import KButton from '@/components/button/index'
import KIcon from '@/components/icon/index'
import { messageBox } from '@/components/message-box/useMessageBox'

// message 支持 VNode：内容里嵌图标、富文本
const showVNode = () => {
  messageBox
    .confirm(
      h('span', null, [
        h('span', null, '即将发布 '),
        h('b', null, 'v2.0.0'),
        h('span', null, '，包含 '),
        h(KIcon, { name: 'favorite-filling', style: 'color: #ed0442; vertical-align: -2px' }),
        h('span', null, ' 12 项更新，确认发布吗？'),
      ]),
      { icon: 'info', title: '发布确认' },
    )
    .then(() => console.log('发布'))
    .catch((action) => console.log('取消：', action))
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showVNode">VNode 内容</KButton>
  </div>
</template>
