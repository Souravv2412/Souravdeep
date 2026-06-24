<div align="center">

# Souravdeep Singh — Administrative Portfolio

**Office Administrator & Operations Professional**

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit%20Portfolio-2B5CE6?style=for-the-badge&logo=github)](https://github.com/souravdeepsingh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sourav2312-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sourav2312/)
[![Email](https://img.shields.io/badge/Email-singh.s.deep800%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:singh.s.deep800@gmail.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

*Former Vice President, Student Representative Council — St. Clair College Downtown*

</div>

---

## About This Project

A fully static, hand-coded personal portfolio website showcasing four enterprise-grade administrative systems built during a co-op placement and student leadership role. Every project is real: the Excel files are functional, the Word documents are downloadable, and the SOPs reflect actual operational work.

**No frameworks. No build tools. Pure HTML, CSS, and vanilla JavaScript** — deployable on any static host including GitHub Pages.

---

## Live Demo

> Deploy to GitHub Pages and replace this URL:
> **[https://your-username.github.io/your-repo-name](https://your-username.github.io/your-repo-name)**

---

## Featured Projects

| # | Project | Skills Used | Key Result |
|---|---------|-------------|------------|
| 01 | **Enterprise Document Control System** | Excel, Star Schema, OneDrive | 87% reduction in file-search time |
| 02 | **Executive Calendar Architecture** | Outlook, Calendly, Excel | Zero double-bookings; 8 hrs/week reclaimed |
| 03 | **Financial Reporting Dashboard** | Excel Advanced, Pivot Tables, SUMIF | Monthly close: 3 days → 3.5 hours |
| 04 | **Email Operations Management** | Gmail, Airtable, 12 Templates | Response time: 26 hrs → 3.2 hrs |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, CSS Grid, Flexbox |
| Interactivity | Vanilla JavaScript (ES6) |
| Icons | Font Awesome 6.5.0 (CDN) |
| Contact Form | Formspree |
| Hosting | GitHub Pages |
| Documents | Microsoft Word (.docx), Microsoft Excel (.xlsx) |

---

## Project Structure

```
souravdeep-portfolio/
│
├── index.html                  # Home page
├── about.html                  # About + LinkedIn recommendations
├── experience.html             # Work experience & education
├── projects.html               # Projects index
├── skills.html                 # Skills & tools
├── involvement.html            # SRC leadership & events
├── contact.html                # Contact form (Formspree)
│
├── projects/
│   ├── project1.html           # Document Control System
│   ├── project2.html           # Executive Calendar Architecture
│   ├── project3.html           # Financial Reporting Dashboard
│   └── project4.html           # Email Operations Management
│
├── css/
│   └── style.css               # All styles (single file)
│
├── js/
│   └── main.js                 # Navigation, lightbox, tab switching
│
├── images/
│   ├── profile.jpg             # Hero profile photo
│   ├── mentors/                # Recommendation photos
│   ├── csa/                    # CSA Conference photos
│   ├── destress/               # De-Stress Exam Day event photos
│   ├── involvement/            # SRC involvement photos
│   ├── osv/                    # Ontario Student Voices conference
│   ├── policy/                 # Policy Pitch Competition photos
│   └── volunteer/              # United Way volunteering photos
│
├── assets/
│   ├── deliverables/
│   │   ├── Administrative_Portfolio_Case_Studies.docx
│   │   ├── Portfolio_SOP_OnePagers.docx
│   │   └── Project4_Email_Templates.docx
│   └── certificates/
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Pages & Features

- **Home** — Hero section, stats bar, featured projects, SRC involvement preview, CTA
- **About** — Bio, quick facts, roles targeting, LinkedIn recommendations (Pratik Bedi & Ryan Peebles)
- **Experience & Education** — Work history, co-op placement, academic credentials
- **Projects** — Four detailed case studies with STAR stories, process diagrams, and downloadable deliverables
- **Skills** — Technical and soft skills, tools, certifications
- **Work & Involvement** — SRC VP role, campus events, provincial conferences, volunteering
- **Contact** — Direct contact info + Formspree-powered message form

---

## Running Locally

No build step required. Just open the files directly:

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Open in browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or use VS Code with the **Live Server** extension for auto-reload during development.

---

## Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / `/ (root)`
5. Click **Save**

Your site will be live at `https://your-username.github.io/your-repo-name` within ~2 minutes.

---

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io). The current endpoint is pre-configured. To use your own:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint URL
3. In `contact.html`, replace the `action` attribute:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## Key Design Decisions

- **Single CSS file** — all styles in `css/style.css` using CSS custom properties for easy theming
- **No JavaScript framework** — vanilla JS keeps the site fast and dependency-free
- **`file://` compatible** — works when opened directly from the filesystem (no server required)
- **Lightbox built-in** — click any photo to open full-screen overlay (implemented in `js/main.js`)
- **Responsive** — CSS Grid and media queries handle mobile/tablet/desktop layouts

---

## Author

**Souravdeep Singh**
Office Administrator & Operations Professional
Windsor, Ontario, Canada

- LinkedIn: [linkedin.com/in/sourav2312](https://www.linkedin.com/in/sourav2312/)
- Email: [singh.s.deep800@gmail.com](mailto:singh.s.deep800@gmail.com)
- PGWP Holder — Legally authorized to work full-time in Canada

---

<div align="center">

*Built with care. Every project is real. Every file is downloadable.*

</div>
