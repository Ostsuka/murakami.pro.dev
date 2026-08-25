"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, GitBranch, Tag, X, Star, GitFork, Code2, Eye } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techs: string[];
  results: { label: string; value: string }[];
  color: string;
  accent: string;
  emoji: string;
  tag: string;
  image: string;       // Unsplash 画像URL
  imageAlt: string;
  githubUrl: string;
  githubStats: { stars: number; forks: number; watchers: number; language: string };
  githubDescription: string;
  githubFiles: { name: string; type: "file" | "dir" }[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "ECサイト フルリニューアル",
    category: "EC / 販売",
    description: "老舗アパレルブランドのECサイトをNext.js + Stripeで全面刷新。",
    longDescription:
      "レガシーなECシステムからモダンなNext.js + Stripe決済へ移行。SSG/ISRを活用して表示速度を大幅改善し、コンバージョン率向上を実現。バックエンドはNode.js + MongoDB、AWSでホスティング。",
    techs: ["Next.js", "TypeScript", "Stripe", "MongoDB", "AWS"],
    results: [
      { label: "CVR向上", value: "+185%" },
      { label: "表示速度", value: "3.2秒→0.8秒" },
      { label: "売上増加", value: "+240%" },
    ],
    color: "from-sky-500 to-cyan-400",
    accent: "bg-sky-50 border-sky-100",
    emoji: "🛍",
    tag: "Web開発",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    imageAlt: "ショッピングとアパレルの風景",
    githubUrl: "https://github.com/murakami-kyo/ec-renewal",
    githubStats: { stars: 42, forks: 8, watchers: 15, language: "TypeScript" },
    githubDescription: "Next.js + Stripe を使った EC サイトフルリニューアルのリポジトリ。SSG/ISR による高速表示とモダン決済フローを実装。",
    githubFiles: [
      { name: "app", type: "dir" }, { name: "components", type: "dir" },
      { name: "lib", type: "dir" }, { name: "public", type: "dir" },
      { name: "next.config.ts", type: "file" }, { name: "package.json", type: "file" },
      { name: "README.md", type: "file" }, { name: "tsconfig.json", type: "file" },
    ],
  },
  {
    id: 2,
    title: "SaaS 予約管理システム",
    category: "SaaS / B2B",
    description: "美容サロン向けオンライン予約・顧客管理SaaSを0→1で開発。",
    longDescription:
      "マルチテナント対応の予約管理SaaSを設計・開発。リアルタイム予約同期にはWebSocketを活用。決済機能、自動リマインドメール、売上分析ダッシュボードを実装。月次200万円のMRR達成。",
    techs: ["React", "Node.js", "PostgreSQL", "WebSocket", "Vercel"],
    results: [
      { label: "導入サロン数", value: "80+" },
      { label: "月次MRR", value: "200万円" },
      { label: "予約処理数", value: "月5万件" },
    ],
    color: "from-indigo-500 to-purple-400",
    accent: "bg-indigo-50 border-indigo-100",
    emoji: "📅",
    tag: "SaaS",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    imageAlt: "美容サロンの内装",
    githubUrl: "https://github.com/murakami-kyo/salon-booking-saas",
    githubStats: { stars: 67, forks: 14, watchers: 23, language: "TypeScript" },
    githubDescription: "美容サロン向けマルチテナント予約 SaaS。WebSocket リアルタイム同期・Stripe 決済・自動メール通知を実装。",
    githubFiles: [
      { name: "client", type: "dir" }, { name: "server", type: "dir" },
      { name: "prisma", type: "dir" }, { name: "docker-compose.yml", type: "file" },
      { name: "package.json", type: "file" }, { name: "README.md", type: "file" },
    ],
  },
  {
    id: 3,
    title: "リアルタイム分析ダッシュボード",
    category: "データ分析",
    description: "製造業クライアント向けIoTデータのリアルタイム可視化システム。",
    longDescription:
      "工場の各種センサーデータをリアルタイムで収集・可視化するダッシュボードを構築。AWS IoT CoreとLambdaでデータパイプラインを設計し、React + D3.jsで直感的なUI/UXを実現。",
    techs: ["React", "AWS IoT", "Lambda", "D3.js", "TypeScript"],
    results: [
      { label: "センサー数", value: "500+" },
      { label: "データ遅延", value: "100ms以下" },
      { label: "障害検知率", value: "99.5%" },
    ],
    color: "from-emerald-500 to-teal-400",
    accent: "bg-emerald-50 border-emerald-100",
    emoji: "📊",
    tag: "IoT / データ",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    imageAlt: "工場・製造現場の風景",
    githubUrl: "https://github.com/murakami-kyo/iot-dashboard",
    githubStats: { stars: 31, forks: 6, watchers: 11, language: "TypeScript" },
    githubDescription: "製造業向け IoT リアルタイム分析ダッシュボード。AWS IoT Core + Lambda + D3.js で 500 センサーのデータを可視化。",
    githubFiles: [
      { name: "src", type: "dir" }, { name: "lambda", type: "dir" },
      { name: "infrastructure", type: "dir" }, { name: "public", type: "dir" },
      { name: "vite.config.ts", type: "file" }, { name: "README.md", type: "file" },
    ],
  },
  {
    id: 4,
    title: "医療機関向け業務管理システム",
    category: "ヘルスケア / 業務効率化",
    description: "クリニックチェーンの予約・電子カルテ・請求を統合したシステム。",
    longDescription:
      "複数拠点を持つクリニックチェーン向けに、予約・電子カルテ・保険請求を一元管理するシステムを構築。個人情報保護に配慮したセキュリティ設計と、医師・受付それぞれに最適化されたUIを実装。",
    techs: ["Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    results: [
      { label: "業務時間削減", value: "-60%" },
      { label: "導入クリニック", value: "15拠点" },
      { label: "患者満足度", value: "+40%" },
    ],
    color: "from-pink-500 to-rose-400",
    accent: "bg-pink-50 border-pink-100",
    emoji: "🏥",
    tag: "ヘルスケア",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    imageAlt: "病院・医療の風景",
    githubUrl: "https://github.com/murakami-kyo/clinic-management",
    githubStats: { stars: 18, forks: 4, watchers: 9, language: "TypeScript" },
    githubDescription: "クリニックチェーン向け統合業務管理システム。電子カルテ・予約・保険請求を一元化。セキュリティ設計を重視。",
    githubFiles: [
      { name: "apps", type: "dir" }, { name: "packages", type: "dir" },
      { name: "docker", type: "dir" }, { name: "docs", type: "dir" },
      { name: "turbo.json", type: "file" }, { name: "README.md", type: "file" },
    ],
  },
  {
    id: 5,
    title: "不動産マッチングプラットフォーム",
    category: "不動産 / マッチング",
    description: "物件オーナーと借主をつなぐマッチングプラットフォームをMVPから構築。",
    longDescription:
      "地図ベースの物件検索、AIによるマッチング推薦、オンライン内見予約を備えた不動産プラットフォームを構築。Mapbox APIとOpenAI APIを統合し、ユーザー体験を大幅に向上。",
    techs: ["Next.js", "Mapbox", "OpenAI API", "MongoDB", "Vercel"],
    results: [
      { label: "登録物件数", value: "3,000+" },
      { label: "成約率", value: "+130%" },
      { label: "月間PV", value: "15万PV" },
    ],
    color: "from-amber-500 to-orange-400",
    accent: "bg-amber-50 border-amber-100",
    emoji: "🏠",
    tag: "プラットフォーム",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    imageAlt: "不動産・住宅の風景",
    githubUrl: "https://github.com/murakami-kyo/realestate-platform",
    githubStats: { stars: 55, forks: 12, watchers: 20, language: "TypeScript" },
    githubDescription: "AI マッチング推薦 × Mapbox 地図検索の不動産プラットフォーム MVP。OpenAI API で物件レコメンドを実装。",
    githubFiles: [
      { name: "app", type: "dir" }, { name: "components", type: "dir" },
      { name: "lib", type: "dir" }, { name: "prisma", type: "dir" },
      { name: "next.config.ts", type: "file" }, { name: "README.md", type: "file" },
    ],
  },
  {
    id: 6,
    title: "コーポレートサイト 多言語対応",
    category: "コーポレート / 多言語",
    description: "グローバル展開する製造業の多言語コーポレートサイトをリニューアル。",
    longDescription:
      "日英中3言語対応のコーポレートサイトをNext.js App RouterとCMSで構築。Core Web Vitalsの全指標でGreen達成。Vercelへのデプロイでゼロダウンタイム更新を実現。",
    techs: ["Next.js", "Contentful", "i18n", "Tailwind", "Vercel"],
    results: [
      { label: "PageSpeed", value: "98/100" },
      { label: "直帰率改善", value: "-35%" },
      { label: "問合せ数", value: "+90%" },
    ],
    color: "from-violet-500 to-indigo-400",
    accent: "bg-violet-50 border-violet-100",
    emoji: "🌐",
    tag: "コーポレート",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    imageAlt: "企業オフィス・グローバルビジネスの風景",
    githubUrl: "https://github.com/murakami-kyo/corporate-site-i18n",
    githubStats: { stars: 29, forks: 5, watchers: 13, language: "TypeScript" },
    githubDescription: "Next.js App Router + Contentful CMS による日英中 3 言語コーポレートサイト。Core Web Vitals 全項目 Green 達成。",
    githubFiles: [
      { name: "app", type: "dir" }, { name: "components", type: "dir" },
      { name: "messages", type: "dir" }, { name: "public", type: "dir" },
      { name: "next.config.ts", type: "file" }, { name: "README.md", type: "file" },
    ],
  },
];

const tags = ["すべて", "Web開発", "SaaS", "IoT / データ", "ヘルスケア", "プラットフォーム", "コーポレート"];

/* GitHub SVGアイコン（lucide-react に含まれないため独自定義） */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

/* ---------- GitHubモーダル ---------- */
function GitHubModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // ESCキー・背景クリックで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* 背景ブラー */}
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" />

      {/* モーダル本体 */}
      <div
        className="relative w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
        style={{ animation: "scaleIn 0.3s cubic-bezier(0.22,1,0.36,1) forwards" }}
      >
        {/* ウィンドウバー */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <button
            onClick={onClose}
            className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
          <div className="flex-1 mx-3">
            <div className="bg-gray-700 rounded-md px-3 py-1 text-[11px] text-gray-300 font-mono truncate">
              github.com/murakami-kyo/{project.title.replace(/\s+/g, "-").toLowerCase()}
            </div>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* コンテンツ */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {/* リポジトリヘッダー */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <GithubIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-400 text-sm font-mono">murakami-kyo</span>
                <span className="text-gray-600">/</span>
                <span className="text-sky-400 font-bold font-mono text-sm">{project.title.replace(/\s+/g, "-").toLowerCase()}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-gray-600 text-gray-400">
                  Public
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-1.5 leading-relaxed">
                {project.githubDescription}
              </p>
            </div>
          </div>

          {/* 統計バー */}
          <div className="flex flex-wrap gap-4 pb-4 mb-4 border-b border-gray-700">
            {[
              { icon: Star,    value: project.githubStats.stars,    label: "Stars" },
              { icon: GitFork, value: project.githubStats.forks,    label: "Forks" },
              { icon: Eye,     value: project.githubStats.watchers, label: "Watchers" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-gray-300 text-sm hover:text-sky-400 transition-colors cursor-default">
                <Icon className="w-4 h-4" />
                <span className="font-semibold">{value}</span>
                <span className="text-gray-500">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-gray-300 text-sm">
              <span className="w-3 h-3 rounded-full bg-blue-400" />
              <span>{project.githubStats.language}</span>
            </div>
          </div>

          {/* 技術スタック */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.techs.map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-sky-900/50 border border-sky-700/50 text-sky-300 text-xs font-medium rounded-lg">
                {tech}
              </span>
            ))}
          </div>

          {/* ファイルツリー */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-5">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-700 bg-gray-800/80">
              <Code2 className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400 font-mono">main</span>
            </div>
            <div className="divide-y divide-gray-700/50">
              {project.githubFiles.map((file) => (
                <div key={file.name} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700/40 transition-colors cursor-default">
                  <span className="text-sm">
                    {file.type === "dir" ? "📁" : "📄"}
                  </span>
                  <span className="text-sky-400 text-sm font-mono hover:underline">{file.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 成果指標 */}
          <div>
            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">実績</h4>
            <div className="grid grid-cols-3 gap-3">
              {project.results.map((r) => (
                <div key={r.label} className="bg-gray-800 rounded-xl p-3 text-center border border-gray-700">
                  <div className="text-lg font-black text-gradient">{r.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="px-6 py-4 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-mono">© 2024 murakami-kyo</span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHubで開く
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- プロジェクトカード ---------- */
function ProjectCard({
  project,
  index,
  visible,
  onGithubClick,
}: {
  project: Project;
  index: number;
  visible: boolean;
  onGithubClick: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border ${project.accent} card-hover card-shine cursor-default`}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity 0.65s ease ${0.1 + index * 0.08}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* プロジェクト画像 */}
      <div className="relative h-44 overflow-hidden">
        {!imgError ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1.0)" }}
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
            <span className="text-5xl">{project.emoji}</span>
          </div>
        )}
        {/* グラデーションオーバーレイ */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
        {/* カテゴリバッジ */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 shadow-sm">
            {project.category}
          </span>
        </div>
        {/* タイトル（下部） */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base font-bold text-white drop-shadow leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      {/* カードボディ */}
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed mb-4 min-h-[3rem]">
          {hovered ? project.longDescription : project.description}
        </p>

        {/* 成果指標 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {project.results.map((result) => (
            <div key={result.label} className="text-center p-2 bg-gray-50 rounded-xl hover:bg-sky-50 transition-colors duration-200">
              <div className="text-sm font-black text-gradient">{result.value}</div>
              <div className="text-xs text-gray-400 mt-0.5 leading-tight">{result.label}</div>
            </div>
          ))}
        </div>

        {/* 技術スタック */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techs.map((tech) => (
            <span key={tech} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-sky-100 hover:text-sky-700 transition-colors duration-200">
              {tech}
            </span>
          ))}
        </div>

        {/* アクションリンク */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-sky-600 hover:bg-sky-50 rounded-lg transition-colors duration-200">
            <ExternalLink className="w-3.5 h-3.5" />
            詳細を見る
          </button>
          <button
            onClick={() => onGithubClick(project)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-900 hover:text-white rounded-lg transition-all duration-200"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- メインコンポーネント ---------- */
export default function Projects() {
  const [activeTag,    setActiveTag]    = useState("すべて");
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible,   setVisible]   = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeTag === "すべて"
    ? projects
    : projects.filter((p) => p.tag === activeTag);

  const handleGithubClick = useCallback((p: Project) => {
    setModalProject(p);
  }, []);

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-28 section-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* セクションヘッダー */}
          <div
            className="text-center mb-12"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-600 tracking-wide">WORKS & PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 section-title-line">
              実績・プロジェクト
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-relaxed">
              幅広い業界・規模のプロジェクトをご支援してきました。いずれも要件定義から設計・開発・運用まで一貫して担当。
            </p>
          </div>

          {/* フィルタータグ */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-10"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 hover:-translate-y-0.5 ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-sm"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {tag !== "すべて" && <Tag className="w-3 h-3" />}
                  {tag}
                </span>
              </button>
            ))}
          </div>

          {/* プロジェクトグリッド */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                visible={visible}
                onGithubClick={handleGithubClick}
              />
            ))}
          </div>

          {/* GitHubボタン */}
          <div
            className="text-center mt-14"
            style={{
              opacity:    visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            <button
              onClick={() => setModalProject(projects[0])}
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-xl"
            >
              <GithubIcon className="w-4 h-4" />
              GitHubで全実績を見る
            </button>
          </div>
        </div>
      </section>

      {/* GitHubモーダル */}
      {modalProject && (
        <GitHubModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </>
  );
}
