"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  budget: string;
  timeline: string;
  type: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const budgetOptions  = ["〜30万円", "30〜100万円", "100〜300万円", "300万円以上", "要相談"];
const timelineOptions = ["1ヶ月以内", "2〜3ヶ月", "3〜6ヶ月", "6ヶ月以上", "未定"];
const typeOptions    = ["Webアプリ開発", "ECサイト構築", "SaaS開発", "既存システム改修", "UI/UXリニューアル", "その他"];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Contact() {
  const [form,   setForm]   = useState<FormData>({ name: "", email: "", budget: "", timeline: "", type: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const header = useReveal();
  const left   = useReveal();
  const right  = useReveal();

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())    e.name    = "お名前を入力してください";
    if (!form.email.trim())   { e.email = "メールアドレスを入力してください"; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "正しいメールアドレスを入力してください"; }
    if (!form.message.trim()) e.message = "メッセージを入力してください";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  if (status === "success") {
    return (
      <section id="contact" className="py-28 section-gradient">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div
            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-12"
            style={{ animation: "scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards" }}
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-3">お問い合わせありがとうございます！</h3>
            <p className="text-gray-600 mb-2">
              内容を確認の上、<strong>24時間以内</strong>にご連絡いたします。
            </p>
            <p className="text-sm text-gray-400 mb-8">※ 迷惑メールフォルダもご確認ください</p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", email: "", budget: "", timeline: "", type: "", message: "" }); }}
              className="px-6 py-3 btn-primary text-white font-bold rounded-xl text-sm"
            >
              <span>別のお問い合わせをする</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28 section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* セクションヘッダー */}
        <div
          ref={header.ref}
          className="text-center mb-12"
          style={{
            opacity:    header.visible ? 1 : 0,
            transform:  header.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-xs font-semibold text-sky-600 tracking-wide">CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4 section-title-line">
            お問い合わせ
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-relaxed">
            プロジェクトのご相談・お見積りは無料です。まずはお気軽にご連絡ください。
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* 左：インフォカード */}
          <div
            ref={left.ref}
            className="lg:col-span-2 flex flex-col gap-4"
            style={{
              opacity:    left.visible ? 1 : 0,
              transform:  left.visible ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* レスポンス情報 */}
            <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 text-white card-shine shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center animate-pulse-glow">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">24時間以内に返信</div>
                  <div className="text-sm text-sky-100">土日祝も対応しています</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">無料相談・お見積り</div>
                  <div className="text-sm text-sky-100">gold77chi11@gmail.com</div>
                </div>
              </div>

              {/* 装飾 */}
              <div className="mt-5 pt-5 border-t border-white/20 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "24h",  l: "返信目安" },
                  { v: "無料", l: "相談・見積" },
                  { v: "即日", l: "対応可能" },
                ].map((item, i) => (
                  <div
                    key={item.l}
                    className="bg-white/15 rounded-xl py-2"
                    style={{
                      opacity:    left.visible ? 1 : 0,
                      transition: `opacity 0.5s ease ${0.5 + i * 0.1}s`,
                    }}
                  >
                    <div className="text-lg font-black">{item.v}</div>
                    <div className="text-[10px] text-sky-100">{item.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-sky-500 to-indigo-500 block" />
                よくあるご質問
              </h3>
              {[
                { q: "副業・小規模案件でも対応可能ですか？",   a: "はい、数万円規模の小さなご依頼からお受けしています。" },
                { q: "急ぎの案件でも対応できますか？",         a: "スケジュールによりますが、スピード対応も可能です。まずご相談ください。" },
                { q: "途中からの参画は可能ですか？",           a: "既存プロジェクトへの途中参画も多数実績があります。" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${i > 0 ? "border-t border-gray-100 pt-3 mt-3" : ""} hover:bg-sky-50/50 rounded-lg p-2 -mx-2 transition-colors duration-200`}
                  style={{
                    opacity:    left.visible ? 1 : 0,
                    transform:  left.visible ? "translateX(0)" : "translateX(-15px)",
                    transition: `opacity 0.5s ease ${0.7 + i * 0.1}s, transform 0.5s ease ${0.7 + i * 0.1}s`,
                  }}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-1">Q. {item.q}</div>
                  <div className="text-xs text-gray-500">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：フォーム */}
          <div
            ref={right.ref}
            className="lg:col-span-3"
            style={{
              opacity:    right.visible ? 1 : 0,
              transform:  right.visible ? "translateX(0)" : "translateX(50px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* お名前 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="山田 太郎"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 focus:border-red-400 bg-red-50"
                        : "border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 hover:border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* メールアドレス */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="taro@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 focus:border-red-400 bg-red-50"
                        : "border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 hover:border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {/* 案件種別 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">案件種別</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white hover:border-gray-300">
                    <option value="">選択してください</option>
                    {typeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {/* 予算感 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">予算感</label>
                  <select name="budget" value={form.budget} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white hover:border-gray-300">
                    <option value="">選択してください</option>
                    {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {/* 希望納期 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">希望納期</label>
                  <select name="timeline" value={form.timeline} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white hover:border-gray-300">
                    <option value="">選択してください</option>
                    {timelineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* メッセージ */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  ご相談内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="実現したいこと・現状の課題・お困りのことなど、自由にお書きください。"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 resize-none ${
                    errors.message
                      ? "border-red-300 focus:border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 hover:border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full btn-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      送信中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      無料で相談する（送信する）
                    </span>
                  )}
                </span>
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                送信後24時間以内にメールにてご連絡いたします
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
