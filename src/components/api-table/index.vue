<script setup lang="ts">
/**
 * APITable — 组件 API 文档表格（Props / Emits / Slots）。
 * 数据由 scripts/gen-api.mjs 自动生成，通常从组件的 api-data.ts 导入。
 */
import type { ApiPropRow, ApiEventRow, ApiSlotRow } from '@/components/api-table/types'

defineProps<{
  /** Props 数据（name / type / default / required / desc） */
  props?: ApiPropRow[]
  /** 事件数据（name / desc） */
  emits?: ApiEventRow[]
  /** 插槽数据（name / desc） */
  slots?: ApiSlotRow[]
}>()
</script>

<template>
  <section class="api-table">
    <!-- Props -->
    <section v-if="props && props.length" class="api-table__group">
      <h3 class="api-table__title">Props 属性</h3>
      <div class="api-table__wrap">
        <table class="api-table__table">
          <thead>
            <tr>
              <th>名称</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
              <th>必填</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in props" :key="row.name">
              <td class="api-table__col-name">{{ row.name }}</td>
              <td class="api-table__col-desc">{{ row.desc }}</td>
              <td class="api-table__col-type">{{ row.type }}</td>
              <td class="api-table__col-default">{{ row.default }}</td>
              <td>{{ row.required ? '是' : '否' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Emits -->
    <section v-if="emits && emits.length" class="api-table__group">
      <h3 class="api-table__title">Events 事件</h3>
      <div class="api-table__wrap">
        <table class="api-table__table">
          <thead>
            <tr>
              <th>名称</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in emits" :key="row.name">
              <td class="api-table__col-name">on{{ row.name[0].toUpperCase() + row.name.slice(1) }}</td>
              <td>{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slots -->
    <section v-if="slots && slots.length" class="api-table__group">
      <h3 class="api-table__title">Slots 插槽</h3>
      <div class="api-table__wrap">
        <table class="api-table__table">
          <thead>
            <tr>
              <th>名称</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in slots" :key="row.name">
              <td class="api-table__col-name">#{{ row.name }}</td>
              <td>{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
.api-table {
  margin-top: 8px;

  &__group {
    margin-bottom: 24px;
  }

  &__title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    color: var(--k-color-text);
  }

  &__wrap {
    overflow: auto;
    border: 1px solid var(--k-color-border-table);
    border-radius: 8px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;

    th,
    td {
      padding: 10px 16px;
      text-align: left;
      border-bottom: 1px solid var(--k-color-border-table);
      color: var(--k-color-text);
      line-height: 1.6;
      vertical-align: top;
    }

    th {
      font-weight: 600;
      color: var(--k-color-text-secondary);
      background: var(--k-color-bg-secondary);
      white-space: nowrap;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }

  &__col-name {
    font-weight: 600;
    color: var(--k-color-primary);
    white-space: nowrap;
  }

  // 说明列：保留 desc 中的换行（\n），便于多行/分点展示
  &__col-desc {
    white-space: pre-line;
  }

  &__col-type {
    font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
    font-size: 12px;
    color: var(--k-code-string, #02613b);
    white-space: pre-wrap;
  }

  &__col-default {
    font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
    font-size: 12px;
    color: var(--k-color-text-secondary);
    white-space: nowrap;
  }
}
</style>
