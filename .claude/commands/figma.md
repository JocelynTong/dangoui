# figma

根据 Figma 链接生成骨架，并按项目规范翻译为前端组件。

## 核心翻译原则

**骨架即真相，1:1 还原**：骨架输出什么，翻译结果就对应什么。

翻译规则：
1. **保留原始值**：数值、尺寸、颜色直接使用
2. **翻译每个元素**：包括装饰性元素
3. **透传所有属性**：class、style、尺寸等抽组件时作为 props 透传

判断标准：骨架中的每个节点、属性、数值，都能在翻译结果中找到对应。

**不确定时询问用户**。

---

## 重要：立即执行以下步骤，不要做任何预检查

**不要查找 token、不要检查环境变量、不要询问用户凭证。** Token 由 CLI 内部处理。

---

## 步骤

**第一步：检测项目框架**

检查项目技术栈，确定输出框架：
- 存在 `vue` 相关依赖 / `.vue` 文件 → `--framework=vue`
- 存在 `react` 相关依赖 / `.tsx` 文件 → `--framework=react`
- 存在 `pubspec.yaml` / `.dart` 文件 → `--framework=flutter`
- 默认使用 `--framework=vue`

**第二步：立即运行命令生成骨架**

将 `$URL` 替换为用户提供的 Figma 链接，`$FRAMEWORK` 替换为检测到的框架：

```bash
npx figma-to-code $URL --framework=$FRAMEWORK
```

如果报错再告知用户，否则继续下一步。

**第三步：读取项目规范**

读取以下规范文件（按需加载）：
- `.claude/figma-base/core.md` — 核心翻译规则（必读）
- `.claude/figma-base/layout.md` — 布局规则
- `.claude/figma-base/components/_catalog.md` — 基础组件映射
- `.claude/figma-base/business/_catalog.md` — 业务组件映射
- `.claude/figma-base/components/*.md` — 各组件详细规则（用到哪个读哪个）

**第四步：翻译骨架**

### 节点类型处理

| data-type | 场景判断 | 处理方式 |
|---|---|---|
| `TEXT` | — | 保留文本，绑定变量 |
| `FRAME` | — | 容器，保留布局样式 |
| `GROUP` | 子节点全是 VECTOR/RECTANGLE | 整体视为图标/装饰，替换为 SVG 或删除 |
| `GROUP` | 子节点含 TEXT/FRAME | 普通分组，保留或展开 |
| `ICON` | — | 替换为项目图标组件 |
| `INSTANCE` / `COMPONENT` | — | 按映射表查找组件 |
| `VECTOR` | 在 GROUP 内 | 随父级 GROUP 整体处理 |
| `VECTOR` | 独立 + 有 border 样式 | 用 CSS border 实现（如选中态边框） |
| `VECTOR` | 独立 + 纯填充 | 装饰元素，通常可删除 |
| `RECTANGLE` | 有 `figma-image:unknown` | 替换为 `<DuImage>` |
| `RECTANGLE` | 名字含 `Border` | 合并到父容器 border 样式 |
| `RECTANGLE` | 其他纯色块 | 用 CSS background 实现 |
| `ELLIPSE` | — | 用 `rounded-full` 实现 |

### 组件映射判断流程（按优先级）

**第一层：emoji 前缀识别**

| Figma 原名前缀 | 走哪个映射表 | 说明 |
|---|---|---|
| `👻` | `business/_catalog.md` | 业务组件 |
| `💙` | `components/_catalog.md` aliases | UI 库基础组件 |
| 无 emoji | 尝试 `business/_catalog.md` aliases | 原子组件或未分类 |

**第二层：映射表查询**

| 映射表状态 | 处理方式 |
|---|---|
| 有路径记录 | 直接 import 对应组件，不递归 |
| 有路径 `-` | 使用 UI 库原生组件，不递归 |
| 无记录 | 询问用户是否生成 |

> **注意**：`components/_catalog.md` aliases 是模糊匹配，`business/_catalog.md` 是精确匹配前缀。

### 具体翻译规则

- INSTANCE 标签 → 按 emoji 判断走对应映射表，映射为项目真实组件
- COMPONENT_SET 子节点（变体）：优先用**父级名称**映射，子节点名作为 props 传递
  - 例：`💙 01.00_Status Bar` 的子节点 `ColorDefaultTypeiPhone5s` → `StatusBar` + `type="iPhone5s"`
  - 变体名中含 `ColorDefault`/`ColorWhite` → 提取为 `color` prop
- `data-type="ICON"` → 替换为项目图标方案（如 `<img :src="getIconUrl('wifi')" />`）
- 原始颜色/尺寸 → 替换为项目 token
- 容器宽度 → 改为 `w-full` 或框架对应的全宽写法
- 静态文字 → 改为变量绑定，交互元素加事件占位

**第五步：输出组件**

- 指定了目标路径 → 写入文件
- 未指定 → 输出到对话，由用户确认后保存

**第六步：处理未识别的子组件（递归生成）**

翻译完成后，检查骨架中所有带 `<!-- figma-node: xxx -->` 注释的标签，按 emoji 前缀分类处理：

### 6.1 💙 前缀节点（UI 库组件）

未命中 `components/_catalog.md` aliases 时：

> 发现未识别的 UI 库组件 `<ComponentName>`（figma-node: xxx），
> - 是否需要生成？ → 用 CLI 获取骨架，按第四步规则翻译
> - 或输入「跳过」→ 保留占位标签

### 6.2 👻 前缀节点（业务组件）

未命中 `business/_catalog.md` 时：

> 发现未识别的业务组件 `<ComponentName>`（figma-node: xxx），是否需要生成？如需要，请告知保存路径。

**用户确认路径后**：
- 用该组件的 `figma-node` id 重新执行 CLI
- 对新骨架重复第四步的翻译流程
- 将结果写入用户指定路径
- 在 `business/_catalog.md` 补充记录
- 回到主组件，将对应标签替换为真实组件，补充 import

**用户跳过** → 保留占位标签，不处理

所有子组件处理完毕后，**输出最终完整的组件代码**。
