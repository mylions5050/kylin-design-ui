export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  age: number
  address: string
  state: 'success' | 'info' | 'warning' | 'danger'
}

export const users: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃', age: 28, address: '北京市海淀区中关村大街 1 号', state: 'success' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '停用', age: 34, address: '上海市浦东新区世纪大道 100 号', state: 'info' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '查看', status: '活跃', age: 25, address: '广州市天河区珠江新城 8 号', state: 'warning' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑', status: '活跃', age: 41, address: '深圳市南山区科技园路 18 号', state: 'danger' },
  { id: 5, name: '孙七', email: 'sunqi@example.com', role: '查看', status: '停用', age: 30, address: '杭州市西湖区文三路 99 号', state: 'success' },
  { id: 6, name: '周八', email: 'zhouba@example.com', role: '管理员', status: '活跃', age: 36, address: '成都市武侯区天府大道 200 号', state: 'info' },
  { id: 7, name: '吴九', email: 'wujiu@example.com', role: '编辑', status: '活跃', age: 29, address: '武汉市洪山区珞瑜路 50 号', state: 'warning' },
  { id: 8, name: '郑十', email: 'zhengshi@example.com', role: '查看', status: '停用', age: 45, address: '南京市玄武区中山路 100 号', state: 'danger' },
]
