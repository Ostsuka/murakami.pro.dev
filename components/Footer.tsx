"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, GitBranch, X, Link, Mail } from "lucide-react";

const navLinks = [
  { label: "ホーム",       href: "#home" },
  { label: "スキル",       href: "#skills" },
  { label: "実績",         href: "#projects" },
  { label: "プロフィール", href: "#about" },
  { label: "お問い合わせ", href: "#contact" },
];

const socialLinks = [
  { icon: GitBranch, href: "https://github.com/murakami-kyo", label: "GitHub" },
  { icon: X,         href: "#",                               label: "X (Twitter)" },
  { icon: Link,      href: "#",                               label: "LinkedIn" },
  { icon: Mail,      href: "mailto:gold77chi11@gmail.com",    label: "Email" },
];

const techLinks = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "AWS"];

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVis, setCtaVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCtaVis(true); },
      { threshold: 0.2 }
    );
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 overflow-hidden">

      {/* CTA バナー */}
      <div
        ref={ctaRef}
        className="relative bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 animate-gradient-shift overflow-hidden"
      >
        {/* 装飾円 */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 animate-morph" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-white/5 animate-morph" style={{ animationDelay: "3s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div
            style={{
              opacity:    ctaVis ? 1 : 0,
              transform:  ctaVis ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              プロジェクトのご相談、お気軽に
            </h2>
            <p className="text-sky-100 mb-7 text-sm">
              無料相談・お見積りはいつでも受け付けています
            </p>
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-sm shadow-lg"
            >
              無料で相談する →
            </button>
          </div>
        </div>
      </div>

      {/* フッターメイン */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* ブランド */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center animate-pulse-glow">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg text-sky-400">村上 協</span>
                <span className="text-[10px] text-gray-500 tracking-widest mt-0.5">Full-Stack Engineer</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-gray-400">
              アイデアをカタチに、ビジネスを加速する。フルスタック開発で、企画から運用までワンストップでサポートします。
            </p>

            {/* ソーシャルリンク */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/50 transition-all duration-300 text-gray-400"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ナビゲーション */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-sky-500 rounded-full" />
              ナビゲーション
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-sky-400 hover:pl-2 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 技術スタック */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-indigo-500 rounded-full" />
              技術スタック
            </h4>
            <div className="flex flex-wrap gap-2">
              {techLinks.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-gray-800 rounded-lg text-xs font-medium hover:bg-sky-900/60 hover:text-sky-300 transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ボトムライン */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} 村上 渉. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            <a href="#" className="hover:text-sky-400 transition-colors duration-200">プライバシーポリシー</a>
            <a href="#" className="hover:text-sky-400 transition-colors duration-200">利用規約</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
