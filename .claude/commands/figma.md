# figma

根据 Figma 链接生成骨架，并按项目规范翻译为前端组件。

**骨架即真相，1:1 还原**：骨架输出什么，翻译结果就对应什么。

**不确定时询问用户**。

---

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
npx figma-to-code $URL --framework=$FRAMEWORK --style=unocss
```

如果报错再告知用户。

骨架生成后，**停下等待确认**：
```
骨架生成完成，共 X 个子组件
  - xxx  figma-node: xxx
  - ...
---
请确认是否开始翻译？（输入「翻译」继续）
```

**第三步：读取项目规范**

> ⚠️ 只有收到「翻译」确认后才执行此步

读取以下规范文件（按需加载）：
- `.claude/rules-base/core.md` — 核心翻译规则（必读）
- `.claude/rules-base/layout.md` — 布局规则
- `.claude/rules-base/components/_catalog.md` — 原子分子组件映射
- `.claude/rules-base/business/_catalog.md` — 业务组件映射
- `.claude/rules-base/components/*.md` — 各组件详细规则（用到哪个读哪个）
- `.claude/rules-base/business/*.md` — 各业务组件详细规则（用到哪个读哪个）

**第四步：翻译骨架**

按 `.claude/rules-base/core.md` 的规则翻译。

**第五步：输出组件**

- 指定了目标路径 → 写入文件
- 未指定 → 输出到对话，由用户确认后保存

**第六步：处理未识别的子组件（递归生成）**

按 `.claude/rules-base/core.md` 规则处理未识别的子组件。

所有子组件处理完毕后，**输出最终完整的组件代码**。