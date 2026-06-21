/* ============================================================
   data.js — Single source of truth for all portfolio content.
   Uses localStorage for Admin edits to persist without a backend.
   ============================================================ */

const DEFAULT_DATA = {
  profile: {
    name: "Niraj Kumar",
    title: "Full-Stack Developer & Software Developer",
    subtitle: "MCA Student & Aspiring Web Developer",
    tagline: "I craft responsive, pixel-perfect web experiences that users love.",
    email: "niraj.kumar.in07@gmail.com",
    github: "https://github.com/Neerajhac96",
    linkedin: "https://www.linkedin.com/in/niraj649/",
    location: "India",
    available: true,
    bio: [
      "I'm Niraj Kumar, a passionate MCA student and aspiring full-Stack Developer with a strong foundation in HTML, CSS, and JavaScript.",
      "I love transforming design concepts into clean, interactive user interfaces. My focus is writing maintainable code that works beautifully across all devices and browsers.",
      "When I'm not coding, I'm exploring new web technologies, contributing to open-source projects, or sharpening my problem-solving skills.",
      "I'm actively seeking Full-Stack internship and entry-level opportunities where I can contribute, learn, and grow as a developer."
    ],
    stats: [
      { label: "Projects", value: "10+" },
      { label: "Certificates", value: "5+" },
      { label: "Years Learning", value: "2+" }
    ]
  },

  projects: [
    {
      id: "college-ai-assistant",
      name: "AI College Assistant (ChatVEDA)",
      shortDesc: "AI-powered multi-college chatbot platform for notices, PDFs, syllabus, and student queries.",
      fullDesc: "ChatDEVA is a SaaS-based AI chatbot platform designed for colleges and educational institutions. The system allows colleges to upload notices, PDFs, syllabus documents, exam schedules, and academic files, while students can ask questions in natural language through a ChatGPT-style interface. The platform uses Retrieval-Augmented Generation (RAG), vector search, and LLM APIs to provide accurate answers from uploaded college documents. It supports multi-college architecture with secure data isolation, JWT authentication, role-based access control, analytics dashboards, invite-based onboarding, and usage tracking.",
      features: ["AI chatbot for college queries","RAG-based document answering","PDF and notice upload system","ChatGPT-style chat interface","Multi-college SaaS architecture","Secure JWT authentication","Role-based access control","Invite-based college onboarding","Student and admin dashboards","Usage tracking and analytics","Vector search with ChromaDB","Groq LLM integration","Responsive React frontend","Secure college data isolation"],
      tech: ["FastAPI","React.js","Vite","Tailwind CSS","Python","PostgreSQL","SQLAlchemy","ChromaDB","Groq API","JWT Authentication","Axios","Docker","Railway"],
      github: "https://github.com/Neerajhac96/chatdeva",
      live: "",
      image: "assets/projects/ai.png",
      color: "#FF6B6B",
      featured: true
    },
    {
      id: "portfolio-website",
      name: "Portfolio Website",
      shortDesc: "This very portfolio — built from scratch with HTML, CSS & Vanilla JS.",
      fullDesc: "A fully handcrafted portfolio website built without any frameworks. Features dark/light mode, typing animation, dynamic project cards, GitHub stats integration, and a full Admin Dashboard.",
      features: ["Dark/Light mode with localStorage", "Typing animation", "Dynamic content from data store", "Admin Dashboard", "EmailJS contact form", "Particle hero background"],
      tech: ["HTML5", "CSS3", "Vanilla JavaScript", "EmailJS"],
      github: "https://github.com/nirajkumar",
      live: "https://nirajkumar.github.io",
      image: "assets/projects/portfolio.png",
      color: "#A78BFA",
      featured: true
    },
    {
      id: "weather-app",
      name: "Weather App",
      shortDesc: "Real-time weather with 5-day forecast using OpenWeatherMap API.",
      fullDesc: "A fully responsive weather application that fetches real-time data from the OpenWeatherMap API. Users can search any city worldwide and instantly see temperature, humidity, wind speed, and a 5-day forecast. Built with vanilla JavaScript and modern CSS.",
      features: ["Search by city name", "Live temperature, humidity & wind", "5-day forecast with icons", "Responsive mobile layout", "Error handling for invalid cities"],
      tech: ["HTML5", "CSS3", "JavaScript", "OpenWeatherMap API"],
      github: "https://github.com/nirajkumar/weather-app",
      live: "https://nirajkumar.github.io/weather-app",
      image: "assets/projects/weather.png",
      color: "#00D9C0",
      featured: true
    }
  ],

  skills: {
    Frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Flexbox & Grid", "DOM Manipulation", "REST APIs", "React (Learning)"],
    Backend: ["FastAPI", "Node.js", "Express.js", "JWT Authentication", "REST API Development", "Middleware", "MongoDB"],
    Languages: ["Java", "JavaScript", "Python", "SQL"],
    "AI/GenAI": ["Prompt Engineering", "OpenAI API", "RAG Basics", "LLM Concepts", "Vector Databases", "AI Chatbot Development"],
    Tools: ["Git & GitHub", "VS Code", "Chrome DevTools", "npm", "Postman", "Netlify", "Vercel"],
    "Core CS": ["Data Structures", "OOPs", "DBMS", "OS", "CN"],
    "Currently Learning": ["FastAPI", "LangChain", "Docker", "React", "System Design Basics"]
  },

  certificates: [
    { id: "cert1", title: "Problem Solving", issuer: "hackerrank", date: "2025", image: "assets/certificates/cert1.png", link: "https://www.hackerrank.com/", color: "#00D9C0" },
    { id: "cert2", title: "🤗 AI Agents Course", issuer: "huggingface", date: "2026", image: "assets/certificates/agent.webp", link: "https://huggingface.co/learn/agents-course/en/unit0/introduction", color: "#FF6B6B" },
    //{ id: "cert3", title: "Front-End Web Development", issuer: "Coursera", date: "2024", image: "assets/certificates/cert3.png", link: "https://coursera.org", color: "#A78BFA" }
  ],

  timeline: [
    {
    year: "2021",
    title: "Started BCA",
    org: "Langat Singh College, BRABU",
    desc: "Started Bachelor of Computer Applications and built a strong foundation in programming, computer science fundamentals, and web technologies.",
    type: "education",
    icon: "fa-graduation-cap"
  },

  {
    year: "2023",
    title: "Started Web Development Journey",
    org: "Self Learning",
    desc: "Began learning frontend web development with HTML, CSS, JavaScript, responsive design, and modern UI development practices.",
    type: "achievement",
    icon: "fa-code"
  },

  {
    year: "2023",
    title: "Earned Web Development Certifications",
    org: "Apna Collge",
    desc: "Completed certifications in Responsive Web Design, JavaScript, and Frontend Development while building hands-on projects.",
    type: "certificate",
    icon: "fa-certificate"
  },

  {
    year: "2024",
    title: "Completed BCA",
    org: "Langat Singh College, BRABU",
    desc: "Successfully completed Bachelor of Computer Applications with practical knowledge of software development and problem solving.",
    type: "education",
    icon: "fa-user-graduate"
  },

  {
    year: "2024",
    title: "Started MCA",
    org: "ABES Engineering College",
    desc: "Started Master of Computer Applications to deepen knowledge in software engineering, full-stack development, and AI technologies.",
    type: "education",
    icon: "fa-book-open"
  },

  {
    year: "2025",
    title: "Built AI Chatbot Project (ChatVEDA)",
    org: "Personal Project",
    desc: "Developed ChatVEDA, an AI-powered college assistant platform using FastAPI, React, RAG, vector databases, and LLM APIs.",
    type: "achievement",
    icon: "fa-robot"
  },

  {
  year: "2026",
  title: "Scaling ChatVEDA Platform",
  org: "AI SaaS Project",
  desc: "Improving ChatVEDA into a scalable multi-college AI assistant platform with RAG architecture, secure authentication, analytics, and cloud deployment.",
  type: "achievement",
  icon: "fa-robot"
}
  ],

  messages: []
};

// ---- Data Manager ----
const DataStore = {
  _key: "nk_portfolio_data",

  get() {
    try {
      const raw = localStorage.getItem(this._key);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
      const saved = JSON.parse(raw);
      // Deep merge: saved data overrides defaults but keeps default structure
      return {
        ...DEFAULT_DATA,
        ...saved,
        profile: { ...DEFAULT_DATA.profile, ...(saved.profile || {}) },
        projects: saved.projects || DEFAULT_DATA.projects,
        skills: saved.skills || DEFAULT_DATA.skills,
        certificates: saved.certificates || DEFAULT_DATA.certificates,
        timeline: saved.timeline || DEFAULT_DATA.timeline,
        messages: saved.messages || []
      };
    } catch {
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  },

  save(data) {
    try {
      localStorage.setItem(this._key, JSON.stringify(data));
      return true;
    } catch { return false; }
  },

  reset() {
    localStorage.removeItem(this._key);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  },

  addMessage(msg) {
    const data = this.get();
    const newMsg = {
      id: "msg_" + Date.now(),
      ...msg,
      timestamp: new Date().toISOString(),
      read: false,
      replied: false,
      reply: ""
    };
    data.messages.unshift(newMsg);
    // Keep max 200 messages
    if (data.messages.length > 200) data.messages = data.messages.slice(0, 200);
    this.save(data);
    return newMsg;
  },

  updateMessage(id, updates) {
    const data = this.get();
    const idx = data.messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      data.messages[idx] = { ...data.messages[idx], ...updates };
      this.save(data);
      return data.messages[idx];
    }
    return null;
  },

  deleteMessage(id) {
    const data = this.get();
    data.messages = data.messages.filter(m => m.id !== id);
    this.save(data);
  }
};
