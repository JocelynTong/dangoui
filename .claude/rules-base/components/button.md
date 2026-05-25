# 按钮

| Figma 节点名含 | 组件 | 用法 |
|---|---|---|
| `Button` / `Btn` / `Submit` | `<DuButton>` | 见下方 |

```html
<!-- 主按钮，全宽 -->
<DuButton color="primary" type="primary" size="large" full @click="handleSubmit">提交</DuButton>

<!-- 描边按钮 -->
<DuButton type="outline" color="primary" @click="fn">取消</DuButton>

<!-- 文字按钮 -->
<DuButton type="text" color="primary" @click="fn">查看详情</DuButton>

<!-- 带图标 -->
<DuButton color="primary" icon="arrow-right" iconPosition="right" @click="fn">下一步</DuButton>

<!-- 加载中 -->
<DuButton color="primary" :loading="submitting" full @click="handleSubmit">提交</DuButton>
```

**DuButton props**：
- `color`：色板颜色名（primary / danger / warning 等）
- `type`：`'text'` | `'primary'` | `'secondary'` | `'outline'`
- `size`：`'small'` | `'mini'` | `'normal'` | `'medium'` | `'large'`
- `full`：boolean，全宽
- `loading`：boolean
- `disabled`：boolean
- `icon`：图标名
- `iconPosition`：`'left'` | `'right'`
- `arrowRight`：boolean
- `extClass`：自定义 class
