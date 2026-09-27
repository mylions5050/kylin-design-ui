<script setup lang="ts">
import KAvatar from '@/components/avatar/index'
import KIcon from '@/components/icon/index'
</script>

<template>
  <div class="avatar-demo">
    <div class="avatar-row">
      <KAvatar :size="64" icon="user-filling" />
      <KAvatar size="large" icon="user-filling" />
      <KAvatar icon="user-filling" />
      <KAvatar size="small" icon="user-filling" />
    </div>
    <div class="avatar-row">
      <KAvatar shape="square" :size="64" icon="user-filling" />
      <KAvatar shape="square" size="large" icon="user-filling" />
      <KAvatar shape="square" icon="user-filling" />
      <KAvatar shape="square" size="small" icon="user-filling" />
    </div>
    <div class="avatar-row">
      <KAvatar :size="14" icon="user-filling" />
      <KAvatar shape="square" :size="14" icon="user-filling" />
    </div>
  </div>
</template>

<style scoped>
.avatar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
</style>
