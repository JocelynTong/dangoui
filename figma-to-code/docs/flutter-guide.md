# figma-to-code Flutter 使用指南

## 这个工具是什么

figma-to-code 是一个 Figma 骨架提取工具，提供类似 Figma MCP 的基础能力，但多了两个关键处理：

1. **去噪**：去除 Figma 节点树中对代码无意义的嵌套和冗余
2. **组件映射**：通过团队统一的组件标注配置，将 INSTANCE 节点精确映射为 Flutter 类名

工具只负责骨架提取和组件映射，**不涉及代码规范、MVVM 结构、Token 映射等**——这些由项目自己处理。

## 工具输出示例

```dart
// Figma skeleton
Container(
  color: Color(0xFFF7F7F9),
  padding: EdgeInsets.all(8),
  child: Column(
    spacing: 8,
    children: [
      Text('精绝古城-困难',
        style: TextStyle(color: Color(0xFF000000), fontSize: 14)),
      Row(
        children: [
          EchoBaseFormItem(),      // ← 通过 annotation_config 精确映射
          EchoNumStepperWidget(),  // ← 不是猜的，是配置里查到的
        ],
      ),
    ],
  ),
)
```

相比 Figma MCP 的输出（React + Tailwind HTML，需要 AI 完全重写），这份骨架：
- 已经是 Flutter Widget 树
- INSTANCE 节点已标注正确的组件类名
- 去除了 50%+ 的嵌套噪音

## 组件映射原理

团队统一维护一份组件标注配置：
```
https://config-cdn.qiandaoapp.com/dumpling_plugin/annotation_config.json
```

映射链路：
```
Figma INSTANCE 节点
    → node.componentId
    → FileResponse.components[componentId].key（componentKey）
    → annotation_config 查 componentKey
    → Flutter className（如 EchoButton、EchoNumStepperWidget）
```

匹配不到的 INSTANCE 降级为 Figma 节点名转 PascalCase。

新增组件映射由设计团队在 Figma 插件中标注，自动同步到远程配置，**无需更新工具版本**。

## 安装

### 一键安装（推荐）

团队 Bubble Skills 平台提供了安装 skill，在项目中对 AI 说：

```
安装figma flutter
```

AI 会自动完成：检测 Node.js → 配置 npm registry → 引导配置 Figma PAT → 配置项目 CLAUDE.md

安装完成后直接给 AI 发 Figma 链接即可使用。

### 手动安装

#### 1. Node.js 20+

```bash
node --version    # 检查版本
brew install node  # 未安装时
```

#### 2. npm registry（一次性）

```bash
npm config set @frontend:registry https://g.echo.tech/api/v4/projects/1455/packages/npm/
```

#### 3. Figma PAT

获取：Figma → 左上角 Logo → Help and account → Account settings → Security → Personal access tokens

配置（二选一）：
```bash
# macOS Keychain（推荐，跨项目共用）
security add-generic-password -a "$(whoami)" -s FIGMA_PAT_GLOBAL -w "你的TOKEN"

# 或项目 .env.local
echo 'FIGMA_PAT=你的TOKEN' >> .env.local
```

#### 4. 配置项目 CLAUDE.md

在项目 `CLAUDE.md` 中添加以下内容，让 AI 优先使用本工具而非 Figma MCP：

```markdown
## Figma 设计稿处理

使用 figma-to-code CLI 处理 Figma 链接，禁止使用 Figma MCP：

\```bash
npx @frontend/figma-to-code <figma-url> --framework=flutter
\```

不要使用 get_design_context 等 MCP 工具获取设计稿。CLI 内部有去噪和组件映射处理。
```

## 使用方式

配置完成后，给 AI 发 Figma 链接即可。AI 会自动调用：

```bash
npx @frontend/figma-to-code <figma-url> --framework=flutter
```

也可以手动在终端执行上述命令。

## 骨架去噪策略

1. **INSTANCE 不展开**：组件实例只保留外壳（类名 + 尺寸），不展开内部实现
2. **透传容器折叠**：单子节点且无视觉样式的中间层直接折叠
3. **宽度自适应**：子元素宽度 ≈ 父容器内容宽时，不输出固定宽度

同一段内容可从 ~65 行压缩到 ~30 行。

## 已映射的组件

| Figma 组件名 | Flutter 类名 |
|-------------|-------------|
| 💙 00.08_Button | EchoButton |
| 💙 02.01_FormItem | EchoBaseFormItem |
| 💙 02.03_Input_Frame | EchoInputFrame |
| 💙 02.03_Input_Line | EchoInputLine |
| 💙 02.03_Input_Select | EchoInputLine |
| 💙 02.04_Textarea | EchoTextArea |
| 💙 02.06_Checkbox | EchoCheckbox |
| 💙 02.05_Checkbox / CheckItem | KurilCheckBoxWidget |
| 💙 02.07_Switch | KurilSwitchWidget |
| 💙 02.08_Stepper | EchoNumStepperWidget |
| 💙 02.12_Upload / Item | KurilMediaPicker |
| 💙 00.06_Divider | EchoDivider |
| 💙 03.01_Badge | EchoBadge |
| 💙 03.02_Tag | EchoTag |
| 💙 03.05_Avatar | EchoAvatar |
| 💙 03.10_Price | EchoPrice |
| 💙 03.10_Price / Echo | KurilPrice |
| EchoSegment | EchoSegment |
| EchoTabBar | EchoTabBar |
| 💙 04.09_Empty | KurilEmptyWidget |

## 局限性

- **交互逻辑**：onTap、路由跳转、状态管理 — 设计稿没有这些信息
- **图标名称**：只能从节点名推断
- **动态数据**：列表数据源、接口调用
- **未标注的组件**：不在 annotation_config 中的组件，降级为节点名转 PascalCase

## FAQ

**Q：和 Figma MCP 有什么区别？**
A：MCP 返回 React + Tailwind HTML，需要 AI 完全重写。本工具直接输出 Flutter Widget 树，且 INSTANCE 已映射为正确类名。

**Q：组件映射不对怎么办？**
A：联系设计团队更新 Figma 插件中的标注，远程配置更新后自动生效，不需要升级工具。

**Q：项目配了 Figma MCP 怎么办？**
A：在 CLAUDE.md 中添加指令禁止使用 MCP（安装 skill 会自动配置）。

**Q：工具怎么升级？**
A：`npx @frontend/figma-to-code@latest --version` 验证最新版本。npx 会自动拉取最新版。
