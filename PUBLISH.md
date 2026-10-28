# 发布到 DeepSeek Harness 插件市场 · 详细步骤

这个目录 `plugins/dsh-aurora-wallpaper/` 就是可以发布的 npm 包（开发用的那份在
`plugins/aurora-wallpaper/`，两者互相独立）。下面从零开始。

---

## 0. 你需要准备的账号

| 账号 | 用途 | 地址 |
| --- | --- | --- |
| npm | 发布包，市场靠 npm 分发 | https://www.npmjs.com/signup |
| GitHub | 放源码，市场条目必须指向一个 GitHub 仓库 | https://github.com/signup |

> 市场（dshmarket / 插件 → 发现）的列表来自 GitHub 仓库 `awesome-dsh-plugin/awesome-dsh-plugin`，
> 条目里的 `url` 必须是一个真实的 GitHub 仓库。所以 npm 和 GitHub 两个都要。

---

## 1. 本机现状与工具

这台机器目前 **没有安装 node / npm / git**（都不在 PATH 里）。有两条路：

- **方案 A（推荐）**：装 Node.js LTS（自带 npm）和 Git，后面 npm、GitHub 都顺。
- **方案 B（什么都不装）**：用 DSH 自带的 node + pnpm 发布 npm；GitHub 用网页上传。

DSH 自带工具的实际路径（方案 B 用）：

```text
node: C:\Users\gjhuy\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe
pnpm: C:\Users\gjhuy\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs
包目录: C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\plugins\dsh-aurora-wallpaper
```

---

## 2. 发布到 npm

### 2.1 先做一次干跑（不需要登录）

```powershell
$node = 'C:\Users\gjhuy\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
$pnpm = 'C:\Users\gjhuy\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs'
cd C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\plugins\dsh-aurora-wallpaper
& $node $pnpm publish --dry-run --no-git-checks --access public
```

已经验证过输出是：

```text
📦 dsh-aurora-wallpaper@1.0.0 → https://registry.npmjs.org/
[WARN] Skip publishing dsh-aurora-wallpaper@1.0.0 (dry run)
```

### 2.2 方案 A：装了 Node.js 之后

```powershell
cd C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\plugins\dsh-aurora-wallpaper
npm login                     # 浏览器登录 npm，一次即可
npm publish --access public
npm view dsh-aurora-wallpaper version   # 应输出 1.0.0
```

### 2.3 方案 B：用 DSH 自带的 pnpm + npm token

1. 打开 https://www.npmjs.com/settings/~/tokens → **Generate New Token** →
   选 **Automation**（不受 2FA 打断）→ 复制 token（只显示一次）。
2. 把 token 写进 `C:\Users\gjhuy\.npmrc`（**不要**把 token 发给任何人、不要提交进仓库）：

   ```ini
   registry=https://registry.npmjs.org/
   //registry.npmjs.org/:_authToken=粘贴你的token
   ```

3. 发布：

   ```powershell
   $node = 'C:\Users\gjhuy\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe'
   $pnpm = 'C:\Users\gjhuy\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs'
   cd C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\plugins\dsh-aurora-wallpaper
   & $node $pnpm publish --access public --no-git-checks
   ```

4. 验证：浏览器打开 https://www.npmjs.com/package/dsh-aurora-wallpaper ，或
   `https://registry.npmjs.org/dsh-aurora-wallpaper/latest` 能看到版本号。

### 2.4 常见报错

| 报错 | 原因 | 处理 |
| --- | --- | --- |
| `ENEEDAUTH` / `E401` | 没登录 / token 无效或过期 | 重新 `npm login` 或换 token |
| `E403` | 包名被占、或没有该 scope 权限 | 换名（同时改 patch 与 client id），或加 `--access public` |
| `EPUBLISHCONFLICT` | 这个版本号已经发布过 | 改 `package.json` 的 `version` 再发 |
| `EOTP` | 账号开了 2FA | 用 Automation token，或加 `--otp 123456` |
| 包内容不对 | `files` 字段漏了文件 | 先 `--dry-run` 看清单，再补 `files` |

> 包名规则：`dsh-aurora-wallpaper` 已查过未被占用。如果以后被占，改 `package.json` 的 `name`，
> 同时改 `cordis.patch.yml` 里的 `name:` 和 `client.js` 第 2 行的 `id:`，**三者必须完全一致**。

---

## 3. 建 GitHub 仓库

1. 打开 https://github.com/new → 仓库名 `dsh-aurora-wallpaper` → **Public** → 不要勾
   “Add a README / .gitignore / license”（避免和本地文件冲突）→ Create。
2. 上传代码，两种方式任选：
   - **网页**：仓库首页 → *Add file → Upload files* → 把
     `plugins\dsh-aurora-wallpaper\` 里的文件全选拖进去（含 `locale` 文件夹）→ Commit。
   - **装 Git 之后**：

     ```powershell
     cd C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\plugins\dsh-aurora-wallpaper
     git init
     git add .
     git commit -m "dsh-aurora-wallpaper 1.0.0"
     git branch -M main
     git remote add origin https://github.com/<你的用户名>/dsh-aurora-wallpaper.git
     git push -u origin main
     ```

3. 加 topic：仓库首页右侧 **About** 旁边的齿轮 → Topics 填 `dsh-plugin`（收录硬性要求）。
4. 补 `package.json` 的三个字段并再提交一次：

   ```json
   "repository": { "type": "git", "url": "git+https://github.com/<你的用户名>/dsh-aurora-wallpaper.git" },
   "homepage": "https://github.com/<你的用户名>/dsh-aurora-wallpaper#readme",
   "author": "<你的名字>"
   ```

5. 打 tag（可选但建议）：仓库右侧 *Releases → Draft a new release* → tag `v1.0.0`。
6. **等满 24 小时**：市场 CI 会检查仓库创建时间，PR 前几分钟建的仓库会被自动拒。

---

## 4. 向市场提交（awesome-dsh-plugin）

市场列表在 GitHub：https://github.com/awesome-dsh-plugin/awesome-dsh-plugin
**一个插件一个 YAML 文件**，PR 里只加这一个文件。

1. Fork 该仓库。
2. 在你的 fork 里：*Add file → Create new file*，路径：

   ```text
   data/plugins/<你的GitHub用户名>__dsh-aurora-wallpaper.yml
   ```

3. 内容（把 `<你的用户名>` 换成实际的，`url` 必须和仓库完全一致）：

   ```yaml
   url: https://github.com/<你的用户名>/dsh-aurora-wallpaper
   name: <你的用户名>/dsh-aurora-wallpaper
   category: theme
   description:
     en: 'Generative aurora wallpaper for the Harness web UI: 13 palettes, adjustable breathing and motion, and a local photo or video as the backdrop.'
     zh: '给 Harness 网页界面加一层生成式极光壁纸：13 套配色、呼吸与流动可调，也能用本地图片或视频当壁纸。'
     # 可选：GitHub 图床上的 180px 位图；不写就用作者头像
     # icon: https://raw.githubusercontent.com/<你的用户名>/dsh-aurora-wallpaper/main/assets/icon-180.png
   ```

4. Commit → *Contribute → Open pull request*，标题写 `Add dsh-aurora-wallpaper`。
5. CI 会检查：`dsh.bundle` manifest、仓库年龄、YAML 格式、README 能否重新生成；
   维护者还会读代码核对描述。描述里提到的功能、数字都要真实存在。
6. 合并后自动收录：市场（dshmarket / 插件 → 发现）每天拉一次列表，通常一天内能搜到。

> 收录 ≠ 背书：列表页会保留第三方代码的风险提示。

---

## 5. 收录之后

- 安装命令：`dsh plugin --profile <profile> add dsh-aurora-wallpaper`
- 或在 **设置 → 插件 → 发现** 搜 “aurora”
- 市场会按 npm 上的版本判断更新；用户点一下就能升级

---

## 6. 以后发新版本

1. 改代码。
2. `package.json` 的 `version` 升一位（比如 1.0.1）。
3. 重新 `npm publish`（或 `pnpm publish`）。
4. 市场条目不用改，除非仓库地址变了。

---

## 7. 本机自测发布版（可选，别污染正在用的 profile）

`desktop` profile 里已经装着开发版（`@local/aurora-wallpaper`），**两个同时启用会抢同一个侧栏按钮和背景层**。
要试发布版就开一个隔离 profile：

```powershell
$env:DSH_HOME = 'C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\.aurora-test-home'
$cli = 'D:\deepseek\resources\runtime\cli\bin\dsh.cmd'
& $cli plugin --profile awtest add link:C:\Users\gjhuy\Documents\deepseek-harness\default-workspace\plugins\dsh-aurora-wallpaper
& $cli --profile awtest --dump-config | Select-String aurora
```

测完删掉 `.aurora-test-home` 即可。也可以用打好的
`dsh-aurora-wallpaper-1.0.0.tgz` 安装：`& $cli plugin --profile awtest add <tgz 路径>`。

---

## 8. 提交前自查清单

- [ ] `npm publish --dry-run` 内容清单正确（10 个文件）
- [ ] 包名 / `cordis.patch.yml` 的 `name:` / `client.js` 的 `id:` 三者一致
- [ ] `package.json` 有 `dsh.bundle`（只有 `dsh.client` 会被市场拒）
- [ ] 仓库是 public，且加了 `dsh-plugin` topic
- [ ] 仓库创建满 24 小时
- [ ] README 里写的功能和代码一致
- [ ] `.npmrc`、token、`node_modules` 没有提交进仓库