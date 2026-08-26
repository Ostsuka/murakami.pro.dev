import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "村上​ 渉 | フルスタックエンジニア ポートフォリオ",
  description:
    "村上​ 渉のポートフォリオサイト。React・Next.js・Node.js・TypeScriptを中心としたフルスタック開発。企画から設計・開発・運用までワンストップで対応します。",
  keywords: [
    "村上​ 渉",
    "フルスタックエンジニア",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "MongoDB",
    "ポートフォリオ",
    "福島県",
    "郡山市",
  ],
  openGraph: {
    title: "村上​ 渉 | フルスタックエンジニア ポートフォリオ",
    description:
      "アイデアをカタチに、ビジネスを加速する。フルスタック開発で価値あるプロダクトを共に創り上げます。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${notoSansJP.className} antialiased`}>{children}</body>
    </html>
  );
}
