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

## 文档 H1 下方 Description 补充

> 目标：丰盈每个组件页面的 H1 下方描述，补充功能说明和使用注意事项。
> 计划：逐模块确认，改完一个模块再改下一个。

### 进度

| 模块 | 状态 | 文件数 | 已更新 |
|------|------|--------|--------|
| STYLE | ✅ 完成 | 9 | 全部 |
| BAR | ✅ 完成 | 3 | 全部 |
| FORM | ✅ 完成 | 13 | 全部 |
| DATA | ✅ 完成 | 7 | 全部 |
| FEEDBACK | ✅ 完成 | 10 | 全部 |
| OTHERS | ⬜ 待做 | - | - |
| COMPOSABLES | ⬜ 待做 | - | - |

### 已更新文件清单（2026-06-01）

**STYLE (9/9)**
- `1.style/0.layout.md` — UnoCSS 工具类布局 + App 端不支持
- `1.style/1.typography.md` — text-h/b 系列 + c-text 颜色工具类
- `1.style/3.icon.md` — 线性/填充风格 + 模糊匹配
- `1.style/6.divider.md` — 水平/垂直模式 + 垂直不支持 slot
- `1.style/8.button.md` — 类型/尺寸/颜色 + `:icon` 性能优于 `icon`
- `1.style/8.icon-button.md` — 图标+文字组合 + `:icon` 性能优于 `name`
- `1.style/9.sticky.md` — 粘性定位 + 大小一致要求 + uni-app slot 注意
- `1.style/10.transition.md` — fadeInUp + 挂载自动执行
- `1.style/8.button.md` (已改)

**BAR (3/3)**
- `2.bar/1.navigation-bar.md` — 页面导航 + 小程序 right slot class 要求 + home 图标
- `2.bar/2.searchbar.md` — 搜索输入 + 小程序 right slot class 要求
- `2.bar/5.tabs.md` — 内容切换 + globalConfig indicator 扩展 + 小程序 right slot class

**FORM (13/13)**
- `3.form/1.formitem.md` — 包裹表单项 + DuForm 搭配 + 布局/标签/校验
- `3.form/2.input.md` — 文本输入 + trim 自动去首尾空格
- `3.form/2.inputnumber.md` — 数字输入 + compact 模式 + min/max
- `3.form/3.textarea.md` — 多行输入 + maxlength 限制 + 自动增高
- `3.form/4.radio.md` — 单选 + DuRadioGroup 搭配
- `3.form/5.checkbox.md` — 多选 + DuCheckboxGroup 搭配 + card shape 3px 占位
- `3.form/6.switch.md` — 开关状态切换
- `3.form/8.upload.md` — 文件上传 + 需配合服务端
- `3.form/10.group.md` — 卡片列表 + 内部 DuCard
- `3.form/11.datetimepicker.md` — 日期时间选择 + 三种模式
- `3.form/11.picker.md` — 单项选择 + columns 配置
- `3.form/12.rate.md` — 星级评分 + 0.5 颗星 + allow-clear
- `3.form/13.cascader.md` — 级联选择 + 树形数据结构
- `3.form/14.select.md` — 下拉选择 + options 配置

**DATA (7/7)**
- `4.data/1.badge.md` — 数量/状态徽章 + 小红点模式
- `4.data/2.tag.md` — 分类/筛选标签 + 颜色样式
- `4.data/2.tags-panel.md` — 标签组 + 内部 DuTag
- `4.data/4.image.md` — 图片展示 + CDN + 尺寸建议
- `4.data/5.avatar.md` — 头像 + 加载失败占位 + DuBadge 配合
- `4.data/11.swiper.md` — 轮播 + DuSwiperItem 配合
- `4.data/15.steps.md` — 流程步骤 + 水平/垂直方向

**FEEDBACK (10/10)**
- `5.feedback/1.noticebar.md` — 系统公告 + 滚动播放
- `5.feedback/2.snackbar.md` — 操作反馈 + 自动消失
- `5.feedback/3.toast.md` — useToast Hook + DuToastProvider 包裹
- `5.feedback/4.dialog.md` — 对话框 + 自定义标题/内容/按钮
- `5.feedback/5.popup.md` — 浮层 + 脱离文档流注意
- `5.feedback/6.dropdown.md` — 下拉菜单 + 多种触发方式
- `5.feedback/7.popover.md` — 气泡卡片 + alpha 阶段
- `5.feedback/8.action-sheet.md` — 底部操作菜单 + 底部弹出
- `5.feedback/9.empty.md` — 空状态占位 + 自定义图片/文字/按钮
- `5.feedback/12.skeleton.md` — 骨架屏 + 加载体验

### 待做

**OTHERS** — 待检查
**COMPOSABLES** — 待检查

### 描述撰写原则

1. 保留有意义的诗句/歌词/引用（如 Radio/Checkbox/Snackbar 等）
2. 功能描述使用句号分隔，清晰简洁
3. 注意事项用**加粗**标记
4. 提及组件搭配时用 `` `组件名` `` 格式

---

## 暴露问题策略

- figma-to-code/.claude/figma-context.md 的基础组件映射还包括很多细节不够完善
- 不要追求一次性完善，而是在试跑过程中逐步发现、记录
- 集中输出时机：每次试跑后汇总问题，定期（如每天/每周）统一修复
- 问题发现流程：试跑 → 发现问题 → 更新到本文件 P0 任务清单 → 曾书伟修复 → 验证