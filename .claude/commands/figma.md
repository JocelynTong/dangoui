# figma

根据 Figma 链接生成项目可用的 Vue 组件。

## 重要：立即执行以下步骤，不要做任何预检查

**不要查找 token、不要检查环境变量、不要询问用户凭证。** Token 由 CLI 内部处理。

---

## 步骤

**第零步：确认产品 token（首次使用时询问）**

如果用户没有指定 `--tokens`，询问用户：

> 请选择设计稿对应的产品 token：
> 1. 千岛 (qiandao) - 默认
> 2. 奇货 (qihuo)
> 3. 临界 (linjie)
> 4. 米花 (mihua)

用户选择后，在命令中添加 `--tokens=xxx` 参数。

**第一步：立即运行命令生成骨架**

将 `$URL` 替换为用户提供的 Figma 链接，直接执行：

```bash
npx figma-to-code $URL --framework=vue --tokens=qiandao
```

> CLI 会自动检测项目技术栈（UnoCSS/Tailwind → unocss 模式，小程序/RN → inline 模式，其他 → css 模式）。
> 用户可用 `--style=unocss|css|inline` 手动覆盖。

如果报错再告知用户，否则继续下一步。

**第二步：读取项目规范（按需加载）**

1. 检查 `.claude/figma-context.md` 是否存在，不存在则告知用户运行 `figma-to-code init`

2. 如果存在 `.claude/figma-base/` 目录（新版按需加载模式）：
   - 读取 `.claude/figma-context.md` — 项目定制（业务组件映射、文字样式 Token）
   - 读取 `.claude/figma-base/core.md` — 核心翻译原则
   - **读取 `.claude/figma-base/index.json`**，获取 `aliases` 映射表
   - **解析第一步生成的骨架代码**，提取所有组件标签
   - **用 `aliases` 映射组件名**：骨架中的 `NavigationBar` → `DuNavigationBar`，`SearchBar` → `DuSearch` 等
   - 根据映射后的组件名查找对应的规则文件（`components` 字段）
   - **只读取用到的组件规则**：`.claude/figma-base/components/*.md`
   - 读取 `.claude/figma-base/layout.md` — 布局模式规则

3. 如果不存在 `figma-base/` 目录（旧版完整模式）：
   - 读取 `.claude/figma-context.md` — 完整的组件映射和样式规范

**组件名映射规则**（基于 `index.json` 的 `aliases`）：
- 骨架中 `<NavigationBar>` → 命中 aliases → 使用 `<DuNavigationBar>`
- 骨架中 `<SearchBar>` → 命中 aliases → 使用 `<DuSearch>`
- 骨架中 `<ProductCard>` → 未命中 aliases → 保持原名，查业务组件映射表

**组件规则按需加载示例**：
- 映射后出现 `DuButton` → 读取 `components/button.md`
- 映射后出现 `DuNavigationBar` → 读取 `components/navigation.md`
- 映射后出现 `DuFormItem` → 读取 `components/form.md`
- 未出现的组件规则不需要读取

**第三步：翻译骨架为业务组件**

**3.1 组件名转换**（最重要的一步）：

骨架中的组件标签按以下优先级处理：

1. **命中 `aliases`** → 转为 UI 库组件（如 `NavigationBar` → `DuNavigationBar`）
2. **命中业务组件映射表**（`figma-context.md`）→ 使用已生成的业务组件
3. **未命中任何映射** → 保留原名，标记为待处理（第五步询问用户）

**3.2 样式和内容转换**：

- 容器宽度 → 改为 `w-full`（unocss 模式）或 `width: 100%`（css/inline 模式）
- 静态文字 → 改为 `{{ variable }}`，交互元素加 `@click` / `v-model` 占位
- `<script setup>` 中补充对应变量、方法，以及按 `figma-context.md` 的「组件引入」规则添加 import

**颜色 Token 处理**：

骨架已输出 `var(--token-name, #fallback)` 格式，**直接保留即可**：
- 项目有 CSS 变量 → 自动使用 token
- 项目没有 CSS 变量 → 自动 fallback 到原始颜色值

**文字样式处理**：

骨架输出原始 CSS 值（如 `text-[14px] font-[500]`），按 `figma-context.md` 的文字样式映射表转换为项目 shortcuts（如 `text-h5`）。

**布局语义修正**（骨架可能未能完整提取，翻译时按视觉结构判断）：

- 一行内有 2 个子元素，左边是 label 文字、右边是 value / 占位文字 / icon → 使用 `justify-between`
- 子元素需要撑满父容器宽度 → 使用 `w-full` 或 `flex-1`

**展示行 vs 输入框的区分**（核心判断依据是右侧内容类型）：

| 视觉特征 | 右侧内容 | 应生成 |
|---|---|---|
| label + 右侧「请输入xxx」/ 「请选择」灰色 placeholder | 可编辑输入 | `DuFormItem` + `DuInput` / `DuSelect` |
| label + 右侧实际数据值（如「李笑笑」「2025年」）+ 可选箭头 | 只读展示/可点击跳转 | `justify-between` 展示行，整行 `@click` |
| 标题 + 右侧「查看全部 >」 | 操作入口 | `justify-between`，右侧 `@click` |
| 独立不带 label 的输入区域 | 可编辑输入 | 直接 `DuInput` 不套 Form |

**重要**：「请输入」「请选择」是 placeholder 文字，代表这是输入字段，必须用 `DuInput` / `DuSelect`，不能生成为普通 `span`。

**Form 结构识别**：

满足以下条件时，用项目的 Form 组件包裹（具体组件和 props 参考 `figma-context.md`）：
- 连续多个 `label + 输入框` 行，且 label 宽度视觉上一致
- 或节点名中包含 `FormItem` / `Form` 关键词

`DuForm` 自带行间分割线和布局，内部不需要再手动加 `DuDivider`。不满足时（只有 1-2 个零散输入框）直接用 `DuInput`，不强制套 Form。

**第四步：翻译主组件（暂不写入文件）**

> **⚠️ 禁止在此步骤写入文件，必须先完成第五步的询问**

翻译完成后，将代码**暂存在内存中**，不要写入文件，继续执行第五步。

**第五步：询问未识别的子组件（必须执行）**

> **⚠️ 强制规则：必须询问用户，禁止跳过**
> - 不管未识别的组件有多少个（即使 100+），都**必须询问用户**
> - **禁止**自己决定「太多了，用 div 占位」
> - 必须等用户回复后才能继续第六步

检查骨架中所有带 `<!-- figma-node: xxx -->` 注释的标签，统计未识别的组件（未命中 `aliases` 且未命中业务组件映射表的）：

1. **去重并统计**：按组件名去重，统计每个组件出现的次数

2. **一次性列出所有未识别组件**，询问用户：

   > 发现以下未识别的业务组件（已去重）：
   > 
   > | 组件名 | 出现次数 | figma-node（取第一个） |
   > |--------|----------|------------------------|
   > | IslandsPinBasic | 6 | 14210:714409 |
   > | FeedPost | 7 | 18215:29049 |
   > | ... | ... | ... |
   > 
   > 请告知：
   > 1. 哪些需要生成？（列出组件名）
   > 2. 保存路径格式？（如 `docs/business/{ComponentName}.vue`）
   > 3. 输入「全部跳过」则用占位 div 处理

3. **等待用户回复**，根据用户选择：
   - 用户指定要生成的组件 → 记录下来，第六步处理
   - 用户说「全部跳过」→ 所有未识别组件用占位 div 处理
   - 用户指定部分生成、部分跳过 → 按用户要求处理

**第六步：写入文件（用户确认后执行）**

1. **生成用户要求的子组件**（如有）：
   - 用该组件的 `figma-node` id 重新执行 CLI（保持与主组件相同的 `--tokens` 参数）：
     ```bash
     npx figma-to-code <原始fileKey对应的url>&node-id=<componentId> --framework=vue --tokens=<同上>
     ```
   - 对新骨架重复第三步的翻译流程
   - 将结果写入用户指定路径
   - 在 `figma-context.md` 的「业务组件映射」表中补充该条记录：
     ```
     | ComponentName | `ComponentName` | src/components/ComponentName.vue | 已生成 |
     ```

2. **更新主组件代码**：
   - 将已生成的子组件替换为真实组件引用
   - 未生成的子组件用占位 div 处理
   - 在 `<script setup>` 中补充所有 import

3. **写入主组件文件**：
   - 指定了目标路径 → 写入文件
   - 未指定 → 输出到对话，由用户确认后保存

4. **输出完成摘要**：列出已生成的所有文件路径
