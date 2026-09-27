/**
 * APITable 相关的通用类型定义。
 * 由组件的 api-data.ts（scripts/gen-api.mjs 生成）与 APITable 组件共用。
 */
export interface ApiPropRow {
  name: string
  type: string
  default: string
  required: boolean
  desc: string
}

export interface ApiEventRow {
  name: string
  desc: string
}

export interface ApiSlotRow {
  name: string
  desc: string
}
