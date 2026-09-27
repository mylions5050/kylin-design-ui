# Select组件多选功能实现文档

## 概述

为Vue3-TS项目中的Select组件扩展了多选功能，使用现有的Tag组件展示已选的选项。
**更新**: 修复了初始版本中使用原生input导致的JSX语法问题，现在完全使用KInput组件实现，符合项目架构规范。

## 新增属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `multiple` | Boolean | false | 是否启用多选模式 |
| `maxTags` | Number | -1 | 折叠标签模式中最多显示多少个标签，-1表示不限制 |
| `collapseTags` | Boolean | false | 是否启用标签折叠模式 |
| `collapseTooltip` | Boolean | true | 折叠模式下是否显示tooltip展示隐藏的标签 |

## 新增事件

| 事件 | 说明 | 参数 |
|------|------|------|
| `remove-tag` | 删除标签时触发 | 被删除标签的value值 |

## 功能特性

### 1. 基础多选
- 使用`multiple="true"`属性启用多选
- 支持通过点击标签的关闭按钮删除个别选项
- 支持完整列表的clear操作

### 2. 标签折叠模式
- 当选项较多时，启用`collapseTags="true"`可以折叠多余的标签
- `maxTags`属性控制折叠前显示的标签数量
- 使用tooltip显示被折叠的标签内容

### 3. 搜索筛选
- 多选模式下依然支持filterable搜索功能
- 搜索框会根据选项数量动态显示placeholder

### 4. 样式优化
- 重新设计了多选的UI风格
- 支持不同尺寸的tag显示
- 添加了下拉项中check图标的显示

## 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import KSelect from '@/components/select'
import type { SelectOption } from '@/components/select/types'

const selectedValues = ref<string[]>([])

const options: SelectOption[] = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
]
</script>

<template>
  <!-- 基础多选 -->
  <KSelect 
    v-model="selectedValues" 
    :options="options" 
    multiple 
    placeholder="选择技能"
  />

  <!-- 多选+可搜索 -->
  <KSelect 
    v-model="selectedValues" 
    :options="options" 
    multiple 
    filterable
    placeholder="搜索并选择技能"
  />

  <!-- 多选+标签折叠 -->
  <KSelect 
    v-model="selectedValues" 
    :options="options" 
    multiple
    collapse-tags
    :max-tags="2"
    placeholder="最多显示2个标签"
  />
</template>
```

## 实现细节

### 组件架构

1. **状态管理**: 使用computed属性处理多选状态和显示逻辑
2. **事件处理**: 独立的handleRemoveTag和handleSelect逻辑
3. **UI渲染**: 条件渲染，区分单选和多选两种模式的显示

### 关键方法

- `selectedOptions`: 计算已选择的选项数组
- `collapsedDisplayTags`: 计算在折叠模式下应该显示的标签
- `hiddenTagCount`: 计算被隐藏的标签数量
- `isOptionSelected`: 检查选项是否被选中
- `handleRemoveTag`: 处理标签删除操作

### 样式设计

- 多选输入框采用flex布局，支持tag换行
- 自适应高度，根据tag数量调整
- 保持良好的键盘可访问性

## 兼容性

- 保持与现有单选模式的完全兼容
- 向后兼容所有现有属性
- 多选模式与单选模式共享相同的样式基础




## 注意事项

1. 多选模式下`modelValue`应该是一个数组类型
2. `collapseTags`需要配合`maxTags`使用才能获得最佳效果
3. 多选模式使用KInput组件，不支持textarea类型
4. 搜索功能在多选模式下是可选的
5. Tag的closable属性会根据disabled状态自动管理




## 演示页面

查看 `src/views/select/index.vue` 中的多选示例，包含了多种使用场景的完整演示。
