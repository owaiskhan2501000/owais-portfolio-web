"use client";

import { useState, useRef, useEffect } from "react"; // useEffect add kiya hai
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  
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

const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const smoothScroll = () => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
      
      // Agar position 1 se zyada hai toh animate karo
      if (currentPosition > 1) { 
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, Math.floor(currentPosition - currentPosition / 12)); 
      } else {
        // Jaise hi top par pohnchay, animation ko permanently rok do
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
      projectsTitle: "My Projects",
      viewGithub: "View on GitHub",
      loginToView: "Login to View Code",
      signIn: "Sign In",
      contactTitle: "Contact Me",
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
      animTitle: "2D Animation Showcase",
      animDesc: "Swipe or use arrows to see some of my custom 2D character designs and animations in action.",
      footerRights: "All rights reserved.",
      backToTop: "Back to Top"
    },
    zh: {
      greeting: "你好，我是",
      role: "人工智能研究员 | 二维动画师 | Web 开发者", 
      bio: "我是一名计算机科学本科生，热衷于构建现代网络应用、训练智能 AI 模型以及创作二维动画。",
      exploreBtn: "浏览我的项目",
      projectsTitle: "我的项目",
      viewGithub: "在 GitHub 上查看",
      loginToView: "登录查看代码",
      signIn: "登录",
      contactTitle: "联系我",
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
      animTitle: "二维动画展示",
      animDesc: "滑动或使用箭头查看我的一些自定义二维角色设计和动画演示。",
      footerRights: "版权所有。",
      backToTop: "回到顶部"
    }
  }[lang];

  // --- TYPEWRITER EFFECT LOGIC ---
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    setTypedText(""); // Jab bhi zaban badle, text clear kar do
    let i = 0;
    const fullText = `${t.greeting} Mohammad Owais`;
    
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(timer);
      }
    }, 100); // 100ms ki speed se type hoga

    return () => clearInterval(timer);
  }, [t.greeting]); // Zaban change hone par yeh effect dobara chalega
  // -------------------------------

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

  return (
    <main id="top" className="min-h-screen bg-gray-950 text-white font-sans relative transition-all duration-300 flex flex-col">
      
      <header className="absolute top-0 right-0 p-6 z-20 flex items-center gap-4">
        <button onClick={() => setLang(lang === "en" ? "zh" : "en")} className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-all border border-gray-600 text-sm md:text-base">
          {lang === "en" ? "🇨🇳 中文" : "🇺🇸 English"}
        </button>
        <SignedOut>
          <SignInButton mode="modal"><button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30">{t.signIn}</button></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton 
            showName={true}
            appearance={{
              // Yeh variables Clerk ke default colors change karte hain
              variables: {
                colorText: "white" 
              },
              elements: {
                userButtonBox: "flex flex-row-reverse gap-2 items-center",
                // Avatar par zabardast blue glow
                userButtonAvatarBox: "border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all",
                // Naam par safed color aur glow (!text-white isay force karega)
                userButtonOuterIdentifier: "!text-white font-bold text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              }
            }}
          />
        </SignedIn>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden p-8">
        
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gray-950/70 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full mx-auto">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">

{/* --- ULTIMATE TYPEWRITER FIX (GHOST TEXT TRICK) --- */}
            {/* Yahan 'mt-4' (margin-top) add kiya hai aur 'mb-6' ko kam karke 'mb-2' kar diya hai */}
            <div className="relative mt-4 mb-2 md:mt-6 md:mb-0 w-full text-center md:text-left">
              
              {/* 1. GHOST TEXT */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight flex flex-col items-center md:items-start opacity-0 pointer-events-none select-none">
                <span className="block mb-1 md:mb-2">{t.greeting}</span>
                <span className="block">Mohammad Owais |</span>
              </h1>

              {/* 2. ASAL TYPEWRITER */}
              <h1 className="absolute top-0 left-0 w-full h-full text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg flex flex-col items-center md:items-start">
                
                {/* Line 1: Greeting ("Hi, I'm") */}
                <span className="block text-white mb-1 md:mb-2">
                  {typedText.slice(0, t.greeting.length)}
                  {typedText.length <= t.greeting.length && (
                    <span className="animate-pulse text-blue-400 font-light ml-1">|</span>
                  )}
                </span>

                {/* Line 2: Name ("Mohammad Owais") */}
                <span className="block text-blue-500 drop-shadow-md whitespace-nowrap">
                  {typedText.slice(t.greeting.length).trim()}
                  {typedText.length > t.greeting.length && (
                    <span className="animate-pulse text-blue-400 font-light ml-1">|</span>
                  )}
                </span>
                
              </h1>
            </div>

            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-medium drop-shadow-md">{t.role}</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed drop-shadow-md">{t.bio}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 backdrop-blur-sm">{t.exploreBtn}</a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl shadow-blue-500/50">
              <Image src="/profile.png" alt="Mohammad Owais" fill className="object-cover object-top" priority />
            </div>
          </div>
        </div>
      </section>

      {/* --- BAAQI SECTIONS --- */}
      <section className="p-8 md:p-16 bg-gray-950 min-h-screen flex-shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.journeyTitle}</h2>
          <div className="relative border-l-2 border-blue-600 ml-4 md:ml-0 mb-12">
            {t.timeline.map((item, index) => (
              <div key={index} className="mb-10 ml-8 relative group">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-blue-600 border-4 border-gray-950 group-hover:bg-white transition-colors"></span>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors shadow-lg">
                  <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/Mohammad_Owais_CV.pdf" download="Mohammad_Owais_CV.pdf" className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              {t.downloadCV}
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="p-8 md:p-16 bg-gray-900 flex-shrink-0 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.projectsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all group flex flex-col">
                <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">{project.category}</span>
                <h3 className="text-2xl font-bold mt-2 mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, index) => <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">{tech}</span>)}
                </div>
                <div className="mt-auto">
                  <SignedIn>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                      {t.viewGithub}
                    </a>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-400 font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        {t.loginToView}
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p-8 md:p-16 bg-gray-900 border-t border-gray-800 flex-shrink-0 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">{t.animTitle} 🎨</h2>
              <p className="text-gray-400 text-lg">{t.animDesc}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={slideLeft} className="p-4 bg-gray-800 hover:bg-blue-600 text-white rounded-full transition-all border border-gray-700 hover:border-blue-500 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={slideRight} className="p-4 bg-gray-800 hover:bg-blue-600 text-white rounded-full transition-all border border-gray-700 hover:border-blue-500 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div ref={sliderRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth">
            {animations.map((anim) => (
              <div key={anim.id} className="min-w-[300px] md:min-w-[450px] bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden snap-center flex-shrink-0 group hover:border-blue-500 transition-all shadow-lg">
                <div className="relative h-64 md:h-80 w-full bg-black">
                  <video src={anim.src} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{anim.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p-8 md:p-16 bg-gray-950 flex-shrink-0 flex flex-col items-center justify-center relative z-10">
        <div className="max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-10 text-center">{t.contactTitle}</h2>
          <form action="https://api.web3forms.com/submit" method="POST" className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl flex flex-col gap-6">
            
            {/* MAKE SURE TO PUT YOUR ACCESS KEY BACK HERE */}
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
            
            <div>
              <label className="block text-gray-400 mb-2 font-medium">{t.nameLabel}</label>
              <input type="text" name="name" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 font-medium">{t.emailLabel}</label>
              <input type="email" name="email" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-gray-400 mb-2 font-medium">{t.msgLabel}</label>
              <textarea name="message" rows={5} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-colors mt-2 text-lg shadow-lg shadow-blue-500/30">
              {t.sendBtn}
            </button>
          </form>
        </div>
      </section>

{/* --- NEW FOOTER SECTION --- */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Side: Copyright (Perfectly Aligned) */}
          <div className="text-gray-500 text-sm flex-1 flex items-center justify-center md:justify-start">
            <p>&copy; {new Date().getFullYear()} <span className="text-gray-400 font-medium">Mohammad Owais</span>. {t.footerRights}</p>
          </div>

          {/* Center: Social Icons */}
          <div className="flex justify-center items-center gap-6 flex-1">
            <a href="https://github.com/MohammadOwais" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <a href="https://linkedin.com/in/mohammadowais" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-all" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
            <a href="https://youtube.com/MohammadOwais" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 hover:scale-110 transition-all" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://behance.net/MohammadOwais" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 hover:scale-110 transition-all" title="Behance">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.605 10.058c-1.042 0-1.745.247-2.112.74-.367.493-.55 1.16-.55 2.003h5.275c-.015-.862-.213-1.536-.593-2.02-.382-.485-1.025-.723-2.02-.723zm-7.925-1.99h-6.68v11.8h6.985c1.43 0 2.502-.345 3.218-1.037.715-.693 1.073-1.63 1.073-2.81 0-.75-.178-1.405-.533-1.966-.356-.56-.848-.95-1.478-1.17.47-.2.836-.525 1.096-.975.26-.45.39-.98.39-1.59 0-1.06-.328-1.85-1.002-2.385-.674-.535-1.69-.8-3.048-.8zm7.883 7.825c.348.455.93.682 1.748.682 1.127 0 1.838-.415 2.13-1.245h2.24c-.23 1.065-.77 1.9-1.62 2.505-.85.605-1.92.907-3.21.907-1.737 0-3.06-.51-3.97-1.53-.91-1.02-1.365-2.44-1.365-4.26 0-1.835.45-3.28 1.35-4.33.9-1.05 2.22-1.575 3.96-1.575 1.635 0 2.875.503 3.72 1.508.845 1.005 1.267 2.457 1.267 4.355v1.07h-7.65c.03.82.26 1.465.688 1.918zm-7.665-2.585h-4.14v-3.79h4.095c.875 0 1.485.178 1.83.535.345.358.518.848.518 1.47 0 .585-.162 1.04-.486 1.365-.325.326-.93.49-1.817.49zm.348 4.31h-4.485v-4.34h4.485c.985 0 1.66.196 2.025.59.365.394.548.96.548 1.7 0 .7-.183 1.25-.55 1.65-.366.4-1.04.6-2.023.6zm10.74-12.08h-6.26v1.495h6.26v-1.495z"/></svg>
            </a>
          </div>

{/* Right Side: Back to Top Button (React Smooth Scroll) */}
          <div className="flex justify-center md:justify-end flex-1">
            <button onClick={scrollToTop} className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600/10 border border-blue-500/40 hover:bg-blue-600 px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group">
              {t.backToTop}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7-7" /></svg>
            </button>
          </div>

        </div>
      </footer>

{/* Ek choti si CSS jisme smooth scrolling add ki gayi hai */}
      <style jsx global>{`
        /* Yeh line poori website ki scrolling ko smooth banati hai */
        html {
          scroll-behavior: smooth;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}