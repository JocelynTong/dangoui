# 项目 Figma 规范

> 此文件由 `figma-to-code init --ui=dangoui` 生成。
> 组件库规则在 `.claude/figma-base/` 目录，可通过 `figma-to-code update` 更新。

---

## 业务组件映射

<!--
骨架中未识别的 INSTANCE 节点会附带 <!-- figma-node: xxx --> 注释。
翻译时按本表决策，三种情况：
  1. 文件路径为 "-"  → 已知基础组件，直接使用，不递归
  2. 文件路径有值    → 已生成的业务组件，直接 import，不递归
  3. 未匹配          → 询问用户是否生成、保存在哪里，确认后递归拉取该 figma-node 生成子组件文件，完成后补充本表
-->

| Figma 组件名（模糊匹配） | 项目组件 | 文件路径 | 备注 |
|---|---|---|---|
| IslandsGridBasic | `IslandsGridBasic` | docs/business/islands/IslandsGridBasic.vue | 已生成 |
| IslandsSlideBasic | `IslandsSlideBasic` | docs/business/islands/IslandsSlideBasic.vue | 已生成 |
| SPUBasic | `SPUBasic` | docs/business/islands/SPUBasic.vue | 已生成 |
| SPU | `SPU` | docs/business/islands/SPU.vue | 已生成 |
| Price | `Price` | docs/business/islands/Price.vue | 已生成 |
| IslandsQuickEntry | `IslandsQuickEntry` | docs/business/islands/IslandsQuickEntry.vue | 已生成 |
| IslandsQuickEntryCard | `IslandsQuickEntryCard` | docs/business/islands/IslandsQuickEntryCard.vue | 已生成 |
| IslandsFeed | `IslandsFeed` | docs/business/islands/IslandsFeed.vue | 已生成 |
| IslandsFeedAd | `IslandsFeedAd` | docs/business/islands/IslandsFeedAd.vue | 已生成 |
| FeedPost | `FeedPost` | docs/business/islands/FeedPost.vue | 已生成 |
| FeedInteractionCard | `FeedInteractionCard` | docs/business/islands/FeedInteractionCard.vue | 已生成 |
| IslandsPinBasic | `IslandsPinBasic` | docs/business/islands/IslandsPinBasic.vue | 已生成 |
| IslandsTabBar / TabBar | `IslandsTabBar` | docs/business/islands/IslandsTabBar.vue | 已生成 |
| IslandsNavigationBar / NavigationBar | `IslandsNavigationBar` | docs/business/islands/IslandsNavigationBar.vue | 已生成 |
| ButtonFAB | `ButtonFAB` | docs/business/islands/ButtonFAB.vue | 已生成 |

---

## UnoCSS 配置

<!--
⚠ 项目使用 presetUno()，默认单位是 rem，需要保留 px 后缀
-->

**间距单位**：保留 px 后缀（项目使用 presetUno 默认配置）

写法示例：
- 骨架 `gap-[8px]` → 项目写 `gap-8px` 或 `gap-[8px]`
- 骨架 `px-[15px]` → 项目写 `px-15px` 或 `px-[15px]`
- 骨架 `w-[100px]` → 项目写 `w-100px` 或 `w-[100px]`
- 骨架 `rounded-[8px]` → 项目写 `rounded-8px`

---

## 设计 Token

### 颜色 Token

骨架已输出 `var(--token-name, #fallback)` 格式，可直接使用。

- 项目有 `design-tokens.css` → 自动使用 `var(--token-name)`
- 项目没有对应变量 → 自动 fallback 到原始颜色值

**无需手动维护颜色映射表。**

### 文字样式

<!--
⚠ 以下为参考值，根据实际项目的 uno.config.ts 填写
骨架输出原始 CSS 值，翻译时按此表转换为项目 shortcuts
-->

| 骨架输出 | 项目 class |
|---|---|
| `text-[24px] font-[500] leading-[30px]` | `text-h1` |
| `text-[20px] font-[500] leading-[26px]` | `text-h2` |
| `text-[18px] font-[500] leading-[25px]` | `text-h3` |
| `text-[16px] font-[500] leading-[24px]` | `text-h4` |
| `text-[14px] font-[500] leading-[22px]` | `text-h5` |
| `text-[12px] font-[500] leading-[18px]` | `text-h6` |
| `text-[16px] font-[400] leading-[24px]` | `text-b4` |
| `text-[14px] font-[400] leading-[22px]` | `text-b5` |
| `text-[12px] font-[400] leading-[18px]` | `text-b6` |
| `text-[10px] font-[400] leading-[11px]` | `text-b8` |

---

## 组件引入

dangoui 组件需手动 import：`import { DuButton, DuIcon, ... } from 'dangoui'`
