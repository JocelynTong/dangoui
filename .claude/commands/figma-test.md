# figma-test

根据 Figma 链接生成测试页面，固定输出到测试目录，**完整调用 `/figma` 流程**。

## 用法

```
/figma-test <figma-url>
```

## 输出位置

- 主页面：`docs/pages/demos/8.business/test/snippet1.vue`
- 组件目录：`docs/pages/demos/8.business/test/components/`

## 执行步骤

**第一步：检查现有文件**

检查以下路径是否已有内容：
- `docs/pages/demos/8.business/test/snippet1.vue`
- `docs/pages/demos/8.business/test/components/`

如果存在文件，**询问用户**是否删除并重新生成。

用户确认删除后：
```bash
rm -f docs/pages/demos/8.business/test/snippet1.vue
rm -rf docs/pages/demos/8.business/test/components/
mkdir -p docs/pages/demos/8.business/test/components/
```

**第二步：调用 /figma 完整流程**

调用 `/figma` skill，传入参数：
- URL：用户提供的 Figma 链接
- 输出路径：`docs/pages/demos/8.business/test/snippet1.vue`
- 子组件目录：`docs/pages/demos/8.business/test/components/`

**必须走完 `/figma` 的全部步骤**，包括：
1. 检测项目框架
2. 运行 CLI 生成骨架（`--style=unocss`）
3. 读取项目规范
4. 翻译骨架
5. 输出组件
6. **递归处理子组件**（第六步）

**不要自己手动翻译**，必须调用 `/figma` skill。

**第三步：更新 markdown 内容文件**

生成完组件后，读取 `docs/content/business/test.md`，根据生成的组件更新标题和描述：

1. 读取 `snippet1.vue` 和 `components/` 下的组件文件名
2. 从组件名提取关键词（如 `StatusBar`、`IslandsHeader`）
3. 更新 markdown 的 frontmatter：
   - `title`：组件名拼接，如 `StatusBar 状态栏`
   - `description`：列出生成的组件
4. 更新 H1 标题与 frontmatter title 保持一致

**Translation 规则补充**

骨架中出现 `color="white"` / `Color=White` 时：
- 白色内容默认透明底不可见
- 需要在该组件本身（不是外层容器）加 `bg-[var(--bg-2)]`，确保白色元素可见
- 例如 `<StatusBar color="white" />` → StatusBar 组件内部加 `bg-[var(--bg-2)]`

**第四步：提示预览**

> 生成完成！预览地址：`/business/test`
