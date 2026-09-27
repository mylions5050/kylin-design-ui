<script setup lang="ts">
import KButton from '@/components/button/index'
</script>

<template>
  <KButton type="primary" disabled>Disabled</KButton>
  <KButton type="primary" loading>Loading</KButton>
  <KButton disabled loading>Both disabled & loading</KButton>
  <KButton loading>Loading Success</KButton>
  <KButton disabled loading dark>Both disabled & loading</KButton>
  <KButton loading dark>Loading Success</KButton>
</template>
