import {
  defineComponent,
  ref,
  computed,
  watch,
  type PropType,
  type VNodeChild,
} from "vue";
import { createBem } from "@/utils/create-bem";
import KIcon from "@/components/icon/index";
import KCheckbox from "@/components/checkbox/index";
import type { TreeNodeData, TreeFieldProps } from "./types";
import "./index.scss";

const [b, e, m] = createBem("k-tree");

/**
 * Tree 树形控件。
 *
 * 数据驱动的树：支持展开/收起、单选高亮、复选框多选（showCheckbox，
 * 父子级联 + 半选态）、异步数据加载（load，根层/子级懒加载）、
 * 节点拖拽排序/跨层级移动（draggable，Pointer Events 实现，兼容触屏）、
 * 禁用节点、自定义节点图标与字段映射（fieldProps）。
 *
 * 交互约定（与 KMenu 一致）：点击有子节点的整行 = 展开/收起；
 * 点击叶子节点 = 选中；点击箭头图标仅切换展开收起，不影响选中；
 * 开启 showCheckbox 后点击复选框勾选，与行点击互不干扰。
 */
export default defineComponent({
  name: "KTree",
  props: {
    /** 树数据源（嵌套结构） */
    data: { type: Array as PropType<TreeNodeData[]>, required: true },
    /** 当前选中节点 id（v-model） */
    modelValue: { type: String, default: "" },
    /** 字段映射：后端字段名与默认结构不一致时配置 */
    fieldProps: {
      type: Object as PropType<TreeFieldProps>,
      default: undefined,
    },
    /** 默认展开所有节点 */
    defaultExpandAll: { type: Boolean, default: false },
    /** 默认展开的节点 id 列表 */
    defaultExpandedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /** 是否显示复选框（开启后支持父子级联多选） */
    showCheckbox: { type: Boolean, default: false },
    /** 勾选中的节点 id 列表（v-model:checked-keys），包含父节点与叶子节点 */
    checkedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * 是否可拖拽：开启后每个节点最前面展示 drag 把手图标，
     * 可拖拽调整同级顺序或拖入其他节点下级。
     */
    draggable: { type: Boolean, default: false },
    /**
     * 异步加载函数，传入后进入懒加载模式：
     * · 挂载时调用 load(null) 加载根层数据
     * · 展开未携带子级且非 leaf 的节点时调用 load(node) 加载其子级
     * · 返回 Promise<TreeNodeData[]>；失败不写缓存，收起再展开可重试
     */
    load: {
      type: Function as PropType<
        (node: TreeNodeData | null) => Promise<TreeNodeData[]>
      >,
      default: undefined,
    },
    /** 展开状态下展示的图标名（iconfont），如 minus-bold */
    expandedIcon: { type: String, default: "" },
    /** 收起状态下展示的图标名（iconfont），如 add-bold；未配置时沿用 expandedIcon */
    collapsedIcon: { type: String, default: "" },
    /** 是否显示层级连接线（纵向缩进参考线） */
    showLine: { type: Boolean, default: false },
  },
  emits: [
    /** v-model：选中节点变化时触发，载荷为节点 id */
    "update:modelValue",
    /** 节点被选中时触发，载荷为该节点原始数据 */
    "select",
    /** 节点展开/收起时触发，载荷 { node, expanded } */
    "toggle",
    /** v-model:checked-keys：勾选项变化时触发，载荷为全量勾选中的节点 id 数组 */
    "update:checkedKeys",
    /** 节点被勾选/取消勾选时触发，载荷 { node, checked } */
    "check",
    /** 异步加载完成时触发，载荷 { node, data }（node 为 null 表示根层） */
    "load",
    /** 拖拽落下时触发，载荷 { dragNode, targetNode, type }（type: before/after/inner） */
    "drop",
  ],

  setup(props, { emit }) {
    /* ================== 字段映射 ================== */
    const fields = computed(() => ({
      id: props.fieldProps?.id ?? "id",
      label: props.fieldProps?.label ?? "label",
      children: props.fieldProps?.children ?? "children",
      icon: props.fieldProps?.icon ?? "icon",
      disabled: props.fieldProps?.disabled ?? "disabled",
      leaf: props.fieldProps?.leaf ?? "leaf",
    }));

    /** 字段映射后的安全取值（节点可能来自异构的后端数据） */
    const pick = (node: TreeNodeData, key: string): unknown =>
      (node as unknown as Record<string, unknown>)[key];

    const getId = (node: TreeNodeData) => pick(node, fields.value.id) as string;
    const getLabel = (node: TreeNodeData) =>
      pick(node, fields.value.label) as string;
    const getIcon = (node: TreeNodeData) =>
      pick(node, fields.value.icon) as string | undefined;
    const isDisabled = (node: TreeNodeData) => !!pick(node, fields.value.disabled);
    const getIsLeaf = (node: TreeNodeData) => !!pick(node, fields.value.leaf);

    /* ================== 异步加载（load 模式） ================== */
    /** 根层在 childCache / loadedKeys 中占用的虚拟 key */
    const ROOT_KEY = "__root__";
    /** 已异步加载的子级缓存：节点 id -> 子节点数组 */
    const childCache = ref<Map<string, TreeNodeData[]>>(new Map());
    /** 已完成加载的 key，避免重复请求（需响应式：渲染中会读取） */
    const loadedKeys = ref<Set<string>>(new Set());
    /** 加载中的 key：对应节点的箭头处显示 loading 态 */
    const loadingKeys = ref<Set<string>>(new Set());

    const isLazyMode = computed(() => typeof props.load === "function");

    /**
     * 树的内部数据源：初始化及外部 data 变化时从 props.data 深拷贝同步
     * （懒加载模式除外，其根层由 load 提供）。这样拖拽等结构性修改直接
     * 作用于副本并可靠触发重渲染，也避免就地改动父组件的数据。
     */
    const rootNodes = ref<TreeNodeData[]>([]);
    let prevDataStr = "";
    const syncFromProps = () => {
      if (isLazyMode.value) return;
      prevDataStr = JSON.stringify(props.data);
      rootNodes.value = JSON.parse(prevDataStr) as TreeNodeData[];
    };
    syncFromProps();
    watch(
      () => props.data,
      () => {
        const next = JSON.stringify(props.data);
        if (next !== prevDataStr) syncFromProps();
      },
    );

    /** 实际渲染的根节点（统一指向内部数据源） */
    const displayRoots = computed(() => rootNodes.value);

    /**
     * 子节点读取：load 模式优先取已加载的缓存，否则读原始数据字段。
     * 所有需要子级的逻辑（展开判断/勾选级联/递归渲染）都走这里。
     */
    const getChildren = (node: TreeNodeData): TreeNodeData[] | undefined => {
      const id = getId(node);
      if (isLazyMode.value && id && childCache.value.has(id))
        return childCache.value.get(id);
      return pick(node, fields.value.children) as TreeNodeData[] | undefined;
    };

    /**
     * 节点是否可展开：有子级直接算；否则在 load 模式下，
     * 未标 leaf 且尚未加载完成的节点仍可能是父节点，保留展开箭头。
     */
    const isExpandable = (node: TreeNodeData): boolean => {
      if (getChildren(node)?.length) return true;
      if (!isLazyMode.value || getIsLeaf(node)) return false;
      return !loadedKeys.value.has(getId(node));
    };

    /**
     * 确保某节点的子级已加载（node 为 null 表示加载根层）。
     * 加载失败不写入缓存、不标记已加载，收起再展开即可重试。
     */
    const ensureLoaded = async (node: TreeNodeData | null) => {
      if (!isLazyMode.value) return;
      const key = node ? getId(node) : ROOT_KEY;
      if (loadedKeys.value.has(key)) return;
      // 数据自带子级的节点无需远程拉取
      if (
        node &&
        (pick(node, fields.value.children) as TreeNodeData[] | undefined)?.length
      ) {
        loadedKeys.value.add(key);
        return;
      }
      loadingKeys.value.add(key);
      try {
        const list = (await props.load!(node)) ?? [];
        if (node) childCache.value.set(key, list);
        else rootNodes.value = list;
        loadedKeys.value.add(key);
        emit("load", { node, data: list });
      } finally {
        loadingKeys.value.delete(key);
      }
    };

    /* ================== 展开状态 ================== */
    // 非 load 模式才需要在初始化时静态计算默认展开；load 模式的根层由 ensureLoaded 决定
    const initExpandedKeys = (): Set<string> => {
      const keys = new Set<string>();
      if (props.defaultExpandAll) {
        const collect = (nodes: TreeNodeData[]) => {
          for (const node of nodes) {
            if (getChildren(node)?.length) {
              keys.add(getId(node));
              collect(getChildren(node)!);
            }
          }
        };
        collect(displayRoots.value);
      } else {
        for (const key of props.defaultExpandedKeys) keys.add(key);
      }
      return keys;
    };
    const expandedKeys = ref<Set<string>>(initExpandedKeys());

    /** 防抖：正在加载子级的节点忽略重复展开请求 */
    const pendingExpands = new Set<string>();

    const toggleExpand = async (node: TreeNodeData) => {
      if (isDisabled(node)) return;
      const id = getId(node);
      const isOpen = expandedKeys.value.has(id);
      // 首次展开懒加载节点：先拉取子级再决定是否展开
      if (!isOpen) {
        // 加载进行中时忽略重复点击，避免重复请求与状态双翻转
        if (pendingExpands.has(id)) return;
        pendingExpands.add(id);
        try {
          await ensureLoaded(node);
        } finally {
          pendingExpands.delete(id);
        }
        // 加载完仍是空子级：视为叶子，不展开也不发 toggle
        if (isLazyMode.value && !getChildren(node)?.length) return;
      }
      const next = new Set(expandedKeys.value);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      expandedKeys.value = next;
      emit("toggle", { node, expanded: next.has(id) });
    };

    /* ================== 勾选（父子级联） ================== */
    const checkedSet = ref<Set<string>>(new Set(props.checkedKeys));

    // 外部 v-model:checked-keys 变化时同步内部状态
    let prevCheckedStr = JSON.stringify(props.checkedKeys);
    watch(
      () => props.checkedKeys,
      (keys) => {
        const next = JSON.stringify(keys);
        if (next !== prevCheckedStr) {
          prevCheckedStr = next;
          checkedSet.value = new Set(keys);
        }
      },
    );

    /** 父节点映射：子节点 id -> 父节点对象，用于勾选时向上级联 */
    const buildParentMap = (): Map<string, TreeNodeData> => {
      const map = new Map<string, TreeNodeData>();
      const walk = (nodes: TreeNodeData[], parent?: TreeNodeData) => {
        for (const node of nodes) {
          if (parent) map.set(getId(node), parent);
          const children = getChildren(node);
          if (children?.length) walk(children, node);
        }
      };
      walk(displayRoots.value);
      return map;
    };
    const parentMap = computed(buildParentMap);

    /** 收集节点自身及所有后代节点的 id */
    const getSubtreeIds = (node: TreeNodeData): string[] => {
      const ids = [getId(node)];
      const walk = (n: TreeNodeData) => {
        for (const child of getChildren(n) ?? []) {
          ids.push(getId(child));
          walk(child);
        }
      };
      walk(node);
      return ids;
    };

    /**
     * 节点视觉三态：checked（全选）/ indeterminate（部分选中）。
     * 全选要求整个子树的所有节点都在勾选集合中。
     */
    const getCheckState = (
      node: TreeNodeData,
    ): { checked: boolean; indeterminate: boolean } => {
      const ids = getSubtreeIds(node);
      const allCount = ids.length;
      const checkedCount = ids.filter((i) => checkedSet.value.has(i)).length;
      return {
        checked: checkedCount === allCount,
        indeterminate: checkedCount > 0 && checkedCount < allCount,
      };
    };

    /**
     * 勾选切换：向下级联（勾中父 → 全选子孙），再沿祖先逐级回算；
     * 部分选中的父节点点击后变为全选。禁用节点不可操作。
     */
    const handleCheck = (node: TreeNodeData) => {
      if (isDisabled(node)) return;
      const next = new Set(checkedSet.value);
      const ids = getSubtreeIds(node);
      // 半选或未全选 → 本次统一变为全选；已全选 → 整棵子树取消
      const willCheck = !ids.every((i) => next.has(i));
      for (const i of ids) {
        if (willCheck) next.add(i);
        else next.delete(i);
      }

      // 沿祖先链逐级回算：全部子孙已勾选 -> 勾上；否则去掉该祖先。
      // 注意只判断子孙（不含祖先自身），从下往上逐层修正才能正确级联
      let current = parentMap.value.get(getId(node));
      while (current) {
        const pId = getId(current);
        const descendantIds = getSubtreeIds(current).slice(1);
        if (descendantIds.length && descendantIds.every((i) => next.has(i)))
          next.add(pId);
        else next.delete(pId);
        current = parentMap.value.get(pId);
      }

      checkedSet.value = next;
      prevCheckedStr = JSON.stringify([...next]);
      emit("update:checkedKeys", [...next]);
      emit("check", { node, checked: willCheck });
    };

    /* ================== 选中 ================== */
    const handleSelect = (node: TreeNodeData) => {
      if (isDisabled(node)) return;
      emit("select", node);
      emit("update:modelValue", getId(node));
    };

    /* ================== 点击整行：父节点展开/收起，叶子节点选中（与 KMenu 约定一致） */
    const handleClick = (node: TreeNodeData) => {
      if (isDisabled(node)) return;
      if (isExpandable(node)) {
        toggleExpand(node);
      } else {
        handleSelect(node);
      }
    };

    /* ================== 拖拽（Pointer Events 自实现，鼠标/触屏通用） ================== */
    type DropType = "before" | "after" | "inner";

    const dragNode = ref<TreeNodeData | null>(null);
    /** 当前悬停目标的落点标记，驱动行上的指示线/高亮 */
    const dropMark = ref<{ id: string; type: DropType } | null>(null);
    /** 拖拽跟随光标的提示浮块 */
    const ghost = ref<{ x: number; y: number; label: string } | null>(null);

    /** 按 id 查找节点对象（覆盖根层、嵌套子级与懒加载缓存层） */
    const findNodeById = (
      id: string,
      start: TreeNodeData[] = rootNodes.value,
    ): TreeNodeData | null => {
      for (const n of start) {
        if (getId(n) === id) return n;
        const ch = getChildren(n);
        if (ch) {
          const found = findNodeById(id, ch);
          if (found) return found;
        }
      }
      return null;
    };

    /** 找到某节点所在的兄弟数组（任意层级）；找不到返回 null */
    const findSiblingList = (
      targetId: string,
    ): { list: TreeNodeData[]; index: number } | null => {
      const scan = (list: TreeNodeData[]) => {
        const index = list.findIndex((n) => getId(n) === targetId);
        return index > -1 ? { list, index } : null;
      };
      const walk = (
        list: TreeNodeData[],
      ): { list: TreeNodeData[]; index: number } | null => {
        const hit = scan(list);
        if (hit) return hit;
        for (const n of list) {
          const ch = getChildren(n);
          if (ch?.length) {
            const found = walk(ch);
            if (found) return found;
          }
        }
        return null;
      };
      return walk(rootNodes.value);
    };

    /** 取目标节点的子级容器，不存在则创建（懒加载模式下落在缓存数组中） */
    const ensureChildrenOf = (node: TreeNodeData): TreeNodeData[] => {
      const id = getId(node);
      if (isLazyMode.value && id && childCache.value.has(id)) {
        const arr = childCache.value.get(id)!;
        // 整体替换 Map 以触发依赖收集
        childCache.value = new Map(childCache.value);
        return arr;
      }
      let ch = pick(node, fields.value.children) as TreeNodeData[] | undefined;
      if (!ch) {
        ch = [];
        (node as unknown as Record<string, unknown>)[fields.value.children] = ch;
      }
      return ch;
    };

    /** 执行移动：返回是否成功（非法落点如自身/自己子孙则拒绝） */
    const performMove = (
      drag: TreeNodeData,
      target: TreeNodeData,
      type: DropType,
    ): boolean => {
      const dragId = getId(drag);
      const targetId = getId(target);
      // 防环：不能落到自己身上或自己的子孙里
      if (dragId === targetId || getSubtreeIds(drag).includes(targetId))
        return false;
      // 1) 先从原位置摘除
      const origin = findSiblingList(dragId);
      if (!origin) return false;
      const [moved] = origin.list.splice(origin.index, 1);
      // 2) 落位
      if (type === "inner") {
        ensureChildrenOf(target).push(moved);
        // 拖入后自动展开目标节点
        if (!expandedKeys.value.has(targetId)) {
          expandedKeys.value = new Set([
            ...expandedKeys.value,
            targetId,
          ]);
        }
      } else {
        // 摘除后再重新定位目标（同层排序时索引已变化）
        const place = findSiblingList(targetId);
        if (!place) {
          // 兕底：位置丢失则放回原处
          origin.list.splice(origin.index, 0, moved);
          return false;
        }
        place.list.splice(place.index + (type === "after" ? 1 : 0), 0, moved);
      }
      emit("drop", { dragNode: moved, targetNode: target, type });
      return true;
    };

    interface DragContext {
      node: TreeNodeData;
      startX: number;
      startY: number;
      started: boolean;
      onMove: (e: MouseEvent) => void;
      onUp: (e: MouseEvent) => void;
    }
    let dragCtx: DragContext | null = null;

    /** 把手按下：开始监听全局移动/抬起（pointer 优先，老浏览器回退 mouse） */
    const onHandleDown = (node: TreeNodeData, e: MouseEvent) => {
      if (!props.draggable || isDisabled(node)) return;
      e.preventDefault(); // 阻止文字选中/默认拖拽
      const supportsPointer = typeof window.PointerEvent !== "undefined";
      const ctx: DragContext = {
        node,
        startX: e.clientX,
        startY: e.clientY,
        started: false,
        onMove: (ev) => onDragMove(ev),
        onUp: () => onDragEnd(),
      };
      dragCtx = ctx;
      const moveName = supportsPointer ? "pointermove" : "mousemove";
      const upName = supportsPointer ? "pointerup" : "mouseup";
      window.addEventListener(moveName, ctx.onMove);
      window.addEventListener(upName, ctx.onUp);
    };

    const onDragMove = (e: MouseEvent) => {
      if (!dragCtx) return;
      // 移动超过阈值才算真正拖拽，避免误伤普通点击
      if (
        !dragCtx.started &&
        Math.hypot(e.clientX - dragCtx.startX, e.clientY - dragCtx.startY) < 4
      )
        return;
      dragCtx.started = true;
      dragNode.value = dragCtx.node;
      ghost.value = {
        x: e.clientX,
        y: e.clientY,
        label: getLabel(dragCtx.node) ?? "",
      };

      // 由光标下的行计算落点区域（上1/4=前，下1/4=后，中间=内）
      const el = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest('[data-node-id]') as HTMLElement | null;
      if (!el || !el.dataset.nodeId) {
        dropMark.value = null;
        return;
      }
      const target = findNodeById(el.dataset.nodeId);
      if (!target) {
        dropMark.value = null;
        return;
      }
      const rect = el.getBoundingClientRect();
      const ratio = (e.clientY - rect.top) / rect.height;
      const type: DropType =
        ratio < 0.25 ? "before" : ratio > 0.75 ? "after" : "inner";
      // 拖到自己或自己的子孙上：不给任何可落点反馈
      if (
        getId(target) === getId(dragCtx.node) ||
        getSubtreeIds(dragCtx.node).includes(getId(target))
      ) {
        dropMark.value = null;
        return;
      }
      dropMark.value = { id: getId(target), type };
    };

    const onDragEnd = () => {
      if (!dragCtx) return;
      const supportsPointer = typeof window.PointerEvent !== "undefined";
      const moveName = supportsPointer ? "pointermove" : "mousemove";
      const upName = supportsPointer ? "pointerup" : "mouseup";
      window.removeEventListener(moveName, dragCtx.onMove);
      window.removeEventListener(upName, dragCtx.onUp);
      try {
        if (
          dragCtx.started &&
          dragNode.value &&
          dropMark.value
        ) {
          const target = findNodeById(dropMark.value.id);
          if (target) performMove(dragNode.value, target, dropMark.value.type);
        }
      } finally {
        dragCtx = null;
        dragNode.value = null;
        dropMark.value = null;
        ghost.value = null;
      }
    };

    /* ================== 自定义展开/收起图标 ================== */
    /** 是否配置了自定义展开图标（配置后取消箭头旋转动画） */
    const hasExpandIcons = computed(
      () => !!(props.expandedIcon || props.collapsedIcon),
    );
    /** 展开态图标：优先 expandedIcon，未单独配置时沿用收起图标，最终回落默认箭头 */
    const currentExpandedIcon = computed(
      () => props.expandedIcon || props.collapsedIcon || "arrow-right-bold",
    );
    /** 收起态图标：优先 collapsedIcon，未单独配置时沿用展开图标，最终回落默认箭头 */
    const currentCollapsedIcon = computed(
      () => props.collapsedIcon || props.expandedIcon || "arrow-right-bold",
    );

    /* ================== 渲染 ================== */
    const renderNodes = (nodes: TreeNodeData[], depth = 0): VNodeChild[] =>
      nodes.map((node, idx) => {
        const id = getId(node);
        const label = getLabel(node) ?? "";
        const icon = getIcon(node);
        const disabled = isDisabled(node);
        const children = getChildren(node);
        const hasChildren = !!children?.length;
        const expandable = isExpandable(node);
        const loading = loadingKeys.value.has(id);
        const open = expandedKeys.value.has(id);
        const active =
          !!props.modelValue && !expandable && props.modelValue === id;
        const markType =
          dropMark.value?.id === id ? dropMark.value.type : null;

        return (
          <div key={id} class={e("node")} role="treeitem">
            <div
              data-node-id={id}
              class={[
                e("item"),
                m("active", active),
                m("disabled", disabled),
                m("drop-before", markType === "before"),
                m("drop-after", markType === "after"),
                m("drop-inner", markType === "inner"),
              ]}
              style={{ paddingLeft: `${12 + depth * 20}px` }}
              aria-expanded={expandable ? open : undefined}
              aria-disabled={disabled || undefined}
              onClick={() => handleClick(node)}
            >
              {/* 缩进连接线：showLine 开启时各层竖向参考线与其上一级
                  图标的垂直中线对齐（20 + 20j px）；最左 4px 为虚拟根主干线。
                  组内最后一个孩子的父级边只画上半段，与肘段交汇成 └ 角 */}
              {props.showLine && (
                <>
                  <span
                    key="guide-root"
                    class={e("guide")}
                    style={{
                      left: "4px",
                      ...(depth === 0 && idx === nodes.length - 1
                        ? { height: "50%" }
                        : null),
                    }}
                  />
                  {Array.from({ length: depth }, (_, i) => (
                    <span
                      key={`guide-${i}`}
                      class={e("guide")}
                      style={{
                        left: `${20 + i * 20}px`,
                        ...(i === depth - 1 && idx === nodes.length - 1
                          ? { height: "50%" }
                          : null),
                      }}
                    />
                  ))}
                  {/* 横向肘段：根级从主干、子级从所属父级竖线，
                      连到节点内容前留一小空隙；行中点处交汇成 ├ 或 └ */}
                  <span
                    key="guide-elbow"
                    class={e("elbow")}
                    style={{
                      left: depth === 0 ? "4px" : `${20 + (depth - 1) * 20}px`,
                      width: `${
                        12 + depth * 20 - (depth === 0 ? 4 : 20 + (depth - 1) * 20) - 3
                      }px`,
                    }}
                  />
                </>
              )}
              {/* 拖拽把手：每个节点最前面 */}
              {props.draggable &&
                ((typeof window !== "undefined" &&
                typeof window.PointerEvent !== "undefined") ? (
                  <span
                    class={e("drag")}
                    onPointerdown={(ev: PointerEvent) => onHandleDown(node, ev)}
                    onClick={(ev: MouseEvent) => ev.stopPropagation()}
                  >
                    <KIcon name="drag" size={14} />
                  </span>
                ) : (
                  <span
                    class={e("drag")}
                    onMousedown={(ev: MouseEvent) => onHandleDown(node, ev)}
                    onClick={(ev: MouseEvent) => ev.stopPropagation()}
                  >
                    <KIcon name="drag" size={14} />
                  </span>
                ))}
              {/* 箭头/展开标记占位：叶子节点也保留同等宽度，保证标签对齐 */}
              <span
                class={[e("arrow"), m("open", open && !hasExpandIcons.value)]}
                onClick={(ev: MouseEvent) => {
                  if (!expandable || disabled) return;
                  ev.stopPropagation();
                  toggleExpand(node);
                }}
              >
                {/* 加载中：箭头位置换成旋转的 loading 图标 */}
                {loading ? (
                  <KIcon name="loading" size={12} class={e("spin")} />
                ) : (
                  expandable && (
                    <KIcon
                      name={
                        open
                          ? currentExpandedIcon.value
                          : currentCollapsedIcon.value
                      }
                      size={12}
                    />
                  )
                )}
              </span>
              {props.showCheckbox && (
                <KCheckbox
                  class={e("checkbox")}
                  checked={getCheckState(node).checked}
                  indeterminate={getCheckState(node).indeterminate}
                  disabled={disabled}
                  onUpdate:checked={() => handleCheck(node)}
                />
              )}
              {icon && (
                <span class={e("icon")}>
                  <KIcon name={icon} size={14} />
                </span>
              )}
              <span class={e("label")}>{label}</span>
            </div>
            {hasChildren && open && (
              <div class={e("children")} role="group">
                {renderNodes(children!, depth + 1)}
              </div>
            )}
          </div>
        );
      });

    // load 模式：挂载即开始拉取根层数据
    if (isLazyMode.value) ensureLoaded(null);

    return () => (
      <div class={b()} role="tree">
        {loadingKeys.value.has(ROOT_KEY) && (
          <div class={e("loading")} role="status">
            <KIcon name="loading" size={14} class={e("spin")} />
            <span>加载中...</span>
          </div>
        )}
        {renderNodes(displayRoots.value)}
        {/* 拖拽跟随光标的浮块 */}
        {ghost.value && (
          <div
            class={e("ghost")}
            style={{ left: `${ghost.value.x}px`, top: `${ghost.value.y}px` }}
          >
            {ghost.value.label}
          </div>
        )}
      </div>
    );
  },
});
