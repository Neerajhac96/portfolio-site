/* ============================================================
   script.js — Portfolio v2 Main Script
   Sections:
     1.  Theme (dark/light) with localStorage
     2.  Custom cursor
     3.  Scroll progress bar
     4.  Navbar: scroll + active link
     5.  Mobile nav
     6.  Particle canvas background
     7.  Typing animation
     8.  Render content from DataStore
     9.  Project filter by tech
    10.  Timeline
    11.  Scroll reveal (IntersectionObserver)
    12.  Back to top button
    13.  Contact form with validation + spam protection
    14.  Toast notifications
   ============================================================ */

'use strict';

emailjs.init("y7ACvcbRICBPLSKq4");

/* ---- Helpers ---- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ============================================================
   1. THEME
   ============================================================ */
const themeToggle = $('#themeToggle');
const themeIcon   = $('#themeIcon');
const html        = document.documentElement;

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  if (themeIcon) themeIcon.className = t === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('nk_theme', t);
}

(function initTheme() {
  applyTheme(localStorage.getItem('nk_theme') || 'dark');
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Smooth ring follow
  function animateCursor() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand ring on hoverable elements
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a,button,.project-card,.cert-card,.skill-tag,.filter-btn')) {
      ring.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a,button,.project-card,.cert-card,.skill-tag,.filter-btn')) {
      ring.classList.remove('hover');
    }
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '0.5'; });
})();

/* ============================================================
   3. SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ============================================================
   4. NAVBAR
   ============================================================ */
const navbar   = $('#navbar');
const navLinks = $$('.nav-link');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active section highlight
  const pos = window.scrollY + 130;
  $$('section[id]').forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + sec.id) l.classList.add('active');
      });
    }
  });
}, { passive: true });

/* ============================================================
   5. MOBILE NAV
   ============================================================ */
const hamburger      = $('#hamburger');
const mobileNav      = $('#mobileNav');
const mobileOverlay  = $('#mobileOverlay');
const mobileNavClose = $('#mobileNavClose');

function openMob()  { mobileNav?.classList.add('open'); mobileOverlay?.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeMob() { mobileNav?.classList.remove('open'); mobileOverlay?.classList.remove('active'); document.body.style.overflow = ''; }

hamburger?.addEventListener('click', openMob);
mobileNavClose?.addEventListener('click', closeMob);
mobileOverlay?.addEventListener('click', closeMob);
$$('.mobile-link').forEach(l => l.addEventListener('click', closeMob));

/* ============================================================
   6. PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function getAccent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00D9AF';
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.6 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
      // Mouse repel
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 80) {
        this.x += dx / dist * 1.5;
        this.y += dy / dist * 1.5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = getAccent();
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initP() {
    particles = [];
    const count = Math.min(Math.floor((W * H) / 12000), 80);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawLines() {
    const accent = getAccent();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - d/120) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  window.addEventListener('resize', () => { resize(); initP(); });
  resize(); initP(); animate();
})();

/* ============================================================
   7. TYPING ANIMATION
   ============================================================ */
(function initTyping() {
  const el = $('#typedText');
  if (!el) return;

  const data = typeof DataStore !== 'undefined' ? DataStore.get() : null;
  const roles = data?.profile?.typingRoles || [
    'Full-Stack Developer',
    'Software Developer',
    'AI Developer',
    'GenAI Enthusiast',
    'MCA Student',
    'Problem Solver'
  ];

  let ri = 0, ci = 0, deleting = false;

  function type() {
    const cur = roles[ri];
    const speed = deleting ? 55 : 105;
    el.textContent = cur.substring(0, ci + (deleting ? 0 : 1));
    if (!deleting) { ci++; if (ci > cur.length) { setTimeout(() => { deleting = true; type(); }, 1700); return; } }
    else           { ci = el.textContent.length; if (ci === 0) { deleting = false; ri = (ri+1) % roles.length; setTimeout(type, 350); return; } }
    setTimeout(type, speed);
  }

  setTimeout(type, 900);
})();

/* ============================================================
   8. RENDER CONTENT
   ============================================================ */
function renderPortfolio() {
  if (typeof DataStore === 'undefined') return;
  const data = DataStore.get();

  // Profile
  applyProfile(data.profile);

  // Projects
  const grid = $('#projectsGrid');
  if (grid) {
    grid.innerHTML = '';
    buildFilterButtons(data.projects);
    data.projects.forEach(p => grid.appendChild(buildProjectCard(p)));
  }

  // Skills
  const sw = $('#skillsWrapper');
  if (sw) {
    sw.innerHTML = '';
    Object.entries(data.skills).forEach(([cat, items]) => {
      const sec = document.createElement('div');
      sec.className = 'skill-category reveal';
      sec.innerHTML = `<h3 class="skill-cat-title">${cat}</h3>
        <div class="skill-tags stagger reveal">${items.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>`;
      sw.appendChild(sec);
    });
  }

  // Certificates
  const cg = $('#certsGrid');
  if (cg) {
    cg.innerHTML = '';
    data.certificates.forEach(c => cg.appendChild(buildCertCard(c)));
  }

  // Timeline
  const tl = $('#timelineTrack');
  if (tl) {
    tl.innerHTML = '';
    [...data.timeline].reverse().forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.style.transitionDelay = (i * 0.1) + 's';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <p class="timeline-year">${item.year}</p>
        <div class="timeline-card">
          <h3 class="timeline-title">${item.title} <span class="timeline-type-badge type-${item.type}">${item.type}</span></h3>
          <p class="timeline-org"><i class="fa-solid fa-building"></i>&nbsp;${item.org}</p>
          <p class="timeline-desc">${item.desc}</p>
        </div>`;
      tl.appendChild(el);
    });
  }

  // About stats
  if (data.profile.stats) {
    const statsEl = $('#aboutStats');
    if (statsEl) {
      statsEl.innerHTML = data.profile.stats
        .map(s => `<div class="stat"><span class="stat-num">${s.value}</span><span class="stat-label">${s.label}</span></div>`)
        .join('');
    }
  }

  // Re-run observers for newly added elements
  $$('.reveal').forEach(el => revealObserver.observe(el));
}

function applyProfile(p) {
  if (!p) return;
  const setText = (sel, val) => { const el = $(sel); if (el && val) el.textContent = val; };
  const setHref = (sel, val) => { const el = $(sel); if (el && val) el.href = val; };
  const setAttr = (sel, attr, val) => { const el = $(sel); if (el && val) el.setAttribute(attr, val); };

  setText('#heroName',     p.name);
  setText('#heroTagline',  p.tagline);
  setText('#aboutNameBold', p.name);
  setHref('#heroGithubLink',    p.github);
  setHref('#heroLinkedInLink',  p.linkedin);
  setHref('#heroEmailLink',     'mailto:' + p.email);
  setHref('#contactEmailLink',  'mailto:' + p.email);
  setHref('#contactGithubLink', p.github);
  setHref('#contactLinkedInLink', p.linkedin);
  setHref('#footerGithubLink',   p.github);
  setHref('#footerLinkedInLink', p.linkedin);
  setHref('#footerEmailLink',    'mailto:' + p.email);
  setText('#contactEmailText',    p.email);
  setText('#contactGithubText',   p.github?.replace('https://', ''));
  setText('#contactLinkedInText', p.linkedin?.replace('https://', ''));

  if (p.bio) {
    const bioEl = $('#aboutBio');
    if (bioEl) bioEl.innerHTML = (Array.isArray(p.bio) ? p.bio : [p.bio])
      .map(line => `<p>${line}</p>`).join('');
  }
  if (typeof p.available !== 'undefined') {
    const badge = $('#availBadge');
    if (badge) badge.style.display = p.available ? 'inline-flex' : 'none';
  }

  // GitHub username for stats images
  const ghUser = p.github?.split('github.com/')[1]?.split('/')[0] || 'nirajkumar';
  $$('.github-stat-img').forEach(img => {
    img.src = img.src.replace(/username=[^&]+/, 'username=' + ghUser);
  });
}

/* ---- Project card builder ---- */
function buildProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  card.dataset.tech = (project.tech || []).join(',').toLowerCase();
  if (project.featured) card.dataset.featured = '1';

  const tags = (project.tech || []).map(t => `<span class="tag">${t}</span>`).join('');
  card.innerHTML = `
    <div class="project-card-img">
      <img src="${project.image||''}" alt="${project.name}" loading="lazy" onerror="this.style.display='none'">
      <div class="proj-thumb-fb" style="color:${project.color||'var(--accent)'}">
        ${project.name.substring(0,2).toUpperCase()}
      </div>
    </div>
    <div class="project-card-body">
      <h3 class="project-card-title">${project.name}</h3>
      <p class="project-card-desc">${project.shortDesc}</p>
      <div class="project-tech-stack">${tags}</div>
      <div class="project-card-links">
        <a href="${project.github}" class="card-link" target="_blank" rel="noopener">
          <i class="fa-brands fa-github"></i> Code
        </a>
        <a href="${project.live}" class="card-link" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Live
        </a>
        <a href="project-detail.html?id=${project.id}" class="card-link-detail">
          Details <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>`;
  return card;
}

/* ---- Cert card builder ---- */
function buildCertCard(cert) {
  const a = document.createElement('a');
  a.className = 'cert-card reveal';
  a.href = cert.link || '#';
  a.target = '_blank'; a.rel = 'noopener';
  a.innerHTML = `
    <div class="cert-img-wrap">
      <img src="${cert.image||''}" alt="${cert.title}" loading="lazy" onerror="this.style.display='none'">
      <div class="cert-placeholder">
        <i class="fa-solid fa-certificate"></i>
        <span>View Certificate</span>
      </div>
    </div>
    <div class="cert-body">
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-issuer">${cert.issuer}</p>
      <p class="cert-date">${cert.date}</p>
    </div>`;
  return a;
}

/* ============================================================
   9. PROJECT FILTER
   ============================================================ */
function buildFilterButtons(projects) {
  const wrap = $('#projectsFilter');
  if (!wrap) return;

  // Collect all unique tech tags
  const allTech = new Set();
  projects.forEach(p => (p.tech||[]).forEach(t => allTech.add(t)));

  wrap.innerHTML = `<button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="featured">⭐ Featured</button>`;

  [...allTech].slice(0, 7).forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = t.toLowerCase();
    btn.textContent = t;
    wrap.appendChild(btn);
  });

  wrap.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    $$('.project-card').forEach(card => {
      const show = f === 'all'
        || (f === 'featured' && card.dataset.featured === '1')
        || card.dataset.tech?.toLowerCase().includes(f);
      card.classList.toggle('hidden-card', !show);
    });
  });
}

/* ============================================================
   10. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Also observe timeline items
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); tlObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });

// MutationObserver to catch dynamic nodes
new MutationObserver(() => {
  $$('.reveal:not(.revealed)').forEach(el => revealObserver.observe(el));
  $$('.timeline-item:not(.revealed)').forEach(el => tlObserver.observe(el));
}).observe(document.body, { childList: true, subtree: true });

$$('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   11. BACK TO TOP
   ============================================================ */
const bttBtn = document.createElement('button');
bttBtn.id = 'backToTop';
bttBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
bttBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(bttBtn);
bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => bttBtn.classList.toggle('visible', window.scrollY > 400), { passive: true });

/* ============================================================
   12. TOAST NOTIFICATIONS
   ============================================================ */
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

function showToast(message, type = 'success', duration = 4000) {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type]||icons.info}"></i>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

window.showToast = showToast; // expose globally for admin

/* ============================================================
   13. CONTACT FORM
   ============================================================ */
(function initContactForm() {
  const form    = $('#contactForm');
  const sendBtn = $('#contactSendBtn');
  if (!form || !sendBtn) return;

  // Character counter for message
  const msgArea = $('#contactMessage');
  const counter = $('#msgCounter');
  msgArea?.addEventListener('input', () => {
    if (counter) counter.textContent = `${msgArea.value.length}/500`;
  });

  /* ---- Validation ---- */
  function validateField(input, rule) {
    const errEl = input.parentElement.querySelector('.field-error');
    const valid = rule(input.value.trim());
    input.classList.toggle('error', !valid);
    errEl?.classList.toggle('show', !valid);
    return valid;
  }

  const rules = {
    contactName:    v => v.length >= 2 && v.length <= 60,
    contactEmail:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    contactSubject: v => v.length >= 3 && v.length <= 100,
    contactMessage: v => v.length >= 10 && v.length <= 500
  };

  // Live validation on blur
  Object.keys(rules).forEach(id => {
    const el = $('#' + id);
    el?.addEventListener('blur', () => validateField(el, rules[id]));
  });

  /* ---- Rate limiting (localStorage) ---- */
  function isRateLimited() {
    const last = parseInt(localStorage.getItem('nk_last_msg') || '0');
    return Date.now() - last < 60000; // 1 message per minute
  }

  function setRateLimit() {
    localStorage.setItem('nk_last_msg', Date.now().toString());
  }

  /* ---- Submit ---- */
  sendBtn.addEventListener('click', async () => {
    // Honeypot check
    if ($('#hp_website')?.value) {
      showToast('Spam detected. Message blocked.', 'error');
      return;
    }

    // Validate all fields
    let allValid = true;
    Object.keys(rules).forEach(id => {
      const el = $('#' + id);
      if (el && !validateField(el, rules[id])) allValid = false;
    });
    if (!allValid) { showToast('Please fix the errors above.', 'error'); return; }

    // Rate limit
    if (isRateLimited()) {
      showToast('Please wait a minute before sending another message.', 'info');
      return;
    }

    // Build message object
    const msgData = {
      name:    $('#contactName').value.trim(),
      email:   $('#contactEmail').value.trim(),
      subject: $('#contactSubject').value.trim(),
      message: $('#contactMessage').value.trim()
    };

    // Loading state
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
      // Save to DataStore (admin dashboard inbox)
      if (typeof DataStore !== 'undefined') {
        DataStore.addMessage(msgData);
      }

      await emailjs.send('service_jn9lq27', 'template_sk2dqeu', {
        from_name: msgData.name,
        from_email: msgData.email,
        subject: msgData.subject,
        message: msgData.message,
        to_email: 'niraj.kumar.07@gmail.com'
      });

      setRateLimit();
      showToast('✓ Message sent! I\'ll reply within 24 hours.', 'success', 6000);
      form.reset();
      if (counter) counter.textContent = '0/500';
    } catch (err) {
      console.error('Send error:', err);
      showToast('Failed to send. Please email me directly.', 'error');
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }
  });
})();

/* ============================================================
   INIT — run everything after DOM ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', renderPortfolio);
