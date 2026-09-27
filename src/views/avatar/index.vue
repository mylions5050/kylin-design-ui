<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots, groupApiProps } from './api-data'
import BasicDemo from './demos/basic.vue'
import basicCode from './demos/basic.vue?raw'
import TypeDemo from './demos/type.vue'
import typeCode from './demos/type.vue?raw'
import DynamicDemo from './demos/dynamic.vue'
import dynamicCode from './demos/dynamic.vue?raw'
import GroupDemo from './demos/group.vue'
import groupCode from './demos/group.vue?raw'
</script>

<template>
  <section class="avatar-demo">
    <h1>Avatar 头像</h1>
    <p>
      用来代表用户或事物，支持图片、图标或字符展示。字符型头像超出宽度时自动缩放字号；
      图片加载失败自动回退；组合展示用 AvatarGroup，支持 maxCount 溢出折叠与气泡预览。
    </p>

    <DemoBlock title="基本" description="头像有三种尺寸（small / default / large，或数字 px），两种形状（circle / square）可选" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock
      title="类型"
      description="支持图片、Icon、字符三种类型；icon 和字符型可自定义背景色及文字色；图片加载失败自动回退（icon > 字符 > 默认图标）"
      :code="typeCode"
    >
      <TypeDemo />
    </DemoBlock>

    <DemoBlock title="自动调整字符大小" description="字符较长时按头像宽度自动缩放，gap 控制字符距左右边界的像素" :code="dynamicCode">
      <DynamicDemo />
    </DemoBlock>

    <DemoBlock
      title="AvatarGroup"
      description="头像组合重叠展示；maxCount 超出折叠为 +N，hover 气泡预览溢出成员；size / shape 由组统一下发"
      :code="groupCode"
    >
      <GroupDemo />
    </DemoBlock>

    <section class="avatar-demo__api">
      <h2>API</h2>
      <h3>Avatar</h3>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
      <h3>AvatarGroup</h3>
      <APITable :props="groupApiProps" />
    </section>
  </section>
</template>

<style scoped>
.avatar-demo {
  padding: 24px;
}

.avatar-demo h1 {
  margin-bottom: 8px;
}

.avatar-demo > p {
  margin: 0 0 24px;
  color: #666;
}

.avatar-demo__api {
  margin-top: 32px;
}

.avatar-demo__api h3 {
  margin: 16px 0 8px;
}
</style>
