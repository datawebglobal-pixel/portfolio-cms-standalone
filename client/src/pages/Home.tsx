import { trpc } from "@/lib/trpc";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const skills = ["Product design", "React & Next.js", "Design systems", "Prototyping", "Creative direction", "Engineering"];
const categories = ["All", "Website Development", "Product Design", "Engineering"];

export default function Home() {
  const { data: projects = [], isLoading } = trpc.portfolio.published.useQuery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f3ee] text-[#161616]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f5f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
          <a href="#top" className="font-display text-xl font-bold tracking-[-0.06em]">AR<span className="text-[#ff6845]">.</span></a>
          <div className="hidden items-center gap-9 text-[13px] font-medium md:flex">
            <a href="#work" className="transition-colors hover:text-[#ff6845]">Work</a>
            <a href="#about" className="transition-colors hover:text-[#ff6845]">About</a>
            <a href="#contact" className="transition-colors hover:text-[#ff6845]">Contact</a>
            <a href="#contact" className="rounded-full bg-[#161616] px-5 py-2.5 text-white transition hover:bg-[#ff6845]">Let&apos;s talk <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(value => !value)} aria-label="Open menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-black/5 bg-[#f5f3ee] px-6 py-5 md:hidden"><div className="flex flex-col gap-4 text-sm"><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div></div>}
      </nav>

      <main id="top">
        <section className="relative mx-auto grid min-h-[720px] max-w-[1240px] items-center gap-14 px-6 pb-24 pt-40 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pt-36">
          <div className="relative z-10 max-w-[680px]">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#69645d]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6845]" /> Available for select projects</div>
            <h1 className="font-display max-w-4xl text-[clamp(3.7rem,9vw,7.5rem)] font-bold leading-[.88] tracking-[-0.085em]">Digital work<br /><span className="text-[#ff6845]">with intent.</span></h1>
            <p className="mt-9 max-w-[460px] text-[17px] leading-8 text-[#68635c]">I&apos;m Alex Rivera — a multidisciplinary designer and engineer creating clear, compelling digital products for ambitious teams.</p>
            <div className="mt-10 flex flex-wrap items-center gap-3"><a href="#work" className="group rounded-full bg-[#ff6845] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e95534]">View my work <ArrowUpRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a><a href="#contact" className="rounded-full border border-black/15 px-6 py-3.5 text-sm font-semibold transition hover:border-black/40 hover:bg-white/50">Contact me</a></div>
            <div className="mt-20 flex items-center gap-5 text-xs text-[#8a857d]"><span className="h-px w-10 bg-[#ff6845]" /> Based in Jakarta · Working worldwide</div>
          </div>
          <div className="relative flex min-h-[430px] items-center justify-center lg:min-h-[560px]">
            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#f9a48c]/30 blur-3xl lg:h-[510px] lg:w-[510px]" />
            <div className="relative aspect-[.82] w-[270px] rotate-[5deg] overflow-hidden rounded-[160px_160px_32px_32px] border-[10px] border-white/75 bg-[#1d2525] shadow-[0_35px_80px_rgba(35,26,18,.2)] lg:w-[345px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.28),transparent_22%),linear-gradient(145deg,#203f3e_0%,#0f1a1a_60%,#ff6845_130%)]" />
              <div className="absolute left-7 top-8 text-[10px] font-semibold uppercase tracking-[.22em] text-white/70">Selected direction</div>
              <div className="absolute bottom-9 left-7 right-7"><div className="mb-4 text-5xl font-light tracking-[-.08em] text-white">AR<span className="text-[#ff9f86]">.</span></div><div className="flex items-center justify-between border-t border-white/20 pt-3 text-[9px] uppercase tracking-[.18em] text-white/60"><span>Design + Build</span><span>2024—Now</span></div></div>
              <div className="absolute right-5 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border border-white/40 p-2"><div className="flex h-full w-full items-center justify-center rounded-full bg-[#ff6845] text-[10px] font-bold uppercase tracking-wider text-white">Think<br />forward</div></div>
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium shadow-lg backdrop-blur lg:bottom-10"><Sparkles className="h-3.5 w-3.5 text-[#ff6845]" /> Strategy-led craft</div>
          </div>
        </section>

        <section id="about" className="border-y border-black/8 bg-[#ece9e2]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-32">
            <div><div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#ff6845]"><span className="h-px w-7 bg-[#ff6845]" /> 01 / About</div><h2 className="font-display max-w-md text-4xl font-semibold leading-[1.05] tracking-[-.06em] md:text-6xl">A little bit of <span className="text-[#ff6845]">everything.</span></h2></div>
            <div className="max-w-2xl"><p className="text-xl leading-9 text-[#49463f]">I bridge the gap between how things look and how they work. My sweet spot is at the intersection of thoughtful interaction, expressive visual systems, and the technical detail that makes an idea real.</p><p className="mt-6 text-base leading-8 text-[#777168]">Over the last 8+ years, I&apos;ve partnered with startups and teams to turn fuzzy problems into focused experiences. I care about the little things, ask a lot of questions, and believe the best work feels inevitable in hindsight.</p><div className="mt-10 flex flex-wrap gap-2">{skills.map(skill => <span key={skill} className="rounded-full border border-black/10 bg-white/50 px-4 py-2 text-xs font-medium text-[#5b564f]">{skill}</span>)}</div></div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1240px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#ff6845]"><span className="h-px w-7 bg-[#ff6845]" /> 02 / Selected work</div><h2 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">Things I&apos;ve <span className="text-[#ff6845]">made.</span></h2></div><div className="flex flex-wrap gap-2">{categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${activeCategory === category ? "bg-[#161616] text-white" : "border border-black/10 text-[#777168] hover:bg-white"}`}>{category}</button>)}</div></div>
          {isLoading ? <div className="grid gap-5 md:grid-cols-2"><div className="h-80 animate-pulse rounded-[28px] bg-[#e8e4dc]" /><div className="h-80 animate-pulse rounded-[28px] bg-[#e8e4dc]" /></div> : filteredProjects.length === 0 ? <div className="rounded-[28px] border border-dashed border-black/15 bg-[#faf9f6] px-7 py-20 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6845]/10 text-[#ff6845]"><Sparkles className="h-6 w-6" /></div><h3 className="mt-6 font-display text-2xl font-semibold tracking-[-.04em]">The first chapter is yours to write.</h3><p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777168]">Projects published from the admin dashboard will appear here automatically. This space is ready for your best work.</p></div> : <div className="grid gap-7 md:grid-cols-2">{filteredProjects.map((project, index) => <Link key={project.id} href={`/project/${project.slug}`} className={`group block ${index % 3 === 1 ? "md:mt-16" : ""}`}><div className={`relative aspect-[1.28] overflow-hidden rounded-[28px] bg-[#d8dedb] ${index % 2 === 0 ? "bg-[#d8dedb]" : "bg-[#d9d1c7]"}`}>{project.thumbnailUrl ? <img src={project.thumbnailUrl} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,#ff9b7d,transparent_30%),linear-gradient(135deg,#1b3838,#a4c1b4)]" />}<div className="absolute inset-x-5 bottom-5 flex items-end justify-between"><span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur">{project.category}</span><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-white transition group-hover:-translate-y-1 group-hover:bg-[#ff6845]"><ArrowUpRight className="h-4 w-4" /></span></div></div><div className="mt-5 flex items-start justify-between gap-5"><div><h3 className="font-display text-2xl font-semibold tracking-[-.045em]">{project.title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-[#777168]">{project.shortDescription}</p></div><div className="mt-1 flex flex-wrap justify-end gap-1.5">{project.tools.slice(0, 2).map((tool: string) => <span key={tool} className="text-[10px] font-semibold uppercase tracking-wider text-[#969087]">{tool}</span>)}</div></div></Link>)}</div>}
        </section>

        <section id="contact" className="relative overflow-hidden bg-[#1b2c2b] text-[#f7f4ed]"><div className="absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[#ff6845]/20 blur-3xl" /><div className="relative mx-auto max-w-[1240px] px-6 py-24 lg:px-10 lg:py-32"><div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#ff9f86]"><span className="h-px w-7 bg-[#ff9f86]" /> 03 / Let&apos;s connect</div><div className="grid gap-12 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><h2 className="font-display max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.07em] md:text-7xl">Have a good problem?<br /><span className="text-[#ff9f86]">Let&apos;s talk.</span></h2><a href="mailto:hello@alexrivera.design" className="mt-10 inline-flex items-center rounded-full bg-[#ff6845] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f98263]">hello@alexrivera.design <ArrowUpRight className="ml-2 h-4 w-4" /></a></div><div className="lg:pb-1"><p className="max-w-sm text-base leading-8 text-white/60">Open to select freelance collaborations, product partnerships, and interesting conversations.</p><div className="mt-8 flex gap-4"><a href="mailto:hello@alexrivera.design" aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-[#ff9f86] hover:text-[#ff9f86]"><Mail className="h-4 w-4" /></a><a href="https://wa.me/6281234567890" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-[#ff9f86] hover:text-[#ff9f86]"><MessageCircle className="h-4 w-4" /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-[#ff9f86] hover:text-[#ff9f86]"><Linkedin className="h-4 w-4" /></a><a href="https://github.com" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-[#ff9f86] hover:text-[#ff9f86]"><Github className="h-4 w-4" /></a></div></div></div><div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row"><span>© 2024 Alex Rivera. Crafted with intention.</span><span>Available worldwide · UTC+7</span></div></div></section>
      </main>
    </div>
  );
}
