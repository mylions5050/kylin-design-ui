<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEmits, apiSlots, apiMethods } from './api-data'

import alertCode from './demos/alert.vue?raw'
import confirmCode from './demos/confirm.vue?raw'
import promptCode from './demos/prompt.vue?raw'
import vnodeCode from './demos/vnode.vue?raw'
import controlledCode from './demos/controlled.vue?raw'
import maskTypeCode from './demos/mask-type.vue?raw'

import AlertDemo from './demos/alert.vue'
import ConfirmDemo from './demos/confirm.vue'
import PromptDemo from './demos/prompt.vue'
import VNodeDemo from './demos/vnode.vue'
import ControlledDemo from './demos/controlled.vue'
import MaskTypeDemo from './demos/mask-type.vue'
</script>

<template>
  <section class="message-box-demo">
    <h1>MessageBox 组件用例</h1>
    <p>模拟系统的消息弹框，用于确认、提醒、输入等交互场景。基于 KDialog 组合封装：外壳复用 Dialog（遮罩 / 动画 / 拖拽 / 底部按钮），内层提供语义图标、内容与可选输入框。支持编程式调用（Promise 语义与 Element Plus MessageBox 一致）与模板受控两种用法。</p>

    <DemoBlock title="Alert 提醒" description="只有确定按钮的提醒弹框；点确定 resolve，点关闭按钮 / ESC reject('close')" :code="alertCode">
      <AlertDemo />
    </DemoBlock>

    <DemoBlock title="Confirm 确认" description="确定 + 取消双按钮，Promise 链式处理确认 / 取消结果" :code="confirmCode">
      <ConfirmDemo />
    </DemoBlock>

    <DemoBlock title="Prompt 输入" description="输入弹框，inputValidator 实时校验（返回 string 为错误文案，非法时确定按钮禁用），确认带出输入值" :code="promptCode">
      <PromptDemo />
    </DemoBlock>

    <DemoBlock title="VNode 内容" description="message 支持 VNode，内容里可嵌图标、富文本" :code="vnodeCode">
      <VNodeDemo />
    </DemoBlock>

    <DemoBlock title="模板受控用法" description="不使用编程式调用，直接在模板里用 v-model 控制显隐，监听 confirm / cancel 事件" :code="controlledCode">
      <ControlledDemo />
    </DemoBlock>

    <DemoBlock title="遮罩类型（毛玻璃）" description="maskType 控制遮罩类型：dimmed 暗色蒙层（默认）/ blur 毛玻璃（透传 KDialog → KOverlay）" :code="maskTypeCode">
      <MaskTypeDemo />
    </DemoBlock>

    <!-- API 文档表格 -->
    <section class="message-box-demo__api">
      <h2>MessageBox Props</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />

      <h2>编程式 API</h2>
      <table class="methods-table">
        <thead>
          <tr>
            <th style="width: 200px">方法</th>
            <th style="width: 320px">签名</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in apiMethods" :key="m.name">
            <td>{{ m.name }}</td>
            <td><code>{{ m.signature }}</code></td>
            <td>{{ m.desc }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<style scoped lang="scss">
.message-box-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 56px;
    padding-top: 32px;
    border-top: 1px solid var(--k-color-border);

    h2 {
      margin: 32px 0 16px;
      font-size: 20px;
      font-weight: 600;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}

.methods-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid var(--k-color-border);
    vertical-align: top;
  }

  th {
    font-weight: 600;
    color: var(--k-color-text);
    background: var(--k-color-bg-tertiary);
  }

  td code {
    padding: 2px 6px;
    border-radius: 4px;
    background: var(--k-color-bg-tertiary);
    font-size: 12px;
  }
}
</style>
