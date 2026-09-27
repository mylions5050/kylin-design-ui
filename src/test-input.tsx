import { defineComponent, ref } from 'vue'
import KInput from './components/input/index'

export default defineComponent({
  setup() {
    const inputValue = ref('')
    const passwordValue = ref('')
    const textareaValue = ref('')
    const testValue = ref('测试内容')
    const currencyValue = ref('1234')
    const currencyValue2 = ref('1234567')
    
    return () => (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Input Component Test</h3>
        
        <div>
          <h4>Basic Input</h4>
          <KInput 
            v-model={inputValue.value}
            placeholder="请输入内容"
            style={{ width: '300px' }}
          />
          <p>Value: {inputValue.value}</p>
        </div>
        
        <div>
          <h4>Password Input</h4>
          <KInput 
            v-model={passwordValue.value}
            type="password"
            show-password
            placeholder="请输入密码"
            style={{ width: '300px' }}
          />
          <p>Password Value: {passwordValue.value}</p>
        </div>
        
        <div>
          <h4>Textarea</h4>
          <KInput 
            v-model={textareaValue.value}
            type="textarea"
            placeholder="多行文本输入"
            style={{ width: '300px' }}
          />
          <p>Textarea Value: {textareaValue.value}</p>
        </div>
        
        <div>
          <h4>Input Sizes: small (28px), default (32px), large (40px)</h4>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>Small (28px):</label>
              <KInput size="small" placeholder="Small" style={{ width: '150px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>Default (32px):</label>
              <KInput placeholder="Default" style={{ width: '150px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>Large (40px):</label>
              <KInput size="large" placeholder="Large" style={{ width: '150px' }} />
            </div>
          </div>
        </div>
        
        <div>
          <h4>Size Test with Inline Styles (Debug)</h4>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ height: '28px', background: 'red', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>28px (small)</div>
            <div style={{ height: '32px', background: 'green', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>32px (default)</div>
            <div style={{ height: '40px', background: 'blue', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>40px (large)</div>
          </div>
        </div>
        
        <div>
          <h4>With Icons</h4>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <KInput prefix-icon="search" placeholder="Prefix icon" style={{ width: '200px' }} />
            <KInput suffix-icon="user" placeholder="Suffix icon" style={{ width: '200px' }} />
          </div>
        </div>
        
        <div>
          <h4>Clearable</h4>
          <KInput 
            v-model="testValue"
            clearable
            placeholder="可清除内容"
            style={{ width: '300px' }}
          />
          <p>当前值: {{ testValue }}</p>
        </div>
        
        <div>
          <h4>Formatted Input (Currency) - 简化测试</h4>
          <KInput 
            v-model={currencyValue}
            formatter={(value) => value ? `$ ${value}` : ''}
            parser={(value) => value.replace(/\$\s?/g, '')}
            placeholder="输入数字，简单货币格式化"
            style={{ width: '300px' }}
          />
          <p>实际值: '{{ currencyValue }}'</p>
        </div>
        
        <div>
          <h4>Formatted Input (Currency) - 带千分位</h4>
          <KInput 
            v-model={currencyValue2}
            formatter={(value) => value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
            parser={(value) => value.replace(/\$\s?|,/g, '')}
            placeholder="输入数字，格式化为货币"
            style={{ width: '300px' }}
          />
          <p>实际值: '{{ currencyValue2 }}'</p>
        </div>
        
        <div>
          <h4>With Character Limit</h4>
          <KInput 
            maxlength={20}
            show-word-limit
            placeholder="限制20个字符"
            style={{ width: '300px' }}
          />
        </div>
        
        <div>
          <h4>Auto-fill Comparison Test</h4>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>This demonstrates the auto-fill styling issue you described:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>用户名（自动填充测试）:</label>
              <KInput 
                v-model={inputValue.value}
                placeholder="请输入用户名（第一个）"
                autocomplete="username"
                style={{ width: '100%' }}
              />
              <KInput 
                v-model={inputValue.value}
                placeholder="请输入用户名（第二个）"
                autocomplete="username"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>密码输入框:</label>
              <KInput 
                v-model={passwordValue.value}
                type="password"
                placeholder="请输入密码（第一个）"
                show-password
                autocomplete="current-password"
                style={{ width: '100%' }}
              />
              <KInput 
                v-model={passwordValue.value}
                type="password"
                placeholder="请输入密码（第二个）"
                show-password
                autocomplete="current-password"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4>Disabled & Readonly</h4>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <KInput disabled value="Disabled" style={{ width: '150px' }} />
            <KInput readonly value="Readonly" style={{ width: '150px' }} />
          </div>
        </div>
      </div>
    )
  }
})