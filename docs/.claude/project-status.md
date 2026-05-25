# 项目状态追踪

> 通过试跑逐步发现 + 集中输出修复

## P0 — 确保 AI 翻译可用（基础设施）

> figma-to-code/.claude/figma-context.md 是 AI 翻译的「词典」，如果词典不全或不准，输出的代码就是错的。

已完成：
- ✅ 安装 figma-to-code
- ✅ 配置 Figma PAT
- ✅ 初始化 dangoui 项目
- ✅ 完善 `figma-to-code/.claude/figma-context.md`
- ✅ 增强 INSTANCE 识别（IslandsQuickEntry/IslandsPin/IslandsGrid/IslandsSlide/IslandsFeed props 已暴露为 COMPONENT_SET 格式）
- ✅ 组件路径冲突（StatusBar 重复 → 已删除）
- ⬜ 验证 AI 翻译质量（进行中：Islands 验证发现问题）

卡点：
| 状态 | 任务 | 说明 |
|------|------|------|
| ✅ | figma-context.md 精简 | 已拆分至 figma.md/core.md/layout.md/_catalog.md |
| ⬜ | 组件映射使用率 | 生成的代码没用 dangoui 组件，用了 HTML + UnoCSS |5月25日 30% dangoui 组件 / 70% HTML+UnoCSS。下次迭代新的 Islands 页面后重新统计对比。
| ⬜ | 还原质量 | 非组件部分还原度差 |
| ⬜ | 骨架输出结构化 | 148KB 输出难以阅读，需结构化 |
| ⬜ | 骨架标注视觉位置 | HTML 顺序 ≠ 渲染顺序，需标注左右中 |
| ⬜ | IslandsQuickEntry type SVG 映射 | 顺序问题待 Figma 核对 |
| ⬜ | INSTANCE props 提取 | CLI 骨架未提取 INSTANCE 的 variant props（如 IslandsQuickEntry 数量=4~9） |

## P1 — 打通核心业务场景

> Business 层是「原型即上线」的关键 —— PM 能搭出的页面复杂度取决于 Business 组件的丰富度。

已完成：
- ✅ IslandsHeader / IslandsPin / IslandsFeed / IslandsSlide / IslandsQuickEntry

卡点：
| 状态 | 任务 |
|------|------|
| ✅ | IslandsSlide / IslandsSlideBasic |
| ✅ | SPU / SPUBasic |
| ✅ | NavigationBar 系列 |

## P2 — 消除卡点

已完成：
- ✅ components/content 嵌套目录扫描

卡点：
| 状态 | 任务 |
|------|------|
| ⬜ | Figma 插件环节（设计把 HTML demo 导回 Figma）|
| ⬜ | PM Terminal GUI（CLI 版已通，GUI 待建）|

## P3 — 长期建设

| 状态 | 任务 |
|------|------|
| ⬜ | 完善 Token 层（iOS/Android/Web 各端 token 对齐）|
| ⬜ | 完善 Component 层（原子组件补全）|
| ⬜ | 制定 SOP 并推广（让 PM/FE/设计都会用这套流程）|

## 飞轮效应

PM 需求 demo → 提醒设计是否有必要抽成组件 → 原子分子更新 / 业务组件新增更改 → Business 层完善 → PM Terminal 能搭更复杂页面 → 更多 PM 需求 demo。组件库完善后反哺 Demo 代码质量，形成正向循环。

## 未使用 Token 告警收集计划

> 目标：收集组件中未使用 token 的样式值，Q3 结束前接通飞书机器人周一定时播报。

### 里程碑

| 日期 | 目标 | 交付物 |
|---|---|---|
| 5月26日 | 跑通核心流程 | StatusBar 组件 + core.md 告警 schema + CLI 能输出 JSON ✅ |
| 6月26日 | 数据收集机制跑通 | `--report` 命令接上 + 多人数据汇总 demo |
| Q3 结束 | 接通飞书播报 | Feishu 机器人读 JSON → 格式化 → 周一播报 |

### JSON Schema

```json
{
  "generatedAt": "ISO 时间",
  "author": "机器 hostname 或花名",
  "file": "相对仓库根路径",
  "property": "gap/margin/padding/color 等",
  "rawValue": "原始值（含单位）",
  "location": "template/script + 行号",
  "suggestedToken": "推荐 token 或 null",
  "severity": "warning 或 info"
}
```

### 合并逻辑

飞书机器人按 `property + rawValue` 合并同类项，不按 author。

### 依赖

- 曾书伟：CLI 加 `--report` 命令
- 团队：多人跑 CLI，汇总 JSON
- 机器人：Feishu 接入（等 Q3 有数据量再接）

---

## 暴露问题策略

- figma-to-code/.claude/figma-context.md 的基础组件映射还包括很多细节不够完善
- 不要追求一次性完善，而是在试跑过程中逐步发现、记录
- 集中输出时机：每次试跑后汇总问题，定期（如每天/每周）统一修复
- 问题发现流程：试跑 → 发现问题 → 更新到本文件 P0 任务清单 → 曾书伟修复 → 验证