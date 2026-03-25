# Niraj Kumar — Portfolio Website

A modern, clean, fully responsive portfolio built from scratch with **HTML**, **CSS**, and **Vanilla JavaScript** — no frameworks.

---

## 🗂️ File Structure

```
portfolio/
├── index.html            ← Main single-page site
├── style.css             ← All styles (variables, sections, dark/light, responsive)
├── script.js             ← DOM logic, animations, dynamic rendering
├── data.js               ← ✏️ EDIT THIS to add projects & certificates
├── project-detail.html   ← Individual project page (template)
├── project-detail.css    ← Styles for detail page
├── project-detail.js     ← Reads URL param, renders project from data.js
├── README.md
└── assets/
    ├── resume.pdf        ← Add your resume here
    ├── profile.jpg       ← Add your photo here
    ├── projects/         ← project screenshots (weather.png, todo.png, ...)
    └── certificates/     ← certificate images (cert1.png, cert2.png, ...)
```

---

## 🚀 Quick Start

1. Download / clone this folder
2. Open `index.html` in your browser (or use **Live Server** in VS Code)
3. That's it — no build step, no npm install

---

## ✏️ How to Customize

### Add a New Project
Open `data.js` and add an object to the `projects` array:

```js
{
  id: "my-new-project",       // unique slug for URL
  name: "My New Project",
  shortDesc: "One line summary shown on card",
  fullDesc: "Full paragraph shown on detail page",
  features: ["Feature 1", "Feature 2"],
  tech: ["HTML", "CSS", "JavaScript"],
  github: "https://github.com/...",
  live: "https://...",
  image: "assets/projects/my-project.png",
  images: ["assets/projects/my-project.png"],
  color: "#00D9C0",   // accent color for fallback thumbnail
}
```

### Add a Certificate
```js
{
  title: "Certificate Name",
  issuer: "Platform Name",
  date: "2024",
  image: "assets/certificates/certN.png",
  link: "https://verify-link...",
}
```

### Add / Remove Skills
Edit the `skills` object in `data.js`.

---

## 📧 Enable EmailJS (Contact Form)

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add a Gmail/Outlook service
3. Create a template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Add this script to `index.html` (before closing `</body>`):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
5. In `script.js`, uncomment:
   - `emailjs.init("YOUR_PUBLIC_KEY")`
   - The `emailjs.send(...)` block
   - Replace IDs with your actual Service ID, Template ID, and Public Key
6. Remove the demo `setTimeout` simulation

---

## 🌐 Deploy

### GitHub Pages
1. Push to a GitHub repo named `yourusername.github.io`
2. Go to **Settings → Pages → Source: main / root**
3. Your site is live at `https://yourusername.github.io`

### Netlify (recommended — faster)
1. Drag & drop the `portfolio/` folder at [netlify.com/drop](https://netlify.com/drop)
2. Done!

---

## 🎨 Change Colors

Open `style.css` and edit the CSS variables at the top:

```css
:root {
  --accent: #00b89e;          /* light mode accent */
}
[data-theme="dark"] {
  --accent: #00D9C0;          /* dark mode accent */
}
```

---

## 📝 Update Your Info

Search for these placeholders and replace them:
- `niraj@email.com` → your email
- `nirajkumar` (in GitHub links) → your GitHub username
- `linkedin.com/in/nirajkumar` → your LinkedIn URL
- GitHub stats cards in `index.html` → replace `nirajkumar` with your username

---

Built by **Niraj Kumar** 🚀
