# 标签页

| Figma 节点名含 | 组件 | 用法 |
|---|---|---|
| `Tabs` / `Tab` / `TabBar` | `<DuTabs>` + `<DuTab>` | 见下方 |

```html
<!-- 基础标签页 -->
<DuTabs v-model:value="activeTab" color="primary">
  <DuTab name="tab1">推荐</DuTab>
  <DuTab name="tab2">最新</DuTab>
  <DuTab name="tab3">热门</DuTab>
</DuTabs>

<!-- tag 风格 -->
<DuTabs v-model:value="activeTab" type="tag" color="primary">
  <DuTab name="all">全部</DuTab>
  <DuTab name="sale">在售</DuTab>
</DuTabs>

<!-- 带左右插槽 -->
<DuTabs v-model:value="activeTab">
  <template #left><DuIcon name="filter" size="16px" /></template>
  <DuTab name="tab1">Tab1</DuTab>
  <DuTab name="tab2">Tab2</DuTab>
  <template #right><DuIconButton name="search" /></template>
</DuTabs>
```

**DuTabs props**：
- `v-model:value`：当前激活 tab 的 name
- `color`：色板颜色名
- `type`：`'default'` | `'tag'` | `'text'`
- `size`：`'normal'` | `'large'`
- `indicator`：自定义指示器样式

**DuTab props**：
- `name`：标识符

**Slots**：`left`、`right`、`default`（放 DuTab）

---

## DuTabPane

标签页内容面板，配合 `DuTabs` 使用，用于切换显示不同内容。

```html
<DuTabs v-model:value="activeTab">
  <DuTab name="tab1">Tab1</DuTab>
  <DuTab name="tab2">Tab2</DuTab>
</DuTabs>
<DuTabPane name="tab1" :active="activeTab === 'tab1'">
  Tab1 内容
</DuTabPane>
<DuTabPane name="tab2" :active="activeTab === 'tab2'">
  Tab2 内容
</DuTabPane>
```

---

## DuTabsRight

Tabs 右侧插槽容器，用于在 `DuTabs` 的 `#right` slot 中包裹多个元素。

```html
<DuTabs v-model:value="activeTab">
  <DuTab name="tab1">Tab1</DuTab>
  <template #right>
    <DuTabsRight>
      <DuIconButton name="filter" />
      <DuIconButton name="search" />
    </DuTabsRight>
  </template>
</DuTabs>
```
