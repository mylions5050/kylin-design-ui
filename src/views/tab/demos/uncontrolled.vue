<script setup lang="ts">
import KTab from '@/components/tab/index'
import KTabPane from '@/components/tab/pane'
</script>

<template>
  <div>
    <KTab default-key="config">
      <KTabPane k="user" label="用户管理">
        用户管理的内容
      </KTabPane>
      <KTabPane k="config" label="配置管理">
        配置管理的内容
      </KTabPane>
      <KTabPane k="role" label="角色管理">
        角色管理的内容
      </KTabPane>
    </KTab>
  </div>
</template>
