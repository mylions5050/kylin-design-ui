<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import LayoutDemo from './demos/layout.vue'
import CustomRulesDemo from './demos/custom-rules.vue'
import DisabledDemo from './demos/disabled.vue'
import LoginDemo from './demos/login.vue'
import SearchDemo from './demos/search.vue'
import basicCode from './demos/basic.vue?raw'
import layoutCode from './demos/layout.vue?raw'
import customRulesCode from './demos/custom-rules.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import loginCode from './demos/login.vue?raw'
import searchCode from './demos/search.vue?raw'
import { apiProps, apiEvents, apiSlots, apiItemProps, apiItemSlots } from './api-data'
</script>

<template>
  <section class="form-demo">
    <h1>Form 表单</h1>
    <p>
      表单容器：统一 model 数据域、rules 校验与 label 布局；校验基于 async-validator，
      Rule 写法兼容 antd Form 与 Element Plus Form。
    </p>

    <DemoBlock title="完整表单" description="集成 Input / InputNumber / Select / DatePicker / Radio / Switch / Rate / Slider 等控件；控件直接 v-model 绑定 model 字段，值变化即校验；validate() 提交校验、resetFields() 重置。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="表单布局" description="label-position 控制标签位置（left / right / top），inline 开启行内布局。" :code="layoutCode">
      <LayoutDemo />
    </DemoBlock>

    <DemoBlock title="自定义校验规则" description="rules 支持自定义 validator：Promise 风格（resolve 通过 / reject 报错，适合异步接口校验）与回调风格 callback(error)，可与内置规则混用。" :code="customRulesCode">
      <CustomRulesDemo />
    </DemoBlock>

    <DemoBlock title="禁用表单" description="KForm 设置 disabled 后，表单项整体置灰并阻断交互，可动态开关。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="登录表单" description="用户名 + 密码 + Remember me，通栏提交按钮。" :code="loginCode">
      <LoginDemo />
    </DemoBlock>

    <DemoBlock title="行内搜索表单" description="inline 行内布局配合 KGrid（KRow / KCol 24 栅格）一行放 4 个字段，集成 Input / Select / DatePicker / InputNumber / Cascader / TreeSelect / TimePicker。" :code="searchCode">
      <SearchDemo />
    </DemoBlock>

    <section class="form-demo__api">
      <h2>API</h2>
      <h3>Form</h3>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
      <h3>Form Item</h3>
      <APITable :props="apiItemProps" :slots="apiItemSlots" />
    </section>
  </section>
</template>

<style scoped>
.form-demo {
  padding: 24px;
}

.form-demo__api {
  margin-top: 32px;
}
</style>
