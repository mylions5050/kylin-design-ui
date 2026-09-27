<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm, { KFormItem } from '@/components/form/index'
import KInput from '@/components/input/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'
import type { FormItemRule, FormRules } from '@/components/form/index'

const formRef = ref<{ validate: () => Promise<true> }>()

const form = reactive({
  username: '',
  password: '',
  confirm: '',
})

/** 模拟异步接口：检查用户名是否已被占用 */
function checkUsername(value: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taken = ['admin', 'kylin', 'test']
      if (taken.includes(value)) {
        reject(new Error('该用户名已被占用'))
      } else {
        resolve()
      }
    }, 800)
  })
}

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 16, message: '长度为 3 - 16 个字符' },
    {
      // Promise 风格：resolve 校验通过 / reject(new Error(msg)) 报错
      validator: (_rule: FormItemRule, value: string) => checkUsername(value),
    },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少 6 位' },
    {
      // 回调风格：callback() 通过 / callback(new Error(msg)) 失败
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
          callback(new Error('密码需同时包含字母和数字'))
        } else {
          callback()
        }
      },
    },
  ],
  confirm: [
    { required: true, message: '请再次输入密码' },
    {
      validator: (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (value !== form.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
    },
  ],
}

const handleSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => message.success('校验通过，注册成功'))
    .catch(() => message.error('校验未通过，请检查标红字段'))
}
</script>

<template>
  <div class="form-custom-rules">
    <KForm ref="formRef" :model="form" :rules="rules" label-width="100px">
      <KFormItem prop="username" label="用户名">
        <KInput v-model="form.username" placeholder="admin / kylin / test 已被占用" />
      </KFormItem>
      <KFormItem prop="password" label="密码">
        <KInput v-model="form.password" type="password" placeholder="至少 6 位，含字母和数字" show-password />
      </KFormItem>
      <KFormItem prop="confirm" label="确认密码">
        <KInput v-model="form.confirm" type="password" placeholder="请再次输入密码" show-password />
      </KFormItem>
      <KFormItem>
        <div class="form-custom-rules__actions">
          <KButton type="primary" @click="handleSubmit">注册</KButton>
        </div>
      </KFormItem>
    </KForm>
  </div>
</template>

<style scoped>
.form-custom-rules {
  max-width: 750px;
}

.form-custom-rules__actions {
  display: flex;
  gap: 8px;
}
</style>
