<script setup lang="ts">
import { ref } from 'vue'
import KAvatar from '@/components/avatar/index'
import KButton from '@/components/button/index'

const userList = ['U', 'Lucy', 'Tom', 'Edward', '王小红']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#1677ff']

const userIndex = ref(0)
const gap = ref(4)

const changeUser = () => {
  userIndex.value = (userIndex.value + 1) % userList.length
}
const changeGap = () => {
  gap.value = gap.value >= 4 ? 1 : gap.value + 1
}
</script>

<template>
  <div class="avatar-dynamic">
    <KAvatar size="large" :gap="gap" :style="{ backgroundColor: colorList[userIndex] }">
      {{ userList[userIndex] }}
    </KAvatar>
    <KButton size="small" @click="changeUser">切换用户</KButton>
    <KButton size="small" @click="changeGap">gap：{{ gap }}</KButton>
  </div>
</template>

<style scoped>
.avatar-dynamic {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
