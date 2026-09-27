<script setup lang="ts">
import DemoBlock from '@/components/demo-block.vue'
import APITable from '@/components/api-table/index.vue'
import BasicDemo from './demos/basic.vue'
import ExpandDemo from './demos/expand.vue'
import DisabledDemo from './demos/disabled.vue'
import FieldPropsDemo from './demos/field-props.vue'
import CheckboxDemo from './demos/checkbox.vue'
import LazyDemo from './demos/lazy.vue'
import DraggableDemo from './demos/draggable.vue'
import ExpandIconDemo from './demos/expand-icon.vue'
import GuideDemo from './demos/guide.vue'
import basicCode from './demos/basic.vue?raw'
import expandCode from './demos/expand.vue?raw'
import disabledCode from './demos/disabled.vue?raw'
import fieldPropsCode from './demos/field-props.vue?raw'
import checkboxCode from './demos/checkbox.vue?raw'
import lazyCode from './demos/lazy.vue?raw'
import draggableCode from './demos/draggable.vue?raw'
import expandIconCode from './demos/expand-icon.vue?raw'
import guideCode from './demos/guide.vue?raw'
import { apiProps, apiEmits, apiSlots } from './api-data'
</script>

<template>
  <section class="tree-demo">
    <h1>Tree 组件用例</h1>
    <p>用层级结构展示信息，可展开或收起。支持数据驱动、单选高亮、复选框多选、异步加载、拖拽排序、禁用节点与字段映射。</p>

    <DemoBlock title="基础用法" description="点击含子节点的行展开/收起，点击叶子节点选中（v-model 双向绑定）。" :code="basicCode">
      <BasicDemo />
    </DemoBlock>

    <DemoBlock title="默认展开" description="default-expand-all 展开全部节点；也可用 default-expanded-keys 指定初始展开的节点。" :code="expandCode">
      <ExpandDemo />
    </DemoBlock>

    <DemoBlock title="禁用节点" description="数据项设置 disabled: true 后，该节点不可选中也不可展开收起。" :code="disabledCode">
      <DisabledDemo />
    </DemoBlock>

    <DemoBlock title="字段映射" description="后端返回的字段名不一致时，通过 fieldProps 做归一化映射，无需手动转换数据。" :code="fieldPropsCode">
      <FieldPropsDemo />
    </DemoBlock>

    <DemoBlock title="复选框多选" description="showCheckbox 开启复选框，父子级联：勾选父节点全选子孙、子节点全部勾选时父节点自动勾上，部分勾选呈现半选态；v-model:checked-keys 收集结果。" :code="checkboxCode">
      <CheckboxDemo />
    </DemoBlock>

    <DemoBlock title="异步加载" description="传入 load 函数进入懒加载模式：挂载时调 load(null) 拉取根层，展开未带子级的节点时按需调 load(node)；箭头处显示 loading 态。数据项 leaf: true 标记叶子不再请求；加载失败收起再展开可重试。" :code="lazyCode">
      <LazyDemo />
    </DemoBlock>

    <DemoBlock title="拖拽排序与移动" description="draggable 开启后每个节点最前展示 drag 把手，按住可拖动：落在目标上 1/4 插到其前、中间变为其子级、下 1/4 插到其后；禁止落入自己或自己的子孙。drop 事件返回 { dragNode, targetNode, type }，可在其中同步后端。" :code="draggableCode">
      <DraggableDemo />
    </DemoBlock>

    <DemoBlock title="自定义展开图标" description="通过 expanded-icon / collapsed-icon 自定义展开与收起状态下的图标（iconfont 名称）：如展开显示 minus-bold、收起显示 add-bold；未配置时使用默认箭头并带旋转动画。" :code="expandIconCode">
      <ExpandIconDemo />
    </DemoBlock>

    <DemoBlock title="缩进连接线" description="show-line 开启后显示层级连接线：纵向参考线与上一级图标居中对齐，每层子级再从父级竖线引一段横向肘段连到节点内容前，文件夹下无论子文件夹还是文件都有横向线与其相连；可与其他能力（复选框、异步加载、拖拽等）自由组合。" :code="guideCode">
      <GuideDemo />
    </DemoBlock>

    <!-- API 文档 -->
    <section class="tree-demo__api">
      <h2>API</h2>
      <h3>KTree Props</h3>
      <APITable :props="apiProps" :emits="apiEmits" :slots="apiSlots" />
    </section>
  </section>
</template>

<style scoped lang="scss">
.tree-demo {
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
      margin: 0 0 20px;
      font-size: 20px;
      font-weight: 600;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
