"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";

const navItems = [
  { label: "ホーム",       href: "#home" },
  { label: "スキル",       href: "#skills" },
  { label: "実績",         href: "#projects" },
  { label: "プロフィール", href: "#about" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Header() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted,       setMounted]       = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "skills", "projects", "about", "contact"];
      const reversed = [...sections].reverse();
      for (const id of reversed) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-sky-100/50 py-0"
          : "bg-transparent py-1"
      } ${mounted ? "animate-fade-in-down" : "opacity-0"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ロゴ */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-sky-300/60 group-hover:rotate-6">
              <Code2 className="w-5 h-5 text-white" />
              {/* リップル */}
              <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-gradient font-black text-lg tracking-tight">
                村上 渉
              </span>
              <span
                className={`text-[10px] font-medium tracking-widest transition-colors duration-300 ${
                  scrolled ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Full-Stack Engineer
              </span>
            </div>
          </button>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => {
              const id       = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 group ${
                    isActive
                      ? "text-sky-600"
                      : "text-gray-600 hover:text-sky-600"
                  }`}
                >
                  {/* アクティブ背景 */}
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-sky-50 scale-100" : "bg-sky-50 scale-0 group-hover:scale-100"
                    }`}
                  />
                  {/* アクティブインジケーター */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick("#contact")}
              className="ml-4 px-5 py-2.5 btn-primary text-white text-sm font-bold rounded-xl shadow-md shadow-sky-200/70"
            >
              <span>無料相談する</span>
            </button>
          </nav>

          {/* モバイルハンバーガー */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-sky-50 hover:text-sky-600 transition-all duration-200"
            aria-label="メニューを開く"
          >
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-180 opacity-100" : "rotate-0 opacity-0 pointer-events-none"
              }`}
            >
              <X className="w-5 h-5" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <Menu className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* モバイルドロワー */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden ${
          isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        } bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl`}
      >
        <nav className="px-4 py-5 flex flex-col gap-1.5">
          {navItems.map((item, i) => {
            const id       = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isOpen ? 1 : 0,
                }}
                className={`px-4 py-3 rounded-xl text-sm font-medium text-left flex items-center gap-3 transition-all duration-300 ${
                  isActive
                    ? "bg-sky-50 text-sky-600"
                    : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                )}
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick("#contact")}
            className="mt-2 px-4 py-3.5 btn-primary text-white text-sm font-bold rounded-xl text-center"
          >
            <span>無料相談する</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
