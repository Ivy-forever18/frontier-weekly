import { env } from "cloudflare:workers";

const schema = `CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL UNIQUE,
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

function normalizeUrl(input: string) {
  const url = new URL(input.trim());
  url.hash = "";
  if (url.hostname === "mp.weixin.qq.com") {
    for (const key of [...url.searchParams.keys()]) {
      if (!["__biz", "mid", "idx", "sn"].includes(key)) url.searchParams.delete(key);
    }
  }
  return url.toString();
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { url?: string; note?: string };
    if (!body.url) return Response.json({ error: "请提供文章链接" }, { status: 400 });
    const url = normalizeUrl(body.url);
    if (!/^https?:$/.test(new URL(url).protocol)) return Response.json({ error: "链接格式不正确" }, { status: 400 });
    await env.DB.prepare(schema).run();
    await env.DB.prepare("INSERT INTO submissions (url, note) VALUES (?, ?)").bind(url, body.note?.trim().slice(0, 300) ?? "").run();
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNIQUE constraint failed")) return Response.json({ error: "duplicate" }, { status: 409 });
    return Response.json({ error: "投递失败" }, { status: 500 });
  }
}
