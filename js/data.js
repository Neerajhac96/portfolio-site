/* ============================================================
   data.js — Single source of truth for all portfolio content.
   Uses localStorage for Admin edits to persist without a backend.
   ============================================================ */

const DEFAULT_DATA = {
  profile: {
    name: "Niraj Kumar",
    title: "Web Developer",
    subtitle: "MCA Student & Aspiring Web Developer",
    tagline: "I craft responsive, pixel-perfect web experiences that users love.",
    email: "niraj@email.com",
    github: "https://github.com/Neerajhac96",
    linkedin: "https://www.linkedin.com/in/niraj649/",
    location: "India",
    available: true,
    bio: [
      "I'm Niraj Kumar, a passionate MCA student and aspiring Web Developer with a strong foundation in HTML, CSS, and JavaScript.",
      "I love transforming design concepts into clean, interactive user interfaces. My focus is writing maintainable code that works beautifully across all devices and browsers.",
      "When I'm not coding, I'm exploring new web technologies, contributing to open-source projects, or sharpening my problem-solving skills.",
      "I'm actively seeking frontend internship and entry-level opportunities where I can contribute, learn, and grow as a developer."
    ],
    stats: [
      { label: "Projects", value: "10+" },
      { label: "Certificates", value: "5+" },
      { label: "Years Learning", value: "2+" }
    ]
  },

  projects: [
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
    },
    {
      id: "todo-app",
      name: "Task Manager",
      shortDesc: "Clean drag-and-drop task manager with localStorage persistence.",
      fullDesc: "A feature-rich task management application with drag-and-drop reordering, priority labels, and deadline tracking. All tasks are saved to localStorage so data persists across sessions.",
      features: ["Add, edit & delete tasks", "Drag-and-drop reordering", "Priority labels (High/Medium/Low)", "Deadline picker with overdue alerts", "localStorage persistence"],
      tech: ["HTML5", "CSS3", "JavaScript", "localStorage API"],
      github: "https://github.com/nirajkumar/todo-app",
      live: "https://nirajkumar.github.io/todo-app",
      image: "assets/projects/todo.png",
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
      id: "quiz-app",
      name: "Quiz App",
      shortDesc: "Interactive quiz with timer, score tracking & multiple categories.",
      fullDesc: "A dynamic quiz application that pulls questions from the Open Trivia Database API. Users choose a category and difficulty, then race against a countdown timer. Score is tracked throughout and a detailed results screen shows correct answers.",
      features: ["Category & difficulty selection", "Countdown timer per question", "Live score tracking", "Results with correct answers", "Responsive accessible UI"],
      tech: ["HTML5", "CSS3", "JavaScript", "Open Trivia DB API"],
      github: "https://github.com/nirajkumar/quiz-app",
      live: "https://nirajkumar.github.io/quiz-app",
      image: "assets/projects/quiz.png",
      color: "#FBBF24",
      featured: false
    }
  ],

  skills: {
    Frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Flexbox & Grid", "DOM Manipulation", "REST APIs", "React (Learning)"],
    Tools: ["Git & GitHub", "VS Code", "Figma", "Chrome DevTools", "npm", "Postman", "Netlify", "Vercel"]
  },

  certificates: [
    { id: "cert1", title: "Responsive Web Design", issuer: "freeCodeCamp", date: "2023", image: "assets/certificates/cert1.png", link: "https://freecodecamp.org", color: "#00D9C0" },
    { id: "cert2", title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", date: "2023", image: "assets/certificates/cert2.png", link: "https://freecodecamp.org", color: "#FF6B6B" },
    { id: "cert3", title: "Front-End Web Development", issuer: "Coursera", date: "2024", image: "assets/certificates/cert3.png", link: "https://coursera.org", color: "#A78BFA" }
  ],

  timeline: [
    { year: "2022", title: "Started MCA", org: "University", desc: "Began Master of Computer Applications, deepening CS fundamentals.", type: "education", icon: "fa-graduation-cap" },
    { year: "2023", title: "First Open Source Contribution", org: "GitHub", desc: "Contributed to open source projects and built first portfolio.", type: "achievement", icon: "fa-code-branch" },
    { year: "2023", title: "freeCodeCamp Certifications", org: "freeCodeCamp", desc: "Earned Responsive Web Design & JavaScript certifications.", type: "certificate", icon: "fa-certificate" },
    { year: "2024", title: "Frontend Internship", org: "Tech Startup", desc: "Worked on production React applications and UI component libraries.", type: "work", icon: "fa-briefcase" },
    { year: "2024", title: "Portfolio v2 Launch", org: "Personal", desc: "Built this full-stack-style portfolio with Admin Dashboard.", type: "achievement", icon: "fa-rocket" }
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
