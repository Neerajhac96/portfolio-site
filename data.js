// ============================================================
//  data.js — All portfolio content lives here.
//  To add a new project: copy one object, change its values.
//  To add a certificate: copy one object in the certs array.
// ============================================================

const projects = [
  {
    id: "weather-app",
    name: "Weather App",
    shortDesc: "Live weather data with clean UI and 5-day forecast using OpenWeatherMap API.",
    fullDesc:
      "A fully responsive weather application that fetches real-time data from the OpenWeatherMap API. Users can search any city worldwide and instantly see temperature, humidity, wind speed, and a 5-day forecast. Built with vanilla JavaScript and modern CSS, it features smooth transitions and an intuitive UI that works beautifully on all screen sizes.",
    features: [
      "Search weather by city name",
      "Live temperature, humidity & wind speed",
      "5-day forecast with weather icons",
      "Responsive layout for mobile & desktop",
      "Error handling for invalid city names",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "OpenWeatherMap API"],
    github: "https://github.com/nirajkumar",
    live: "https://nirajkumar.github.io/weather-app",
    image: "assets/projects/weather.png",
    images: ["assets/projects/weather.png"],
    color: "#00D9C0",
  },
  {
    id: "todo-app",
    name: "Task Manager",
    shortDesc: "A clean drag-and-drop task manager with localStorage persistence.",
    fullDesc:
      "A feature-rich task management application with drag-and-drop reordering, priority labels, and deadline tracking. All tasks are saved to localStorage so data persists across sessions. The UI is minimal and distraction-free, designed to keep users focused on what matters.",
    features: [
      "Add, edit & delete tasks",
      "Drag-and-drop reordering",
      "Priority labels (High / Medium / Low)",
      "Deadline picker with overdue alerts",
      "Persistent storage via localStorage",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "localStorage API"],
    github: "https://github.com/nirajkumar",
    live: "https://nirajkumar.github.io/todo-app",
    image: "assets/projects/todo.png",
    images: ["assets/projects/todo.png"],
    color: "#FF6B6B",
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    shortDesc: "This very portfolio — built from scratch with HTML, CSS & Vanilla JS.",
    fullDesc:
      "A fully handcrafted portfolio website built without any frameworks. Features include dark/light mode with localStorage preference, typing animation, dynamically rendered project cards from a data file, GitHub stats integration, and a contact form ready for EmailJS. Designed mobile-first with clean code that's easy to extend.",
    features: [
      "Dark / Light mode with localStorage",
      "Typing animation on hero section",
      "Projects & certificates loaded from data.js",
      "Fully responsive — mobile first",
      "EmailJS-ready contact form",
      "GitHub stats section",
    ],
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "EmailJS"],
    github: "https://github.com/nirajkumar",
    live: "https://nirajkumar.github.io",
    image: "assets/projects/portfolio.png",
    images: ["assets/projects/portfolio.png"],
    color: "#A78BFA",
  },
  {
    id: "quiz-app",
    name: "Quiz App",
    shortDesc: "Interactive quiz with timer, score tracking, and multiple categories.",
    fullDesc:
      "A dynamic quiz application that pulls questions from the Open Trivia Database API. Users choose a category and difficulty, then race against a countdown timer. Score is tracked throughout and a detailed results screen shows correct answers at the end.",
    features: [
      "Category & difficulty selection",
      "Countdown timer per question",
      "Live score tracking",
      "Results screen with correct answers",
      "Responsive and accessible UI",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Open Trivia DB API"],
    github: "https://github.com/nirajkumar",
    live: "https://nirajkumar.github.io/quiz-app",
    image: "assets/projects/quiz.png",
    images: ["assets/projects/quiz.png"],
    color: "#FBBF24",
  },
];

// ============================================================
//  CERTIFICATES — Add new certs by copying an object below
// ============================================================

const certificates = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    image: "assets/certificates/cert1.png",
    link: "https://freecodecamp.org",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    image: "assets/certificates/cert2.png",
    link: "https://freecodecamp.org",
  },
  {
    title: "Front-End Web Development",
    issuer: "Coursera",
    date: "2024",
    image: "assets/certificates/cert3.png",
    link: "https://coursera.org",
  },
];

// ============================================================
//  SKILLS — Grouped by category
// ============================================================

const skills = {
  Frontend: [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "Responsive Design",
    "Flexbox & Grid",
    "DOM Manipulation",
    "REST APIs",
    "React (Learning)",
  ],
  Tools: [
    "Git & GitHub",
    "VS Code",
    "Figma",
    "Chrome DevTools",
    "npm",
    "Postman",
    "Netlify",
    "Vercel",
  ],
};
