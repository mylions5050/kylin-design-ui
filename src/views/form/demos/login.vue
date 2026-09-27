<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm, { KFormItem } from '@/components/form/index'
import KInput from '@/components/input/index'
import KCheckbox from '@/components/checkbox/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'
import type { FormRules } from '@/components/form/index'

const formRef = ref<{ validate: () => Promise<true> }>()

const form = reactive({
  username: '',
  password: '',
  remember: true,
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少 6 位' },
  ],
}

const handleLogin = () => {
  formRef.value
    ?.validate()
    .then(() => message.success(`登录成功（记住我：${form.remember ? '是' : '否'}）`))
    .catch(() => message.error('请填写完整的登录信息'))
}
</script>

<template>
  <div class="form-login">
    <KForm ref="formRef" :model="form" :rules="rules" label-width="70px">
      <KFormItem prop="username" label="用户名">
        <KInput v-model="form.username" placeholder="请输入用户名" />
      </KFormItem>
      <KFormItem prop="password" label="密码">
        <KInput v-model="form.password" type="password" show-password placeholder="请输入密码（至少 6 位）" />
      </KFormItem>
      <KFormItem label-width="0">
        <KCheckbox v-model:checked="form.remember">Remember me</KCheckbox>
      </KFormItem>
      <KFormItem label-width="0">
        <KButton type="primary" class="form-login__submit" @click="handleLogin">登录</KButton>
      </KFormItem>
    </KForm>
  </div>
</template>

<style scoped>
.form-login {
  max-width: 400px;
}

/* 通栏提交按钮 */
.form-login__submit {
  width: 100%;
}
</style>
