import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/default.vue'
import LandingView from '@/views/landing/index.vue'
import IndexView from '@/views/index.vue'
import TableDemo from '@/views/table/index.vue'
import SupperTableDemo from '@/views/supper-table/index.vue'
import IconDemo from '@/views/icon/index.vue'
import ButtonDemo from '@/views/button/index.vue'
import TooltipDemo from '@/views/tooltip/index.vue'
import CheckboxDemo from '@/views/checkbox/index.vue'
import AlertDemo from '@/views/alert/index.vue'
import ContainerDemo from '@/views/container/index.vue'
import GridDemo from '@/views/grid/index.vue'
import ScrollBarDemo from '@/views/scrollbar/index.vue'
import NoticeDemo from '@/views/notice/index.vue'
import SwitchDemo from '@/views/switch/index.vue'
import TagDemo from '@/views/tag/index.vue'
import AvatarDemo from '@/views/avatar/index.vue'
import BadgeDemo from '@/views/badge/index.vue'
import RadioDemo from '@/views/radio/index.vue'
import SelectDemo from '@/views/select/index.vue'
import DialogDemo from '@/views/dialog/index.vue'
import MenuDemo from '@/views/menu/index.vue'
import InputDemo from '@/views/input/index.vue'
import MessageDemo from '@/views/message/index.vue'
import PaginationDemo from '@/views/pagination/index.vue'
import ProgressDemo from '@/views/progress/index.vue'
import DatePickerPaneDemo from '@/views/date-picker/index.vue'
import CardDemo from '@/views/card/index.vue'
import LoadingDemo from '@/views/loading/index.vue'
import TabDemo from '@/views/tab/index.vue'
import BreadcrumbDemo from '@/views/breadcrumb/index.vue'
import StepsDemo from '@/views/steps/index.vue'
import InfoPopoverDemo from '@/views/info-popover/index.vue'
import DatePickerDemo from '@/views/datepicker/index.vue'
import TimePickerDemo from '@/views/timepicker/index.vue'
import DateTimePickerDemo from '@/views/date-time-picker/index.vue'
import TimeSelectDemo from '@/views/time-select/index.vue'
import TreeDemo from '@/views/tree/index.vue'
import RateDemo from '@/views/rate/index.vue'
import SliderDemo from '@/views/slider/index.vue'
import DropdownDemo from '@/views/dropdown/index.vue'
import CascaderDemo from '@/views/cascader/index.vue'
import TransferDemo from '@/views/transfer/index.vue'
import TreeSelectDemo from '@/views/tree-select/index.vue'
import ResultDemo from '@/views/result/index.vue'
import MessageBoxDemo from '@/views/message-box/index.vue'
import DrawerDemo from '@/views/drawer/index.vue'
import CollapseDemo from '@/views/collapse/index.vue'
import DescriptionsDemo from '@/views/descriptions/index.vue'
import InputNumberDemo from '@/views/input-number/index.vue'
import ImageDemo from '@/views/image/index.vue'
import PageHeaderDemo from '@/views/page-header/index.vue'
import UploadDemo from '@/views/upload/index.vue'
import FormDemo from '@/views/form/index.vue'
import GuideView from '@/views/guide/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 全屏落地页：无侧边栏、无顶栏（位于 Layout 外层路由）
    { path: '/', name: 'landing', component: LandingView },
    {
      path: '/',
      component: Layout,
      children: [
        { path: 'components', name: 'home', component: IndexView },
        { path: 'guide', name: 'guide', component: GuideView },
        { path: 'table', name: 'table', component: TableDemo },
        { path: 'supper-table', name: 'supper-table', component: SupperTableDemo },
        { path: 'icon', name: 'icon', component: IconDemo },
        { path: 'button', name: 'button', component: ButtonDemo },
        { path: 'tooltip', name: 'tooltip', component: TooltipDemo },
        { path: 'checkbox', name: 'checkbox', component: CheckboxDemo },
        { path: 'alert', name: 'alert', component: AlertDemo },
        { path: 'container', name: 'container', component: ContainerDemo },
        { path: 'grid', name: 'grid', component: GridDemo },
        { path: 'scrollbar', name: 'scrollbar', component: ScrollBarDemo },
        { path: 'notice', name: 'notice', component: NoticeDemo },
        { path: 'switch', name: 'switch', component: SwitchDemo },
        { path: 'tag', name: 'tag', component: TagDemo },
        { path: 'avatar', name: 'avatar', component: AvatarDemo },
        { path: 'badge', name: 'badge', component: BadgeDemo },
        { path: 'input', name: 'input', component: InputDemo },
        { path: 'select', name: 'select', component: SelectDemo },
        { path: 'radio', name: 'radio', component: RadioDemo },
        { path: 'dialog', name: 'dialog', component: DialogDemo },
        { path: 'menu', name: 'menu', component: MenuDemo },
        { path: 'message', name: 'message', component: MessageDemo },
        { path: 'pagination', name: 'pagination', component: PaginationDemo },
        { path: 'progress', name: 'progress', component: ProgressDemo },
        { path: 'date-picker-pane', name: 'date-picker-pane', component: DatePickerPaneDemo },
        { path: 'card', name: 'card', component: CardDemo },
        { path: 'loading', name: 'loading', component: LoadingDemo },
        { path: 'tab', name: 'tab', component: TabDemo },
        { path: 'breadcrumb', name: 'breadcrumb', component: BreadcrumbDemo },
        { path: 'steps', name: 'steps', component: StepsDemo },
        { path: 'info-popover', name: 'info-popover', component: InfoPopoverDemo },
        { path: 'date-picker', name: 'date-picker', component: DatePickerDemo },
        { path: 'time-picker', name: 'time-picker', component: TimePickerDemo },
        { path: 'date-time-picker', name: 'date-time-picker', component: DateTimePickerDemo },
        { path: 'time-select', name: 'time-select', component: TimeSelectDemo },
        { path: 'tree', name: 'tree', component: TreeDemo },
        { path: 'rate', name: 'rate', component: RateDemo },
        { path: 'slider', name: 'slider', component: SliderDemo },
        { path: 'dropdown', name: 'dropdown', component: DropdownDemo },
        { path: 'cascader', name: 'cascader', component: CascaderDemo },
        { path: 'transfer', name: 'transfer', component: TransferDemo },
        { path: 'tree-select', name: 'tree-select', component: TreeSelectDemo },
        { path: 'result', name: 'result', component: ResultDemo },
        { path: 'message-box', name: 'message-box', component: MessageBoxDemo },
        { path: 'drawer', name: 'drawer', component: DrawerDemo },
        { path: 'collapse', name: 'collapse', component: CollapseDemo },
        { path: 'descriptions', name: 'descriptions', component: DescriptionsDemo },
{ path: 'input-number', name: 'input-number', component: InputNumberDemo },
{ path: 'image', name: 'image', component: ImageDemo },
{ path: 'page-header', name: 'page-header', component: PageHeaderDemo },
{ path: 'upload', name: 'upload', component: UploadDemo },
{ path: 'form', name: 'form', component: FormDemo },
      ],
    },
  ],
})

export default router
