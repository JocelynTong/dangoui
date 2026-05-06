# publish

发布 `@frontend/figma-to-code` 到 GitLab Package Registry（project 1455）。

## 用法

```
/publish          → 发布正式版（使用 package.json 中的当前版本）
/publish patch    → 正式版，自动升 patch（0.1.0 → 0.1.1）
/publish minor    → 正式版，自动升 minor（0.1.0 → 0.2.0）
/publish major    → 正式版，自动升 major（0.1.0 → 1.0.0）
/publish beta     → 测试版，tag 为 beta（版本格式：0.1.1-beta.0）
/publish beta patch → 测试版，自动升 patch 后附加 beta 预发布号
```

## 执行步骤

**第一步：确认参数**

解析用户输入的参数：
- 是否包含版本类型：`patch` / `minor` / `major`（默认不升版）
- 是否为测试版：包含 `beta` 关键词

读取 `package.json` 获取当前版本号。

**第二步：计算新版本**

- 无参数 → 使用当前版本，不做修改
- `patch` → 升 patch 位，如 `0.1.0 → 0.1.1`
- `minor` → 升 minor 位，如 `0.1.0 → 0.2.0`
- `major` → 升 major 位，如 `0.1.0 → 1.0.0`
- `beta`（无版本类型）→ 在当前版本基础上附加 `-beta.0`，若已有 beta 号则递增，如 `0.1.0 → 0.1.1-beta.0`，`0.1.1-beta.0 → 0.1.1-beta.1`
- `beta patch` → 先升 patch，再附加 `-beta.0`，如 `0.1.0 → 0.1.1-beta.0`

**第三步：更新版本号**

若版本号有变化，用 Edit 工具修改 `package.json` 中的 `"version"` 字段。

**第四步：执行发布**

- 正式版：运行 `pnpm publish --no-git-checks`
- 测试版：运行 `pnpm publish --no-git-checks --tag beta`

发布前检查：
- `.npmrc` 中的 registry 是否为 `https://g.echo.tech/api/v4/projects/1455/packages/npm/`
- Token 是否存在（`_authToken` 不为空）

若 `.npmrc` 配置不对，先修正再发布。

**第五步：输出结果**

发布成功后告知用户：
- 发布的版本号
- tag（`latest` 或 `beta`）
- registry 地址

**安装命令参考（在其他项目中使用）：**

正式版：
```bash
pnpm add @frontend/figma-to-code
```

测试版：
```bash
pnpm add @frontend/figma-to-code@beta
```

`.npmrc` 需配置：
```ini
@frontend:registry=https://g.echo.tech/api/v4/packages/npm/
//g.echo.tech/api/v4/packages/npm/:_authToken=YOUR_TOKEN
```
