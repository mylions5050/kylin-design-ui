<script setup lang="ts">
import KButton from '@/components/button/index'
import KButtonGroup from '@/components/button-group/index'
</script>

<template>
  <KButtonGroup>
    <KButton>Default</KButton>
    <KButton type="primary">Primary</KButton>
    <KButton type="success">Success</KButton>
  </KButtonGroup>
  <KButtonGroup>
    <KButton type="primary" plain>上一页</KButton>
    <KButton type="primary" plain>1</KButton>
    <KButton type="primary" plain>2</KButton>
    <KButton type="primary" plain>下一页</KButton>
  </KButtonGroup>
</template>
