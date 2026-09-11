# 前沿周刊

每周从论文、产品、工程实践、公司博客与公众号投稿中筛选 10 篇 AI / CS / Agent 前沿内容。

网站：[Ivy-forever18.github.io/frontier-weekly](https://ivy-forever18.github.io/frontier-weekly/)

## 它如何工作

1. `scripts/weekly.mjs` 从 `data/sources.json` 中配置的 RSS / Atom 信源获取新内容。
2. 网页上的「投递一篇」会创建带有 `candidate` 标签的 GitHub Issue，适合提交公众号文章。
3. GitHub Actions 每周一运行，通过 OpenAI Responses API 进行跨来源去重、评分和中文编辑。
4. AI 结果写入 `docs/data/latest.json`，随后 GitHub Pages 自动发布。
5. `data/archive.json` 保存历史入选链接，用于跨周去重。

AI 只负责形成候选和编辑稿。正式使用时，推荐将定时任务改为先创建 Pull Request，再由人工确认后合并发布。

## 启用网站

在仓库中打开 **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。推送到 `main` 后，`发布 GitHub Pages` 工作流会发布 `docs/`。

## 配置 AI

打开 **Settings → Secrets and variables → Actions**：

- 在 **Secrets** 中创建 `OPENAI_API_KEY`。不要把密钥写进代码或网页。
- 在 **Variables** 中创建 `OPENAI_MODEL`，填写你的 OpenAI 项目当前可用、支持 Structured Outputs 的模型 ID。

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

## 筛选标准

| 维度 | 权重 |
| --- | ---: |
| 信息增量 | 25 |
| 相关性 | 20 |
| 实用价值 | 20 |
| 来源可信度 | 15 |
| 可读性 | 10 |
| 时效性 | 10 |

软文、标题党、没有原始来源的转载会被扣分。同一事件优先保留论文、官方报告或信息最完整的来源。

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
