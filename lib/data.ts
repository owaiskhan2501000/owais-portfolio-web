/**
 * ─────────────────────────────────────────────────────────────
 *  Single source of truth for all portfolio content.
 *  Update this file to change anything shown on the website.
 * ─────────────────────────────────────────────────────────────
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://owais-portfolio-web.vercel.app";

export const profile = {
  name: "Mohammad Owais",
  role: "Undergraduate Researcher",
  headline: "Medical Image Analysis · Brain MRI Super-Resolution · Computer Vision",
  tagline:
    "I study when deep super-resolution models can be trusted on medical scans — measuring fidelity, hallucination and real diagnostic utility under reproducible protocols.",
  location: "Mianwali, Pakistan",
  email: "owaiskhan2501000@gmail.com",
  phone: "+92 314 6981530",
  cv: "/Mohammad_Owais_CV.pdf",
  photo: "/profile-hr.webp",
  status: "Open to fully-funded MS / research opportunities · 2027",
  socials: {
    github: "https://github.com/owaiskhan2501000",
    linkedin: "https://linkedin.com/in/mohammad-owais-cs-13607ai",
    orcid: "https://orcid.org/0009-0005-2319-3284",
    zenodo: "https://doi.org/10.5281/zenodo.23467749",
  },
} as const;

export const about = {
  paragraphs: [
    "I'm a final-year BS Computer Science student at Abbottabad University of Science and Technology (AUST), working at the intersection of deep learning and medical imaging.",
    "My recent work — first-authored in collaboration with the Faculty of Systems Design, Tokyo Metropolitan University — benchmarks off-the-shelf CNN, GAN and Transformer super-resolution models on 2,000 public brain-tumor MRI slices without fine-tuning. It shows that pixel-loss models such as SwinIR and EDSR transfer surprisingly well, while perceptually-trained GANs can fabricate anatomically meaningless texture.",
    "I care deeply about reproducibility: every result I publish ships with open code, dataset manifests, per-image metrics and an archived DOI.",
  ],
  interests: [
    "Brain MRI super-resolution",
    "Perception–distortion trade-off",
    "Hallucination & structural fidelity",
    "Downstream diagnostic utility",
    "3D state-space models (Mamba / SSMs)",
    "Anatomy-aware reconstruction",
  ],
  stats: [
    { value: 2000, suffix: "", label: "MRI slices benchmarked" },
    { value: 5, suffix: "", label: "SR methods compared" },
    { value: 10000, suffix: "", label: "Per-image metric rows released" },
    { value: 3.22, suffix: " dB", label: "SwinIR gain over bicubic", decimals: 2 },
  ],
};

/* ─────────────── Featured research ─────────────── */

export type SRResult = {
  method: string;
  type: "Interpolation" | "CNN" | "GAN" | "Transformer";
  psnr: number;
  psnrSd: number;
  ssim: number;
  lpips: number;
  acc: number; // downstream ResNet-18 accuracy (%)
  delta?: number; // ΔPSNR vs bicubic (dB)
};

export const research = {
  title:
    "Benchmarking Off-the-Shelf Deep Learning Super-Resolution Models on Public Brain Tumor MRI: A CNN-versus-Transformer Comparison Without Fine-Tuning",
  short: "Brain Tumor MRI Super-Resolution Benchmark",
  authors: "Mohammad Owais*, Muhammad Owais",
  affiliations:
    "Abbottabad University of Science and Technology, Pakistan · Faculty of Systems Design, Tokyo Metropolitan University, Japan",
  venue: "Visual Computing for Industry, Biomedicine, and Art (Springer Nature, SCIE)",
  status: "Under review",
  submissionId: "VICO-D-26-00680",
  period: "Jun 2026 – Oct 2026",
  role: "First & Corresponding Author",
  summary:
    "Five 4× single-image SR methods were evaluated with frozen, released weights on 2,000 slices (500 each of glioma, meningioma, pituitary tumor and no-tumor) from the public Brain Tumor MRI Dataset, using head-mask PSNR/SSIM, full-frame LPIPS, paired Wilcoxon tests with bootstrap CIs, and a downstream ResNet-18 tumor classifier over five random splits.",
  highlights: [
    "SwinIR achieved the best score on every metric — +3.22 dB head-mask PSNR over bicubic (p < 0.001).",
    "Real-ESRGAN was the only learned model below bicubic (−4.30 dB) despite better LPIPS, fabricating texture along tissue boundaries — reproduced by a bicubic-trained ESRGAN control.",
    "Pixel-loss models recovered ~39–61% of the classification accuracy lost to downsampling (84.0% → 89.6% with SwinIR).",
    "Fully reproducible: shared lossless LR/HR inputs, 64-bit DCT pHash duplicate screening and Bonferroni-corrected statistics.",
  ],
  results: [
    { method: "Bicubic", type: "Interpolation", psnr: 28.35, psnrSd: 4.81, ssim: 0.824, lpips: 0.24, acc: 84.0 },
    { method: "EDSR", type: "CNN", psnr: 31.36, psnrSd: 4.93, ssim: 0.887, lpips: 0.142, acc: 89.0, delta: 3.01 },
    { method: "Waifu2x", type: "CNN", psnr: 30.67, psnrSd: 4.86, ssim: 0.876, lpips: 0.145, acc: 87.6, delta: 2.33 },
    { method: "Real-ESRGAN", type: "GAN", psnr: 24.05, psnrSd: 3.42, ssim: 0.752, lpips: 0.207, acc: 86.7, delta: -4.3 },
    { method: "SwinIR", type: "Transformer", psnr: 31.57, psnrSd: 4.95, ssim: 0.889, lpips: 0.138, acc: 89.6, delta: 3.22 },
  ] satisfies SRResult[],
  hrAccuracy: 93.3,
  links: {
    code: "https://github.com/owaiskhan2501000/Brain-MRI-SR-Benchmark",
    zenodo: "https://doi.org/10.5281/zenodo.23467749",
    dataset: "https://doi.org/10.34740/KAGGLE/DSV/2645886",
  },
  tags: ["PyTorch", "SwinIR", "EDSR", "Real-ESRGAN", "Waifu2x", "ResNet-18", "LPIPS", "Wilcoxon"],
};

/* ─────────────── Publications ─────────────── */

export const publications = [
  {
    year: "2026",
    authors: "Owais, Mohammad*, & Owais, Muhammad.",
    title: research.title,
    venue: research.venue,
    status: `Under review · Submission ID ${research.submissionId}`,
    links: [
      { label: "Code", href: research.links.code },
      { label: "Zenodo", href: research.links.zenodo },
    ],
  },
];

/* ─────────────── Projects ─────────────── */

export const projects = [
  {
    title: "Neural Image & Video Super-Resolution Engine",
    badge: "BS Final Year Project",
    period: "May 2026 – Present",
    description:
      "An image and video upscaling pipeline built on Real-ESRGAN. Spatial tiling and batching keep GPU memory in check during inference, and an FFmpeg-based stage decodes, reconstructs and re-encodes video at a constant output frame rate.",
    points: ["Spatial tiling + batching for low-VRAM GPUs", "FFmpeg frame pipeline with constant FPS", "Supervised by Ms. Naveeda Bibi"],
    tags: ["Python", "PyTorch", "Real-ESRGAN", "FFmpeg", "CUDA"],
    icon: "video",
    featured: true,
  },
  {
    title: "Brain MRI Preprocessing Pipeline",
    badge: "Medical Imaging",
    period: "Aug 2026 – Sep 2026",
    description:
      "Preprocessing workflows for volumetric MRI in NIfTI format: canonical RAS re-orientation, N4 bias-field correction, foreground head-mask segmentation and 64×64×64 voxel patch extraction for 3D models.",
    points: ["Canonical RAS orientation", "N4 bias-field correction", "3D patch extraction"],
    tags: ["Python", "PyTorch", "NiBabel", "SimpleITK"],
    icon: "brain",
  },
  {
    title: "Multimodal Retrieval-Augmented Generation",
    badge: "LLM / RAG",
    period: "Apr 2026 – May 2026",
    description:
      "An audio/video transcription and retrieval pipeline: Whisper transcribes media, FAISS indexes the content, and Llama 3.1 performs summarization and question answering over the indexed material.",
    points: ["Whisper speech-to-text", "FAISS vector search", "Llama 3.1 Q&A + summaries"],
    tags: ["Python", "LangChain", "FAISS", "Whisper", "Llama 3.1"],
    icon: "layers",
  },
  {
    title: "Brain-MRI-SR-Benchmark (Open Source)",
    badge: "MIT License",
    period: "2026",
    description:
      "The complete end-to-end evaluation pipeline behind my manuscript: master notebook, 2,000-slice manifest, 10,000-row per-image metrics, residual heat-maps and 5-seed classification outputs — archived on Zenodo.",
    points: ["SR_Master_Pipeline.ipynb", "manifest.json + per-image metrics", "DOI: 10.5281/zenodo.23467749"],
    tags: ["Reproducibility", "Jupyter", "Zenodo", "Statistics"],
    icon: "database",
    featured: true,
    href: "https://github.com/owaiskhan2501000/Brain-MRI-SR-Benchmark",
  },
] as const;

/* ─────────────── Experience & education ─────────────── */

export const timeline = [
  {
    period: "Jun 2026 – Oct 2026",
    title: "Undergraduate Researcher — First & Corresponding Author",
    org: "In collaboration with Faculty of Systems Design, Tokyo Metropolitan University, Japan",
    description:
      "Designed and executed a reproducible benchmark of five SR methods on brain tumor MRI; wrote and submitted the manuscript to a Springer Nature SCIE journal.",
    kind: "research",
  },
  {
    period: "May 2026 – Present",
    title: "BS Final Year Project — Neural Image & Video SR Engine",
    org: "Supervisor: Ms. Naveeda Bibi, AUST",
    description: "Real-ESRGAN-based upscaling for images and video with GPU-aware tiling and FFmpeg encoding.",
    kind: "project",
  },
  {
    period: "2023 – Expected Mar 2027",
    title: "BS Computer Science (8th Semester)",
    org: "Abbottabad University of Science and Technology (AUST), Pakistan",
    description:
      "Coursework: Artificial Intelligence, Digital Image Processing, Linear Algebra, Probability & Statistics, DSA, Design & Analysis of Algorithms, Fundamentals of Data Mining.",
    kind: "education",
  },
] as const;

/* ─────────────── Skills ─────────────── */

export const skills = [
  { group: "Programming", icon: "code", items: ["Python", "C++", "SQL", "TypeScript", "JavaScript"] },
  {
    group: "Deep Learning & Vision",
    icon: "cpu",
    items: ["PyTorch", "Torchvision", "timm", "OpenCV", "EDSR", "SwinIR", "Real-ESRGAN", "ESRGAN", "Waifu2x", "ResNet-18"],
  },
  {
    group: "Medical Image Processing",
    icon: "scan",
    items: ["NiBabel", "SimpleITK", "scikit-image", "NIfTI volumes", "RAS orientation", "N4 bias correction", "Head-mask segmentation", "3D patches"],
  },
  {
    group: "Tools & Reproducibility",
    icon: "flask",
    items: ["Git / GitHub", "Zenodo", "LaTeX", "Google Colab (CUDA/T4)", "FFmpeg", "VS Code"],
  },
  {
    group: "LLMs & Web",
    icon: "layers",
    items: ["LangChain", "FAISS", "Whisper", "Llama 3.1", "React", "Next.js"],
  },
] as const;

/* ─────────────── Certifications ─────────────── */

export const certifications = [
  { year: "2026", name: "Deep Learning Specialization", issuer: "DeepLearning.AI · Coursera" },
  { year: "2026", name: "Generative Adversarial Networks (GANs) Specialization", issuer: "DeepLearning.AI · Coursera" },
  { year: "2025", name: "Introduction to Computer Vision and Image Processing", issuer: "IBM · Coursera" },
  { year: "2024", name: "Python for Data Science, AI & Development", issuer: "IBM · Coursera" },
] as const;

/* ─────────────── Languages ─────────────── */

export const languages = [
  { name: "English", level: "Professional", detail: "Medium of instruction; university-issued English Proficiency Certificate (AUST)", value: 90 },
  { name: "Urdu", level: "Native", detail: "Mother tongue", value: 100 },
  { name: "Japanese", level: "Beginner", detail: "Hiragana, Katakana & basic JLPT N5 expressions", value: 20 },
] as const;

/* ─────────────── References ─────────────── */

export const references = [
  {
    name: "Ms. Naveeda Bibi",
    role: "BS Final Year Project Supervisor",
    title: "Assistant Professor, Department of Computer Science, AUST",
    email: "naveedabibi@aust.edu.pk",
  },
  {
    name: "Dr. Gohar Zaman",
    role: "Department Coordinator & Course Instructor (Data Mining)",
    title: "Assistant Professor, Department of Computer Science, AUST",
    email: "goharzaman@aust.edu.pk",
  },
] as const;

export const navItems = [
  { id: "abstract", label: "Abstract" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Methods" },
  { id: "contact", label: "Correspondence" },
] as const;

/** Paper-style keywords shown in the scrolling ticker */
export const keywords = [
  "Brain MRI",
  "Super-resolution",
  "Off-the-shelf evaluation",
  "Transformer",
  "Perception–distortion trade-off",
  "Hallucination",
  "Medical image analysis",
  "SwinIR",
  "EDSR",
  "Real-ESRGAN",
  "Waifu2x",
  "ResNet-18",
  "LPIPS",
  "Wilcoxon signed-rank",
  "NIfTI",
  "Reproducibility",
] as const;
