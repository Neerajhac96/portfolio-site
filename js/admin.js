/* ============================================================
   admin.js — Full Admin Dashboard
   Sections:
     1.  Auth (simple password guard)
     2.  Theme + Sidebar
     3.  Panel navigation
     4.  Dashboard overview
     5.  Messages panel (inbox, view, reply, delete)
     6.  Projects CRUD
     7.  Certificates CRUD
     8.  Skills manager
     9.  Timeline CRUD
    10.  Profile editor
    11.  Settings
   ============================================================ */

'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ============================================================
   1. AUTH — Simple localStorage password guard
   Default password: admin123 (change in Settings panel)
   ============================================================ */
const AUTH_KEY = 'nk_admin_auth';
const PASS_KEY = 'nk_admin_pass';

function getPass()   { return localStorage.getItem(PASS_KEY) || 'admin123'; }
function isAuthed()  { return sessionStorage.getItem(AUTH_KEY) === 'ok'; }
function setAuthed() { sessionStorage.setItem(AUTH_KEY, 'ok'); }
function clearAuth() { sessionStorage.removeItem(AUTH_KEY); }

function showLoginScreen() {
  const overlay = document.createElement('div');
  overlay.id = 'loginOverlay';
  overlay.innerHTML = `
    <div class="login-card">
      <div class="login-logo">NK<span class="accent">.</span> Admin</div>
      <p class="login-sub">Enter your password to access the dashboard</p>
      <div class="form-group">
        <label>Password</label>
        <div style="position:relative">
          <input type="password" id="loginPass" placeholder="Enter password" autocomplete="current-password">
          <button id="togglePass" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.9rem">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>
      <div id="loginError" class="login-error hidden">Incorrect password. Try again.</div>
      <button class="btn btn-primary" id="loginBtn" style="width:100%;margin-top:8px">
        <i class="fa-solid fa-lock-open"></i> Login
      </button>
      <a href="index.html" class="login-back"><i class="fa-solid fa-arrow-left"></i> Back to Portfolio</a>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('loginPass')?.focus();

  const attempt = () => {
    const val = document.getElementById('loginPass').value;
    if (val === getPass()) {
      setAuthed();
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      setTimeout(() => { overlay.remove(); initDashboard(); }, 300);
    } else {
      document.getElementById('loginError')?.classList.remove('hidden');
      document.getElementById('loginPass').classList.add('error');
      setTimeout(() => document.getElementById('loginPass')?.classList.remove('error'), 1200);
    }
  };

  document.getElementById('loginBtn')?.addEventListener('click', attempt);
  document.getElementById('loginPass')?.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
  document.getElementById('togglePass')?.addEventListener('click', () => {
    const inp = document.getElementById('loginPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });
}

/* ============================================================
   2. THEME + SIDEBAR
   ============================================================ */
function initTheme() {
  const toggle = $('#themeToggle');
  const icon   = $('#themeIcon');
  const html   = document.documentElement;
  const apply  = t => {
    html.setAttribute('data-theme', t);
    if (icon) icon.className = t === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    localStorage.setItem('nk_theme', t);
  };
  apply(localStorage.getItem('nk_theme') || 'dark');
  toggle?.addEventListener('click', () => apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}

function initSidebar() {
  const sidebar   = $('#adminSidebar');
  const main      = $('#adminMain');
  const openBtn   = $('#sidebarOpenBtn');
  const closeBtn  = $('#sidebarCloseBtn');

  const isMobile = () => window.innerWidth <= 900;

  openBtn?.addEventListener('click', () => {
    if (isMobile()) sidebar?.classList.add('mobile-open');
    else { sidebar?.classList.remove('collapsed'); main?.classList.remove('expanded'); }
  });
  closeBtn?.addEventListener('click', () => {
    if (isMobile()) sidebar?.classList.remove('mobile-open');
    else { sidebar?.classList.add('collapsed'); main?.classList.add('expanded'); }
  });

  // Close on overlay click (mobile)
  document.addEventListener('click', e => {
    if (isMobile() && sidebar?.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== openBtn) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

/* ============================================================
   3. PANEL NAVIGATION
   ============================================================ */
let activePanel = 'dashboard';

window.switchPanel = function(id) {
  $$('.admin-panel').forEach(p => p.classList.remove('active'));
  $$('.sidebar-link').forEach(l => l.classList.remove('active'));
  const panel = $(`#panel-${id}`);
  const link  = $(`.sidebar-link[data-panel="${id}"]`);
  panel?.classList.add('active');
  link?.classList.add('active');
  activePanel = id;
  // Update topbar title
  const titles = { dashboard:'Dashboard', messages:'Messages', projects:'Projects', certificates:'Certificates', skills:'Skills', timeline:'Timeline', profile:'Profile', settings:'Settings' };
  const el = $('#topbarTitle');
  if (el) el.textContent = titles[id] || id;
  // Refresh panel
  panelRenderers[id]?.();
}

const panelRenderers = {};

/* ============================================================
   4. DASHBOARD OVERVIEW
   ============================================================ */
panelRenderers.dashboard = function() {
  const data = DataStore.get();
  const msgs = data.messages || [];
  const unread = msgs.filter(m => !m.read).length;

  // Stats
  setEl('#statProjects',    data.projects.length);
  setEl('#statCerts',       data.certificates.length);
  setEl('#statMessages',    msgs.length);
  setEl('#statUnread',      unread);

  // Unread badge
  $$('.msg-badge').forEach(b => { b.textContent = unread; b.style.display = unread ? '' : 'none'; });

  // Recent messages
  const recentWrap = $('#recentMessages');
  if (recentWrap) {
    if (msgs.length === 0) {
      recentWrap.innerHTML = `<div class="empty-state"><i class="fa-solid fa-inbox"></i><p>No messages yet</p></div>`;
    } else {
      recentWrap.innerHTML = msgs.slice(0,5).map(m => `
        <div class="recent-msg-item" onclick="switchPanel('messages');viewMessage('${m.id}')" style="cursor:pointer">
          <div class="msg-dot ${m.read?'read':''}"></div>
          <div style="min-width:0">
            <div class="recent-msg-name">${escHtml(m.name)}</div>
            <div class="recent-msg-preview">${escHtml(m.subject||m.message?.substring(0,60))}</div>
          </div>
          <div class="recent-msg-time">${timeAgo(m.timestamp)}</div>
        </div>`).join('');
    }
  }
};

/* ============================================================
   5. MESSAGES PANEL
   ============================================================ */
let currentMsgId = null;

panelRenderers.messages = function() {
  renderMsgList();
};

function renderMsgList() {
  const data    = DataStore.get();
  const msgs    = data.messages || [];
  const list    = $('#msgList');
  const detail  = $('#msgDetail');
  const empty   = $('#msgsEmpty');
  if (!list) return;

  if (detail) detail.innerHTML = '';
  if (msgs.length === 0) {
    list.innerHTML = '';
    empty?.classList.remove('hidden');
    return;
  }
  empty?.classList.add('hidden');

  list.innerHTML = msgs.map(m => `
    <div class="msg-item ${m.read?'':'unread'}" id="msgRow_${m.id}">
      <div class="msg-left" onclick="viewMessage('${m.id}')">
        <div class="msg-sender-row">
          <span class="msg-sender-name">${escHtml(m.name)}</span>
          <span class="msg-sender-email">${escHtml(m.email)}</span>
          <span class="msg-time">${timeAgo(m.timestamp)}</span>
        </div>
        <div class="msg-subject">${escHtml(m.subject||'(No subject)')} — ${escHtml(m.message?.substring(0,80))}…</div>
        <div style="margin-top:6px;display:flex;gap:6px">
          ${!m.read ? '<span class="badge badge-new">New</span>' : '<span class="badge badge-read">Read</span>'}
          ${m.replied ? '<span class="badge badge-replied">Replied</span>' : ''}
        </div>
      </div>
      <div class="msg-actions-col">
        <button class="msg-action-btn" onclick="viewMessage('${m.id}')" title="View"><i class="fa-solid fa-eye"></i></button>
        <button class="msg-action-btn delete" onclick="deleteMessage('${m.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`).join('');

  // Auto-view first if we were already in detail
  if (currentMsgId) viewMessage(currentMsgId);
}

window.viewMessage = function(id) {
  const data = DataStore.get();
  const msg  = data.messages.find(m => m.id === id);
  if (!msg) return;
  currentMsgId = id;

  // Mark as read
  DataStore.updateMessage(id, { read: true });
  const row = $(`#msgRow_${id}`);
  if (row) { row.classList.remove('unread'); row.querySelector('.badge-new')?.remove(); }

  // Update unread badge
  const unread = DataStore.get().messages.filter(m => !m.read).length;
  $$('.msg-badge').forEach(b => { b.textContent = unread; b.style.display = unread ? '' : 'none'; });

  const detail = $('#msgDetail');
  if (!detail) return;
  detail.innerHTML = `
    <div class="msg-detail">
      <div class="msg-detail-header">
        <button class="btn btn-outline btn-sm" onclick="currentMsgId=null;$('#msgDetail').innerHTML=''" style="margin-bottom:12px">
          <i class="fa-solid fa-arrow-left"></i> Back
        </button>
        <h2 style="font-size:1.2rem">${escHtml(msg.subject||'(No subject)')}</h2>
        <div class="msg-detail-meta">
          <div class="msg-meta-item"><i class="fa-solid fa-user"></i>${escHtml(msg.name)}</div>
          <div class="msg-meta-item"><i class="fa-solid fa-envelope"></i>
            <a href="mailto:${escHtml(msg.email)}" style="color:var(--accent)">${escHtml(msg.email)}</a>
          </div>
          <div class="msg-meta-item"><i class="fa-solid fa-clock"></i>${formatDate(msg.timestamp)}</div>
        </div>
      </div>
      <div class="msg-body">${escHtml(msg.message)}</div>
      <div class="reply-section">
        <h4><i class="fa-solid fa-reply"></i>&nbsp; Reply</h4>
        ${msg.replied
          ? `<div style="background:var(--accent-glow);border:1px solid var(--border);border-radius:9px;padding:14px 16px;font-size:0.88rem;color:var(--text-muted)"><strong style="color:var(--text)">Previous reply:</strong><br><br>${escHtml(msg.reply)}</div><br>`
          : ''}
        <textarea id="replyText" rows="5" placeholder="Write your reply here..." style="width:100%;background:var(--bg-alt);border:1.5px solid var(--border);border-radius:9px;padding:12px 16px;color:var(--text);font-family:var(--font-body);font-size:0.9rem;resize:vertical;outline:none;margin-bottom:12px">${msg.reply||''}</textarea>
        <div style="display:flex;gap:10px">
          <button class="btn btn-primary" onclick="saveReply('${id}')">
            <i class="fa-solid fa-paper-plane"></i> Save Reply
          </button>
          <a href="mailto:${escHtml(msg.email)}?subject=Re: ${encodeURIComponent(msg.subject||'')}" class="btn btn-outline">
            <i class="fa-brands fa-google"></i> Open in Gmail
          </a>
          <button class="btn btn-danger" onclick="deleteMessage('${id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>`;
};

window.saveReply = function(id) {
  const replyText = $('#replyText')?.value?.trim();
  if (!replyText) { showToast('Reply cannot be empty.', 'error'); return; }
  DataStore.updateMessage(id, { reply: replyText, replied: true });
  showToast('Reply saved!', 'success');
  renderMsgList();
};

window.deleteMessage = function(id) {
  if (!confirm('Delete this message permanently?')) return;
  DataStore.deleteMessage(id);
  if (currentMsgId === id) { currentMsgId = null; const d = $('#msgDetail'); if (d) d.innerHTML = ''; }
  renderMsgList();
  showToast('Message deleted.', 'info');
  panelRenderers.dashboard?.();
};

/* ============================================================
   6. PROJECTS CRUD
   ============================================================ */
panelRenderers.projects = function() {
  const data     = DataStore.get();
  const tbody    = $('#projectsTableBody');
  if (!tbody) return;

  if (data.projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted)">No projects yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.projects.map((p, i) => `
    <tr>
      <td><strong>${escHtml(p.name)}</strong></td>
      <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(p.shortDesc)}</td>
      <td>${(p.tech||[]).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join(' ')}</td>
      <td>${p.featured ? '<span class="badge badge-featured">★ Featured</span>' : '<span class="badge badge-read">Normal</span>'}</td>
      <td class="actions">
        <button class="btn btn-sm btn-outline" onclick="editProject(${i})"><i class="fa-solid fa-pencil"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteProject(${i})"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`).join('');
};

window.openAddProject = function() { openProjectModal(); };
window.editProject    = function(i) { openProjectModal(i); };

function openProjectModal(index) {
  const data = DataStore.get();
  const p    = index !== undefined ? data.projects[index] : null;
  const isEdit = p !== null && p !== undefined;

  const modal = $('#projectModal');
  const title = $('#projectModalTitle');
  if (!modal || !title) return;
  title.textContent = isEdit ? 'Edit Project' : 'Add Project';

  // Populate fields
  setVal('#pmName',     p?.name||'');
  setVal('#pmId',       p?.id||'');
  setVal('#pmShort',    p?.shortDesc||'');
  setVal('#pmFull',     p?.fullDesc||'');
  setVal('#pmGithub',   p?.github||'');
  setVal('#pmLive',     p?.live||'');
  setVal('#pmImage',    p?.image||'');
  setVal('#pmColor',    p?.color||'#00D9C0');
  if ($('#pmFeatured')) $('#pmFeatured').checked = p?.featured||false;

  // Tech tags
  renderTagsInput('pmTechWrap', 'pmTechInput', p?.tech||[]);

  // Features
  setVal('#pmFeatures', (p?.features||[]).join('\n'));

  $('#projectSaveBtn').onclick = () => saveProject(index);
  openModal('projectModal');
}

function saveProject(index) {
  const data = DataStore.get();
  const name = $('#pmName')?.value?.trim();
  if (!name) { showToast('Project name is required.', 'error'); return; }

  const techTags = getTagsFromInput('pmTechWrap');
  const proj = {
    id:       $('#pmId')?.value?.trim() || slugify(name),
    name,
    shortDesc: $('#pmShort')?.value?.trim()||'',
    fullDesc:  $('#pmFull')?.value?.trim()||'',
    features:  ($('#pmFeatures')?.value||'').split('\n').map(l=>l.trim()).filter(Boolean),
    tech:      techTags,
    github:    $('#pmGithub')?.value?.trim()||'',
    live:      $('#pmLive')?.value?.trim()||'',
    image:     $('#pmImage')?.value?.trim()||'',
    color:     $('#pmColor')?.value||'#00D9C0',
    featured:  $('#pmFeatured')?.checked||false
  };

  if (index !== undefined) data.projects[index] = proj;
  else data.projects.push(proj);

  DataStore.save(data);
  closeModal('projectModal');
  panelRenderers.projects();
  showToast(index !== undefined ? 'Project updated!' : 'Project added!', 'success');
}

window.deleteProject = function(i) {
  if (!confirm('Delete this project?')) return;
  const data = DataStore.get();
  data.projects.splice(i, 1);
  DataStore.save(data);
  panelRenderers.projects();
  showToast('Project deleted.', 'info');
};

/* ============================================================
   7. CERTIFICATES CRUD
   ============================================================ */
panelRenderers.certificates = function() {
  const data  = DataStore.get();
  const tbody = $('#certsTableBody');
  if (!tbody) return;

  if (data.certificates.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:40px;color:var(--text-muted)">No certificates yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.certificates.map((c, i) => `
    <tr>
      <td><strong>${escHtml(c.title)}</strong></td>
      <td>${escHtml(c.issuer)}</td>
      <td><span class="tag">${c.date}</span></td>
      <td class="actions">
        <button class="btn btn-sm btn-outline" onclick="editCert(${i})"><i class="fa-solid fa-pencil"></i></button>
        <button class="btn btn-sm btn-danger"  onclick="deleteCert(${i})"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`).join('');
};

window.openAddCert = function() { openCertModal(); };
window.editCert    = function(i) { openCertModal(i); };

function openCertModal(index) {
  const data = DataStore.get();
  const c    = index !== undefined ? data.certificates[index] : null;
  setVal('#cmTitle',  c?.title||'');
  setVal('#cmIssuer', c?.issuer||'');
  setVal('#cmDate',   c?.date||'');
  setVal('#cmImage',  c?.image||'');
  setVal('#cmLink',   c?.link||'');
  setVal('#cmColor',  c?.color||'#00D9C0');
  $('#certModalTitle').textContent = index !== undefined ? 'Edit Certificate' : 'Add Certificate';
  $('#certSaveBtn').onclick = () => saveCert(index);
  openModal('certModal');
}

function saveCert(index) {
  const data = DataStore.get();
  const title = $('#cmTitle')?.value?.trim();
  if (!title) { showToast('Title is required.', 'error'); return; }
  const cert = {
    id:     'cert_' + Date.now(),
    title,
    issuer: $('#cmIssuer')?.value?.trim()||'',
    date:   $('#cmDate')?.value?.trim()||'',
    image:  $('#cmImage')?.value?.trim()||'',
    link:   $('#cmLink')?.value?.trim()||'',
    color:  $('#cmColor')?.value||'#00D9C0'
  };
  if (index !== undefined) data.certificates[index] = { ...data.certificates[index], ...cert };
  else data.certificates.push(cert);
  DataStore.save(data);
  closeModal('certModal');
  panelRenderers.certificates();
  showToast(index !== undefined ? 'Certificate updated!' : 'Certificate added!', 'success');
}

window.deleteCert = function(i) {
  if (!confirm('Delete this certificate?')) return;
  const data = DataStore.get();
  data.certificates.splice(i, 1);
  DataStore.save(data);
  panelRenderers.certificates();
  showToast('Certificate deleted.', 'info');
};

/* ============================================================
   8. SKILLS MANAGER
   ============================================================ */
panelRenderers.skills = function() {
  const data  = DataStore.get();
  const wrap  = $('#skillsEditor');
  if (!wrap) return;

  wrap.innerHTML = Object.entries(data.skills).map(([cat, items]) => `
    <div class="profile-card" style="margin-bottom:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h3 style="margin:0">${escHtml(cat)}</h3>
        <button class="btn btn-sm btn-danger" onclick="deleteSkillCategory('${escHtml(cat)}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div id="tags_${escHtml(cat)}" class="tags-input-wrap" onclick="this.querySelector('.tags-input')?.focus()">
        ${items.map(s=>`<span class="tag-item">${escHtml(s)}<button class="tag-remove" onclick="removeSkillTag('${escHtml(cat)}','${escHtml(s)}')">&times;</button></span>`).join('')}
        <input class="tags-input" placeholder="Add skill, press Enter" onkeydown="addSkillTag(event,'${escHtml(cat)}')">
      </div>
    </div>`).join('');
};

window.addSkillTag = function(e, cat) {
  if (e.key !== 'Enter' && e.key !== ',') return;
  e.preventDefault();
  const val = e.target.value.trim();
  if (!val) return;
  const data = DataStore.get();
  if (!data.skills[cat]) data.skills[cat] = [];
  if (!data.skills[cat].includes(val)) {
    data.skills[cat].push(val);
    DataStore.save(data);
  }
  e.target.value = '';
  panelRenderers.skills();
};

window.removeSkillTag = function(cat, skill) {
  const data = DataStore.get();
  data.skills[cat] = (data.skills[cat]||[]).filter(s => s !== skill);
  DataStore.save(data);
  panelRenderers.skills();
};

window.addSkillCategory = function() {
  const name = prompt('New category name (e.g. "Backend"):');
  if (!name?.trim()) return;
  const data = DataStore.get();
  if (data.skills[name.trim()]) { showToast('Category already exists.', 'error'); return; }
  data.skills[name.trim()] = [];
  DataStore.save(data);
  panelRenderers.skills();
  showToast('Category added!', 'success');
};

window.deleteSkillCategory = function(cat) {
  if (!confirm(`Delete "${cat}" and all its skills?`)) return;
  const data = DataStore.get();
  delete data.skills[cat];
  DataStore.save(data);
  panelRenderers.skills();
};

/* ============================================================
   9. TIMELINE CRUD
   ============================================================ */
panelRenderers.timeline = function() {
  const data  = DataStore.get();
  const tbody = $('#timelineTableBody');
  if (!tbody) return;

  tbody.innerHTML = data.timeline.map((item, i) => `
    <tr>
      <td><span class="tag">${item.year}</span></td>
      <td><strong>${escHtml(item.title)}</strong></td>
      <td>${escHtml(item.org)}</td>
      <td><span class="timeline-type-badge type-${item.type}">${item.type}</span></td>
      <td class="actions">
        <button class="btn btn-sm btn-outline" onclick="editTimeline(${i})"><i class="fa-solid fa-pencil"></i></button>
        <button class="btn btn-sm btn-danger"  onclick="deleteTimeline(${i})"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`).join('');
};

window.openAddTimeline = function() { openTimelineModal(); };
window.editTimeline    = function(i) { openTimelineModal(i); };

function openTimelineModal(index) {
  const data = DataStore.get();
  const t    = index !== undefined ? data.timeline[index] : null;
  setVal('#tlYear',  t?.year||new Date().getFullYear());
  setVal('#tlTitle', t?.title||'');
  setVal('#tlOrg',   t?.org||'');
  setVal('#tlDesc',  t?.desc||'');
  if ($('#tlType')) $('#tlType').value = t?.type||'achievement';
  $('#timelineModalTitle').textContent = index !== undefined ? 'Edit Timeline Item' : 'Add Timeline Item';
  $('#timelineSaveBtn').onclick = () => saveTimeline(index);
  openModal('timelineModal');
}

function saveTimeline(index) {
  const data  = DataStore.get();
  const title = $('#tlTitle')?.value?.trim();
  if (!title) { showToast('Title is required.', 'error'); return; }
  const item = {
    year:  $('#tlYear')?.value?.trim()||'',
    title,
    org:   $('#tlOrg')?.value?.trim()||'',
    desc:  $('#tlDesc')?.value?.trim()||'',
    type:  $('#tlType')?.value||'achievement',
    icon:  'fa-star'
  };
  if (index !== undefined) data.timeline[index] = item;
  else data.timeline.push(item);
  DataStore.save(data);
  closeModal('timelineModal');
  panelRenderers.timeline();
  showToast(index !== undefined ? 'Item updated!' : 'Item added!', 'success');
}

window.deleteTimeline = function(i) {
  if (!confirm('Delete this timeline item?')) return;
  const data = DataStore.get();
  data.timeline.splice(i, 1);
  DataStore.save(data);
  panelRenderers.timeline();
  showToast('Item deleted.', 'info');
};

/* ============================================================
   10. PROFILE EDITOR
   ============================================================ */
panelRenderers.profile = function() {
  const p = DataStore.get().profile;
  setVal('#prName',      p.name||'');
  setVal('#prTitle',     p.title||'');
  setVal('#prSubtitle',  p.subtitle||'');
  setVal('#prTagline',   p.tagline||'');
  setVal('#prEmail',     p.email||'');
  setVal('#prGithub',    p.github||'');
  setVal('#prLinkedin',  p.linkedin||'');
  setVal('#prLocation',  p.location||'');
  if ($('#prAvailable')) $('#prAvailable').checked = p.available !== false;
  setVal('#prBio',       Array.isArray(p.bio) ? p.bio.join('\n\n') : p.bio||'');

  // Stats
  setVal('#prStat1Val',   p.stats?.[0]?.value||'');
  setVal('#prStat1Label', p.stats?.[0]?.label||'');
  setVal('#prStat2Val',   p.stats?.[1]?.value||'');
  setVal('#prStat2Label', p.stats?.[1]?.label||'');
  setVal('#prStat3Val',   p.stats?.[2]?.value||'');
  setVal('#prStat3Label', p.stats?.[2]?.label||'');
};

window.saveProfile = function() {
  const data = DataStore.get();
  const bioRaw = $('#prBio')?.value?.trim()||'';
  data.profile = {
    ...data.profile,
    name:      $('#prName')?.value?.trim()||'',
    title:     $('#prTitle')?.value?.trim()||'',
    subtitle:  $('#prSubtitle')?.value?.trim()||'',
    tagline:   $('#prTagline')?.value?.trim()||'',
    email:     $('#prEmail')?.value?.trim()||'',
    github:    $('#prGithub')?.value?.trim()||'',
    linkedin:  $('#prLinkedin')?.value?.trim()||'',
    location:  $('#prLocation')?.value?.trim()||'',
    available: $('#prAvailable')?.checked||false,
    bio:       bioRaw.split(/\n\n+/).map(l=>l.trim()).filter(Boolean),
    stats: [
      { value: $('#prStat1Val')?.value?.trim()||'', label: $('#prStat1Label')?.value?.trim()||'' },
      { value: $('#prStat2Val')?.value?.trim()||'', label: $('#prStat2Label')?.value?.trim()||'' },
      { value: $('#prStat3Val')?.value?.trim()||'', label: $('#prStat3Label')?.value?.trim()||'' }
    ]
  };
  DataStore.save(data);
  showToast('Profile saved!', 'success');
};

/* ============================================================
   11. SETTINGS
   ============================================================ */
panelRenderers.settings = function() {
  // nothing to pre-populate
};

window.changePassword = function() {
  const cur  = $('#curPass')?.value;
  const nw   = $('#newPass')?.value;
  const conf = $('#confPass')?.value;
  if (cur !== getPass())    { showToast('Current password is incorrect.', 'error'); return; }
  if (!nw || nw.length < 6) { showToast('New password must be at least 6 characters.', 'error'); return; }
  if (nw !== conf)           { showToast('Passwords do not match.', 'error'); return; }
  localStorage.setItem(PASS_KEY, nw);
  setVal('#curPass',''); setVal('#newPass',''); setVal('#confPass','');
  showToast('Password changed successfully!', 'success');
};

window.exportData = function() {
  const data = DataStore.get();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'portfolio-data.json'; a.click();
  URL.revokeObjectURL(url);
  showToast('Data exported!', 'success');
};

window.importData = function() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        DataStore.save(data);
        showToast('Data imported! Refreshing...', 'success');
        setTimeout(() => location.reload(), 1500);
      } catch { showToast('Invalid JSON file.', 'error'); }
    };
    reader.readAsText(file);
  };
  input.click();
};

window.resetData = function() {
  if (!confirm('Reset ALL data to defaults? This cannot be undone.')) return;
  DataStore.reset();
  showToast('Data reset! Refreshing...', 'info');
  setTimeout(() => location.reload(), 1200);
};

/* ============================================================
   MODAL HELPERS
   ============================================================ */
function openModal(id) {
  const mo = $(`#${id}`);
  mo?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const mo = $(`#${id}`);
  mo?.classList.remove('open');
  document.body.style.overflow = '';
}

window.closeModal = closeModal;

// Close modals on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   TAGS INPUT HELPER
   ============================================================ */
function renderTagsInput(wrapId, inputId, tags) {
  const wrap = $(`#${wrapId}`);
  if (!wrap) return;
  let currentTags = [...tags];

  function render() {
    wrap.innerHTML = currentTags.map(t =>
      `<span class="tag-item">${escHtml(t)}<button class="tag-remove" data-tag="${escHtml(t)}">&times;</button></span>`
    ).join('') + `<input class="tags-input" id="${inputId}" placeholder="Type & press Enter">`;

    wrap.querySelectorAll('.tag-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTags = currentTags.filter(t => t !== btn.dataset.tag);
        render();
      });
    });

    $(`#${inputId}`)?.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ',') return;
      e.preventDefault();
      const val = e.target.value.trim();
      if (val && !currentTags.includes(val)) { currentTags.push(val); render(); }
      else e.target.value = '';
    });
  }
  render();
}

function getTagsFromInput(wrapId) {
  return [...$(`#${wrapId}`)?.querySelectorAll('.tag-item') || []].map(el => el.textContent.replace('×','').trim()).filter(Boolean);
}

/* ============================================================
   MISC HELPERS
   ============================================================ */
function setEl(sel, val) { const el = $(sel); if (el) el.textContent = val; }
function setVal(sel, val) { const el = $(sel); if (el) el.value = val; }
function escHtml(str) { const d = document.createElement('div'); d.textContent = str||''; return d.innerHTML; }
function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff/60000);
  if (m < 1)  return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m/60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' });
}

/* ============================================================
   TOAST (mirrors script.js for standalone admin use)
   ============================================================ */
const toastWrap = document.createElement('div');
toastWrap.className = 'toast-container';
document.body.appendChild(toastWrap);

function showToast(msg, type='success', dur=4000) {
  const icons = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${icons[type]||icons.info}"></i><span>${msg}</span>
    <button class="toast-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>`;
  toastWrap.appendChild(t);
  setTimeout(() => { t.style.animation='toastOut 0.3s ease forwards'; setTimeout(()=>t.remove(),300); }, dur);
}
window.showToast = showToast;

/* ============================================================
   BOOT
   ============================================================ */
function initDashboard() {
  initTheme();
  initSidebar();

  // Wire sidebar nav
  $$('.sidebar-link[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
  });

  // Logout
  $('#logoutBtn')?.addEventListener('click', () => {
    clearAuth();
    location.reload();
  });

  // Default to dashboard
  switchPanel('dashboard');
}

document.addEventListener('DOMContentLoaded', () => {
  if (isAuthed()) initDashboard();
  else showLoginScreen();
});
