<script setup lang="ts">
import KProgress from '@/components/progress/index'

interface Battery {
  level: number
  charging?: boolean
}

// 模拟一组设备的电量
const batteries: Battery[] = [
  { level: 80 },
  { level: 45 },
  { level: 15 },
  { level: 65, charging: true },
]

// 电量分档色：>60 绿、20~60 黄、≤20 红
const batteryColor = (p: number) => (p > 60 ? '#22c55e' : p > 20 ? '#f59e0b' : '#ed0442')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>电量条（>60 绿 / 20~60 黄 / ≤20 红，充电中带闪电图标）:</label>
      <div class="battery-row">
        <div v-for="b in batteries" :key="b.level" class="battery">
          <div class="battery__shell">
            <KProgress :percentage="b.level" :color="batteryColor" :text-inside="true" :stroke-width="20" :show-text="!b.charging" class="battery__bar">
              <span v-if="b.charging" class="battery__bolt">
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                  <path d="M13 2 L4.5 13.5 H10.5 L9 22 L19.5 9.5 H12.5 Z" fill="currentColor" />
                </svg>
              </span>
            </KProgress>
            <div class="battery__cap" />
          </div>
          <span class="battery__label">{{ b.level }}%{{ b.charging ? ' 充电中' : '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.battery-row {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}

.battery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &__shell {
    position: relative;
    display: flex;
    align-items: center;
    width: 110px;
    padding: 3px;
    border: 2px solid var(--k-color-border);
    border-radius: 8px;
    box-sizing: content-box;
  }

  // 电池正极凸头
  &__cap {
    width: 5px;
    height: 12px;
    margin-left: 2px;
    border-radius: 0 3px 3px 0;
    background: var(--k-color-border);
  }

  &__bar {
    flex: 1;
    min-width: 0;
  }

  // 充电中：插槽替换百分比文字为闪电（白色，嵌在彩色条内）
  &__bolt {
    display: inline-flex;
    align-items: center;
    color: var(--k-color-bg);
    line-height: 1;
  }

  &__label {
    font-size: 12px;
    color: var(--k-color-text-secondary);
  }
}
</style>
