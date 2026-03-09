"use client";

import Lenis from "lenis";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ── Reusable Components ── */

function Reveal({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const xy = { up: { y: 50 }, left: { x: -50 }, right: { x: 50 } }[direction];
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, ...xy }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: inView ? "auto" : "transform, opacity" }}
    >{children}</motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const inc = to / 120;
    const id = setInterval(() => { s += inc; if (s >= to) { setN(to); clearInterval(id); } else setN(Math.floor(s)); }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function MagneticWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.15 });
  };
  return (
    <motion.div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos} transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >{children}</motion.div>
  );
}

/* ── Page ── */

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [activeSection, setActiveSection] = useState("top");
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sliderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const slide = (dir: number) => sliderRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  // Active section tracking
  useEffect(() => {
    let tick = false;
    const ids = ["contact", "animations", "projects", "skills", "journey", "top"];
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        setIsNavScrolled(window.scrollY > 60);
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 200) { setActiveSection(id); break; }
        }
        tick = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lenis smooth scroll (desktop only — mobile uses native touch scroll)
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isMobile) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    let id: number;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  /* ── i18n content ── */
  const t = {
    en: {
      greeting: "Hi, I'm",
      name: "Mohammad Owais",
      role: "AI Researcher  •  2D Animator  •  Web Developer",
      bio: "Final-year BS Computer Science student at the intersection of AI research, creative animation, and modern web engineering. I turn complex ideas into elegant, performant digital experiences.",
      exploreBtn: "View Projects",
      contactBtn: "Let's Talk",
      aboutTitle: "About Me",
      aboutP1: "I'm a passionate technologist who believes great software lives at the crossroads of engineering and creativity. My journey began with curiosity about how machines learn and evolved into a multi-disciplinary practice spanning full-stack development, computer vision, and motion design.",
      aboutP2: "When I'm not training neural networks or coding React components, you'll find me animating characters, designing brand identities, or exploring the latest in generative AI. I'm actively seeking a fully-funded Master's scholarship in China to deepen my AI research.",
      projectsTitle: "Featured Projects",
      viewGithub: "View on GitHub",
      loginToView: "Sign in to View Code",
      signIn: "Sign In",
      contactTitle: "Get In Touch",
      contactSubtitle: "Have a project in mind, a collaboration opportunity, or just want to say hello? I'd love to hear from you.",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      msgLabel: "Your Message",
      sendBtn: "Send Message",
      sending: "Sending...",
      sent: "Message Sent!",
      journeyTitle: "Experience & Education",
      downloadCV: "Download Resume",
      timeline: [
        { year: "2027+", title: "Master's in AI — China", desc: "Pursuing a fully-funded scholarship for advanced research in Artificial Intelligence and Deep Learning.", icon: "🎓" },
        { year: "2027", title: "BS Computer Science", desc: "Expected graduation with specialization in Web Technologies and Computer Vision. Currently in 7th semester.", icon: "🏫" },
        { year: "2025–26", title: "Final Year Projects & Freelance", desc: "Built real-time Face Mask Detection system (OpenCV + TensorFlow); developed QuickRent Pakistan MVP; freelanced on branding projects.", icon: "🚀" },
      ],
      skillsTitle: "Tech Stack",
      skills: [
        { name: "Python & AI/ML", level: 90, icon: "🐍" },
        { name: "React / Next.js", level: 85, icon: "⚛️" },
        { name: "TypeScript", level: 85, icon: "📘" },
        { name: "2D Animation & Motion", level: 80, icon: "🎬" },
        { name: "Computer Vision", level: 75, icon: "👁️" },
        { name: "UI/UX Design", level: 70, icon: "🎨" },
      ],
      statsProjects: "Projects",
      statsTech: "Technologies",
      statsExperience: "Years Exp.",
      statsCommits: "Commits",
      animTitle: "Animation Reel",
      animDesc: "A showcase of my custom 2D character animations and motion design work.",
      footerRights: "All rights reserved.",
      footerBuilt: "Built with Next.js, Tailwind CSS & Framer Motion",
      backToTop: "Top",
      navHome: "Home",
      navAbout: "About",
      navJourney: "Journey",
      navSkills: "Skills",
      navProjects: "Projects",
      navAnimations: "Animations",
      navContact: "Contact",
    },
    zh: {
      greeting: "你好，我是",
      name: "Mohammad Owais",
      role: "人工智能研究员  •  二维动画师  •  Web 开发者",
      bio: "计算机科学本科四年级学生，专注于AI研究、创意动画与现代Web工程的交叉领域。我将复杂的想法转化为优雅、高性能的数字体验。",
      exploreBtn: "查看项目",
      contactBtn: "联系我",
      aboutTitle: "关于我",
      aboutP1: "我是一名热爱技术的工程师，相信优秀的软件诞生于工程与创意的交汇处。我的旅程始于对机器学习的好奇，逐渐发展为涵盖全栈开发、计算机视觉和动画设计的多学科实践。",
      aboutP2: "在不训练神经网络或编写React组件的时候，你会发现我在制作动画角色、设计品牌形象或探索最新的生成式AI技术。我正在积极寻求中国的全额奖学金硕士机会，以深入AI研究。",
      projectsTitle: "精选项目",
      viewGithub: "在 GitHub 查看",
      loginToView: "登录查看代码",
      signIn: "登录",
      contactTitle: "联系我",
      contactSubtitle: "有项目想法、合作机会，或只是想打个招呼？我很乐意听到您的消息。",
      nameLabel: "姓名",
      emailLabel: "邮箱",
      msgLabel: "留言内容",
      sendBtn: "发送消息",
      sending: "发送中...",
      sent: "发送成功！",
      journeyTitle: "经历与教育",
      downloadCV: "下载简历",
      timeline: [
        { year: "2027+", title: "人工智能硕士 — 中国", desc: "致力于获得全额奖学金，深入人工智能和深度学习的高级研究。", icon: "🎓" },
        { year: "2027", title: "计算机科学学士", desc: "预计毕业，专注于网络技术和计算机视觉。目前第七学期。", icon: "🏫" },
        { year: "2025–26", title: "毕业设计与自由职业", desc: "构建了实时口罩检测系统；开发了 QuickRent Pakistan MVP；承接品牌设计项目。", icon: "🚀" },
      ],
      skillsTitle: "技术栈",
      skills: [
        { name: "Python & AI/ML", level: 90, icon: "🐍" },
        { name: "React / Next.js", level: 85, icon: "⚛️" },
        { name: "TypeScript", level: 85, icon: "📘" },
        { name: "二维动画与动效", level: 80, icon: "🎬" },
        { name: "计算机视觉", level: 75, icon: "👁️" },
        { name: "UI/UX 设计", level: 70, icon: "🎨" },
      ],
      statsProjects: "项目",
      statsTech: "技术",
      statsExperience: "年经验",
      statsCommits: "提交",
      animTitle: "动画作品集",
      animDesc: "展示我的定制二维角色动画和动效设计作品。",
      footerRights: "版权所有。",
      footerBuilt: "使用 Next.js、Tailwind CSS 和 Framer Motion 构建",
      backToTop: "顶部",
      navHome: "首页",
      navAbout: "关于",
      navJourney: "经历",
      navSkills: "技能",
      navProjects: "项目",
      navAnimations: "动画",
      navContact: "联系",
    },
  }[lang];

  // Typewriter
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped("");
    let i = 0;
    const full = `${t.greeting} ${t.name}`;
    let tid: NodeJS.Timeout;
    const type = () => { setTyped(full.slice(0, ++i)); if (i < full.length) tid = setTimeout(type, Math.random() * 40 + 60); };
    type();
    return () => clearTimeout(tid);
  }, [t.greeting, t.name]);

  // Contact form handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      if (res.ok) { setFormStatus("sent"); form.reset(); setTimeout(() => setFormStatus("idle"), 4000); }
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  const projects = [
    { id: 1, title: lang === "en" ? "Face Mask Detection System" : "口罩检测系统", category: "AI / Computer Vision", description: lang === "en" ? "Real-time face mask detection using deep learning. Built with Python, OpenCV, and TensorFlow as part of my Final Year Project." : "使用深度学习进行实时口罩检测。使用 Python、OpenCV 和 TensorFlow 作为毕业设计项目构建。", techStack: ["Python", "OpenCV", "TensorFlow", "CNN"], githubLink: "https://github.com/MohammadOwais/face-mask-detection", color: "from-violet-500/20 to-blue-500/20" },
    { id: 2, title: "QuickRent Pakistan", category: "Full-Stack / MVP", description: lang === "en" ? "A rental marketplace MVP for Pakistan — end-to-end product design, business modelling and interactive prototype." : "巴基斯坦租赁市场 MVP — 端到端产品设计、商业建模和交互式原型。", techStack: ["React", "Node.js", "UI/UX", "MVP"], githubLink: "https://github.com/MohammadOwais/quickrent-pakistan", color: "from-emerald-500/20 to-teal-500/20" },
    { id: 3, title: lang === "en" ? "Brand Identity & Logos" : "品牌形象与徽标", category: "Graphic Design", description: lang === "en" ? "Professional brand identities including logos, business cards and guidelines for J Brothers Autos and Maoli Fast Food." : "专业品牌形象设计，包括 J Brothers Autos 和 Maoli Fast Food 的徽标、名片和品牌指南。", techStack: ["Illustrator", "Branding", "Typography"], githubLink: "https://behance.net/MohammadOwais", color: "from-orange-500/20 to-rose-500/20" },
    { id: 4, title: lang === "en" ? "2D Character Animations" : "二维角色动画", category: "Motion Design", description: lang === "en" ? "Custom 2D character rigs and animations for digital storytelling, explainer videos and social content." : "用于数字故事、解说视频和社交内容的定制二维角色骨骼和动画。", techStack: ["After Effects", "Animate", "Character Design"], githubLink: "https://youtube.com/MohammadOwais", color: "from-pink-500/20 to-purple-500/20" },
  ];

  const animations = [
    { id: 1, title: "Character Walk Cycle", src: "/clip1.mp4" },
    { id: 2, title: "Explainer Animation", src: "/clip2.mp4" },
    { id: 3, title: "Logo Motion Reveal", src: "/clip3.mp4" },
  ];

  const navLinks = [
    { id: "top", label: t.navHome },
    { id: "about", label: t.navAbout },
    { id: "journey", label: t.navJourney },
    { id: "skills", label: t.navSkills },
    { id: "projects", label: t.navProjects },
    { id: "animations", label: t.navAnimations },
    { id: "contact", label: t.navContact },
  ];

  return (
    <main id="top" className="min-h-screen bg-[#050810] text-white font-sans relative flex flex-col overflow-x-hidden">

      {/* ━━━ NAVBAR ━━━ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isNavScrolled ? "bg-[#050810]/80 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/30" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="relative group flex items-center gap-1">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">MO</span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`}
                className={`relative px-3 py-2 text-[13px] font-medium uppercase tracking-wider transition-colors duration-300 ${activeSection === l.id ? "text-white" : "text-gray-500 hover:text-gray-300"}`}>
                {l.label}
                {activeSection === l.id && <motion.span layoutId="nav-pill" className="absolute inset-x-1 -bottom-px h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              </a>
            ))}
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-2.5">
            <button onClick={() => setLang(lang === "en" ? "zh" : "en")} className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all">
              {lang === "en" ? "中文" : "EN"}
            </button>
            <SignedOut>
              <SignInButton mode="modal"><button className="text-xs font-bold px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all">{t.signIn}</button></SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName={false} appearance={{ variables: { colorText: "white" }, elements: { userButtonAvatarBox: "border-2 border-blue-500/50 w-8 h-8" } }} />
            </SignedIn>

            {/* Hamburger */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors" aria-label="Menu">
              <div className="w-5 flex flex-col gap-1.5">
                <motion.span animate={mobileMenu ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block h-[2px] bg-current rounded-full origin-center" />
                <motion.span animate={mobileMenu ? { opacity: 0 } : { opacity: 1 }} className="block h-[2px] bg-current rounded-full" />
                <motion.span animate={mobileMenu ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block h-[2px] bg-current rounded-full origin-center" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#050810]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.a key={l.id} href={`#${l.id}`} onClick={() => setMobileMenu(false)}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className={`py-3 text-sm font-medium tracking-wider uppercase transition-colors ${activeSection === l.id ? "text-blue-400" : "text-gray-500 hover:text-white"}`}>
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/40 via-[#050810]/70 to-[#050810]" />
        </motion.div>

        {/* Ambient orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[120px]" />

        <motion.div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-16" style={{ opacity: heroOpacity }}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 mb-8">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span></span>
                {lang === "en" ? "Available for opportunities" : "开放合作机会"}
              </motion.div>

              <div className="min-h-[4.5rem] sm:min-h-[6rem] lg:min-h-[8rem] mb-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                  <span className="text-white">{typed.slice(0, t.greeting.length + 1)}</span>
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">{typed.slice(t.greeting.length + 1)}</span>
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-blue-400 font-light">|</motion.span>
                </h1>
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                className="text-base sm:text-lg lg:text-xl text-gray-400 font-medium tracking-wide mb-4">
                {t.role}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="text-sm sm:text-base text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t.bio}
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
                <MagneticWrap>
                  <a href="#projects" className="inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-lg shadow-white/10">
                    {t.exploreBtn} <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </MagneticWrap>
                <MagneticWrap>
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 hover:border-white/40 transition-all">
                    {t.contactBtn}
                  </a>
                </MagneticWrap>
              </motion.div>
            </div>

            {/* Profile */}
            <motion.div className="flex-shrink-0 order-1 lg:order-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-4 ring-offset-[#050810]">
                  <Image src="/profile.png" alt="Mohammad Owais" fill className="object-cover object-top" priority />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <span className="text-[10px] uppercase tracking-[3px] text-gray-600 font-medium">{lang === "en" ? "Scroll" : "滚动"}</span>
          <div className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center p-1.5">
            <motion.div className="w-1 h-1.5 rounded-full bg-gray-500" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </div>
        </motion.div>
      </section>

      {/* ━━━ STATS BAR ━━━ */}
      <section className="relative z-10 -mt-12 sm:-mt-16 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 backdrop-blur-sm">
            {([
              { value: 10, suffix: "+", label: t.statsProjects },
              { value: 12, suffix: "+", label: t.statsTech },
              { value: 3, suffix: "+", label: t.statsExperience },
              { value: 200, suffix: "+", label: t.statsCommits },
            ] as const).map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-gray-500 text-xs sm:text-sm font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[4px] text-blue-400 font-semibold mb-4 text-center">{t.aboutTitle}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-8">
            <Reveal delay={0.1}>
              <p className="text-gray-400 leading-[1.8] text-[15px]">{t.aboutP1}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 leading-[1.8] text-[15px]">{t.aboutP2}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ JOURNEY ━━━ */}
      <section id="journey" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[4px] text-blue-400 font-semibold mb-4 text-center">{t.journeyTitle}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-16">{lang === "en" ? "From Student to Builder" : "从学生到构建者"}</h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
            {t.timeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-10`}>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">{item.year}</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl z-10 relative">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <span className="md:hidden text-xs font-bold tracking-widest text-blue-400 uppercase">{item.year}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center mt-4">
              <MagneticWrap className="inline-block">
                <a href="/Mohammad_Owais_CV.pdf" download className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-sm font-semibold text-white hover:bg-white/5 transition-all group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  {t.downloadCV}
                </a>
              </MagneticWrap>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ SKILLS ━━━ */}
      <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[4px] text-blue-400 font-semibold mb-4 text-center">{t.skillsTitle}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-16">{lang === "en" ? "What I Work With" : "我使用的技术"}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.skills.map((skill, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-white font-semibold text-sm">{skill.name}</span>
                    </div>
                    <span className="text-xs font-bold text-blue-400 tabular-nums">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PROJECTS ━━━ */}
      <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[4px] text-blue-400 font-semibold mb-4 text-center">{t.projectsTitle}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-16">{lang === "en" ? "Things I've Built" : "我构建的项目"}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all duration-500 overflow-hidden h-full flex flex-col">
                  {/* Color accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative p-6 sm:p-8 flex flex-col flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-[3px] text-gray-500 mb-3">{p.category}</span>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.techStack.map((tech, j) => <span key={j} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">{tech}</span>)}
                    </div>
                    <div className="mt-auto">
                      <SignedIn>
                        <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors group/link">
                          {t.viewGithub} <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                      </SignedIn>
                      <SignedOut>
                        <SignInButton mode="modal">
                          <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            {t.loginToView}
                          </button>
                        </SignInButton>
                      </SignedOut>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ANIMATIONS ━━━ */}
      <section id="animations" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[4px] text-blue-400 font-semibold mb-4 text-center">{t.animTitle}</p>
            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto text-center mb-12">{t.animDesc}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {animations.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden group bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all duration-500">
                  <div className="relative aspect-video bg-black">
                    <video src={a.src} autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{a.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
        <div className="max-w-xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[4px] text-blue-400 font-semibold mb-4 text-center">{t.contactTitle}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">{lang === "en" ? "Let's Work Together" : "让我们一起合作"}</h2>
            <p className="text-gray-500 text-center mb-12 text-sm sm:text-base">{t.contactSubtitle}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.nameLabel}</label>
                <input type="text" name="name" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" placeholder={lang === "en" ? "John Doe" : "张三"} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.emailLabel}</label>
                <input type="email" name="email" required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{t.msgLabel}</label>
                <textarea name="message" rows={5} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none" placeholder={lang === "en" ? "Tell me about your project..." : "告诉我您的项目..."} />
              </div>
              <MagneticWrap>
                <button type="submit" disabled={formStatus === "sending"} className="w-full bg-white text-black font-bold py-3.5 rounded-xl text-sm hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === "sending" ? t.sending : formStatus === "sent" ? t.sent : t.sendBtn}
                </button>
              </MagneticWrap>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-white/[0.04] py-10 sm:py-14 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <a href="#top" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">MO</a>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { href: "https://github.com/owaiskhan2501000", label: "GitHub", svg: <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"/>, vb: "0 0 16 16", w: 16 },
                { href: "https://www.linkedin.com/in/mohammad-owais-5653983b3", label: "LinkedIn", svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>, vb: "0 0 24 24", w: 24 },
                { href: "http://www.youtube.com/@animatty13607", label: "YouTube", svg: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>, vb: "0 0 24 24", w: 24 },
                { href: "https://www.behance.net/mohammadowais28", label: "Behance", svg: <><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></>, vb: "0 0 24 24", w: 24 },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:scale-110 transition-all duration-300" title={s.label}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={s.w === 16 ? 14 : 16} height={s.w === 16 ? 14 : 16} fill="currentColor" viewBox={s.vb}>{s.svg}</svg>
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-white transition-colors group">
              {t.backToTop}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Mohammad Owais. {t.footerRights}</p>
            <p className="text-gray-700 text-xs">{t.footerBuilt}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}