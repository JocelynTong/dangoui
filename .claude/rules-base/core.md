# 核心翻译规则

通用规则，适用于所有组件翻译。

---

## 识别

| 骨架前缀 | 含义 | 处理方式 |
|---|---|---|
| `💙` | 原子分子组件 | 查 `components/_catalog.md` aliases → 使用 DuXxx 组件 |
| `👻` | 业务组件 | 查 `business/_catalog.md` → import 或递归生成 |
| 无前缀 | 原子元素 | 按 data-type 翻译为 HTML 或 DuXxx |

---

## 提取

从 `data-name` 提取关键词进行匹配：

| 骨架 data-name | 提取步骤 | 匹配关键词 |
|---|---|---|
| `💙 01.01_Navigation Bar` | 去 emoji → 去编号 → 去空格 | `NavigationBar` |
| `💙 00.03_Icon / search` | 去 emoji → 去编号 → `/` 前得组件名，`/` 后得 name prop | `DuIcon` + `name="search"` |
| `💙 03.08_SPU / Basic` | 去 emoji → 去编号 → `/` 前得组件名，`/` 后丢弃或作为 variant prop | `SPU` |

**提取规则**：
1. 去掉 `💙` 前缀和编号（如 `01.01_`、`00.03_`）
2. 如有 `/`：
   - `/` 前 → 组件名，匹配 aliases
   - `/` 后 → 作为该组件的 `name` prop（或 variant prop），**必须是已知 icon 名称**
3. 空格转 PascalCase（`Navigation Bar` → `NavigationBar`）

**aliases 命中但 `/` 后不是已知 icon 名称**：
- 查 `iconfont-config.json`，如果找不到该名称 → 视为装饰性图标，用 `<img>` 占位，不丢弃

**aliases 未命中处理**：

| 情况 | 处理方式 |
|---|---|
| 关键词包含已知组件名 | 模糊匹配。如 `SearchBar` 包含 `Search` → `DuSearch` |
| 关键词是已知组件变体 | 取父组件。如 `SPU / Basic` → 查 `SPU`，未命中则询问 |
| 装饰性/系统元素 | 直接翻译为 HTML/CSS，不走原子分子组件 |
| 完全未匹配 | 询问用户：是原子分子组件新组件（补充 aliases）还是业务组件（走 👻 流程） |

---

## 处理

| data-type | 场景判断 | 处理方式 |
|---|---|---|
| `TEXT` | — | 保留文本，绑定变量 |
| `FRAME` | — | 容器，保留布局样式 |
| `GROUP` | 子节点全是 VECTOR/RECTANGLE | 整体视为图标/装饰，替换为 SVG 或删除 |
| `GROUP` | 子节点含 TEXT/FRAME | 普通分组，保留或展开 |
| `ICON` | — | 替换为项目图标组件 |
| `INSTANCE` / `COMPONENT` / `COMPONENT_SET` | — | 按映射表查找组件 |
| `VECTOR` | 在 GROUP 内 | 随父级 GROUP 整体处理 |
| `VECTOR` | 独立 + 有 border 样式 | 用 CSS border 实现（如选中态边框） |
| `VECTOR` | 独立 + 纯填充 | 装饰元素，通常可删除 |
| `RECTANGLE` | 有 `figma-image:unknown` | 替换为 `<DuImage>` |
| `RECTANGLE` | 名字含 `Border` | 合并到父容器 border 样式 |
| `RECTANGLE` | 其他纯色块 | 用 CSS background 实现 |
| `ELLIPSE` | — | 用 `rounded-full` 实现 |
| VECTOR/RECTANGLE | data-name 含 Selected/Active/Indicator | 不输出 DOM，用父元素状态类 + ::after CSS 实现 |
---


### Ghost预览加背景色

COMPONENT_SET 变体中含 `Color=White` / `ColorWhite` 时，白色内容在透明底上不可见，需要加背景色。

**规则**：变体 prop 包含 `color="white"` 时，外层容器加背景色：

```html
<!-- ❌ 错误：背景加在组件本身 -->
<Component color="white" class="bg-[var(--secondary-solid-bg)]" />

<!-- ✅ 正确：背景加在外层容器 -->
<div class="bg-[var(--secondary-solid-bg)]">
  <Component color="white" />
</div>
```

常用背景色 token：
- `--secondary-solid-bg`：深色背景（#2B263B），白色内容可见
- `--white-solid-bg`：纯白背景（#FFFFFF），白色内容不可见

---


## 组件翻译

- INSTANCE 标签 → 按 emoji 判断走对应映射表，映射为项目真实组件
- COMPONENT_SET 子节点（变体）：优先用**父级名称**映射，子节点名作为 props 传递
  - 例：`💙 01.00_Status Bar` 的子节点 `ColorDefaultTypeiPhone5s` → `StatusBar` + `type="iPhone5s"`
  - 变体名中含 `ColorDefault`/`ColorWhite` → 提取为 `color` prop
- `data-type="ICON"` → 替换为项目图标方案
- 原始color/typography/icon/spacing/margin/padding/radius/shadow → 替换为项目 token；**若 token 不存在，则保留原始值（带单位），并在输出时告警提醒用户**
- 容器宽度 → 改为全宽
- 静态文字 → 改为变量绑定，交互元素加事件占位

---

## import dangoui

每个 `.vue` 文件必须包含完整的 import 语句。

| 使用场景 | import 来源 |
|---|---|
| 原子分子组件 | `import { DuXxx, DuYyy } from 'dangoui'` |
| 本地子组件 | `import XxxComponent from './XxxComponent.vue'` |
| Vue API | `import { ref, computed } from 'vue'` |

**检查清单**：翻译完成后，扫描 template 中所有 `Du*` 标签和 PascalCase 组件名，确保都有对应 import。

---

## 非组件翻译

| 骨架样式 | 翻译方式 |
|---|---|
| `class="..."` | 保留 UnoCSS class |
| `:style="{ ... }"` | 保留内联 style |
| `w-[375px]` 根容器宽度 | 改为 `w-full` |
| `h-[xxx]` 固定高度 | **默认去掉**，让内容撑开高度；如确认需要固定高度再保留 |
| `figma-image:unknown` | 替换为 `<DuImage>` 或 props 占位 |

---

## 未使用 Token 的样式告警

翻译过程中若发现原始样式值没有对应 token，**保留原始值（带单位）**，并输出结构化告警 JSON，供后续飞书机器人消费。

### 触发时机

| 场景 | 是否告警 | 原因 |
|---|---|---|
| 本地调试跑 demo | ❌ 不告警 | 噪声大，调试过程多临时值 |
| demo 完成后手动点"上报" | ✅ 告警 | 用户主动确认的有价值数据 |
| PR merge 到 main | ✅ 告警 | 真实消费代码，质量有保障 |

CLI 提供 `--report` 命令手动触发上报。

---

## 未使用 DuIcon 方案

图标优先使用项目图标组件，其次是 inline SVG，最后才用 `<img>`。

| 方案 | 变色能力 | 使用场景 |
|---|---|---|
| `DuIcon` + `color` 属性 | ✅ | 项目图标库有的图标 |
| inline SVG + `currentColor` | ✅ | 库中没有的图标，需跟随主题色 |
| `<img src="xxx.svg">` | ❌ | 颜色固定的纯装饰图标 |

```html
<!-- DuIcon -->
<DuIcon name="wifi" :size="15" />

<!-- DuIcon 尺寸：用 :size 属性或 --du-icon-size CSS 变量，不支持 w/h class -->

<!-- inline SVG -->
<svg width="15" height="11" viewBox="0 0 15 11" fill="none">
  <path d="M7.5 10L11.5 6H3.5L7.5 10Z" fill="currentColor" fill-opacity="0.4"/>
  <circle cx="7.5" cy="10.5" r="1" fill="currentColor"/>
</svg>
```

---

## 处理未识别的子组件（递归生成）

翻译完成后，检查骨架中所有带 `<!-- figma-node: xxx -->` 注释的标签，按 emoji 前缀分类处理：

### 💙 前缀节点（原子分子组件）

未命中 `components/_catalog.md` aliases 时：
- 是否需要生成？ → 用 CLI 获取骨架，按规则翻译
- 或输入「跳过」→ 保留占位标签

### 👻 前缀节点（业务组件）

未命中 `business/_catalog.md` 时：
- 是否需要生成？如需要，请告知保存路径。

**用户确认路径后**：
- 用该组件的 `figma-node` id 重新执行 CLI
- 对新骨架重复翻译流程
- 将结果写入用户指定路径
- 在 `business/_catalog.md` 补充记录
- 回到主组件，将对应标签替换为真实组件，补充 import

**用户跳过** → 保留占位标签，不处理


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
| 业务组件 → 生成后更新 catalog | 必须项，不可跳过 |