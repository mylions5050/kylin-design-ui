<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import ManualDemo from './demos/manual.vue'
import basicCode from './demos/basic.vue?raw'
import manualCode from './demos/manual.vue?raw'
import { apiProps, apiEvents, apiSlots } from './api-data'
</script>

<template>
  <section class="upload-demo">
    <h1>Upload 组件用例</h1>
    <p>
      通过点击选择文件并上传：选择后进入文件列表，展示 ready / uploading / success / fail
      状态流转与上传进度；支持限制个数、上传前校验与手动上传。
    </p>

    <DemoBlock title="基础用法" description="点击按钮选择文件自动上传，上传中显示进度条，成功 / 失败展示状态图标；limit 限制个数，超出触发 exceed。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="手动上传" description="auto-upload 为 false 时选择后不立即上传，通过 ref 调用 submit() 上传、clearFiles() + handleStart() 实现新文件覆盖旧文件；before-upload 校验格式与大小。" :code="manualCode">
      <ManualDemo />
    </DemoBlock>

    <section class="upload-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
      <h3>Methods（ref 调用）</h3>
      <p>
        submit()：上传所有 ready 状态文件；clearFiles()：清空列表并中断上传；
        abort(file?)：中断指定（不传则全部）上传；handleStart(file)：手动把原始 File 加入列表。
      </p>
    </section>
  </section>
</template>

<style scoped>
.upload-demo {
  padding: 24px;
}
.upload-demo__api {
  margin-top: 32px;
}
</style>
