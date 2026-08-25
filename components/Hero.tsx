"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";

const TechBadge = ({ name, color }: { name: string; color: string }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${color} backdrop-blur-sm
      hover:scale-105 hover:shadow-md transition-all duration-200 cursor-default`}
  >
    {name}
  </span>
);

const slides = [
  {
    id: 0,
    image: "/hero-slide-1.jpg",
    badge: "ビジネス支援",
    heading1: "アイデアをカタチに、",
    heading2: "ビジネスを加速する。",
    description:
      "フルスタック開発で、企画・設計から開発・運用までワンストップで変革。価値あるプロダクトを共に創り上げます。",
    techs: [
      { name: "React",      color: "bg-white/80 text-cyan-700 border-cyan-200" },
      { name: "Next.js",    color: "bg-white/80 text-gray-700 border-gray-300" },
      { name: "Node.js",    color: "bg-white/80 text-green-700 border-green-200" },
      { name: "TypeScript", color: "bg-white/80 text-blue-700 border-blue-200" },
      { name: "MongoDB",    color: "bg-white/80 text-emerald-700 border-emerald-200" },
    ],
    accent: "from-sky-400 to-cyan-300",
    stats: [
      { value: "50+",  label: "プロジェクト完了" },
      { value: "98%",  label: "顧客満足度" },
      { value: "5年+", label: "開発経験" },
    ],
  },
  {
    id: 1,
    image: "/hero-slide-2.jpg",
    badge: "フルスタック開発",
    heading1: "技術で未来を創る、",
    heading2: "フルスタック開発。",
    description:
      "フロントエンドからバックエンド、インフラまで一貫した開発で、安定性・拡張性の高いシステムを構築します。",
    techs: [
      { name: "React",      color: "bg-white/80 text-cyan-700 border-cyan-200" },
      { name: "Next.js",    color: "bg-white/80 text-gray-700 border-gray-300" },
      { name: "Node.js",    color: "bg-white/80 text-green-700 border-green-200" },
      { name: "TypeScript", color: "bg-white/80 text-blue-700 border-blue-200" },
      { name: "AWS",        color: "bg-white/80 text-orange-700 border-orange-200" },
    ],
    accent: "from-indigo-400 to-purple-300",
    stats: [
      { value: "99.9%", label: "稼働率" },
      { value: "3倍",   label: "開発速度向上" },
      { value: "AWS",   label: "認定資格保持" },
    ],
  },
  {
    id: 2,
    image: "/hero-slide-3.jpg",
    badge: "UI/UX デザイン",
    heading1: "ユーザー体験を最大化する、",
    heading2: "美しく、使いやすいWebを。",
    description:
      "デザイン性と機能性を兼ね備えたUI/UXを実現。あらゆるデバイスで最適な体験を提供します。",
    techs: [
      { name: "React",        color: "bg-white/80 text-cyan-700 border-cyan-200" },
      { name: "Next.js",      color: "bg-white/80 text-gray-700 border-gray-300" },
      { name: "Tailwind CSS", color: "bg-white/80 text-teal-700 border-teal-200" },
      { name: "Figma",        color: "bg-white/80 text-pink-700 border-pink-200" },
      { name: "Vercel",       color: "bg-white/80 text-gray-700 border-gray-300" },
    ],
    accent: "from-teal-400 to-green-300",
    stats: [
      { value: "2倍",  label: "CVR向上実績" },
      { value: "100+", label: "画面設計経験" },
      { value: "全",   label: "デバイス対応" },
    ],
  },
];

/* カウントアップ用フック */
function useCountUp(target: number, duration = 1500, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return value;
}

function StatItem({
  stat,
  active,
  index,
}: {
  stat: { value: string; label: string };
  active: boolean;
  index: number;
}) {
  const numericPart = parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix      = stat.value.replace(/[0-9]/g, "");
  const counted     = useCountUp(numericPart, 1200, active);

  return (
    <div
      className="text-center"
      style={{
        opacity:    active ? 1 : 0,
        transform:  active ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${0.3 + index * 0.12}s, transform 0.6s ease ${0.3 + index * 0.12}s`,
      }}
    >
      <div className="text-2xl sm:text-3xl font-black text-gradient">
        {numericPart > 0 ? `${counted}${suffix}` : stat.value}
      </div>
      <div className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const [current,     setCurrent]     = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [statsActive, setStatsActive] = useState(true);
  const textKey = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setStatsActive(false);
      setTimeout(() => {
        setCurrent(index);
        textKey.current += 1;
        setTimeout(() => setStatsActive(true), 100);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden pt-16">

      {/* 背景スライド */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{
            opacity:    i === current ? 1 : 0,
            transition: "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex:     i === current ? 1 : 0,
          }}
        >
          <Image
            src={s.image}
            alt={s.heading1 + s.heading2}
            fill
            priority={i === 0}
            className="object-cover object-center scale-105"
            style={{
              transform:  i === current ? "scale(1.0)" : "scale(1.08)",
              transition: "transform 6s ease-out",
            }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/65 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/25" />
        </div>
      ))}

      {/* デコレーション粒子 */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sky-400/20 blur-sm"
            style={{
              width:             `${12 + i * 8}px`,
              height:            `${12 + i * 8}px`,
              top:               `${15 + i * 12}%`,
              right:             `${5 + i * 7}%`,
              animationName:     "particle-drift",
              animationDuration: `${3 + i * 1.2}s`,
              animationDelay:    `${i * 0.4}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[calc(100vh-64px)] py-16">
          <div
            key={textKey.current}
            className="w-full max-w-xl"
            style={{
              opacity:    isAnimating ? 0 : 1,
              transform:  isAnimating ? "translateY(24px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {/* バッジ */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-sm border border-sky-100 shadow-sm mb-6"
              style={{ animation: "fadeInDown 0.6s ease 0.1s both" }}
            >
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${slide.accent} animate-pulse`} />
              <span className="text-xs font-semibold text-gray-600 tracking-wide">
                {slide.badge}
              </span>
            </div>

            {/* 見出し */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 leading-tight mb-2"
              style={{ animation: "fadeInUp 0.7s ease 0.2s both" }}
            >
              {slide.heading1}
            </h1>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient leading-tight mb-6"
              style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
            >
              {slide.heading2}
            </h2>

            {/* 説明文 */}
            <p
              className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8 max-w-lg"
              style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}
            >
              {slide.description}
            </p>

            {/* 技術スタック */}
            <div
              className="flex flex-wrap gap-2 mb-8"
              style={{ animation: "fadeInUp 0.7s ease 0.5s both" }}
            >
              {slide.techs.map((tech, i) => (
                <div
                  key={tech.name}
                  style={{ animationDelay: `${0.55 + i * 0.06}s`, animation: "scaleIn 0.5s ease both" }}
                >
                  <TechBadge {...tech} />
                </div>
              ))}
            </div>

            {/* 統計 */}
            <div className="flex gap-6 sm:gap-10 mb-10">
              {slide.stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} active={statsActive} index={i} />
              ))}
            </div>

            {/* CTAボタン */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ animation: "fadeInUp 0.7s ease 0.75s both" }}
            >
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary px-8 py-4 text-white font-bold rounded-xl shadow-lg shadow-sky-200 text-sm"
              >
                <span>無料で相談する →</span>
              </button>
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-white/85 backdrop-blur-sm text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-sky-300 hover:text-sky-600 hover:-translate-y-0.5 transition-all duration-250 text-sm shadow-sm"
              >
                実績を見る
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* スライドコントロール */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-gray-200 shadow-sm flex items-center justify-center hover:bg-white hover:border-sky-300 hover:scale-110 transition-all duration-200"
          aria-label="前のスライド"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-400 rounded-full ${
                i === current
                  ? "w-8 h-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sm shadow-sky-300"
                  : "w-2.5 h-2.5 bg-white/60 hover:bg-sky-300 hover:scale-125"
              }`}
              aria-label={`スライド ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-gray-200 shadow-sm flex items-center justify-center hover:bg-white hover:border-sky-300 hover:scale-110 transition-all duration-200"
          aria-label="次のスライド"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* スクロールダウンヒント */}
      <div
        className="absolute bottom-10 right-8 z-10 hidden lg:flex flex-col items-center gap-2 opacity-70"
        style={{ animation: "fadeInUp 1s ease 1.2s both" }}
      >
        <span className="text-[10px] font-semibold text-gray-500 tracking-widest rotate-90 mb-2">
          SCROLL
        </span>
        <ArrowDown className="w-4 h-4 text-sky-500 animate-bounce" />
      </div>
    </section>
  );
}
