// ============================================================
//  data.js — All portfolio content lives here.
//  To add a new project: copy one object, change its values.
//  To add a certificate: copy one object in the certs array.
// ============================================================

const projects = [
   {
  id: "chatdeva",
  name: "ChatDeva AI",
  shortDesc: "AI-powered chatbot that answers queries using custom data (RAG system).",

  fullDesc:
    "ChatDeva is an AI chatbot built using Retrieval-Augmented Generation (RAG). It allows users to ask questions and get accurate answers from custom data sources. The system uses embeddings and vector search to retrieve relevant information before generating responses. Designed with a clean UI and real-time interaction.",

  features: [
    "AI chatbot with real-time responses",
    "RAG (Retrieval-Augmented Generation) system",
    "Custom document-based Q&A",
    "Fast search using embeddings",
    "Clean and responsive UI"
  ],

  tech: ["Python", "Streamlit", "LangChain", "FAISS", "OpenAI API"],

  github: "https://github.com/Neerajhac96/chatdeva",   // apna actual repo dalna
  live: "https://chatdeva-production-04b8.up.railway.app/",  // agar deploy nahi kiya hai to "#" rakho

  image: "assets/projects/chatdeva.png",
  images: ["assets/projects/chatdeva.png","assets/projects/chatdeva1.png"],

  color: "#10B981"
},
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
    github: "https://github.com/Neerajhac96/weather_app",
    live: "https://neerajhac96.github.io/weather_app/",
    image: "assets/projects/weather.png",
    images: ["assets/projects/weather.png"],
    color: "#00D9C0",
  },
  {
    id: "MERN",
    name: "MERN Stack Auth & Dashboard App",
    shortDesc: "Full-stack web app with JWT authentication and a protected user dashboard.",
    fullDesc:
      "SecureAuth Dashboard is a full-stack web application that provides secure user authentication and a protected dashboard. Users can sign up and log in with encrypted passwords using bcrypt. After authentication, a JWT token is generated and used to access protected routes. The dashboard fetches user data from the backend and displays it dynamically. The project demonstrates complete integration of frontend, backend, and database with proper authentication and security practices.",
    features: [
      "User signup and login system",
      "JWT-based authentication and authorization",
      "Protected dashboard with token verification",
      "Password encryption using bcryptjs",
      "Dynamic data fetching from backend API",
      "Responsive UI using Bootstrap"
    ],
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "Node.js", "Express.js", "MongoDB", "JWT", "bcryptjs"],
    github: "https://github.com/Neerajhac96/myfullstack",
    live: "https://startify23.netlify.app",
    image: "assets/projects/mern.png",
    images: ["assets/projects/mern.png","assets/projects/mern1.png"],
    color: "#A78BFA",
  },
];

// ============================================================
//  CERTIFICATES — Add new certs by copying an object below
// ============================================================

const certificates = [
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "2023",
    image: "assets/certificates/cert1.png",
    link: "https://drive.google.com/file/d/1bs0_cueGCmki3O-XehwMsltBTAnrowkf/view?usp=sharing",
  },
  //{
    //title: "JavaScript Algorithms & Data Structures",
    //issuer: "freeCodeCamp",
    //date: "2023",
    //image: "assets/certificates/cert2.png",
    //link: "https://freecodecamp.org",
  //},
  //{
    //title: "Front-End Web Development",
    //issuer: "Coursera",
    //date: "2024",
    //image: "assets/certificates/cert3.png",
    //link: "https://coursera.org",
  //},
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
    "React (Learning)"
  ],

  Backend: [
    "Node.js",
    "Express.js",
    "REST API Development",
    "JWT Authentication",
    "Middleware"
  ],

  AI_ML: [
    "Python",
    "LangChain",
    "FAISS (Vector DB)",
    "RAG (Retrieval-Augmented Generation)",
    "OpenAI API",
    "Prompt Engineering (Learning)"
  ],

  Database: [
    "MongoDB",
    "LocalStorage",
    "Basic SQL"
  ],

  Tools: [
    "Git & GitHub",
    "VS Code",
    "Figma",
    "Chrome DevTools",
    "Postman",
    "Streamlit",
    "Netlify",
    "Vercel"
  ]
};
