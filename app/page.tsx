"use client";

import Lenis from "lenis";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion, useInView } from "framer-motion";

// Scroll reveal wrapper component
function RevealOnScroll({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Animated counter component
function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [activeSection, setActiveSection] = useState("top");
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  // Navbar scroll effect & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);

      const sections = ["top", "journey", "skills", "projects", "animations", "contact"];
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interruptible smooth scroll to top
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    let expectedTop = document.documentElement.scrollTop || document.body.scrollTop;

    const smoothScroll = () => {
      const currentTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(currentTop - expectedTop) > 2) return;
      if (currentTop > 1) {
        expectedTop = Math.floor(currentTop - currentTop / 12);
        window.scrollTo(0, expectedTop);
        window.requestAnimationFrame(smoothScroll);
      } else {
        window.scrollTo(0, 0);
      }
    };
    smoothScroll();
  };

  const t = {
    en: {
      greeting: "Hi, I'm",
      role: "AI Researcher | 2D Animator | Web Developer",
      bio: "I am a final year BS Computer Science student passionate about building modern web applications, training intelligent AI models, and creating engaging 2D animations.",
      exploreBtn: "Explore My Projects",
      contactBtn: "Get In Touch",
      projectsTitle: "My Projects",
      viewGithub: "View on GitHub",
      loginToView: "Login to View Code",
      signIn: "Sign In",
      contactTitle: "Get In Touch",
      contactSubtitle: "Have a project in mind or want to collaborate? I'd love to hear from you.",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      msgLabel: "Your Message",
      sendBtn: "Send Message",
      journeyTitle: "My Journey & Resume",
      downloadCV: "Download Resume (PDF)",
      timeline: [
        { year: "2027 & Beyond", title: "Master's in AI (China)", desc: "Aiming to secure a fully-funded scholarship to pursue advanced research in Artificial Intelligence." },
        { year: "Feb/March 2027", title: "BS Computer Science", desc: "Expected graduation. Currently in my 7th semester, specializing in Web Technologies and Computer Vision." },
        { year: "2025 - 2026", title: "Final Year Projects", desc: "Developed a real-time Face Mask Detection system and a business model MVP for QuickRent Pakistan." }
      ],
      skillsTitle: "Skills & Expertise",
      skills: [
        { name: "Python & AI/ML", level: 90 },
        { name: "Web Development (React/Next.js)", level: 85 },
        { name: "2D Animation & Design", level: 80 },
        { name: "Computer Vision (OpenCV)", level: 75 },
        { name: "UI/UX & Graphic Design", level: 70 },
        { name: "TypeScript & JavaScript", level: 85 },
      ],
      statsProjects: "Projects Completed",
      statsTech: "Technologies Used",
      statsExperience: "Years Experience",
      statsCommits: "GitHub Commits",
      animTitle: "2D Animation Showcase",
      animDesc: "Swipe or use arrows to see some of my custom 2D character designs and animations in action.",
      footerRights: "All rights reserved.",
      backToTop: "Back to Top",
      navHome: "Home",
      navJourney: "Journey",
      navSkills: "Skills",
      navProjects: "Projects",
      navAnimations: "Animations",
      navContact: "Contact",
    },
    zh: {
      greeting: "你好，我是",
      role: "人工智能研究员 | 二维动画师 | Web 开发者",
      bio: "我是一名计算机科学本科生，热衷于构建现代网络应用、训练智能 AI 模型以及创作二维动画。",
      exploreBtn: "浏览我的项目",
      contactBtn: "联系我",
      projectsTitle: "我的项目",
      viewGithub: "在 GitHub 上查看",
      loginToView: "登录查看代码",
      signIn: "登录",
      contactTitle: "联系我",
      contactSubtitle: "有项目想法或想要合作？我很乐意听到您的想法。",
      nameLabel: "你的名字",
      emailLabel: "你的邮箱",
      msgLabel: "你的留言",
      sendBtn: "发送消息",
      journeyTitle: "我的经历与简历",
      downloadCV: "下载简历 (PDF)",
      timeline: [
        { year: "2027 及以后", title: "人工智能硕士 (中国)", desc: "致力于获得全额奖学金，以在人工智能领域进行深入的高级研究。" },
        { year: "2027年 2/3月", title: "计算机科学学士", desc: "预计毕业。目前大四（第七学期），专注于网络技术和计算机视觉。" },
        { year: "2025 - 2026", title: "毕业设计项目", desc: "开发了实时口罩检测系统以及 QuickRent Pakistan 的商业模式 MVP。" }
      ],
      skillsTitle: "技能与专长",
      skills: [
        { name: "Python & AI/ML", level: 90 },
        { name: "Web 开发 (React/Next.js)", level: 85 },
        { name: "二维动画与设计", level: 80 },
        { name: "计算机视觉 (OpenCV)", level: 75 },
        { name: "UI/UX 与平面设计", level: 70 },
        { name: "TypeScript & JavaScript", level: 85 },
      ],
      statsProjects: "已完成项目",
      statsTech: "使用技术",
      statsExperience: "年经验",
      statsCommits: "GitHub 提交",
      animTitle: "二维动画展示",
      animDesc: "滑动或使用箭头查看我的一些自定义二维角色设计和动画演示。",
      footerRights: "版权所有。",
      backToTop: "回到顶部",
      navHome: "首页",
      navJourney: "经历",
      navSkills: "技能",
      navProjects: "项目",
      navAnimations: "动画",
      navContact: "联系",
    }
  }[lang];

// Typewriter effect
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    setTypedText(""); 
    let i = 0;
    const fullText = `${t.greeting} Mohammad Owais`;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i < fullText.length) {
        const nextSpeed = Math.random() * 50 + 70; 
        timeoutId = setTimeout(typeWriter, nextSpeed);
      }
    };
    typeWriter();
    return () => clearTimeout(timeoutId);
  }, [t.greeting]); 

  // Smooth scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: lang === "en" ? "Face Mask Detection System" : "口罩检测系统",
      category: "AI & Machine Learning",
      description: lang === "en" ? "A computer vision model built to detect face masks in real-time. Created for my Final Year Project." : "一个用于实时检测口罩的计算机视觉模型。这是我的毕业设计项目。",
      techStack: ["Python", "OpenCV", "TensorFlow"],
      githubLink: "https://github.com/MohammadOwais/face-mask-detection"
    },
    {
      id: 2,
      title: "QuickRent Pakistan",
      category: "Web & App Development",
      description: lang === "en" ? "An MVP and business model application designed for modern rental properties in Pakistan." : "专为巴基斯坦现代租赁物业设计的 MVP 和商业模式应用程序。",
      techStack: ["UI/UX", "Business Planning", "MVP"],
      githubLink: "https://github.com/MohammadOwais/quickrent-pakistan"
    },
    {
      id: 3,
      title: lang === "en" ? "Brand Identity & Logos" : "品牌形象与徽标设计",
      category: "Graphics & Design",
      description: lang === "en" ? "Professional business cards and logos designed for brands like J Brothers Autos and Maoli Fast Food." : "为 J Brothers Autos 和 Maoli Fast Food 等品牌设计的专业名片和徽标。",
      techStack: ["Graphic Design", "Branding"],
      githubLink: "https://behance.net/MohammadOwais"
    },
    {
      id: 4,
      title: lang === "en" ? "2D Character Animations" : "二维角色动画",
      category: "Animation",
      description: lang === "en" ? "Custom 2D character generation and animations for digital storytelling and content creation." : "用于数字故事讲述和内容创作的定制二维角色生成和动画。",
      techStack: ["2D Animation", "Character Design"],
      githubLink: "https://youtube.com/MohammadOwais"
    }
  ];

  const animations = [
    { id: 1, title: "Animation Clip 1", src: "/clip1.mp4" },
    { id: 2, title: "Animation Clip 2", src: "/clip2.mp4" },
    { id: 3, title: "Animation Clip 3", src: "/clip3.mp4" }
  ];

  const navLinks = [
    { id: "top", label: t.navHome },
    { id: "journey", label: t.navJourney },
    { id: "skills", label: t.navSkills },
    { id: "projects", label: t.navProjects },
    { id: "animations", label: t.navAnimations },
    { id: "contact", label: t.navContact },
  ];

  return (
    <main id="top" className="min-h-screen bg-gray-950 text-white font-sans relative transition-all duration-300 flex flex-col">
      
      {/* --- STICKY NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavScrolled ? "bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-gray-800/50" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="text-xl font-extrabold tracking-tight">
            <span className="text-white">M</span><span className="text-blue-500">O</span>
          </a>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "zh" : "en")} className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg font-bold transition-all border border-gray-700 text-sm">
              {lang === "en" ? "🇨🇳 中文" : "🇺🇸 EN"}
            </button>
            <SignedOut>
              <SignInButton mode="modal"><button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30 text-sm">{t.signIn}</button></SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                showName={true}
                appearance={{
                  variables: { colorText: "white" },
                  elements: {
                    userButtonBox: "flex flex-row-reverse gap-2 items-center",
                    userButtonAvatarBox: "border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all",
                    userButtonOuterIdentifier: "!text-white font-bold text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden p-8">
        
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950 z-0"></div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full mx-auto">
          <motion.div 
            className="flex-1 text-center md:text-left order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Typewriter heading */}
            <div className="relative mt-4 mb-2 md:mt-6 md:mb-0 w-full text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight flex flex-col items-center md:items-start opacity-0 pointer-events-none select-none">
                <span className="block mb-1 md:mb-2">{t.greeting}</span>
                <span className="block">Mohammad Owais |</span>
              </h1>
              <h1 className="absolute top-0 left-0 w-full h-full text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg flex flex-col items-center md:items-start">
                <span className="block text-white mb-1 md:mb-2">
                  {typedText.slice(0, t.greeting.length)}
                  {typedText.length <= t.greeting.length && (
                    <span className="animate-pulse text-blue-400 font-light ml-1">|</span>
                  )}
                </span>
                <span className="block gradient-text drop-shadow-md whitespace-nowrap">
                  {typedText.slice(t.greeting.length).trim()}
                  {typedText.length > t.greeting.length && (
                    <span className="animate-pulse text-blue-400 font-light ml-1">|</span>
                  )}
                </span>
              </h1>
            </div>

            <motion.h2 
              className="text-xl md:text-2xl text-gray-400 mb-8 font-medium tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {t.role}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              {t.bio}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
            >
              <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 glow-blue hover:shadow-blue-500/50">{t.exploreBtn}</a>
              <a href="#contact" className="border-2 border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-blue-500/10">{t.contactBtn}</a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center md:justify-end order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl shadow-blue-500/50 animate-pulse-glow">
              <Image src="/profile.png" alt="Mohammad Owais" fill className="object-cover object-top" priority />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-10 -mt-16 mb-0">
        <div className="max-w-5xl mx-auto px-8">
          <div className="glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 10, suffix: "+", label: t.statsProjects },
              { value: 12, suffix: "+", label: t.statsTech },
              { value: 3, suffix: "+", label: t.statsExperience },
              { value: 200, suffix: "+", label: t.statsCommits },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto w-1/2 my-16"></div>

      {/* --- JOURNEY SECTION --- */}
      <section id="journey" className="p-8 md:p-16 bg-gray-950 flex-shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-4 text-center">{t.journeyTitle}</h2>
            <p className="text-gray-500 text-center mb-12 text-lg">From student to professional builder</p>
          </RevealOnScroll>
          <div className="relative border-l-2 border-blue-600/50 ml-4 md:ml-0 mb-12">
            {t.timeline.map((item, index) => (
              <RevealOnScroll key={index} delay={index * 0.15}>
                <div className="mb-10 ml-8 relative group">
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-blue-600 border-4 border-gray-950 group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300"></span>
                  <div className="glass-card p-6 rounded-xl hover:border-blue-500/50 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/10">
                    <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">{item.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll>
            <div className="text-center">
              <a href="/Mohammad_Owais_CV.pdf" download="Mohammad_Owais_CV.pdf" className="inline-flex items-center gap-3 border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t.downloadCV}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="section-divider mx-auto w-1/2"></div>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="p-8 md:p-16 bg-gray-950 flex-shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-4 text-center">{t.skillsTitle}</h2>
            <p className="text-gray-500 text-center mb-12 text-lg">Technologies & tools I work with</p>
          </RevealOnScroll>
          <div className="grid gap-6">
            {t.skills.map((skill, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="glass-card rounded-xl p-5 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-blue-400 font-bold text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-1/2"></div>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="p-8 md:p-16 bg-gray-950 flex-shrink-0 relative z-10">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-4 text-center">{t.projectsTitle}</h2>
            <p className="text-gray-500 text-center mb-12 text-lg">Featured work across different domains</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.id} delay={index * 0.1}>
                <div className="glass-card p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-500 group flex flex-col h-full hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
                  <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">{project.category}</span>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech, i) => <span key={i} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">{tech}</span>)}
                  </div>
                  <div className="mt-auto">
                    <SignedIn>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                        {t.viewGithub}
                      </a>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 font-semibold py-3 rounded-lg transition-all flex justify-center items-center gap-2 border border-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                          {t.loginToView}
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-1/2"></div>

      {/* --- ANIMATION SHOWCASE SECTION --- */}
      <section id="animations" className="p-8 md:p-16 bg-gray-950 flex-shrink-0 relative z-10">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4">{t.animTitle}</h2>
                <p className="text-gray-400 text-lg">{t.animDesc}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={slideLeft} className="p-3 bg-gray-800/80 hover:bg-blue-600 text-white rounded-full transition-all duration-300 border border-gray-700 hover:border-blue-500 shadow-lg hover:shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={slideRight} className="p-3 bg-gray-800/80 hover:bg-blue-600 text-white rounded-full transition-all duration-300 border border-gray-700 hover:border-blue-500 shadow-lg hover:shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </RevealOnScroll>
          <div ref={sliderRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth">
            {animations.map((anim) => (
              <div key={anim.id} className="min-w-[300px] md:min-w-[450px] glass-card rounded-2xl overflow-hidden snap-center flex-shrink-0 group hover:border-blue-500/50 transition-all duration-500 shadow-lg hover:shadow-blue-500/10">
                <div className="relative h-64 md:h-80 w-full bg-black">
                  <video src={anim.src} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{anim.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto w-1/2"></div>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="p-8 md:p-16 bg-gray-950 flex-shrink-0 flex flex-col items-center justify-center relative z-10">
        <div className="max-w-2xl w-full">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-4 text-center">{t.contactTitle}</h2>
            <p className="text-gray-500 text-center mb-10 text-lg">{t.contactSubtitle}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <form action="https://api.web3forms.com/submit" method="POST" className="glass-card p-8 rounded-2xl shadow-xl flex flex-col gap-6">
              
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium text-sm">{t.nameLabel}</label>
                <input type="text" name="name" required className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium text-sm">{t.emailLabel}</label>
                <input type="email" name="email" required className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium text-sm">{t.msgLabel}</label>
                <textarea name="message" rows={5} required className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all mt-2 text-lg shadow-lg shadow-blue-500/30 glow-blue hover:shadow-blue-500/50">
                {t.sendBtn}
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-950 border-t border-gray-800/50 py-8 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-gray-500 text-sm flex-1 flex items-center justify-center md:justify-start">
            <p>&copy; {new Date().getFullYear()} <span className="text-gray-400 font-medium">Mohammad Owais</span>. {t.footerRights}</p>
          </div>

          <div className="flex justify-center items-center gap-5 flex-1">
            <a href="https://github.com/owaiskhan2501000" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all duration-300" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/mohammad-owais-5653983b3" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-all duration-300" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
            <a href="http://www.youtube.com/@animatty13607" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-300" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.behance.net/mohammadowais28" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 hover:scale-110 transition-all duration-300" title="Behance">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.605 10.058c-1.042 0-1.745.247-2.112.74-.367.493-.55 1.16-.55 2.003h5.275c-.015-.862-.213-1.536-.593-2.02-.382-.485-1.025-.723-2.02-.723zm-7.925-1.99h-6.68v11.8h6.985c1.43 0 2.502-.345 3.218-1.037.715-.693 1.073-1.63 1.073-2.81 0-.75-.178-1.405-.533-1.966-.356-.56-.848-.95-1.478-1.17.47-.2.836-.525 1.096-.975.26-.45.39-.98.39-1.59 0-1.06-.328-1.85-1.002-2.385-.674-.535-1.69-.8-3.048-.8zm7.883 7.825c.348.455.93.682 1.748.682 1.127 0 1.838-.415 2.13-1.245h2.24c-.23 1.065-.77 1.9-1.62 2.505-.85.605-1.92.907-3.21.907-1.737 0-3.06-.51-3.97-1.53-.91-1.02-1.365-2.44-1.365-4.26 0-1.835.45-3.28 1.35-4.33.9-1.05 2.22-1.575 3.96-1.575 1.635 0 2.875.503 3.72 1.508.845 1.005 1.267 2.457 1.267 4.355v1.07h-7.65c.03.82.26 1.465.688 1.918zm-7.665-2.585h-4.14v-3.79h4.095c.875 0 1.485.178 1.83.535.345.358.518.848.518 1.47 0 .585-.162 1.04-.486 1.365-.325.326-.93.49-1.817.49zm.348 4.31h-4.485v-4.34h4.485c.985 0 1.66.196 2.025.59.365.394.548.96.548 1.7 0 .7-.183 1.25-.55 1.65-.366.4-1.04.6-2.023.6zm10.74-12.08h-6.26v1.495h6.26v-1.495z"/></svg>
            </a>
          </div>

          <div className="flex justify-center md:justify-end flex-1">
            <button onClick={scrollToTop} className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600/10 border border-blue-500/40 hover:bg-blue-600 px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group">
              {t.backToTop}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7-7" /></svg>
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}