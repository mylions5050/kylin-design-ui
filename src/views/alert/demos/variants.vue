<script setup lang="ts">
import KAlert from '@/components/alert/index'
</script>

<template>
  <KAlert type="primary" effect="light">Light</KAlert>
  <KAlert type="primary" effect="plain">Plain</KAlert>
  <KAlert type="primary" effect="plain">Dark</KAlert>
  <KAlert type="primary" effect="plain" border>Dark + Border</KAlert>
</template>
