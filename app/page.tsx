"use client";

import { useMemo, useState } from "react";

const articles = [
  ["论文", "Anthropic Research", "Agent 的长程规划，正在从“思考更多”转向“记住更好”", "新的记忆压缩方法，让 Agent 在长任务里保留真正关键的决策。", "Agent · Memory"],
  ["产品", "OpenAI", "计算机使用 Agent，开始进入真实工作流", "值得关注的不是演示效果，而是跨应用协作、可靠性与人工接管。", "Agent · Product"],
  ["技术报告", "腾讯技术工程", "大规模 Agent 系统的调度、观测与评测", "一线团队拆解多 Agent 系统从 Demo 到生产的三个工程瓶颈。", "Agent · Infra"],
  ["公众号", "机器之心", "本周值得关注的 AI 论文导读", "覆盖推理、具身智能、世界模型与高效训练，适合作为一周入口。", "Weekly · Paper"],
  ["开源", "字节 · Seed", "一个更轻、更快的视觉语言模型推理框架", "面向端侧与批量推理优化，重点改善延迟和吞吐。", "VLM · Open Source"],
  ["会议", "NeurIPS", "年度投稿时间线与 Call for Papers", "重要日期、主题变化与投稿准备事项，集中整理。", "Conference"],
  ["论文", "Google DeepMind", "世界模型如何帮助机器人理解下一步", "将视觉预测与动作规划结合，提升陌生环境中的泛化能力。", "Robotics · World Model"],
  ["技术报告", "美团技术团队", "复杂业务中的大模型评测体系", "从离线基准走向线上质量、成本和安全的多目标评估。", "Evaluation · LLM"],
  ["公众号", "梯度不陡", "为什么 Agent 的上下文工程比 Prompt 更重要", "一篇适合产品和工程团队共同阅读的实践性文章。", "Context · Agent"],
  ["新闻", "MIT Technology Review", "本周 AI 产业真正值得注意的三个变化", "避开融资数字和发布会噪音，观察能力、成本与应用边界。", "Industry · AI"],
] as const;

const filters = ["全部", "论文", "产品", "技术报告", "公众号", "会议", "开源", "新闻"];

export default function Home() {
  const [filter, setFilter] = useState("全部");
  const [query, setQuery] = useState("");
  const shown = useMemo(() => articles.filter(a => (filter === "全部" || a[0] === filter) && a.join(" ").toLowerCase().includes(query.toLowerCase())), [filter, query]);

  return <main>
    <header>
      <a className="logo" href="#">前沿周刊</a>
      <span>每周十篇，够了。</span>
      <label><span>⌕</span><input aria-label="搜索" value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索" /></label>
    </header>

    <section className="intro">
      <div className="edition">VOL. 036 · 09.07—09.13</div>
      <h1>这一周，值得读的<br/><em>十篇</em> AI 内容</h1>
      <p>论文、产品与一线实践。人工筛选，不追求多，只留下真正带来新认知的内容。</p>
    </section>

    <nav className="filters" aria-label="内容类型">
      {filters.map(item => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}
    </nav>

    <section className="list">
      <div className="list-head"><span>本周选择</span><span>{shown.length} / 10</span></div>
      {shown.map((article, index) => <article key={article[2]}>
        <div className="number">{String(index + 1).padStart(2, "0")}</div>
        <div className="article-main">
          <div className="meta"><b>{article[0]}</b><span>{article[1]}</span></div>
          <h2>{article[2]}</h2>
          <p>{article[3]}</p>
        </div>
        <div className="article-side"><span>{article[4]}</span><button aria-label={`阅读：${article[2]}`}>↗</button></div>
      </article>)}
      {!shown.length && <div className="empty">没有匹配结果。</div>}
    </section>

    <section className="source-note" id="sources">
      <div><span>信源</span><h2>少看信息流，<br/>多读原始来源。</h2></div>
      <p>持续关注 OpenAI、Anthropic、Google DeepMind、字节 Seed、通义千问、蚂蚁、腾讯技术工程、美团技术团队、REDtech、快手技术、京东技术与「梯度不陡」等一线来源。</p>
    </section>

    <footer><b>前沿周刊</b><span>为好奇心旺盛的人，维护一份克制的信息流。</span><span>每周一更新</span></footer>
  </main>;
}
