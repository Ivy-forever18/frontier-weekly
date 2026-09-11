"use client";

import { FormEvent, useMemo, useState } from "react";

type Article = { type:string; source:string; title:string; hook:string; gain:string; time:string; url:string };
const articles: Article[] = [
  {type:"论文",source:"Anthropic Research",title:"Agent 的长程规划，正在从“想更多”转向“记得更好”",hook:"上下文越来越长，但真正该留下的只有决策。新的记忆压缩方法，正在改变 Agent 完成长任务的方式。",gain:"搞懂 Agent Memory 的核心矛盾",time:"8 分钟",url:"#"},
  {type:"产品",source:"OpenAI",title:"Computer Use 进入真实工作流：这次不只是演示",hook:"跨应用协作终于有了生产化的样子。真正的胜负手，是可靠性、权限边界与随时可接管。",gain:"判断一个 Agent 能不能真的干活",time:"6 分钟",url:"#"},
  {type:"技术报告",source:"腾讯技术工程",title:"多 Agent 从 Demo 到生产，最容易踩的三个坑",hook:"任务调度、过程观测、结果评测——一线团队把最费钱的教训摊开讲了。",gain:"少走一次昂贵的工程弯路",time:"12 分钟",url:"#"},
  {type:"公众号",source:"机器之心",title:"7 篇新论文，把本周 AI 研究脉络串起来",hook:"推理、具身智能、世界模型与高效训练。不必逐篇啃，先用一篇建立全局坐标。",gain:"20 分钟补齐一周研究进展",time:"10 分钟",url:"#"},
  {type:"开源",source:"字节 · Seed",title:"视觉语言模型推理，又轻了一大截",hook:"端侧也能跑、批量更划算。比起参数规模，这次的吞吐提升更值得开发者关注。",gain:"找到 VLM 落地的新选择",time:"5 分钟",url:"#"},
  {type:"会议",source:"NeurIPS",title:"准备投 NeurIPS？今年这几个变化别错过",hook:"重要日期、主题变化、准备清单一次讲清。越早知道，越少在截止日前通宵。",gain:"拿走一份可执行投稿清单",time:"4 分钟",url:"#"},
  {type:"论文",source:"Google DeepMind",title:"机器人如何“预见”下一步：世界模型的新答案",hook:"先在脑中模拟，再真的动手。视觉预测与动作规划结合后，陌生场景也不再完全陌生。",gain:"看懂 World Model 为什么又火了",time:"9 分钟",url:"#"},
  {type:"技术报告",source:"美团技术团队",title:"别再只看准确率：大模型评测正在换尺子",hook:"线上质量、成本与安全必须一起算。复杂业务里的模型评测，比排行榜现实得多。",gain:"搭出更靠谱的评测框架",time:"11 分钟",url:"#"},
  {type:"公众号",source:"梯度不陡",title:"Prompt 不够用了，现在更重要的是上下文工程",hook:"好 Agent 不是一句神奇指令，而是把正确的信息在正确的时机送进去。",gain:"升级你的 Agent 构建思路",time:"7 分钟",url:"#"},
  {type:"新闻",source:"MIT Technology Review",title:"穿过发布会噪音，本周真正改变行业的三件事",hook:"不聊热搜和融资数字，只看能力、成本与应用边界发生了什么实质变化。",gain:"建立自己的 AI 趋势判断",time:"6 分钟",url:"#"},
];
const filters = ["全部", "Agent", "论文", "产品", "工程实践", "公众号"];

export default function Home() {
  const [filter,setFilter]=useState("全部");
  const [open,setOpen]=useState(false);
  const [status,setStatus]=useState<"idle"|"sending"|"done"|"duplicate"|"error">("idle");
  const shown=useMemo(()=>articles.filter(a=>filter==="全部"||(filter==="Agent"&&`${a.title}${a.hook}`.includes("Agent"))||(filter==="工程实践"&&a.type==="技术报告")||a.type===filter),[filter]);
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setStatus("sending");const data=new FormData(e.currentTarget);const res=await fetch("/api/submissions",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({url:data.get("url"),note:data.get("note")})});if(res.ok){setStatus("done");e.currentTarget.reset()}else if(res.status===409)setStatus("duplicate");else setStatus("error")}
  return <main>
    <header><a className="logo" href="#"><i>F</i><span>前沿周刊</span></a><nav><a href="#weekly">本周必看</a><a href="#sources">信源</a></nav><button className="submit-top" onClick={()=>setOpen(true)}>投递一篇 <span>↗</span></button></header>
    <section className="hero"><div className="kicker"><span>WEEK 36</span><b>SEP 07—13</b></div><div className="hero-grid"><div><h1>少刷两小时，<br/>看懂这一周的 <em>AI</em></h1><p>我们从几百条信息里，挑出真正与你有关的 10 篇。<br/>每一篇都值得点开，每一篇都让你有所得。</p></div><aside><strong>10</strong><span>篇精选</span><i></i><p>研究突破 · 产品更新<br/>Agent · 工程实践</p></aside></div><div className="pulse"><b>本周一句话</b><p>Agent 的竞争，正在从“谁更聪明”转向“谁能更稳定地把事做完”。</p></div></section>
    <section className="weekly" id="weekly"><div className="section-title"><div><span>THIS WEEK</span><h2>本周必看的 10 篇</h2></div><p>替你读过，才敢推荐。</p></div><nav className="filters">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?"active":""}>{f}</button>)}</nav><div className="article-list">{shown.map((a,i)=><article key={a.title}><div className="rank">{String(i+1).padStart(2,"0")}</div><div className="story"><div className="meta"><b>{a.type}</b><span>{a.source}</span><span>·</span><span>{a.time}</span></div><h3>{a.title}</h3><p>{a.hook}</p><div className="gain"><span>读完你会</span><b>{a.gain}</b></div></div><a className="go" href={a.url} aria-label={`阅读 ${a.title}`}>↗</a></article>)}</div></section>
    <section className="submit-band" id="sources"><div><span>YOU FOUND SOMETHING?</span><h2>看到好文章，<br/>别让它沉下去。</h2></div><div><p>把公众号、论文或技术文章的链接投进来。我们会检查来源、合并重复内容，再从中选出真正值得读的十篇。</p><button onClick={()=>setOpen(true)}>投递本周线索 <span>→</span></button></div></section>
    <footer><div className="logo"><i>F</i><span>前沿周刊</span></div><p>不是更多信息，是更好的判断。</p><span>每周一更新 · 10 篇刚刚好</span></footer>
    {open&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="submit-title"><button className="close" onClick={()=>setOpen(false)} aria-label="关闭">×</button>{status==="done"?<div className="success"><i>✓</i><h2>收到，放进候选池了</h2><p>我们会检查重复内容，并在本周筛选时认真读它。</p><button onClick={()=>setStatus("idle")}>再投一篇</button></div>:<><span className="modal-kicker">SUBMIT A LINK</span><h2 id="submit-title">投递一篇好内容</h2><p>公众号、论文、博客都可以。链接相同的内容只会保留一次。</p><form onSubmit={submit}><label>文章链接<input name="url" type="url" required placeholder="https://mp.weixin.qq.com/s/..." /></label><label>为什么值得读 <small>选填</small><textarea name="note" maxLength={300} placeholder="一句话告诉我，你为什么推荐它" /></label><button disabled={status==="sending"}>{status==="sending"?"正在投递…":"放进候选池 →"}</button>{status==="duplicate"&&<p className="form-error">这篇已经有人投过了，不必重复。</p>}{status==="error"&&<p className="form-error">暂时没有投递成功，请稍后再试。</p>}</form></>}</section></div>}
  </main>
}
