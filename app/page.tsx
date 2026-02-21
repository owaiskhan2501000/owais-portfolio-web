"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  // Yeh 'State' hai jo yaad rakhega ke abhi konsi zaban chal rahi hai (default 'en' yani English hai)
  const [lang, setLang] = useState<"en" | "zh">("en");

  // --- TRANSLATIONS DICTIONARY ---
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
    },
    zh: {
      greeting: "你好，我是", // Nǐ hǎo, wǒ shì
      role: "人工智能研究员 | 二维动画师 | Web 开发者", 
      bio: "我是一名计算机科学本科生，热衷于构建现代网络应用、训练智能 AI 模型以及创作二维动画。",
      exploreBtn: "浏览我的项目",
      projectsTitle: "我的项目",
      viewGithub: "在 GitHub 上查看",
      loginToView: "登录查看代码",
      signIn: "登录",
    }
  }[lang];

  // Aap ke projects (English aur Chinese dono mein)
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

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans relative transition-all duration-300">
      
      {/* --- TOP NAVBAR --- */}
      <header className="absolute top-0 right-0 p-6 z-10 flex items-center gap-4">
        
        {/* Language Toggle Button */}
        <button 
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-all border border-gray-600 text-sm md:text-base"
        >
          {lang === "en" ? "🇨🇳 中文" : "🇺🇸 English"}
        </button>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30">
              {t.signIn}
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center justify-center p-8 min-h-screen">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            {t.greeting} <span className="text-blue-500">Mohammad Owais</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-8 font-medium">
            {t.role}
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30">
              {t.exploreBtn}
            </a>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="p-8 md:p-16 bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.projectsTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all group flex flex-col">
                <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">{project.category}</span>
                <h3 className="text-2xl font-bold mt-2 mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <SignedIn>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      {t.viewGithub}
                    </a>
                  </SignedIn>
                  
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-400 font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
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
    </main>
  );
}