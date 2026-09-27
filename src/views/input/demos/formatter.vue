<script setup lang="ts">
import { ref } from 'vue'
import KInput from '@/components/input/index'

const moneyInput = ref('')
const phoneInput = ref('')
</script>

<template>
  <div class="demo-group">
    <div class="demo-item">
      <label>货币格式化:</label>
      <KInput
        v-model="moneyInput"
        :formatter="v => {
          const n = v.replace(/\D/g, '')
          return n ? '$ ' + Number(n).toLocaleString() : ''
        }"
        :parser="v => v.replace(/\$\s?|,/g, '')"
        placeholder="输入金额"
      />
    </div>
    <div class="demo-item">
      <label>手机号格式化:</label>
      <KInput
        v-model="phoneInput"
        :formatter="v => {
          const n = v.replace(/\D/g,'')
          if(n.length<=3) return n
          if(n.length<=7) return `${n.slice(0,3)} ${n.slice(3)}`
          return `${n.slice(0,3)} ${n.slice(3,7)} ${n.slice(7,11)}`
        }"
        :parser="v=>v.replace(/\s/g,'')"
        :maxlength="11"
        placeholder="输入手机号"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./common.scss";
</style>
