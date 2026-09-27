import type { RouteLocationRaw } from 'vue-router'

/**
 * KBreadcrumb 面包屑相关类型定义。
 */

/** 单个面包屑项。 */
export interface KBreadcrumbItem {
  /** 显示文案。 */
  label: string
  /** 简单路由跳转路径字符串：内部经 vue-router 编程式跳转（push/replace）。
   *  与 to 同时存在时，to 优先。 */
  path?: string
  /** vue-router 完整路由跳转目标（字符串路径或对象，如 { name, params } / { path, query }），
   *  等价于 router.push(to) 或 router.replace(to)。优先级高于 path。 */
  to?: RouteLocationRaw
  /** 外部页面链接地址：设置为 <a href> 原生跳转（可打开新窗口/外部站点）。优先级最高。 */
  href?: string
  /** 链接打开方式，如 '_blank'（新窗口/新标签页）。对 href 项直接作用于 <a target>；
   *  对 to/path 项会用该方式新开窗口（经 router.resolve 解析出 URL 后 window.open）。 */
  target?: '_blank' | '_self' | '_parent' | '_top' | string
  /** 该项跳转是否不留历史记录（用 router.replace 而非 push）；缺省时继承组件级 replace。 */
  replace?: boolean
  /** 项前缀图标（iconfont 名称，经 <KIcon> 渲染）。 */
  icon?: string
  /** 是否显示该项（默认 true）。业务中可根据权限/状态动态设为 false 以隐藏该项，
   *  隐藏项及其分隔符不渲染，后项顺延补位，末项当前页高亮逻辑仍正确。 */
  show?: boolean
  /** 该项是否禁用：禁用后不可点击、不触发事件。 */
  disabled?: boolean
}
