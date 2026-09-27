<script setup lang="ts">
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'

// icon 传 iconfont 名覆盖默认图标；传空字符串 '' 隐藏图标
const showCustomIcon = () => message.success('自定义图标', { icon: 'prompt-filling' })
const showNoIcon = () => message.info('无图标的消息', { icon: '' })
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="showCustomIcon">自定义图标</KButton>
    <KButton @click="showNoIcon">无图标</KButton>
  </div>
</template>
