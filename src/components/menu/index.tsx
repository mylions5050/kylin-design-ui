import {
  defineComponent,
  ref,
  watch,
  type PropType,
  type VNodeChild,
} from "vue";
import { createBem } from "@/utils/create-bem";
import KIcon from "@/components/icon/index";
import KTag from "@/components/tag/index";
import "./index.scss";

const [b, e, m] = createBem("k-menu");

export interface MenuItem {
  id: string;
  label: string;
  value?: string;
  icon?: string;
  disabled?: boolean;
  suffix?: string | MenuSuffix;
  path?: string;
  children?: MenuItem[];
}

export interface MenuSuffix {
  text: string;
  type?: "default" | "primary" | "success" | "warning" | "error";
  size?: "small" | "default" | "large";
}

export default defineComponent({
  name: "KMenu",
  props: {
    items: { type: Array as PropType<MenuItem[]>, required: true },
    modelValue: { type: String, default: "" },
    router: { type: Boolean, default: false },
    accordion: { type: Boolean, default: false },
    defaultOpenKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    itemStyle: {
      type: Object as PropType<Record<string, string>>,
      default: undefined,
    },
    iconColor: String,
    activeBg: String,
    activeColor: String,
    barColor: String,
    customClass: String,
  },
  emits: ["update:modelValue", "select"],

  setup(props, { emit, slots }) {
    /** 展开状态：只存 id */
    const openKeys = ref<Set<string>>(new Set(props.defaultOpenKeys));

    // 用 JSON.stringify 做内容比较，避免父组件渲染产生新数组引用导致展开状态被重置
    let prevDefaultKeysStr = JSON.stringify(props.defaultOpenKeys);
    watch(
      () => props.defaultOpenKeys,
      (keys) => {
        const next = JSON.stringify(keys);
        if (next !== prevDefaultKeysStr) {
          prevDefaultKeysStr = next;
          openKeys.value = new Set(keys);
        }
      },
    );

    /* ================== 激活判断 ================== */
    const isActive = (item: MenuItem) => {
      if (!props.modelValue) return false;
      if (props.router) {
        if (!item.path) return false;
        if (item.path === "/") return props.modelValue === "/";
        return props.modelValue === item.path || props.modelValue.startsWith(item.path + "/");
      }
      return item.value ? props.modelValue === item.value : false;
    };

    /* ================== 选中（自动展开父级路径） ================== */
    const handleSelect = (item: MenuItem) => {
      if (item.disabled) return;
      emit("select", item);
      emit("update:modelValue", item.value ?? item.id);
    };

    /** 展开 item 的所有祖先节点——按层级顺序逐个展开，形成 cascading 效果 */
    const ensureOpenAncestors = (item: MenuItem) => {
      const ancestors: string[] = [];
      const collect = (items: MenuItem[], targetId: string): boolean => {
        for (const node of items) {
          if (node.id === targetId) return true;
          if (node.children && collect(node.children, targetId)) {
            ancestors.push(node.id);
            return true;
          }
        }
        return false;
      };
      collect(props.items, item.id);
      if (ancestors.length === 0) return;

      // 倒序 = 从最外层祖先开始，按层级顺序逐个展开
      ancestors.reverse();
      ancestors.forEach((id, i) => {
        setTimeout(() => {
          if (!openKeys.value.has(id)) {
            const next = new Set(openKeys.value);
            next.add(id);
            openKeys.value = next;
          }
        }, i * 80);
      });
    };

    /* ================== 点击整行：叶子项选中，父项展开/收起 ================== */
    const handleItemClick = (item: MenuItem, siblings: MenuItem[]) => {
      if (item.disabled) return;
      if (item.children?.length) {
        toggleSubmenu(item, siblings);
      } else {
        // 选中叶子项时，自动展开其所有祖先
        ensureOpenAncestors(item);
        handleSelect(item);
      }
    };

    const toggleSubmenu = (item: MenuItem, siblings: MenuItem[]) => {
      const id = item.id;
      const next = new Set(openKeys.value);

      if (next.has(id)) {
        // 已展开：收起
        next.delete(id);
        openKeys.value = next;
        return;
      }

      if (props.accordion) {
        // 手风琴：只收起同一级兄弟节点
        for (const s of siblings) {
          if (s.id !== id) next.delete(s.id);
        }
      }

      next.add(id);
      openKeys.value = next;
    };

    /* ================== 样式（不缓存，干净） ================== */
    const buildStyle = (item: MenuItem) => {
      const active = isActive(item);
      if (!props.itemStyle && !props.iconColor && !props.activeBg && !props.activeColor && !props.barColor)
        return undefined;

      return {
        ...props.itemStyle,
        ...(active && props.activeBg ? { "--k-menu-active-bg": props.activeBg } : {}),
        ...(active && props.activeColor ? { "--k-menu-active-color": props.activeColor } : {}),
        ...(active && props.barColor ? { "--k-menu-bar-color": props.barColor } : {}),
        ...(props.iconColor ? { "--k-menu-icon-color": props.iconColor } : {}),
      };
    };

    /* ================== 后缀 ================== */
    const renderSuffix = (suffix: string | MenuSuffix) => {
      if (typeof suffix === "string")
        return <span class={e("suffix")}>{suffix}</span>;
      return (
        <KTag type={suffix.type ?? "default"} size={suffix.size ?? "small"}>
          {suffix.text}
        </KTag>
      );
    };

    /* ================== 丝滑动画 ================== */
    const submenuEls = ref<Map<string, HTMLElement>>(new Map());

    /** 已由 onMounted 初始化过的 key，跳过动画 */
    const initialized = new Set<string>();

    const setSubmenuRef = (id: string, el: HTMLElement | null) => {
      if (el) {
        submenuEls.value.set(id, el);
        // 如果是默认展开项且尚未初始化，立即设置高度（不做动画）
        if (openKeys.value.has(id) && !initialized.has(id)) {
          initialized.add(id);
          el.style.transition = "none";
          el.style.height = el.scrollHeight + "px";
          void el.offsetHeight;
          el.style.transition = "";
          el.style.height = "auto";
        }
      } else {
        submenuEls.value.delete(id);
      }
    };

    const animateToggle = (id: string, open: boolean) => {
      const el = submenuEls.value.get(id);
      if (!el) return;

      // 清除上一个动画的定时器
      const timerKey = `_anim_${id}`;
      const prevTimer = (el as any)[timerKey];
      if (prevTimer) clearTimeout(prevTimer);

      if (open) {
        // 展开：先记下展开后的高度，再设 height 开始过渡
        el.style.transition = "height 0.3s ease";
        el.style.height = "0px";
        requestAnimationFrame(() => {
          el.style.height = el.scrollHeight + "px";
          (el as any)[timerKey] = setTimeout(() => {
            el.style.height = "auto";
            el.style.transition = "";
            delete (el as any)[timerKey];
          }, 300);
        });
      } else {
        // 收起
        el.style.transition = "height 0.25s ease";
        el.style.height = el.scrollHeight + "px";
        requestAnimationFrame(() => {
          el.style.height = "0px";
          (el as any)[timerKey] = setTimeout(() => {
            el.style.transition = "";
            delete (el as any)[timerKey];
          }, 250);
        });
      }
    };

    watch(openKeys, (newKeys, oldKeys) => {
      for (const id of newKeys) {
        if (!oldKeys.has(id) && !initialized.has(id)) {
          animateToggle(id, true);
        }
      }
      for (const id of oldKeys) {
        if (!newKeys.has(id)) {
          animateToggle(id, false);
          // 用户操作收起的 key，下次展开时应有动画
          initialized.delete(id);
        }
      }
    }, { flush: "post" });

    // 初始展开：由 setSubmenuRef 在 DOM 挂载时处理，不再依赖 nextTick

    /* ================== 渲染 ================== */
    const renderList = (items: MenuItem[], depth = 0): VNodeChild[] =>
      items.map((item) => renderItem(item, items, depth));

    const renderItem = (
      item: MenuItem,
      siblings: MenuItem[],
      depth = 0,
    ): VNodeChild => {
      const id = item.id;
      const active = isActive(item);
      const hasChildren = !!item.children?.length;
      const disabled = item.disabled || (props.router && !item.path && !hasChildren);
      const open = openKeys.value.has(id);

      const content = (
        <>
          {item.icon && (
            <span class={e("icon")}>
              <KIcon name={item.icon} size={16} />
            </span>
          )}
          <span class={e("label")}>{item.label}</span>
          {item.suffix && renderSuffix(item.suffix)}
          {hasChildren && (
            <span class={[e("arrow"), m("open", open)]}>
              <KIcon name="arrow-right-bold" size={12} />
            </span>
          )}
        </>
      );

      /** 点击整行：有子项展开，无子项选中 */
      const onClick = () => {
        handleItemClick(item, siblings);
      };

      const onKey = (e: KeyboardEvent) => {
        if (disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
        }
      };

      const itemNode = props.router && item.path && !hasChildren ? (
        <router-link
          to={item.path}
          class={[e("item"), m("active", active), m("disabled", disabled)]}
          style={buildStyle(item)}
          aria-disabled={disabled}
          tabindex={disabled ? "-1" : undefined}
          onClick={(e: MouseEvent) => {
            if (disabled) e.preventDefault();
            else handleSelect(item);
          }}
          onKeydown={onKey}
        >
          {content}
        </router-link>
      ) : (
        <button
          type="button"
          class={[e("item"), m("active", active), m("disabled", disabled)]}
          style={buildStyle(item)}
          disabled={disabled}
          onClick={onClick}
        >
          {content}
        </button>
      );

      return (
        <div key={id} class={e("group")}>
          {itemNode}
          {hasChildren && (
            <div
              ref={(el) => setSubmenuRef(id, el as HTMLElement)}
              class={[e("submenu"), m("open", open)]}
            >
              {renderList(item.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    };

    return () => (
      <nav
        class={[b(), props.customClass]}
        role="menu"
      >
        {renderList(props.items)}
        {slots.default?.()}
      </nav>
    );
  },
});