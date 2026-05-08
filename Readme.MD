# Niraj Kumar — Portfolio v2

A modern, fully responsive portfolio website with a complete **Admin Dashboard** to manage all content without touching code.

---

## 🗂️ Project Structure

```
portfolio/
├── index.html                ← Main portfolio (single page)
├── project-detail.html       ← Individual project view
├── css/
│   ├── style.css             ← All portfolio styles
│   └── admin.css             ← Admin dashboard styles
├── js/
│   ├── data.js               ← Data store (localStorage powered)
│   ├── script.js             ← Portfolio logic & animations
│   └── admin.js              ← Full admin dashboard logic
├── admin/
│   └── index.html            ← Admin dashboard UI
├── assets/
│   ├── resume.pdf            ← ✏️ Replace with your resume
│   ├── profile.jpg           ← ✏️ Replace with your photo
│   ├── projects/             ← Project screenshots
│   └── certificates/         ← Certificate images
└── README.md
```

---

## 🚀 Quick Start

### Option A — VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. That's it — no build step, no npm install

### Option B — Python (any machine)
```bash
cd portfolio/
python -m http.server 3000
# Open http://localhost:3000
```

---

## 🔐 Admin Dashboard

**URL:** `http://localhost:3000/admin/index.html`  
**Default Password:** `admin123`

### Admin Features
| Feature | Description |
|---------|-------------|
| 📊 Dashboard | Stats overview, recent messages, quick actions |
| 📥 Messages | View, read, reply, delete contact form submissions |
| 💼 Projects | Add/Edit/Delete projects with tech tags, links, images |
| 🏆 Certificates | Manage certificates with images and verify links |
| 🧰 Skills | Add/remove skill tags, create/delete categories |
| 🗓️ Timeline | Manage career/education journey items |
| 👤 Profile | Edit name, bio, links, stats, availability badge |
| ⚙️ Settings | Change password, export/import data, reset to defaults |

### Change Admin Password
1. Login → **Settings** tab
2. Fill in current password (`admin123`) and new password
3. Click **Update Password**

---

## ✉️ Enable Real Email (EmailJS)

The contact form stores messages in the Admin Dashboard inbox by default. To also receive email notifications:

**Step 1** — Add EmailJS CDN to `index.html` (before `</body>`):
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

**Step 2** — Sign up at [emailjs.com](https://emailjs.com) (free tier = 200 emails/month)

**Step 3** — Create an Email Service (Gmail, Outlook, etc.)

**Step 4** — Create an Email Template with these variables:
```
From: {{from_name}} <{{from_email}}>
Subject: Portfolio Contact: {{subject}}
Body: {{message}}
```

**Step 5** — In `js/script.js`, find the `initContactForm` function and:
```javascript
// 1. Initialize (add before the function):
emailjs.init("YOUR_PUBLIC_KEY");

// 2. Uncomment the emailjs.send() block inside handleFormSubmit
// 3. Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
// 4. Remove the demo setTimeout simulation below it
```

---

## 🎨 Customize Colors

Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --accent: #00b896;       /* Light mode accent */
}
[data-theme="dark"] {
  --accent: #00D9AF;       /* Dark mode accent */
}
```

---

## ✏️ Update Your Info (Without Admin)

Edit `js/data.js` directly:

### Add a Project
```js
{
  id: "my-project",           // unique slug for URL
  name: "My Project",
  shortDesc: "Card description (1 line)",
  fullDesc:  "Full detail page description",
  features:  ["Feature 1", "Feature 2"],
  tech:      ["HTML", "CSS", "JavaScript"],
  github:    "https://github.com/...",
  live:      "https://...",
  image:     "assets/projects/my-project.png",
  color:     "#00D9C0",
  featured:  true
}
```

### Add a Certificate
```js
{
  id: "cert4",
  title:  "Certificate Name",
  issuer: "Platform",
  date:   "2024",
  image:  "assets/certificates/cert4.png",
  link:   "https://verify-link...",
  color:  "#A78BFA"
}
```

---

## 🌐 Deploy

### GitHub Pages (Free)
1. Push folder to GitHub repo named `yourusername.github.io`
2. Settings → Pages → Source: **main / root**
3. Live at `https://yourusername.github.io` in ~60 seconds

### Netlify (Fastest — Recommended)
1. Drag & drop the `portfolio/` folder to [netlify.com/drop](https://netlify.com/drop)
2. Get a live URL instantly, set custom domain later

### Vercel
```bash
npm i -g vercel
cd portfolio/
vercel
```

---

## 🔍 Update GitHub Username (Stats Section)

In `index.html`, find the 3 `<img>` tags with class `github-stat-img` and replace `nirajkumar` with your actual GitHub username. Or update it through **Admin → Profile → GitHub URL** — the username is auto-parsed.

---

## ✅ Checklist Before Going Live

- [ ] Replace `assets/profile.jpg` with your photo
- [ ] Replace `assets/resume.pdf` with your resume
- [ ] Update name/email/links in Admin → Profile
- [ ] Add your real projects in Admin → Projects
- [ ] Add your certificates in Admin → Certificates
- [ ] Update GitHub username in GitHub stats section
- [ ] Set up EmailJS for contact form emails
- [ ] Change admin password from `admin123`
- [ ] Deploy to GitHub Pages or Netlify

---

## 🧩 Features

| Feature | Details |
|---------|---------|
| 🌓 Dark/Light Mode | Saved to localStorage, no flash on reload |
| 🖱️ Custom Cursor | Smooth animated cursor with hover expansion |
| ✨ Particles Hero | Interactive canvas particles with mouse repel |
| ⌨️ Typing Animation | Cycles through roles with smooth type/delete |
| 🔍 Project Filter | Filter by All / Featured / Tech stack |
| 📜 Scroll Reveal | Elements animate in as you scroll |
| 📊 Progress Bar | Reading progress bar at top of page |
| 🗓️ Timeline | Visual career/education journey |
| 📬 Contact Form | Spam protection (honeypot + rate limiting + validation) |
| 🔔 Toast Notifications | Non-intrusive success/error feedback |
| 🔝 Back to Top | Smooth scroll, auto-shows after 400px |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| ♿ Accessible | ARIA labels, semantic HTML, keyboard nav |

---

Built with ❤️ by **Niraj Kumar**
