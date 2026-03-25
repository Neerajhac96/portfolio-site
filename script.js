/* ============================================================
   script.js — Niraj Kumar Portfolio
   Sections:
     1. Theme (Dark / Light) with localStorage
     2. Navbar: scroll effect + active link tracking
     3. Mobile nav toggle
     4. Typing animation (Hero)
     5. Render Projects from data.js
     6. Render Skills from data.js
     7. Render Certificates from data.js
     8. Scroll-reveal animation (IntersectionObserver)
     9. Contact form (EmailJS-ready)
   ============================================================ */

// ---- Helpers ----
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============================================================
//  1. THEME — Dark / Light Mode
// ============================================================
const themeToggle = $("#themeToggle");
const themeIcon   = $("#themeIcon");
const html        = document.documentElement;

/**
 * Apply a theme and persist it in localStorage.
 * @param {"dark"|"light"} theme
 */
function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  // Swap icon: moon for dark mode, sun for light mode
  themeIcon.className = theme === "dark"
    ? "fa-solid fa-moon"
    : "fa-solid fa-sun";
  localStorage.setItem("portfolio-theme", theme);
}

// On page load: read saved preference (default = dark)
(function initTheme() {
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(saved);
})();

// Toggle on button click
themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ============================================================
//  2. NAVBAR — Scroll effect + active section tracking
// ============================================================
const navbar   = $("#navbar");
const navLinks = $$(".nav-link");

window.addEventListener("scroll", () => {
  // Add shadow/border when scrolled
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Highlight nav link for current section
  const scrollPos = window.scrollY + 120;
  const sections  = $$("section[id]");

  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ============================================================
//  3. MOBILE NAV TOGGLE
// ============================================================
const hamburger      = $("#hamburger");
const mobileNav      = $("#mobileNav");
const mobileOverlay  = $("#mobileOverlay");
const mobileNavClose = $("#mobileNavClose");
const mobileLinks    = $$(".mobile-link");

function openMobileNav() {
  mobileNav.classList.add("open");
  mobileOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMobileNav);
mobileNavClose.addEventListener("click", closeMobileNav);
mobileOverlay.addEventListener("click", closeMobileNav);
// Close when a link is clicked
mobileLinks.forEach((link) => link.addEventListener("click", closeMobileNav));

// ============================================================
//  4. TYPING ANIMATION (Hero)
// ============================================================
const typedEl = $("#typedText");
const roles   = [
  "Frontend Developer",
  "UI Enthusiast",
  "Web Designer",
  "MCA Student",
  "Problem Solver",
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer = null;

function typeEffect() {
  const currentRole = roles[roleIndex];
  const speed = isDeleting ? 60 : 110;

  if (!isDeleting) {
    // Typing forward
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Pause at end then start deleting
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1800);
      return;
    }
  } else {
    // Deleting
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      clearTimeout(typingTimer);
      typingTimer = setTimeout(typeEffect, 400);
      return;
    }
  }

  typingTimer = setTimeout(typeEffect, speed);
}

// Start after a short delay so page can render
setTimeout(typeEffect, 800);

// ============================================================
//  5. RENDER PROJECTS
// ============================================================
const projectsGrid = $("#projectsGrid");

/**
 * Build a project card element from a data object.
 * @param {Object} project — one entry from projects[] in data.js
 * @returns {HTMLElement}
 */
function buildProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card reveal";

  // Tech tags HTML
  const tagsHTML = project.tech
    .map((t) => `<span class="tech-tag">${t}</span>`)
    .join("");

  card.innerHTML = `
    <div class="project-card-img">
      <img
        src="${project.image}"
        alt="${project.name} screenshot"
        loading="lazy"
        onerror="this.style.display='none'"
      />
      <div class="project-thumb-fallback" style="color:${project.color || "var(--accent)"}">
        ${project.name.substring(0, 2).toUpperCase()}
      </div>
    </div>
    <div class="project-card-body">
      <h3 class="project-card-title">${project.name}</h3>
      <p class="project-card-desc">${project.shortDesc}</p>
      <div class="project-tech-stack">${tagsHTML}</div>
      <div class="project-card-links">
        <a href="${project.github}" class="card-link" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="fa-brands fa-github"></i> Code
        </a>
        <a href="${project.live}" class="card-link" target="_blank" rel="noopener" aria-label="Live demo">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Live
        </a>
        <a href="project-detail.html?id=${project.id}" class="card-link-detail">
          Details <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;

  return card;
}

// Inject all project cards
if (projectsGrid && typeof projects !== "undefined") {
  projects.forEach((proj) => projectsGrid.appendChild(buildProjectCard(proj)));
}

// ============================================================
//  6. RENDER SKILLS
// ============================================================
const skillsWrapper = $("#skillsWrapper");

function renderSkills() {
  if (!skillsWrapper || typeof skills === "undefined") return;

  Object.entries(skills).forEach(([category, items]) => {
    const section = document.createElement("div");
    section.className = "skill-category reveal";

    const tagsHTML = items
      .map((skill) => `<span class="skill-tag">${skill}</span>`)
      .join("");

    section.innerHTML = `
      <h3 class="skill-cat-title">${category}</h3>
      <div class="skill-tags">${tagsHTML}</div>
    `;

    skillsWrapper.appendChild(section);
  });
}

renderSkills();

// ============================================================
//  7. RENDER CERTIFICATES
// ============================================================
const certsGrid = $("#certsGrid");

/**
 * Build a certificate card.
 * @param {Object} cert — one entry from certificates[] in data.js
 * @returns {HTMLElement}
 */
function buildCertCard(cert) {
  const card = document.createElement("a");
  card.className  = "cert-card reveal";
  card.href       = cert.link || "#";
  card.target     = "_blank";
  card.rel        = "noopener";
  card.setAttribute("aria-label", `${cert.title} certificate`);

  card.innerHTML = `
    <div class="cert-img-wrap">
      <img
        src="${cert.image}"
        alt="${cert.title}"
        loading="lazy"
        onerror="this.style.display='none'"
      />
      <div class="cert-img-placeholder">
        <i class="fa-solid fa-certificate"></i>
        <span>View Certificate</span>
      </div>
    </div>
    <div class="cert-body">
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-issuer">${cert.issuer}</p>
      <p class="cert-date">${cert.date}</p>
    </div>
  `;

  return card;
}

if (certsGrid && typeof certificates !== "undefined") {
  certificates.forEach((cert) => certsGrid.appendChild(buildCertCard(cert)));
}

// ============================================================
//  8. SCROLL-REVEAL ANIMATION (IntersectionObserver)
// ============================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        // Unobserve after reveal so it doesn't un-reveal on scroll back
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

// Observe all .reveal elements — including dynamically injected ones
// We use a MutationObserver to catch dynamically added nodes
const domObserver = new MutationObserver(() => {
  $$(".reveal:not(.revealed)").forEach((el) => revealObserver.observe(el));
});

domObserver.observe(document.body, { childList: true, subtree: true });

// Also observe any already-present .reveal elements
$$(".reveal").forEach((el) => revealObserver.observe(el));

// ============================================================
//  9. CONTACT FORM (EmailJS-ready)
// ============================================================
const sendBtn    = $("#sendBtn");
const formSuccess = $("#formSuccess");
const formWrap   = $("#contactFormWrap");

/**
 * To activate EmailJS:
 *   1. Go to https://www.emailjs.com and create an account
 *   2. Add a service (Gmail, Outlook, etc.)
 *   3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
 *   4. Add your Public Key below
 *   5. Uncomment the emailjs.init() line and the emailjs.send() block
 */

// emailjs.init("YOUR_PUBLIC_KEY"); // ← Uncomment and add your key

if (sendBtn) {
  sendBtn.addEventListener("click", handleFormSubmit);
}

function handleFormSubmit() {
  const name    = $("#userName")?.value.trim();
  const email   = $("#userEmail")?.value.trim();
  const message = $("#userMessage")?.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormAlert("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFormAlert("Please enter a valid email address.", "error");
    return;
  }

  // Show loading state
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  /* ---- EmailJS integration (uncomment to activate) ----
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name:  name,
    from_email: email,
    message:    message,
  })
  .then(() => {
    showSuccess();
  })
  .catch((err) => {
    console.error("EmailJS error:", err);
    showFormAlert("Something went wrong. Please try again.", "error");
    resetSendBtn();
  });
  -------------------------------------------------------- */

  // Demo simulation (remove when EmailJS is live)
  setTimeout(() => {
    showSuccess();
  }, 1200);
}

function showSuccess() {
  if (formWrap)   formWrap.classList.add("hidden");
  if (formSuccess) formSuccess.classList.remove("hidden");
}

function resetSendBtn() {
  sendBtn.disabled = false;
  sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormAlert(msg, type) {
  // Simple inline alert — remove any existing one first
  const existing = $(".form-alert");
  if (existing) existing.remove();

  const alert = document.createElement("p");
  alert.className = "form-alert";
  alert.textContent = msg;
  alert.style.cssText = `
    color: ${type === "error" ? "var(--accent-2)" : "var(--accent)"};
    font-size: 0.85rem;
    margin-top: -10px;
    font-family: var(--font-mono, monospace);
  `;
  sendBtn.insertAdjacentElement("beforebegin", alert);
  setTimeout(() => alert.remove(), 4000);
}
