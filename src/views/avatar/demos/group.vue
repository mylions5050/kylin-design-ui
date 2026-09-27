<script setup lang="ts">
import { AvatarGroup } from '@/components/avatar/index'
import KAvatar from '@/components/avatar/index'

const members = ['A', 'B', 'C', 'D', 'E']
</script>

<template>
  <div class="avatar-group-demo">
    <div class="avatar-row">
      <h4>基础组合（重叠展示）</h4>
      <AvatarGroup>
        <KAvatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=1" />
        <KAvatar style="background-color: #f56a00">K</KAvatar>
        <KAvatar style="background-color: #87d068" icon="user-filling" />
        <KAvatar style="background-color: #1677ff" icon="camera" />
      </AvatarGroup>
    </div>

    <div class="avatar-row">
      <h4>maxCount 折叠（hover 气泡展示溢出成员）</h4>
      <AvatarGroup :max-count="2" :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf' }">
        <KAvatar src="https://api.dicebear.com/10.x/lorelei/svg?seed=2" />
        <KAvatar style="background-color: #f56a00">K</KAvatar>
        <KAvatar style="background-color: #87d068">Lucy</KAvatar>
        <KAvatar style="background-color: #1677ff">Tom</KAvatar>
      </AvatarGroup>
    </div>

    <div class="avatar-row">
      <h4>Group 统一尺寸 / 形状</h4>
      <AvatarGroup size="large" :max-count="3">
        <KAvatar v-for="name in members" :key="name" style="background-color: #7265e6">
          {{ name }}
        </KAvatar>
      </AvatarGroup>
      <AvatarGroup shape="square" :max-count="3" max-popover-placement="bottom">
        <KAvatar v-for="name in members" :key="name" style="background-color: #00a2ae">
          {{ name }}
        </KAvatar>
      </AvatarGroup>
    </div>
  </div>
</template>

<style scoped>
.avatar-row {
  margin-bottom: 20px;
}

.avatar-row h4 {
  margin: 0 0 10px;
  font-weight: 500;
}
</style>
