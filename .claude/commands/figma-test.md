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

**第三步：提示预览**

> 生成完成！预览地址：`/business/test`
