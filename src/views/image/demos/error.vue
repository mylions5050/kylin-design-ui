<script setup lang="ts">
import { ref } from 'vue'
import KImage from '@/components/image/index'

// 加载失败：默认展示图标 + "加载失败"，也可通过 #error 插槽完全自定义
const brokenSrc = '/demo-images/not-exist.svg'
const okSrc = 'https://picsum.photos/id/1016/600/400'

/* load / error 事件日志 */
const logs = ref<string[]>([])
const addLog = (msg: string) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()} ${msg}`)
}
</script>

<template>
  <div class="demo-group">
    <div class="img-list">
      <div class="img-col">
        <span class="col-label">默认失败提示</span>
        <KImage :src="brokenSrc" :width="160" :height="120" @load="addLog('load')" @error="addLog('error')" />
      </div>
      <div class="img-col">
        <span class="col-label">#error 自定义</span>
        <KImage :src="brokenSrc" :width="160" :height="120">
          <template #error>
            <span style="color: var(--k-color-error)">图片走丢了～</span>
          </template>
        </KImage>
      </div>
      <div class="img-col">
        <span class="col-label">加载成功触发 load</span>
        <KImage :src="okSrc" :width="160" :height="120" fit="cover" @load="addLog('load：id/1016')" @error="addLog('error')" />
      </div>
    </div>
    <div v-if="logs.length" class="event-log">
      <div v-for="(log, i) in logs" :key="i" class="event-log__item">{{ log }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* demo 布局样式 */
@import "./common.scss";

.img-list {
  display: flex;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  overflow: hidden;

  /* 容器偏窄时横向滚动，保证每列最小宽度、内容都完整可看 */
  overflow-x: auto;
}

.img-col {
  flex: 1 0 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 10px;

  & + .img-col {
    border-left: 1px solid var(--k-color-border);
  }

  .col-label {
    margin-bottom: 20px;
    color: var(--k-color-text-secondary);
    font-size: 14px;
  }
}
</style>
