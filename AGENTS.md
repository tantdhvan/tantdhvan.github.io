# AGENTS.md

This repository is a static academic personal website for **Trần Đình Tân**. It is intended to be hosted on GitHub Pages and maintained mostly by editing Markdown files.

## Project purpose

Build and maintain a clean, public-ready academic homepage with the following sections:

- Basic profile and contact information
- Research interests
- Publications
- Open topics and student opportunities
- Teaching courses and materials

The website should look professional, academic, lightweight, and easy to maintain. Avoid decorative complexity unless it improves readability.

## Technology stack

- Static HTML/CSS/JavaScript only
- No build step
- No package manager required
- No backend
- No external JavaScript dependency required
- Markdown content is loaded at runtime by `assets/js/app.js`
- GitHub Pages is the target deployment environment

Do not introduce React, Vite, Next.js, Jekyll, Bootstrap, Tailwind, npm, or other frameworks unless the user explicitly asks for a migration.

## Repository structure

```text
.
├── index.html
├── 404.html
├── .nojekyll
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── img/
│       ├── avatar.jpg
│       └── favicon.svg
├── content/
│   ├── profile.md
│   ├── research.md
│   ├── publications.md
│   ├── students.md
│   └── teaching.md
├── materials/
└── README.md
```

## Editing principles

### Public-facing content

All public-facing text must be clean and final-looking. Do **not** place internal notes, TODO explanations, drafting comments, or implementation guidance inside files that are rendered on the website.

Allowed placeholders are short and neutral, for example:

- `email@phenikaa-uni.edu.vn`
- `Slides`
- `Bài tập`
- `Code mẫu`
- `Đang cập nhật`

Do not use visible notes such as:

- `Gợi ý cập nhật...`
- `TODO: ...`
- `Sau này thêm...`
- `Dữ liệu này lấy từ...`
- `Chưa có dữ liệu...`
- `Note for Codex...`

If guidance for maintainers is needed, put it in `README.md` or this `AGENTS.md`, not in `content/*.md`.

### Markdown content

The main editable data lives in `content/*.md`.

Use concise academic Vietnamese by default. English is allowed for publication titles, research terminology, and international-facing descriptions.

Supported Markdown syntax is intentionally simple because `assets/js/app.js` uses a lightweight parser:

- Headings: `#`, `##`, `###`, `####`
- Bullet lists: `- item`
- Ordered lists: `1. item`
- Links: `[label](url)`
- Bold: `**text**`
- Italic: `*text*`
- Inline code: `` `text` ``
- Horizontal rule: `---`

Avoid tables unless the parser is extended first.

### Publications

The canonical publication list comes from the user-provided Excel file `CongBoCaNhan.xlsx` when available. If the Excel file is not present in the repository, use the existing `content/publications.md` as the canonical source.

Publication formatting convention:

```markdown
### 2026

1. **Tan D. Tran**, Coauthor A, Coauthor B.  
   *Paper title.*  
   Venue or journal information.  
   **Rank/Index**. Role/status if relevant.
```

Rules:

- Group publications by year.
- Sort years in descending order unless the user requests otherwise.
- Keep author names consistent across entries.
- Highlight `**Tan D. Tran**` where appropriate.
- Preserve official paper titles exactly.
- Do not invent DOI, PDF, code, volume, issue, pages, or status.
- Do not add publications not confirmed by the user or a reliable source.
- If adding links, prefer official publisher, DOI, arXiv, DBLP, or Google Scholar links.
- If the total publication count changes, update the statistics block in `index.html`.

### Profile and contact information

Profile content is in `content/profile.md` and the hero section is in `index.html`.

Known public identity information:

- Name: `Trần Đình Tân`
- English display name: `Tan D. Tran`
- Role: Lecturer / Researcher
- Unit: Faculty of Computer Science, Phenikaa School of Computing, Phenikaa University
- ORCID: `https://orcid.org/0000-0001-5866-8458`
- Google Scholar: `https://scholar.google.com/citations?hl=vi&user=EHKNGs0AAAAJ`
- GitHub placeholder/current link: `https://github.com/tantdhvan`

Do not add private information such as date of birth, home address, phone number, personal ID numbers, or family information.

### Research section

Research content is in `content/research.md`.

Core research areas:

- Submodular optimization
- k-submodular maximization
- DR-submodular maximization
- Approximation algorithms
- Streaming and parallel algorithms
- Influence maximization in social networks
- Combinatorial optimization for AI and machine learning

Keep the tone formal and academic. Do not overclaim results.

### Students section

Student opportunities are in `content/students.md`.

This section should invite students to join research or learning activities. Use clear levels when useful:

- Foundational topics for second- and third-year students
- Graduation thesis topics
- Research-oriented topics
- Required background
- Contact method

Do not promise funding, positions, or supervision commitments unless explicitly provided by the user.

### Teaching section

Teaching content is in `content/teaching.md`.

Current courses:

- Cơ sở lập trình
- Ngôn ngữ lập trình C
- Lập trình C nâng cao
- Cấu trúc dữ liệu và giải thuật
- Lập trình hướng đối tượng

Use neutral placeholders for materials until actual files are uploaded. Do not display internal notes about missing materials.

### Materials folder

The `materials/` folder is reserved for course files. Keep paths stable and descriptive.

Suggested structure:

```text
materials/
├── co-so-lap-trinh/
├── ngon-ngu-lap-trinh-c/
├── lap-trinh-c-nang-cao/
├── cau-truc-du-lieu-va-giai-thuat/
└── lap-trinh-huong-doi-tuong/
```

When adding teaching files, prefer clear names without spaces, for example:

- `slides-01-introduction.pdf`
- `exercise-01-basic-io.pdf`
- `code-linked-list.cpp`

## HTML/CSS/JS rules

### `index.html`

- Keep the main layout semantic and simple.
- Keep `data-md="content/filename.md"` attributes aligned with files in `content/`.
- Update the stats block if publication count or teaching count changes.
- Keep the avatar path as `assets/img/avatar.jpg` unless the image file is renamed consistently.

### `assets/css/style.css`

- Maintain a professional academic style.
- Prioritize readability, spacing, and responsive behavior.
- Avoid excessive animation, bright colors, or heavy visual effects.
- Make sure the layout works on mobile screens.

### `assets/js/app.js`

- Keep the site dependency-free unless the user explicitly asks otherwise.
- Preserve the lightweight Markdown loading behavior.
- If extending Markdown support, ensure existing content still renders correctly.
- Do not make network calls to external APIs for normal page rendering.

## Testing checklist

Before finishing any change, check the following:

1. Run a local static server:

   ```bash
   python -m http.server 8000
   ```

2. Open:

   ```text
   http://localhost:8000
   ```

3. Confirm:

   - No visible draft notes, TODOs, or maintainer comments appear on the website.
   - All Markdown sections load successfully.
   - Navigation links scroll to the correct sections.
   - The page works on a narrow/mobile viewport.
   - Avatar and favicon load correctly.
   - Browser console has no avoidable errors.

4. For GitHub Pages deployment, confirm these files are at repository root:

   ```text
   index.html
   404.html
   .nojekyll
   assets/
   content/
   materials/
   README.md
   AGENTS.md
   ```

## Commit and maintenance guidance

Use small, descriptive commits, for example:

- `Update publications for 2026`
- `Add teaching materials for C programming`
- `Replace profile avatar`
- `Clean public-facing placeholders`

Do not commit large unrelated files, temporary exports, local caches, or system files.

## User preference

The owner prefers serious, formal, academically oriented writing. Vietnamese content should be polished, direct, and suitable for a university lecturer/researcher homepage.
