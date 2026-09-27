<script setup lang="ts">
import { ref } from 'vue'
import KButton from '@/components/button/index'
import KDrawer from '@/components/drawer/index'

// extra（标题栏右侧）+ footer（底部操作区）插槽；表单类抽屉的典型形态
const visible = ref(false)

const handleSubmit = () => {
  // 模拟提交后关闭
  visible.value = false
}
</script>

<template>
  <div class="demo-buttons">
    <KButton type="primary" @click="visible = true">编辑资料（extra + footer）</KButton>
  </div>

  <KDrawer v-model="visible" title="编辑用户资料" placement="right" size="large">
    <template #extra>
      <KButton size="small">保存草稿</KButton>
    </template>

    <div class="fake-form">
      <div class="fake-form__item">
        <label>姓名</label>
        <p class="fake-form__value">张小芽</p>
      </div>
      <div class="fake-form__item">
        <label>邮箱</label>
        <p class="fake-form__value">xiaoya@example.com</p>
      </div>
      <div class="fake-form__item">
        <label>部门</label>
        <p class="fake-form__value">前端技术部</p>
      </div>
    </div>

    <template #footer>
      <KButton @click="visible = false">取 消</KButton>
      <KButton type="primary" @click="handleSubmit">提 交</KButton>
    </template>
  </KDrawer>
</template>

<style scoped>
.fake-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.fake-form__item label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}

.fake-form__value {
  margin: 0;
  padding: 8px 12px;
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-tertiary);
  font-size: 14px;
}
</style>
