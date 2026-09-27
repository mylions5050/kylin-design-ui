<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import DisabledDemo from './demos/disabled.vue'
import HalfDemo from './demos/half.vue'
import SizeDemo from './demos/size.vue'
import ColorDemo from './demos/color.vue'
import CharacterDemo from './demos/character.vue'
import IconDemo from './demos/icon.vue'
import LevelDemo from './demos/level.vue'
import ReadonlyDemo from './demos/readonly.vue'
import basicCode from './demos/basic.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import halfCode from './demos/half.vue?raw'
import sizeCode from './demos/size.vue?raw'
import colorCode from './demos/color.vue?raw'
import characterCode from './demos/character.vue?raw'
import iconCode from './demos/icon.vue?raw'
import levelCode from './demos/level.vue?raw'
import readonlyCode from './demos/readonly.vue?raw'
import { apiProps, apiEmits } from './api-data'
</script>

<template>
  <section class="rate-demo">
    <h1>Rate 组件用例</h1>
    <p>用于快捷的星级评价，v-model 绑定评分数值，悬浮预览、点击选中，支持半星与自定义尺寸。</p>

    <DemoBlock title="基础用法" description="点击星星完成评分（1 起），悬浮时预览效果；v-model 双向绑定当前数值。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="禁用" description="disabled 后不可交互，仅展示当前评分。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="半星评分" description="allow-half 开启后：悬浮到星星左半部分记 0.5 分、右半部分记整分；选中态以宽度截取的填充星展示半颗效果（如图中 3.5 分）。" :code="halfCode">
      <HalfDemo />
    </DemoBlock>

    <DemoBlock title="尺寸" description="通过 size 属性设置图标尺寸（px），可按场景选用小/中/大号。" :code="sizeCode">
      <SizeDemo />
    </DemoBlock>

    <DemoBlock title="自定义颜色" description="通过 color 属性自定义选中星星的填充色（任意 CSS 颜色值）；不传时使用内置金黄，配合 allow-half 可展示对应颜色的半星。" :code="colorCode">
      <ColorDemo />
    </DemoBlock>

    <DemoBlock title="自定义字符" description="character 传入单个字符后以文字替代星星展示（支持字母、中文等），半星、颜色、尺寸能力照常可用；第二个例子展示了与 allow-half 和 color 的组合。" :code="characterCode">
      <CharacterDemo />
    </DemoBlock>

    <DemoBlock title="自定义图标" description="icon 传入 iconfont 图标名后以该图标替代星星展示（如图中的 good / fabulous），half、color 等能力照常可用；未传时使用默认星星。" :code="iconCode">
      <IconDemo />
    </DemoBlock>

    <DemoBlock title="分级字符与颜色" description="texts 按等级传入不同字符（如优良中差），colors 按等级传入不同填充色；悬浮预览时同样按等级切换字符与颜色。" :code="levelCode">
      <LevelDemo />
    </DemoBlock>

    <DemoBlock title="只读" description="readonly 后保持完整颜色视觉，仅不可交互（无悬浮预览与点击）；适合详情页展示历史评分。与 disabled 的区别是 readonly 不改变外观。" :code="readonlyCode">
      <ReadonlyDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="rate-demo__api">
      <h2>API</h2>
      <APITable :props="apiProps" :emits="apiEmits" :slots="[]" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.rate-demo {
  padding: 24px;

  h1 {
    margin-bottom: 8px;
  }

  > p {
    margin-bottom: 24px;
    color: var(--k-color-text-secondary);
  }

  &__api {
    margin-top: 24px;

    h2 {
      margin-bottom: 12px;
    }
  }
}
.rate-demo .demo-rate {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rate-demo .demo-rate--sizes {
  align-items: center;
}
.rate-demo .demo-rate--colors {
  flex-direction: column;
  align-items: flex-start;
}
.rate-demo .demo-rate--chars {
  flex-direction: column;
  align-items: flex-start;
}
.rate-demo .demo-rate--icons {
  flex-direction: column;
  align-items: flex-start;
}
.rate-demo .demo-rate--readonly {
  flex-direction: column;
  align-items: flex-start;
}
.rate-demo .demo-rate__tip {
  color: var(--k-color-text-tertiary, #999);
  font-size: 13px;
}
</style>
