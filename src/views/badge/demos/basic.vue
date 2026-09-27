<script setup lang="ts">
import KBadge from '@/components/badge/index'
import KAvatar from '@/components/avatar/index'
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="badge-basic">
    <div class="badge-row">
      <KBadge :count="5">
        <KAvatar shape="square" size="large" />
      </KBadge>
      <KBadge :count="0" show-zero>
        <KAvatar shape="square" size="large" />
      </KBadge>
      <KBadge :count="0">
        <KAvatar shape="square" size="large" />
      </KBadge>
      <!-- count 插槽自定义徽标内容 -->
      <KBadge :count="25">
        <template #count>
          <KIcon name="clock-filling" style="color: #ed0442; font-size: 18px" />
        </template>
        <KAvatar shape="square" size="large" />
      </KBadge>
    </div>

    <div class="badge-row">
      <KBadge :count="100" style="margin-right: 32px">
        <KIcon name="notification" :size="20" />
      </KBadge>
      <KBadge :count="100" :overflow-count="10" style="margin-right: 32px">
        <KIcon name="notification" :size="20" />
      </KBadge>
      <!-- 讨嫌的小红点 -->
      <KBadge dot style="margin-right: 32px">
        <KIcon name="notification" :size="20" />
      </KBadge>
      <KBadge dot>
        <a href="javascript:void(0)">Link something</a>
      </KBadge>
    </div>

    <div class="badge-row">
      <!-- 偏移与小号 -->
      <KBadge :count="5" :offset="[10, 10]" style="margin-right: 32px">
        <KAvatar shape="square" size="large" />
      </KBadge>
      <KBadge :count="5" size="small">
        <KAvatar shape="square" size="large" />
      </KBadge>
    </div>
  </div>
</template>

<style scoped>
.badge-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
}
</style>
