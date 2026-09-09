import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://frontier-ai-weekly.yuanforever18.chatgpt.site"),
  title: "前沿周刊｜一周 AI 精选",
  description: "过滤噪音，收集一周内真正值得读的 AI、CS 与 Agent 前沿内容。",
  openGraph: {
    title: "前沿周刊｜一周 AI 精选",
    description: "过滤噪音，只读重要进展。",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "前沿周刊｜一周 AI 精选",
    description: "过滤噪音，只读重要进展。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
