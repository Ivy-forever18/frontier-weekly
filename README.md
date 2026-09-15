# 前沿周刊

每周从企业动态、行业新闻、产品、开源项目、工程实践、论文与公众号投稿中筛选 10 篇 AI / CS / Agent 情报，重点服务就业判断和创业启发。

网站：[Ivy-forever18.github.io/frontier-weekly](https://ivy-forever18.github.io/frontier-weekly/)

## 它如何工作

1. `scripts/weekly.mjs` 从 `data/sources.json` 中配置的 RSS / Atom 信源和 GitHub 新项目中获取最近 7 天的新内容。
2. 网页上的「投递一篇」会创建 GitHub Issue，适合提交公众号文章。
3. GitHub Actions 每周一运行，通过 DeepSeek Responses API 进行跨来源去重、评分和中文编辑。
4. AI 结果写入 `docs/data/latest.json`；生成工作流结束后会自动触发 GitHub Pages 发布。
5. `data/archive.json` 保存历史入选链接，用于跨周去重。

AI 只负责形成候选和编辑稿。正式使用时，推荐将定时任务改为先创建 Pull Request，再由人工确认后合并发布。

## 启用网站

在仓库中打开 **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。推送到 `main` 后，`发布 GitHub Pages` 工作流会发布 `docs/`。

## 配置 DeepSeek

打开 **Settings → Secrets and variables → Actions**：

- 前往 [DeepSeek 开放平台](https://platform.deepseek.com/) 创建 API Key。
- 在 **Secrets** 中创建 `DEEPSEEK_API_KEY`。不要把密钥写进代码或网页。
- 可选：在 **Variables** 中创建 `DEEPSEEK_MODEL`。不填写时默认使用 `deepseek-v4-flash`；需要更强筛选能力时可以填写 `deepseek-v4-pro`。

然后进入 **Actions → 生成本周精选 → Run workflow**，即可手动生成一期。工作流默认也会在每周一北京时间 09:00 运行。

## 投递公众号文章

点击网站右上角的「投递一篇」，或在仓库中选择 **Issues → New issue → 投递一篇好内容**。填写：

- 文章链接
- 来源或公众号名称
- 为什么值得读（可选）

公众号没有稳定的任意账号官方抓取接口，因此本项目采用“人工投递链接 + AI 统一筛选”的方式。工作流会将公众号投稿与自动信源放在同一候选池中，并按 URL 和语义去重。

## 添加自动信源

编辑 `data/sources.json`：

```json
{
  "name": "信源名称",
  "url": "https://example.com/feed.xml",
  "type": "研究",
  "enabled": true
}
```

目前支持常见 RSS 和 Atom Feed。单个信源失败不会阻断其他信源。

为避免某个高频 Feed 淹没其他信源，每个来源最多送入 12 条候选，且按来源交错排列。某周没有新内容的 Feed 不会为了凑数强行入选。

## 筛选标准

目标内容结构不是硬凑分类，但会控制学术内容占比：

- 企业战略、产品发布与商业化：约 2 篇
- 行业变化、市场、融资与公司动态：约 2 篇
- Agent、开发工具、开源项目与真实落地：约 2 篇
- 岗位、技能栈和工作方式变化：约 1 篇
- 有明确客户与痛点的创业切口：约 1 篇
- 论文：最多 2 篇，只保留有强应用潜力的研究

每篇入选内容都要求给出「就业信号」「创业信号」和一个「本周可做」的验证动作。

另有程序级硬约束：每个来源最多 2 篇，论文最多 2 篇；政策、监管、法律、政府倡议和地缘政治类内容在候选阶段剔除，最终结果还会再次校验。AI 只能使用真实候选链接，不能自行编造来源。如果符合条件的内容不足，周刊可以少于 10 篇。

| 维度 | 权重 |
| --- | ---: |
| 决策价值 | 25 |
| 信息增量 | 20 |
| 产业影响 | 20 |
| 可行动性 | 15 |
| 来源可信度 | 10 |
| 时效性 | 10 |

软文、标题党、没有原始来源的转载会被扣分。同一事件优先保留官方发布、一手报道或信息最完整的来源。

## 本地预览

无需构建工具，在仓库根目录运行：

```bash
python3 -m http.server 8080 --directory docs
```

然后访问 `http://localhost:8080`。

## 目录结构

```text
docs/                         GitHub Pages 网站
  data/latest.json            当前一期内容
data/
  sources.json                自动信源
  archive.json                历史入选记录
scripts/weekly.mjs            获取、去重、评分与生成
.github/ISSUE_TEMPLATE/       公众号投稿入口
.github/workflows/weekly.yml  每周 AI 工作流
.github/workflows/pages.yml   GitHub Pages 发布工作流
```

## 安全说明

- API 密钥只存放在 GitHub Actions Secrets。
- 网页是纯静态文件，不包含任何服务器密钥。
- 外部链接使用新窗口打开，并启用 `noopener noreferrer`。
- 自动发布前建议检查 Actions 生成的变更，尤其是标题、摘要和来源归属。
