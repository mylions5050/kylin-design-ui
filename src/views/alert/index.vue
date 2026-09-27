<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import { apiProps, apiEvents, apiSlots } from './api-data'
import VariantsDemo from './demos/variants.vue'
import variantsCode from './demos/variants.vue?raw'
import TypesLightDemo from './demos/types-light.vue'
import typesLightCode from './demos/types-light.vue?raw'
import TypesDarkDemo from './demos/types-dark.vue'
import typesDarkCode from './demos/types-dark.vue?raw'
import SizeDemo from './demos/size.vue'
import sizeCode from './demos/size.vue?raw'
import ClosableDemo from './demos/closable.vue'
import closableCode from './demos/closable.vue?raw'
import ArrowActionDemo from './demos/arrow-action.vue'
import arrowActionCode from './demos/arrow-action.vue?raw'
import CenterDemo from './demos/center.vue'
import centerCode from './demos/center.vue?raw'
import TitleDescriptionDemo from './demos/title-description.vue'
import titleDescriptionCode from './demos/title-description.vue?raw'
import IconDescriptionDemo from './demos/icon-description.vue'
import iconDescriptionCode from './demos/icon-description.vue?raw'
import CustomStyleDemo from './demos/custom-style.vue'
import customStyleCode from './demos/custom-style.vue?raw'
import CustomEffectDemo from './demos/custom-effect.vue'
import customEffectCode from './demos/custom-effect.vue?raw'
</script>

<template>
  <section class="alert-demo">
    <h1>Alert 组件用例</h1>
    <p>抽离自 admin-school-dashboard 的 Alert。</p>

    <DemoBlock
      title="四种变体"
      description="effect: light（白底+阴影）/ plain（浅底+深字）/ dark（实色+白字）/ dark+border。"
      :code="variantsCode"
    >
      <VariantsDemo />
    </DemoBlock>

    <DemoBlock title="类型（浅色背景）" description="effect=plain，type 浅底 + 深字。" :code="typesLightCode">
      <TypesLightDemo />
    </DemoBlock>

    <DemoBlock
      title="类型（深色背景）"
      description="effect=dark，type 实色 + 白字（参考 button type 色）。"
      :code="typesDarkCode"
    >
      <TypesDarkDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="size: mini / small / medium / large。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="可关闭" description="closable + @close。" :code="closableCode">
      <ClosableDemo />
    </DemoBlock>

    <DemoBlock title="带箭头 / 操作" description="show-arrow + #action slot。" :code="arrowActionCode">
      <ArrowActionDemo />
    </DemoBlock>

    <DemoBlock title="文字居中" description="center prop，content 居中。" :code="centerCode">
      <CenterDemo />
    </DemoBlock>

    <DemoBlock title="文字描述" description="slot 内 alert__title + alert__description 两行式。" :code="titleDescriptionCode">
      <TitleDescriptionDemo />
    </DemoBlock>

    <DemoBlock title="带图标和描述" description="icon + title + description。" :code="iconDescriptionCode">
      <IconDescriptionDemo />
    </DemoBlock>

    <DemoBlock title="自定义样式" description="custom-class 附加到 Alert 根，用 :deep 覆盖外观。" :code="customStyleCode">
      <CustomStyleDemo />
    </DemoBlock>

    <DemoBlock
      title="无type背景版"
      description="effect 默认为空或 custom，默认白底+描边+文字，无type色背景。"
      :code="customEffectCode"
    >
      <CustomEffectDemo />
    </DemoBlock>

    <section class="alert-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEvents" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.alert-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin: 0 0 24px;
    color: #666;
  }

  &__api {
    margin-top: 32px;
  }

  :deep(.demo-block__body) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  :deep(.alert__title) {
    display: block;
    font-weight: 600;
  }

  :deep(.alert__description) {
    display: block;
    font-weight: 400;
    color: #666;
  }

  :deep(.alert.my-alert) {
    background: #6c5ce7;
    color: #fff;
    border-color: #6c5ce7;
  }
}
</style>
