# Mohammad Owais — Portfolio Website

A modern, animated personal portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. It showcases my work as an AI researcher, 2D animator, and full-stack web developer.

🌐 **Live Preview:** [owais-portfolio-web.vercel.app](https://owais-portfolio-web.vercel.app)

---

## ✨ Features

- **Smooth animations** powered by Framer Motion (parallax hero, scroll-triggered reveals, magnetic buttons)
- **Bilingual support** — English / Chinese toggle
- **Fully responsive** — optimised for mobile, tablet, and desktop
- **Semantic HTML** — `<main>`, `<nav>`, `<section>`, `<footer>` for accessibility & SEO
- **Next.js Metadata API** — title, description, Open Graph & Twitter card tags
- **Clerk authentication** for gated content

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Auth | Clerk |
| Scroll | Lenis (smooth scroll) |
| Deployment | Vercel |

---

## 📁 Folder Structure

```
owais-portfolio-web/
├── app/                # Next.js App Router pages & layouts
│   ├── layout.tsx      # Root layout with metadata & providers
│   ├── page.tsx        # Home page (single-page portfolio)
│   └── globals.css     # Global styles & Tailwind directives
├── components/         # Reusable UI components
├── lib/                # Utility / helper functions
├── hooks/              # Custom React hooks
├── types/              # Shared TypeScript types & interfaces
├── data/               # Static portfolio data (projects, skills, etc.)
├── public/             # Static assets (images, fonts, icons)
├── .prettierrc         # Prettier formatting config
└── next.config.ts      # Next.js configuration
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or `pnpm` / `yarn`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/owaiskhan2501000/owais-portfolio-web.git
cd owais-portfolio-web

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your Clerk keys in .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🌍 Deployment

This project is deployed on **Vercel**. Every push to the `main` branch triggers an automatic deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/owaiskhan2501000/owais-portfolio-web)

---

## 📄 License

MIT © [Mohammad Owais](https://github.com/owaiskhan2501000)
