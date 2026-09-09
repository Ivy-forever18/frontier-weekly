"use client";

import { useMemo, useState } from "react";

const items = [
  { type: "论文", source: "Anthropic Research", time: "2 小时前", title: "Agent 的长程规划，正在从“思考更多”转向“记住更好”", summary: "新的记忆压缩方法让 Agent 在长任务里保留关键决策，同时显著降低上下文成本。", tags: ["Agent", "Memory"], heat: 98, read: "8 min", accent: "violet" },
  { type: "产品", source: "OpenAI", time: "4 小时前", title: "面向真实工作的计算机使用 Agent：一次重要的能力边界更新", summary: "从浏览器操作走向跨应用协作，重点不只是基准分数，而是可靠性与人工接管。", tags: ["Agent", "Product"], heat: 96, read: "6 min", accent: "orange" },
  { type: "技术报告", source: "腾讯技术工程", time: "昨天", title: "大规模 Agent 系统的工程实践：调度、观测与评测", summary: "一线团队拆解多 Agent 系统从 Demo 到生产的三个关键瓶颈。", tags: ["Infra", "Agent"], heat: 91, read: "12 min", accent: "blue" },
  { type: "公众号", source: "机器之心", time: "昨天", title: "本周值得关注的 7 篇 AI 论文，我们替你读完了", summary: "覆盖推理、具身智能、世界模型和高效训练，附论文与代码入口。", tags: ["Weekly", "Paper"], heat: 88, read: "10 min", accent: "green" },
  { type: "开源", source: "字节 · Seed", time: "2 天前", title: "一个更轻、更快的视觉语言模型推理框架", summary: "面向端侧与批量推理优化，首批评测展示了明显的吞吐提升。", tags: ["VLM", "Open Source"], heat: 84, read: "5 min", accent: "pink" },
  { type: "会议", source: "NeurIPS 2026", time: "3 天前", title: "NeurIPS 2026 投稿时间线与 Call for Papers", summary: "重要日期、主题变化与投稿准备清单，一页看清。", tags: ["Conference", "Deadline"], heat: 79, read: "3 min", accent: "yellow" },
];

const filters = ["全部", "论文", "新闻", "产品", "技术报告", "公众号", "会议", "开源"];
const topics = ["Agent", "LLM", "多模态", "推理", "机器人", "AI Infra"];

export default function Home() {
  const [filter, setFilter] = useState("全部");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [digest, setDigest] = useState(false);
  const visible = useMemo(() => items.filter((item) => (filter === "全部" || item.type === filter) && `${item.title}${item.summary}${item.source}${item.tags.join("")}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">01</span><span>前沿周刊</span></a>
        <nav><a className="active" href="#latest">本周精选</a><a href="#sources">来源</a><a href="#about">关于</a></nav>
        <div className="header-actions"><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索论文、公司、关键词" /></label><button className="submit">＋ 提交线索</button></div>
      </header>

      <section className="hero" id="latest">
        <div className="issue"><span>WEEKLY INTELLIGENCE</span><i></i><span>VOL. 036</span></div>
        <h1>这一周，<em>AI</em> 又往前走了多远？</h1>
        <p>过滤噪音，只收集真正值得你花时间的论文、产品与一线技术实践。</p>
        <div className="week"><button aria-label="上一周">←</button><strong>09.07 — 09.13</strong><span>本周 · 已收录 47 条</span><button aria-label="下一周">→</button></div>
      </section>

      <div className="content-shell">
        <aside className="left-rail">
          <div className="side-label">内容类型</div>
          <div className="filters">{filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={filter === f ? "selected" : ""}><span>{f}</span><small>{f === "全部" ? 47 : Math.max(2, 14 - filters.indexOf(f))}</small></button>)}</div>
          <div className="side-label topic-label">关注主题</div>
          <div className="topic-list">{topics.map((t) => <button key={t} onClick={() => setQuery(t)}># {t}</button>)}</div>
          <div className="newsletter"><span>每周一封</span><h3>不错过真正重要的进展。</h3><button onClick={() => setDigest(!digest)}>{digest ? "✓ 已订阅" : "订阅周报 →"}</button></div>
        </aside>

        <section className="feed">
          <div className="section-head"><div><span className="eyebrow">EDITOR&apos;S PICK</span><h2>{filter === "全部" ? "本周最值得读" : filter}</h2></div><div className="sort">按热度排序 ↓</div></div>
          {visible.length ? visible.map((item, index) => (
            <article className="story" key={item.title}>
              <div className={`story-index ${item.accent}`}>{String(index + 1).padStart(2, "0")}</div>
              <div className="story-body">
                <div className="meta"><span className="type">{item.type}</span><span>{item.source}</span><i></i><span>{item.time}</span></div>
                <h3>{item.title}</h3><p>{item.summary}</p>
                <div className="story-foot"><div>{item.tags.map((tag) => <span key={tag}># {tag}</span>)}</div><span>阅读 {item.read}</span><span className="heat">↗ {item.heat}</span><button aria-label="收藏" onClick={() => setSaved(saved.includes(index) ? saved.filter((x) => x !== index) : [...saved, index])}>{saved.includes(index) ? "★" : "☆"}</button></div>
              </div>
            </article>
          )) : <div className="empty">没有找到匹配内容，换个关键词试试。</div>}
          <button className="more">查看本周全部 47 条 <span>↓</span></button>
        </section>

        <aside className="right-rail">
          <section className="radar"><div className="mini-head"><span>本周雷达</span><small>趋势热度</small></div>{[["Computer Use",92,"+38%"],["Agent Memory",82,"+24%"],["World Model",68,"+19%"],["Vibe Coding",54,"+12%"]].map(([name,val,growth]) => <div className="trend" key={name as string}><div><strong>{name}</strong><em>{growth}</em></div><div className="bar"><i style={{width:`${val}%`}}></i></div></div>)}</section>
          <section className="sources" id="sources"><div className="mini-head"><span>高频信源</span><a href="#">全部 42 个 →</a></div><div className="source-grid">{["OpenAI","ANT","字节跳动","腾讯","美团","QWEN","REDtech","梯度不陡"].map((s,i) => <div key={s}><b>{["◎","A","字","T","M","Q","R","∿"][i]}</b><span>{s}</span></div>)}</div></section>
          <section className="principle" id="about"><span>我们的筛选原则</span><p>新，不等于重要。热，不等于有用。</p><p>每条内容都经过人工判断：它是否带来新的认知、方法或可复用的实践。</p><a href="#">了解编辑标准 →</a></section>
        </aside>
      </div>

      <footer><span>前沿周刊 · FRONTIER WEEKLY</span><p>为好奇心旺盛的人，维护一份克制的 AI 信息流。</p><small>每周一更新 · 香港时间</small></footer>
    </main>
  );
}
