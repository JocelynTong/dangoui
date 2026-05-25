---
uiLib: dangoui
prefix: Du
version: 0.7.0
---

# 表单

## 展示行 vs 输入框

核心判断依据是**右侧内容类型**：

| 视觉特征 | 右侧内容 | 应生成 |
|---|---|---|
| label + 「请输入xxx」/「请选择」灰色文字 | placeholder | DuFormItem + DuInput / DuSelect |
| label + 实际数据 + 可选箭头 | 只读值 | `justify-between` 展示行，整行 `@click` |
| 标题 + 「查看全部 >」 | 操作入口 | `justify-between`，右侧 `@click` |
| 独立输入区域（无 label） | 可编辑 | 直接 DuInput，不套 DuForm |

**重要**：「请输入」「请选择」是 placeholder，用 DuInput / DuSelect 生成。

---

## Form 结构识别

满足以下条件时用 DuForm 包裹：
- 连续多个 `label + 输入框` 行，且 label 宽度视觉一致
- 或节点名包含 `FormItem`/`Form` 关键词

**规则**：
- DuForm 自带行间分割线，内部不需要手动加 DuDivider
- 单个输入框或无 label 的输入框直接用 DuInput，不套 DuForm

---

**展示行 vs 输入框判断规则：**

> **只有单个输入框、或没有 label 的输入框，直接用 `DuInput`，禁止套 `DuForm`。**

## DuForm

**DuForm props**：
- `model`：表单数据对象（`:model`）
- `labelSize`：label 固定宽度 px 字符串，如 `"80"`
- `labelAlign`：`'left'` | `'right'`
- `layout`：`'horizontal'` | `'vertical'`
- **注意：DuForm 没有 `border` prop**，分割线通过 DuFormItem 的 `showBorder` 控制

## DuFormItem

**DuFormItem props**：
- `label`：左侧标签文字
- `labelSize`
- `labelAlign`
- `layout`：`'horizontal'` | `'vertical'`
- `showBorder`：boolean，显示底部边框分割线
- `required`：boolean
- `tips`：提示文本
- `justify`：`'end'` | `'start'`，内容水平对齐
- `items`：`'center'` | `'start'`，内容垂直对齐（horizontal 模式）
- `extClass`

## 示例

```html
<!-- 标准表单：showBorder 控制分割线，horizontal 布局 -->
<DuForm :model="form" labelSize="80" labelAlign="right" layout="horizontal">
  <DuFormItem label="银行卡号" showBorder>
    <DuInput v-model:value="form.bankCard" placeholder="请输入" />
  </DuFormItem>
  <DuFormItem label="开户银行" showBorder>
    <DuSelect
      v-model:value="form.bank"
      v-model:open="bankOpen"
      :options="BANK_OPTIONS"
      title="请选择银行"
      formItem
    />
  </DuFormItem>
  <DuFormItem label="手机号">
    <DuInput v-model:value="form.phone" placeholder="请输入手机号" type="number" />
  </DuFormItem>
</DuForm>

<!-- 垂直布局表单 -->
<DuForm :model="form" layout="vertical">
  <DuFormItem label="备注" layout="vertical" required tips="最多200字">
    <DuTextarea v-model:value="form.remark" placeholder="请输入" :maxlength="200" showCount />
  </DuFormItem>
</DuForm>
```

---

## DuFormField

表单字段展示组件，用于显示只读的表单值，点击可触发选择器或跳转。

```html
<!-- 在 DuFormItem 中使用 -->
<DuFormItem label="城市">
  <DuFormField :text="selectedCity" placeholder="请选择" @click="openCityPicker" />
</DuFormItem>
```

**DuFormField props**：
- `text`：显示的文本值
- `placeholder`：占位文本
- `arrowRight`：自定义右侧箭头图标
