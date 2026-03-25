/* ============================================================
   project-detail.js
   How it works:
     1. Reads the "?id=project-id" query param from the URL
     2. Finds the matching project in the projects[] array (data.js)
     3. Renders the full detail view into #detailMain
     4. Also handles theme toggle
   ============================================================ */

// ---- Theme (same logic as script.js — keep in sync) ----
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = document.getElementById("themeIcon");
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeIcon.className = theme === "dark"
    ? "fa-solid fa-moon"
    : "fa-solid fa-sun";
  localStorage.setItem("portfolio-theme", theme);
}

(function initTheme() {
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(saved);
})();

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ---- Navbar scroll ----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ---- Render Project Detail ----
const detailMain    = document.getElementById("detailMain");
const detailLoading = document.getElementById("detailLoading");

/**
 * Parse ?id=xxx from the current URL.
 * @returns {string|null}
 */
function getProjectIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/**
 * Find a project object by its id.
 * @param {string} id
 * @returns {Object|null}
 */
function findProject(id) {
  if (typeof projects === "undefined") return null;
  return projects.find((p) => p.id === id) || null;
}

/**
 * Build and inject the full detail page HTML.
 * @param {Object} project
 */
function renderDetail(project) {
  // Update page title
  document.title = `${project.name} | Niraj Kumar`;

  // Features list HTML
  const featuresHTML = (project.features || [])
    .map((f) => `<li>${f}</li>`)
    .join("");

  // Tech tags HTML (sidebar)
  const sidebarTagsHTML = (project.tech || [])
    .map((t) => `<span class="tech-tag">${t}</span>`)
    .join("");

  // Gallery HTML — only if images array provided
  let galleryHTML = "";
  if (project.images && project.images.length > 0) {
    const imgTags = project.images
      .map(
        (src) =>
          `<img src="${src}" alt="${project.name} screenshot" loading="lazy"
                onerror="this.style.opacity=0.3">`
      )
      .join("");
    galleryHTML = `
      <h2>Screenshots</h2>
      <div class="detail-gallery">${imgTags}</div>
    `;
  }

  detailMain.innerHTML = `
    <!-- Hero banner -->
    <div class="detail-hero">
      <div class="detail-hero-inner">
        <p class="detail-breadcrumb">
          <a href="index.html">Home</a>
          <i class="fa-solid fa-chevron-right" style="font-size:0.65rem"></i>
          <a href="index.html#projects">Projects</a>
          <i class="fa-solid fa-chevron-right" style="font-size:0.65rem"></i>
          <span>${project.name}</span>
        </p>
        <h1 class="detail-title">${project.name}</h1>
        <p class="detail-short-desc">${project.shortDesc}</p>
        <div class="detail-meta">
          <a href="${project.github}" target="_blank" rel="noopener" class="detail-link">
            <i class="fa-brands fa-github"></i> View on GitHub
          </a>
          <a href="${project.live}" target="_blank" rel="noopener" class="detail-link">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
        </div>
      </div>
    </div>

    <!-- Body: main content + sidebar -->
    <div class="detail-body">
      <div class="detail-content">
        <h2>Overview</h2>
        <p>${project.fullDesc}</p>

        ${
          featuresHTML
            ? `<h2>Key Features</h2>
               <ul class="features-list">${featuresHTML}</ul>`
            : ""
        }

        ${galleryHTML}
      </div>

      <!-- Sidebar: tech stack -->
      <aside class="detail-sidebar">
        <div class="sidebar-card">
          <h3>Tech Stack</h3>
          <div class="sidebar-tech-tags">${sidebarTagsHTML}</div>
        </div>
      </aside>
    </div>
  `;
}

/**
 * Show an error state if project not found.
 */
function renderError() {
  detailMain.innerHTML = `
    <div class="detail-error">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h2>Project Not Found</h2>
      <p>We couldn't find the project you're looking for.</p>
      <a href="index.html#projects" class="btn btn-primary" style="margin-top:20px">
        <i class="fa-solid fa-arrow-left"></i> Back to Projects
      </a>
    </div>
  `;
}

// ---- Main execution ----
(function init() {
  const id      = getProjectIdFromURL();
  const project = id ? findProject(id) : null;

  // Small delay so the loading spinner is visible briefly (UX polish)
  setTimeout(() => {
    if (project) {
      renderDetail(project);
    } else {
      renderError();
    }
  }, 400);
})();
