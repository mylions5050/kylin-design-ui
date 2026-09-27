<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm, { KFormItem } from '@/components/form/index'
import KInput from '@/components/input/index'
import KInputNumber from '@/components/input-number/index'
import KSelect from '@/components/select/index'
import KDatePicker from '@/components/date-picker/date-picker'
import KRadio from '@/components/radio/index'
import KRadioGroup from '@/components/radio/group'
import KCheckbox from '@/components/checkbox/index'
import KSwitch from '@/components/switch/index'
import KSlider from '@/components/slider/index'
import KRate from '@/components/rate/index'
import KUpload from '@/components/upload/index'
import KTransfer from '@/components/transfer/index'
import KTree from '@/components/tree/index'
import KButton from '@/components/button/index'
import { message } from '@/components/message/useMessage'
import type { FormRules } from '@/components/form/index'
import type { UploadUserFile } from '@/components/upload/index'
import type { TransferItem, TransferKey } from '@/components/transfer/index'
import type { TreeNodeData } from '@/components/tree/index'

const formRef = ref<{ validate: () => Promise<true>; resetFields: () => void }>()

const form = reactive({
  name: '',
  email: '',
  age: undefined as number | undefined,
  city: '',
  date: undefined,
  gender: '',
  skills: [] as string[],
  bio: '',
  attachments: [] as UploadUserFile[],
  modules: ['dashboard'] as TransferKey[],
  dept: '',
  newsletter: false,
  satisfaction: 0,
  progress: 30,
})

const cityOptions = ['北京', '上海', '广州', '深圳', '杭州'].map((c) => ({ label: c, value: c }))

/** 复选框选项：绑定数组字段，勾选切换时增删元素 */
const skillOptions = ['Vue', 'React', 'Node']
const toggleSkill = (skill: string, checked: boolean) => {
  form.skills = checked ? [...form.skills, skill] : form.skills.filter((i) => i !== skill)
}

/** 穿梭框数据源：可访问的系统模块 */
const moduleOptions: TransferItem[] = [
  { key: 'dashboard', label: '数据看板' },
  { key: 'order', label: '订单管理' },
  { key: 'user', label: '用户管理' },
  { key: 'market', label: '营销中心' },
  { key: 'setting', label: '系统设置' },
]

/** 树数据源：所属部门（单选） */
const deptTree: TreeNodeData[] = [
  {
    id: 'rd',
    label: '研发部',
    children: [
      { id: 'fe', label: '前端组' },
      { id: 'server', label: '服务端组' },
      { id: 'qa', label: '测试组' },
    ],
  },
  {
    id: 'product',
    label: '产品部',
    children: [
      { id: 'pm', label: '产品组' },
      { id: 'design', label: '设计组' },
    ],
  },
  { id: 'market-dept', label: '市场部' },
]

const rules: FormRules = {
  name: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 20, message: '长度为 3 - 20 个字符' },
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
  age: [
    { required: true, message: '请输入年龄' },
    { type: 'number', min: 1, max: 120, message: '年龄需在 1 - 120 之间' },
  ],
  city: [{ required: true, message: '请选择所在城市' }],
  date: [{ required: true, message: '请选择入职日期' }],
  gender: [{ required: true, message: '请选择性别' }],
  skills: [{ type: 'array', required: true, message: '请至少选择一项技能' }],
  bio: [
    { required: true, message: '请填写个人简介' },
    { max: 200, message: '简介不超过 200 字' },
  ],
  modules: [{ type: 'array', required: true, message: '请分配至少一个模块' }],
  dept: [{ required: true, message: '请选择所属部门' }],
}

const handleSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => message.success('校验通过，提交成功'))
    .catch(() => message.error('校验未通过，请检查标红字段'))
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="form-basic">
    <KForm ref="formRef" :model="form" :rules="rules" label-position="top">
      <KFormItem prop="name" label="用户名">
        <KInput v-model="form.name" placeholder="请输入用户名" />
      </KFormItem>
      <KFormItem prop="email" label="邮箱">
        <KInput v-model="form.email" placeholder="请输入邮箱" />
      </KFormItem>
      <KFormItem prop="age" label="年龄">
        <KInputNumber v-model="form.age" :min="1" :max="120" placeholder="请输入年龄" />
      </KFormItem>
      <KFormItem prop="city" label="所在城市">
        <KSelect v-model="form.city" :options="cityOptions" placeholder="请选择城市" />
      </KFormItem>
      <KFormItem prop="date" label="入职日期">
        <KDatePicker v-model="form.date" placeholder="请选择日期" />
      </KFormItem>
      <KFormItem prop="gender" label="性别">
        <KRadioGroup v-model="form.gender">
          <KRadio value="male" label="男" />
          <KRadio value="female" label="女" />
        </KRadioGroup>
      </KFormItem>
      <KFormItem prop="skills" label="技术栈">
        <div class="form-inline-group">
          <KCheckbox
            v-for="skill in skillOptions"
            :key="skill"
            :checked="form.skills.includes(skill)"
            @update:checked="toggleSkill(skill, $event)"
          >
            {{ skill }}
          </KCheckbox>
        </div>
      </KFormItem>
      <KFormItem prop="bio" label="个人简介">
        <KInput v-model="form.bio" type="textarea" :rows="3" placeholder="请介绍一下自己（不超过 200 字）" />
      </KFormItem>
      <KFormItem prop="attachments" label="附件简历">
        <KUpload
          v-model:file-list="form.attachments"
          action="https://jsonplaceholder.typicode.com/posts"
          :limit="3"
        >
          <KButton>上传文件</KButton>
        </KUpload>
      </KFormItem>
      <KFormItem prop="modules" label="可访问模块">
        <KTransfer
          v-model="form.modules"
          :data-source="moduleOptions"
          :titles="['未分配', '已分配']"
          equal-width
          class="form-transfer"
        />
      </KFormItem>
      <KFormItem prop="dept" label="所属部门">
        <KTree v-model="form.dept" :data="deptTree" />
      </KFormItem>
      <KFormItem label="订阅通知">
        <KSwitch v-model="form.newsletter" />
      </KFormItem>
      <KFormItem label="满意度">
        <KRate v-model="form.satisfaction" />
      </KFormItem>
      <KFormItem label="完成进度">
        <KSlider v-model="form.progress" />
      </KFormItem>
      <KFormItem>
        <div class="form-actions">
          <KButton type="primary" @click="handleSubmit">提交</KButton>
          <KButton @click="handleReset">重置</KButton>
        </div>
      </KFormItem>
    </KForm>
  </div>
</template>

<style scoped>
.form-basic {
  max-width: 750px;
}

.form-actions {
  display: flex;
  gap: 8px;
}

/* 复选框等固有宽度控件的横向容器（直接放在 content 区会各自占一行） */
.form-inline-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 穿梭框等宽模式下撑满内容区 */
.form-transfer {
  width: 100%;
}
</style>
