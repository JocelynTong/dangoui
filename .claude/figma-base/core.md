# 核心翻译规则

通用规则，适用于所有组件翻译。

---

## 组件识别

| 骨架前缀 | 含义 | 处理方式 |
|---|---|---|
| `💙` | UI 库基础组件 | 查 `components/_catalog.md` aliases → 使用 DuXxx 组件 |
| `👻` | 业务组件 | 查 `business/_catalog.md` → import 或递归生成 |
| 无前缀 | 原子元素 | 按 data-type 翻译为 HTML 或 DuXxx |

---

## 💙 前缀组件

骨架中 `💙` 前缀的 INSTANCE 节点：

1. 查 `_catalog.md` aliases 表
2. **有映射** → 使用 DuXxx 组件
3. **无映射** → 按骨架子节点 1:1 创建组件

### 节点名解析规则

从 `data-name` 提取关键词进行匹配：

| 骨架 data-name | 提取步骤 | 匹配关键词 |
|---|---|---|
| `💙 01.01_Navigation Bar` | 去 emoji → 去编号 → 去空格 | `NavigationBar` |
| `💙 00.03_Icon / search` | 取第一段 `/` 前 → 去编号 | `Icon` |
| `💙 03.08_SPU / Basic` | 取第一段 `/` 前 → 去编号 | `SPU` |

**提取规则**：
1. 去掉 `💙` 前缀和编号（如 `01.01_`、`00.03_`）
2. 如有 `/`，取第一段作为组件名
3. 空格转 PascalCase（`Navigation Bar` → `NavigationBar`）

### 匹配流程

1. 用提取的关键词查 `_catalog.md` aliases 表
2. aliases 命中 → 获取组件名（如 `DuNavigationBar`）
3. 用组件名查 components 表 → 获取规则文件（如 `navigation.md`）
4. **读取规则文件**，按 props、slots、示例翻译

### aliases 未命中处理

| 情况 | 处理方式 |
|---|---|
| 关键词包含已知组件名 | 模糊匹配。如 `SearchBar` 包含 `Search` → `DuSearch` |
| 关键词是已知组件变体 | 取父组件。如 `SPU / Basic` → 查 `SPU`，未命中则询问 |
| 装饰性/系统元素 | 直接翻译为 HTML/CSS，不走 UI 库组件 |
| 完全未匹配 | 询问用户：是 UI 库新组件（补充 aliases）还是业务组件（走 👻 流程） |

**判断「装饰性/系统元素」**：节点不承载交互、不需要响应式数据、仅用于视觉呈现。

> 如果确认是 UI 库组件但 aliases 缺失，需在 `_catalog.md` 补充映射。

---

## 👻 前缀组件

骨架中 `👻` 前缀的 INSTANCE 节点，为业务组件。

**流程**：
1. 查 `business/_catalog.md` 是否有记录
2. 有记录 → 直接 import 使用
3. 无记录 → 询问用户是否生成，确认后递归翻译

---

## Import 规则

每个 `.vue` 文件必须包含完整的 import 语句。

| 使用场景 | import 来源 |
|---|---|
| UI 库组件 | `import { DuXxx, DuYyy } from 'dangoui'` |
| 本地子组件 | `import XxxComponent from './XxxComponent.vue'` |
| Vue API | `import { ref, computed } from 'vue'` |

```ts
<script setup lang="ts">
import { ref } from 'vue'
import { DuXxx, DuYyy } from 'dangoui'
import LocalComponent from './LocalComponent.vue'

const value = ref('')
</script>
```

**检查清单**：翻译完成后，扫描 template 中所有 `Du*` 标签和 PascalCase 组件名，确保都有对应 import。

---

## Props 透传

抽取子组件时，骨架中的动态值（文本、数值、颜色）应作为 props 透传。

```html
<!-- 骨架中多个相似结构 -->
<ChildComponent>
  <span>文本内容</span>
  <Badge>数值</Badge>
</ChildComponent>

<!-- 翻译为带 props 的组件 -->
<script setup lang="ts">
defineProps<{
  text?: string
  count?: number
}>()
</script>

<template>
  <div class="...">
    <span>{{ text }}</span>
    <DuXxx v-if="count">{{ count }}</DuXxx>
  </div>
</template>
```

---

## 样式规则

| 骨架样式 | 翻译方式 |
|---|---|
| `class="..."` | 保留 UnoCSS class |
| `:style="{ ... }"` | 保留内联 style |
| `w-[375px]` 根容器宽度 | 改为 `w-full` |
| `figma-image:unknown` | 替换为 `<DuImage>` 或 props 占位 |

---

## 翻译检查

完成后逐项核对：

| 检查项 | 确认方式 |
|---|---|
| 骨架每个节点 → 翻译结果有对应 | 逐节点比对 |
| 翻译每个元素 → 骨架有来源 | 无自创逻辑/props |
| 💙 节点 → 查了 _catalog | 有映射用 DuXxx，无映射按骨架创建 |
| 👻 节点 → 查了 business/_catalog | 有记录 import，无记录递归生成 |
| class/style → 保留骨架原值 | 不改颜色/尺寸 |
| import → 完整 | template 中组件都有 import |
