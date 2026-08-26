"use client";

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";

const timeline = [
  {
    year: "2019",
    title: "プログラミング学習開始",
    desc: "独学でHTML/CSS/JavaScriptを習得。Web開発の面白さに目覚め、フルスタックへの道を歩み始める。",
    color: "bg-sky-500",
  },
  {
    year: "2020",
    title: "React / Node.js を本格習得",
    desc: "React・Node.jsのエコシステムを深く学習。個人プロジェクトでフロントからバックエンドまで一気通貫で開発するスタイルを確立。",
    color: "bg-indigo-500",
  },
  {
    year: "2021",
    title: "フリーランスとして活動開始",
    desc: "副業・フリーランス案件を受注開始。LP制作・Webアプリ開発など小規模案件から実績を積み上げる。",
    color: "bg-purple-500",
  },
  {
    year: "2022",
    title: "クラウド・インフラ領域へ拡大",
    desc: "AWSを活用したインフラ設計・CI/CDパイプライン構築を習得。真のフルスタックエンジニアへシフト。",
    color: "bg-emerald-500",
  },
  {
    year: "2023",
    title: "AI / LLM 統合開発に注力",
    desc: "OpenAI API・Langchainを活用したAI機能の組み込み開発を多数手がける。プロダクトへのAI実装が主力領域に。",
    color: "bg-amber-500",
  },
  {
    year: "2024〜",
    title: "現在：スタートアップ〜中規模企業を幅広く支援",
    desc: "50社以上との取引実績。アイデア段階のスタートアップから既存システム改修まで、あらゆるフェーズのプロダクト開発を支援中。",
    color: "bg-gradient-to-r from-sky-500 to-indigo-500",
  },
];

const values = [
  {
    icon: "🎯",
    title: "ビジネス視点のエンジニアリング",
    desc: "技術だけでなく、ビジネスの課題・目標を深く理解した上で最適な解を提案します。",
    gradient: "from-sky-50 to-cyan-50",
    border: "border-sky-100",
  },
  {
    icon: "⚡",
    title: "スピードと品質を両立",
    desc: "アジャイルな開発スタイルで、速く・確実にプロダクトを届けます。",
    gradient: "from-indigo-50 to-purple-50",
    border: "border-indigo-100",
  },
  {
    icon: "🔒",
    title: "セキュリティファースト",
    desc: "設計段階からセキュリティを考慮。安心して運用できるシステムを構築します。",
    gradient: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
  },
  {
    icon: "🤝",
    title: "長期パートナーとして",
    desc: "単発の開発で終わらず、運用・改善フェーズも含めた長期的なパートナーシップを大切にします。",
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-100",
  },
];

function useReveal() {
  const ref  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export default function About() {
  const header  = useReveal();
  const left    = useReveal();
  const right   = useReveal();

  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* セクションヘッダー */}
        <div
          ref={header.ref}
          className="text-center mb-16"
          style={{
            opacity:    header.visible ? 1 : 0,
            transform:  header.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 tracking-wide">ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 section-title-line">
            プロフィール
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-relaxed">
            5年以上のフルスタック開発経験をもとに、アイデアを価値あるプロダクトへ変換します。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* 左：プロフィールカード + バリュー */}
          <div
            ref={left.ref}
            style={{
              opacity:    left.visible ? 1 : 0,
              transform:  left.visible ? "translateX(0)" : "translateX(-60px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* プロフィールカード */}
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-3xl p-8 border border-sky-100 mb-8 card-shine shadow-sm hover:shadow-xl transition-shadow duration-500">
              <div className="flex items-start gap-5">
                {/* アバター */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-3xl shadow-lg animate-pulse-glow">
                    👨‍💻
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-800">村上​ 渉</h3>
                  <p className="text-sky-600 font-semibold text-sm mt-0.5">
                    フルスタックエンジニア / Full-Stack Developer
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["福島県郡山市在住", "フリーランス", "即日対応可"].map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200 shadow-sm hover:border-sky-300 hover:text-sky-600 transition-colors duration-200"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mt-6">
                1997年6月16日生まれ、福島県郡山市在住。独学でプログラミングを習得後、フルスタックエンジニアとして独立。
                React・Next.js・Node.jsを中心としたモダンな開発が得意領域です。
                「技術でビジネスを前進させる」をモットーに、スタートアップから中規模企業まで50社以上のプロダクト開発を支援してきました。
              </p>

              <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <a
                  href="mailto:gold77chi11@gmail.com"
                  className="hover:text-sky-600 transition-colors break-all"
                >
                  gold77chi11@gmail.com
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { value: "5年+", label: "経験年数" },
                  { value: "50+",  label: "支援企業" },
                  { value: "98%",  label: "継続率" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                    style={{
                      opacity:    left.visible ? 1 : 0,
                      transform:  left.visible ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.6s ease ${0.6 + i * 0.1}s, transform 0.6s ease ${0.6 + i * 0.1}s`,
                    }}
                  >
                    <div className="text-xl font-black text-gradient">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* バリューカード */}
            <div className="grid grid-cols-2 gap-3">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className={`bg-gradient-to-br ${v.gradient} rounded-2xl p-4 border ${v.border} card-hover card-shine`}
                  style={{
                    opacity:    left.visible ? 1 : 0,
                    transform:  left.visible ? "scale(1)" : "scale(0.9)",
                    transition: `opacity 0.6s ease ${0.8 + i * 0.1}s, transform 0.6s ease ${0.8 + i * 0.1}s`,
                  }}
                >
                  <span className="text-2xl mb-2 block animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                    {v.icon}
                  </span>
                  <h4 className="text-xs font-bold text-gray-800 mb-1 leading-tight">{v.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 右：タイムライン */}
          <div
            ref={right.ref}
            style={{
              opacity:    right.visible ? 1 : 0,
              transform:  right.visible ? "translateX(0)" : "translateX(60px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
            }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-sky-500 to-indigo-500 block" />
              キャリア年表
            </h3>
            <div className="relative pl-10">
              {/* 縦ライン */}
              <div className="timeline-line" />

              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative mb-8 last:mb-0"
                  style={{
                    opacity:    right.visible ? 1 : 0,
                    transform:  right.visible ? "translateX(0)" : "translateX(30px)",
                    transition: `opacity 0.65s ease ${0.3 + i * 0.12}s, transform 0.65s ease ${0.3 + i * 0.12}s`,
                  }}
                >
                  {/* ドット */}
                  <div
                    className={`absolute -left-10 top-1 w-5 h-5 rounded-full ${item.color} border-2 border-white shadow-md flex items-center justify-center`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm card-hover">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
