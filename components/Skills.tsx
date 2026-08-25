"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "フロントエンド",
    icon: "🖥",
    color: "from-sky-500 to-cyan-400",
    lightColor: "bg-sky-50",
    borderColor: "border-sky-200",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript",      level: 92 },
      { name: "Tailwind CSS",    level: 90 },
      { name: "Figma / UI設計",  level: 80 },
    ],
  },
  {
    title: "バックエンド",
    icon: "⚙️",
    color: "from-indigo-500 to-purple-400",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    skills: [
      { name: "Node.js / Express", level: 93 },
      { name: "REST API 設計",     level: 95 },
      { name: "GraphQL",           level: 78 },
      { name: "Python / Django",   level: 72 },
    ],
  },
  {
    title: "データベース",
    icon: "🗄",
    color: "from-emerald-500 to-teal-400",
    lightColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    skills: [
      { name: "MongoDB",    level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL",      level: 82 },
      { name: "Redis",      level: 70 },
    ],
  },
  {
    title: "インフラ / クラウド",
    icon: "☁️",
    color: "from-orange-500 to-amber-400",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200",
    skills: [
      { name: "AWS (EC2/S3/Lambda)", level: 85 },
      { name: "Vercel / Netlify",    level: 92 },
      { name: "Docker",              level: 80 },
      { name: "CI/CD (GitHub Actions)", level: 83 },
    ],
  },
];

const techStack = [
  { name: "React",      logo: "⚛",  color: "text-cyan-600   bg-cyan-50   border-cyan-200" },
  { name: "Next.js",    logo: "▲",  color: "text-gray-700   bg-gray-50   border-gray-300" },
  { name: "TypeScript", logo: "TS", color: "text-blue-600   bg-blue-50   border-blue-200" },
  { name: "Node.js",    logo: "⬡",  color: "text-green-600  bg-green-50  border-green-200" },
  { name: "MongoDB",    logo: "🍃", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { name: "AWS",        logo: "☁",  color: "text-orange-600 bg-orange-50 border-orange-200" },
  { name: "Docker",     logo: "🐳", color: "text-sky-600    bg-sky-50    border-sky-200" },
  { name: "Tailwind",   logo: "~",  color: "text-teal-600   bg-teal-50   border-teal-200" },
  { name: "GraphQL",    logo: "◈",  color: "text-pink-600   bg-pink-50   border-pink-200" },
  { name: "PostgreSQL", logo: "🐘", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { name: "Figma",      logo: "✦",  color: "text-purple-600 bg-purple-50 border-purple-200" },
  { name: "Git",        logo: "⎇",  color: "text-red-600    bg-red-50    border-red-200" },
];

function SkillBar({
  name, level, color, animate, delay = 0,
}: {
  name: string; level: number; color: string; animate: boolean; delay?: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span
          className="text-sm font-bold text-gray-500 tabular-nums"
          style={{
            opacity:    animate ? 1 : 0,
            transition: `opacity 0.4s ease ${delay + 0.8}s`,
          }}
        >
          {level}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} skill-bar-fill relative overflow-hidden`}
          style={{ width: animate ? `${level}%` : "0%", transitionDelay: `${delay}s` }}
        >
          {/* シマー */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              transform:  animate ? "translateX(100%)" : "translateX(-100%)",
              transition: `transform 1.2s ease ${delay + 1.2}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [animate,  setAnimate]  = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVis, setHeaderVis] = useState(false);
  const [cardsVis,  setCardsVis]  = useState(false);
  const [badgesVis, setBadgesVis] = useState(false);
  const [statsVis,  setStatsVis]  = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const makeObs = (
      ref: React.RefObject<HTMLDivElement | null>,
      setter: (v: boolean) => void,
      threshold = 0.15
    ) => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold }
      );
      if (ref.current) obs.observe(ref.current);
      return obs;
    };

    const o1 = makeObs(headerRef as React.RefObject<HTMLDivElement>, setHeaderVis);
    const o2 = makeObs(cardsRef  as React.RefObject<HTMLDivElement>, setCardsVis, 0.05);
    const o3 = makeObs(badgesRef as React.RefObject<HTMLDivElement>, setBadgesVis);
    const o4 = makeObs(statsRef  as React.RefObject<HTMLDivElement>, setStatsVis);

    const skillObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) skillObs.observe(sectionRef.current);

    return () => {
      o1.disconnect(); o2.disconnect(); o3.disconnect(); o4.disconnect();
      skillObs.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* セクションヘッダー */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity:    headerVis ? 1 : 0,
            transform:  headerVis ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-xs font-semibold text-sky-600 tracking-wide">SKILLS & TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 section-title-line">
            スキル・技術スタック
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-relaxed">
            5年以上の経験で培った幅広い技術力。フロントエンドからインフラまで、フルスタックで対応します。
          </p>
        </div>

        {/* スキルカード グリッド */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`rounded-2xl border ${cat.borderColor} ${cat.lightColor} p-6 card-hover card-shine`}
              style={{
                opacity:    cardsVis ? 1 : 0,
                transform:  cardsVis ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
                transition: `opacity 0.7s ease ${ci * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${ci * 0.12}s`,
              }}
            >
              {/* カテゴリヘッダー */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-md`}
                  style={{ animation: cardsVis ? `float ${3 + ci * 0.5}s ease-in-out ${ci * 0.3}s infinite` : "none" }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{cat.title}</h3>
              </div>
              {/* スキルバー */}
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  animate={animate}
                  delay={ci * 0.1 + si * 0.12}
                />
              ))}
            </div>
          ))}
        </div>

        {/* テクノロジーバッジ群 */}
        <div
          ref={badgesRef}
          className="bg-gradient-to-br from-gray-50 to-sky-50 rounded-3xl p-8 border border-gray-100"
          style={{
            opacity:    badgesVis ? 1 : 0,
            transform:  badgesVis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
            使用技術 一覧
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <div
                key={tech.name}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${tech.color} card-hover cursor-default`}
                style={{
                  opacity:    badgesVis ? 1 : 0,
                  transform:  badgesVis ? "scale(1)" : "scale(0.8)",
                  transition: `opacity 0.5s ease ${0.05 * i}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.05 * i}s`,
                }}
              >
                <span className="text-base">{tech.logo}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 実績ハイライト */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {[
            { value: "50+",   label: "完了プロジェクト", icon: "🚀" },
            { value: "5年+",  label: "開発経験",         icon: "💼" },
            { value: "30+",   label: "クライアント",      icon: "🤝" },
            { value: "99.9%", label: "稼働率達成",        icon: "⚡" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center card-hover"
              style={{
                opacity:    statsVis ? 1 : 0,
                transform:  statsVis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.92)",
                transition: `opacity 0.6s ease ${0.1 * i}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 * i}s`,
              }}
            >
              <div className="text-2xl mb-2 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                {item.icon}
              </div>
              <div className="text-2xl font-black text-gradient">{item.value}</div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
