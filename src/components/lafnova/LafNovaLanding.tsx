import { useEffect, useRef, useState } from "react";
import {
  Play, Check, Menu, X, Sparkles, Wand2, Languages, Scissors,
  MonitorPlay, FileDown, Instagram, Youtube, Music2, Mic, User,
  Briefcase, Upload, Palette, Download, ChevronDown,
  ShieldCheck, Zap, Type,
} from "lucide-react";

const CHECKOUT_URL = "";
const PRICE = "$29";
const CHECKOUT_ENABLED = CHECKOUT_URL.trim().length > 0;
const BUY_LABEL = CHECKOUT_ENABLED ? `Buy LafNova for ${PRICE}` : "Launching Soon — Verification Pending";
const PENDING_NOTE = "LafNova is ready. Secure checkout will open after our payment store is approved.";

function PurchaseButton({
  className = "",
  children,
  showNote = false,
  icon = null,
}: {
  className?: string;
  children?: React.ReactNode;
  showNote?: boolean;
  icon?: React.ReactNode;
}) {
  const label = children ?? (
    <>
      {icon}
      {CHECKOUT_ENABLED ? `Buy LafNova for ${PRICE}` : "Launching Soon — Verification Pending"}
    </>
  );
  const btn = CHECKOUT_ENABLED ? (
    <a href={CHECKOUT_URL} className={className}>
      {label}
    </a>
  ) : (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="Checkout will open after our payment store is approved"
      className={`${className} opacity-60 cursor-not-allowed pointer-events-none`}
    >
      {label}
    </button>
  );
  if (!showNote) return btn;
  return (
    <div className="w-full">
      {btn}
      {!CHECKOUT_ENABLED && (
        <p className="mt-3 text-xs text-muted-foreground text-center">{PENDING_NOTE}</p>
      )}
    </div>
  );
}

/* ---------- Logo ---------- */
function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3 group">
      <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-[#39ff14] to-[#7ef7a3] grid place-items-center shadow-[0_0_20px_rgba(57,255,20,0.35)]">
        <span className="font-black text-[#05130a] text-sm tracking-tight">LN</span>
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="text-white font-bold tracking-tight text-lg">LafNova</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI Caption Editor</div>
        </div>
      )}
    </a>
  );
}

/* ---------- Reveal on scroll ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`opacity-0 ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- Nav ---------- */
const NAV = [
  { label: "Features", href: "#features" },
  { label: "Animations", href: "#animations" },
  { label: "Languages", href: "#languages" },
  { label: "Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <Logo />
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-white transition-colors">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <PurchaseButton className="neon-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold" />
        </div>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl">
          <ul className="px-5 py-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-muted-foreground hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <PurchaseButton className="neon-btn block text-center rounded-xl px-4 py-3 text-sm font-bold mt-2" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------- Waveform ---------- */
function Waveform({ className = "" }: { className?: string }) {
  const bars = Array.from({ length: 28 });
  return (
    <div className={`flex items-end gap-[3px] h-8 ${className}`}>
      {bars.map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-[#39ff14]/80 origin-bottom"
          style={{
            height: `${20 + ((i * 37) % 80)}%`,
            animation: `wave 1.1s ease-in-out ${i * 60}ms infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Product mockup ---------- */
function ProductMockup() {
  return (
    <div className="relative">
      {/* Editor window */}
      <div className="glass-card rounded-3xl p-4 sm:p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-muted-foreground">LafNova — Project · reel_01.mp4</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px] gap-4 pt-4">
          {/* 9:16 preview */}
          <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[520px] mx-auto w-full max-w-[300px] bg-gradient-to-br from-[#111827] via-[#0b0f14] to-[#0b0f14] border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(57,255,20,0.15),transparent_60%)]" />
            <div className="absolute top-3 left-3 right-3 flex justify-between text-[10px] text-white/60">
              <span>0:07</span>
              <span>REEL</span>
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <button className="h-14 w-14 rounded-full bg-white/10 border border-white/30 backdrop-blur grid place-items-center hover:bg-white/20 transition">
                <Play className="text-white ml-0.5" size={22} fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-16 left-3 right-3 text-center">
              <div className="inline-block text-white font-extrabold text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Chalo kuch <span className="bg-[#39ff14] text-[#05130a] px-1.5 rounded animate-pulse-glow">amazing</span> banate hain
              </div>
            </div>
            <div className="absolute bottom-4 left-3 right-3">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[42%] bg-[#39ff14]" />
              </div>
            </div>
          </div>
          {/* Caption rows */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground pl-1">Captions</div>
            {[
              { t: "0:00", w: "Turn simple videos", active: false },
              { t: "0:03", w: "into powerful stories.", active: true },
              { t: "0:06", w: "Chalo kuch amazing…", active: false },
              { t: "0:09", w: "چلو کچھ شاندار بناتے ہیں", active: false, rtl: true },
            ].map((row, i) => (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2 text-xs ${
                  row.active
                    ? "border-[#39ff14]/60 bg-[#39ff14]/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground"
                }`}
                dir={row.rtl ? "rtl" : "ltr"}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] opacity-70">{row.t}</span>
                  {row.active && <span className="text-[10px] text-[#39ff14]">● active</span>}
                </div>
                <div className="truncate">{row.w}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Timeline */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Waveform className="flex-1" />
            <span className="text-[10px] text-muted-foreground">00:07 / 00:15</span>
          </div>
        </div>
      </div>
      {/* Floating badges */}
      <div className="hidden sm:flex absolute -left-6 top-16 glass-card rounded-2xl px-3 py-2 items-center gap-2 animate-float">
        <Type size={14} className="text-[#39ff14]" />
        <span className="text-xs text-white">Word-level animation</span>
      </div>
      <div className="hidden sm:flex absolute -right-4 bottom-24 glass-card rounded-2xl px-3 py-2 items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
        <Languages size={14} className="text-[#7ef7a3]" />
        <span className="text-xs text-white">EN · Hinglish · اردو</span>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const trust = [
    "Windows 10/11",
    "English, Hinglish & Urdu",
    "Word-level animations",
    "MP4, SRT & ASS export",
    "No watermark",
  ];
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground mb-6">
              <Sparkles size={12} className="text-[#39ff14]" />
              New · Word-level caption animations for creators
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              <span className="text-white">Viral captions for the way you </span>
              <span className="text-gradient-neon">actually speak.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Create, edit and animate professional captions in English, Roman Hinglish and Urdu—then
              export polished videos directly from your Windows computer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PurchaseButton
                className="neon-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold"
                icon={<Download size={18} />}
              />
              <a href="#demo" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.06] transition">
                <Play size={18} /> Watch Demo
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {trust.map((t) => (
                <li key={t} className="text-xs text-muted-foreground rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ProductMockup />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Problem ---------- */
function Problem() {
  const items = [
    { t: "Wrong Hinglish scripts", d: "Most tools transcribe Hinglish into Devanagari or broken English—unreadable for your audience." },
    { t: "Roman Hinglish, not Hindi", d: "Captions should look like “dekho”, “maine” and “chalna”—the way creators actually type." },
    { t: "Real Urdu rendering", d: "Urdu deserves proper RTL and Nastaliq typography, not left-aligned Latin fallbacks." },
    { t: "Five tools in one", d: "Stop juggling transcribers, editors, animators and exporters. LafNova does the full loop." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white text-center max-w-3xl mx-auto">
            Captions weren't built for the way South Asia speaks.{" "}
            <span className="text-gradient-neon">LafNova is.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-[#39ff14]/15 text-[#39ff14] grid place-items-center">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{it.t}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{it.d}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const items = [
    { icon: Languages, title: "Roman Hinglish Captions", desc: "Generate natural Latin-script captions such as “dekho maine” and “chalna”." },
    { icon: Type, title: "Urdu & Nastaliq Support", desc: "Create readable right-to-left Urdu captions with proper font rendering." },
    { icon: Zap, title: "Viral Word-Level Animations", desc: "Make spoken words react, highlight, pop and fill in sync with the voice." },
    { icon: Scissors, title: "Complete Caption Editor", desc: "Edit text and timing with undo, redo, split, merge, duplicate and delete tools." },
    { icon: MonitorPlay, title: "Live Video Preview", desc: "Preview the selected caption style and animation before exporting." },
    { icon: FileDown, title: "Professional Export", desc: "Export SRT, ASS and burned-in MP4 videos without a watermark." },
  ];
  return (
    <section id="features" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">Features</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">
              Everything you need to ship captions that convert.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 60}>
              <div className="group glass-card rounded-2xl p-6 h-full hover:border-[#39ff14]/40 transition-all hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#39ff14]/25 to-[#39ff14]/5 border border-[#39ff14]/30 grid place-items-center text-[#39ff14]">
                  <it.icon size={20} />
                </div>
                <h3 className="mt-5 text-white font-semibold text-lg">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Animation Showcase ---------- */
function AnimatedCaption({ variant }: { variant: string }) {
  const text = "Turn simple videos into powerful stories.".split(" ");
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % text.length), 550);
    return () => clearInterval(id);
  }, [text.length]);

  return (
    <div className="min-h-[110px] grid place-items-center px-3 py-4 rounded-xl bg-[#05080c] border border-white/5 text-center">
      <div className="text-white font-bold text-base leading-snug flex flex-wrap justify-center gap-x-1.5 gap-y-1">
        {text.map((w, i) => {
          const isActive = i === active;
          if (variant === "highlight")
            return <span key={i} className={isActive ? "bg-[#39ff14] text-[#05130a] px-1.5 rounded" : ""}>{w}</span>;
          if (variant === "pulse")
            return <span key={i} className={isActive ? "text-[#39ff14] animate-pulse-glow" : ""}>{w}</span>;
          if (variant === "pop")
            return <span key={i} className={`transition-transform ${isActive ? "inline-block scale-125 text-[#39ff14]" : ""}`}>{w}</span>;
          if (variant === "karaoke")
            return <span key={i} className={i <= active ? "text-[#39ff14]" : "text-white/40"}>{w}</span>;
          if (variant === "slide")
            return <span key={i} className={`transition-all ${isActive ? "translate-y-0 opacity-100 text-[#39ff14]" : i < active ? "opacity-70" : "opacity-40 translate-y-1"}`}>{w}</span>;
          return <span key={i}>{w}</span>;
        })}
      </div>
    </div>
  );
}
function Animations() {
  const cards = [
    { name: "Moving Word Highlight", variant: "highlight" },
    { name: "Active Word Pulse", variant: "pulse" },
    { name: "Word Pop", variant: "pop" },
    { name: "Karaoke Fill", variant: "karaoke" },
    { name: "Clean Slide + Fade", variant: "slide" },
    { name: "Standard Captions", variant: "standard" },
  ];
  return (
    <section id="animations" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">Animations</div>
              <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">Motion that makes every word count.</h2>
            </div>
            <p className="text-muted-foreground md:max-w-sm">Six verified animation modes, all synced to spoken audio at word level.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div className="glass-card rounded-2xl p-4">
                <AnimatedCaption variant={c.variant} />
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-white font-medium">{c.name}</div>
                  <Waveform className="h-5 opacity-60" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Demo ---------- */
function Demo() {
  return (
    <section id="demo" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">Demo</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">
              Watch LafNova turn raw speech into animated captions.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-6 items-center">
            {/* Player */}
            <div className="glass-card rounded-3xl p-4">
              <div className="relative mx-auto aspect-[9/16] max-h-[620px] w-full max-w-[360px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#05080c] border border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(57,255,20,0.18),transparent_60%)]" />
                <button
                  className="absolute inset-0 grid place-items-center group"
                  aria-label="Play demo"
                  data-lafnova-demo-play
                >
                  <span className="h-20 w-20 rounded-full bg-[#39ff14] text-[#05130a] grid place-items-center shadow-[0_0_40px_rgba(57,255,20,0.6)] group-hover:scale-105 transition">
                    <Play size={30} fill="currentColor" className="ml-1" />
                  </span>
                </button>
                <div className="absolute bottom-20 inset-x-4 text-center">
                  <div className="inline-block text-white font-extrabold text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Turn simple videos into <span className="bg-[#39ff14] text-[#05130a] px-1.5 rounded">powerful</span> stories.
                  </div>
                </div>
                <div className="absolute bottom-4 inset-x-4">
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-1/3 bg-[#39ff14]" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-white/60">
                    <span>0:04 / 0:12</span>
                    <span>1080 × 1920</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Watch LafNova turn raw speech into animated captions
              </div>
            </div>
            {/* Before / After */}
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Before</div>
                <div className="mt-2 text-white/80 text-sm">"turn simple videos into powerful stories"</div>
                <div className="mt-3 text-[11px] text-muted-foreground">Flat text · no timing · no emphasis</div>
              </div>
              <div className="glass-card rounded-2xl p-4 border-[#39ff14]/40">
                <div className="text-[10px] uppercase tracking-widest text-[#39ff14]">After</div>
                <div className="mt-2 text-white font-semibold">
                  Turn simple videos into <span className="bg-[#39ff14] text-[#05130a] px-1.5 rounded">powerful</span> stories.
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">Word-level timing · animated highlight · export-ready</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    { icon: Upload, title: "Upload", desc: "Choose your video and spoken language." },
    { icon: Palette, title: "Edit & Style", desc: "Correct captions, select a preset and choose an animation." },
    { icon: Download, title: "Preview & Export", desc: "Review the result and export MP4, SRT or ASS." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">How it works</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">Three steps from voice to viral.</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="glass-card rounded-2xl p-6 h-full relative">
                <div className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-[#39ff14] text-[#05130a] grid place-items-center font-black text-sm shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                  {i + 1}
                </div>
                <s.icon className="text-[#39ff14]" size={22} />
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Languages ---------- */
function Languages_() {
  const cards = [
    { code: "EN", label: "English", sample: "Let's build something amazing.", cls: "text-white" },
    { code: "HI-R", label: "Roman Hinglish", sample: "Chalo kuch amazing banate hain.", cls: "text-white" },
    { code: "UR", label: "Urdu / Nastaliq", sample: "چلو کچھ شاندار بناتے ہیں", cls: "text-white text-right", rtl: true },
  ];
  return (
    <section id="languages" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">Languages</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">
              Built for how South Asia actually speaks.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.code} delay={i * 80}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#39ff14]">{c.code}</span>
                  <span className="text-xs text-muted-foreground">{c.label}</span>
                </div>
                <div className="mt-6 rounded-xl bg-[#05080c] border border-white/5 p-5 min-h-[110px] grid place-items-center">
                  <div dir={c.rtl ? "rtl" : "ltr"} className={`font-bold text-xl leading-snug ${c.cls}`}>
                    {c.sample}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Check size={14} className="text-[#39ff14]" /> Native script & timing
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Use cases ---------- */
function UseCases() {
  const items = [
    { icon: Instagram, label: "Instagram Reels" },
    { icon: Youtube, label: "YouTube Shorts" },
    { icon: Music2, label: "TikTok videos" },
    { icon: Mic, label: "Podcasts" },
    { icon: User, label: "Talking-head videos" },
    { icon: Briefcase, label: "Client caption projects" },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">Made for creators</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">Every format. Every workflow.</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 50}>
              <div className="glass-card rounded-xl p-5 flex items-center gap-3 hover:border-[#39ff14]/40 transition">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-[#39ff14]/15 text-[#39ff14] grid place-items-center">
                  <it.icon size={18} />
                </div>
                <span className="text-white font-medium text-sm">{it.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Buy ---------- */
function Buy() {
  const includes = [
    "LafNova for Windows",
    "Early-access updates",
    "English, Roman Hinglish and Urdu",
    "All verified animation modes",
    "MP4, SRT and ASS exports",
    "No watermark",
  ];
  return (
    <section id="buy" className="py-24 md:py-32 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[#39ff14]/25 bg-gradient-to-br from-[#0d1520] via-[#0b0f14] to-[#0b0f14] p-8 md:p-14">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#39ff14]/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#7c3aed]/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  Your words deserve <span className="text-gradient-neon">better captions.</span>
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl">
                  Create captions that look professional, feel native and keep viewers watching.
                </p>
                <ul className="mt-8 grid sm:grid-cols-2 gap-2.5">
                  {includes.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                      <Check size={16} className="text-[#39ff14] mt-0.5 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-6 md:p-8 min-w-[260px] text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">One-time purchase</div>
                <div className="mt-3 text-5xl font-black text-white">{PRICE}</div>
                <div className="mt-1 text-xs text-muted-foreground">Windows 10/11 · lifetime license</div>
                <div className="mt-6">
                  <PurchaseButton
                    className="neon-btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-black"
                    icon={<Download size={18} />}
                    showNote
                  />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  AI transcription requires an internet connection and your own Deepgram API key. Easy setup instructions are included.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={12} /> Secure checkout
                </div>
              </div>
            </div>
            <p className="relative mt-8 text-center text-sm text-muted-foreground">
              Windows version available now. macOS and mobile are planned.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left p-5"
        aria-expanded={open}
      >
        <span className="text-white font-semibold">{q}</span>
        <ChevronDown className={`text-[#39ff14] transition-transform ${open ? "rotate-180" : ""}`} size={18} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
function FAQ() {
  const faqs = [
    { q: "What languages does LafNova support?", a: "English, Roman Hinglish and Urdu with proper Nastaliq rendering." },
    { q: "Does LafNova support Roman Hinglish?", a: "Yes. Captions appear in Latin script — “dekho”, “maine”, “chalna” — the way creators actually write." },
    { q: "Can LafNova create Urdu / Nastaliq captions?", a: "Yes. Urdu captions render right-to-left with a proper Nastaliq font for readable, native-looking output." },
    { q: "Which video and caption formats can I export?", a: "Burned-in MP4 videos plus SRT and ASS subtitle files. No watermark on any export." },
    { q: "Does LafNova add a watermark?", a: "No. Every export is watermark-free." },
    { q: "Is LafNova available for macOS or mobile?", a: "Not yet. LafNova currently ships as a Windows 10/11 desktop app. macOS and mobile versions are planned." },
    { q: "Do I need a Deepgram API key?", a: "LafNova uses Deepgram for transcription, so an internet connection is required. Check the setup docs for details on API-key configuration." },
    {
      q: "Is LafNova a video editor or a focused caption editor?",
      a: "LafNova is a focused caption editor. It handles transcription, caption editing, styling, animation and export — it is not a general-purpose video editor and doesn't replace tools like Premiere or CapCut.",
    },
  ];
  return (
    <section id="faq" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-[#39ff14] font-semibold">FAQ</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">Answers, up front.</h2>
          </div>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <FAQItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const links = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
    { label: "Contact", href: "#" },
  ];
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr] items-start">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            AI Caption Editor for English, Roman Hinglish & Urdu.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Windows available now · macOS and mobile planned
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60 mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted-foreground hover:text-white transition">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60 mb-3">Connect</div>
          <a href="#" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} LafNova. All rights reserved.</div>
          <div>Made for creators who actually speak the way they speak.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Root ---------- */
export function LafNovaLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Animations />
        <Demo />
        <HowItWorks />
        <Languages_ />
        <UseCases />
        <Buy />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
