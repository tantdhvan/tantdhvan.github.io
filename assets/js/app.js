// Minimal Markdown loader/parser for GitHub Pages.
// No external dependencies are required.

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function inlineMarkdown(text) {
  let out = escapeHtml(text);

  // Links: [label](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Inline code
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold and emphasis
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Lightweight badges for common ranks
  out = out.replace(/(A∗|A-star|Q1|Q2|Q3|SCOPUS)/g, '<span class="badge">$1</span>');

  return out;
}

function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let paragraph = [];

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeLists() {
    if (inUl) {
      html.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      html.push("</ol>");
      inOl = false;
    }
  }

  function closeBlockquote() {
    if (inBlockquote) {
      html.push("</blockquote>");
      inBlockquote = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeLists();
      closeBlockquote();
      continue;
    }

    if (/^---+$/.test(line)) {
      flushParagraph();
      closeLists();
      closeBlockquote();
      html.push("<hr />");
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      closeLists();
      closeBlockquote();
      const level = heading[1].length + 1; // markdown h1 becomes h2 in page cards
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      closeLists();
      if (!inBlockquote) {
        html.push("<blockquote>");
        inBlockquote = true;
      }
      html.push(`<p>${inlineMarkdown(line.slice(2))}</p>`);
      continue;
    }

    const unordered = /^[-*]\s+(.*)$/.exec(line);
    if (unordered) {
      flushParagraph();
      closeBlockquote();
      if (!inUl) {
        if (inOl) { html.push("</ol>"); inOl = false; }
        html.push("<ul>");
        inUl = true;
      }
      html.push(`<li>${inlineMarkdown(unordered[1])}</li>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.*)$/.exec(line);
    if (ordered) {
      flushParagraph();
      closeBlockquote();
      if (!inOl) {
        if (inUl) { html.push("</ul>"); inUl = false; }
        html.push("<ol>");
        inOl = true;
      }
      const item = ordered[1].replace(/^\*\*(.+?)\*\*\.\s*/, "<strong>$1</strong>. ");
      html.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    closeLists();
    closeBlockquote();
    paragraph.push(line);
  }

  flushParagraph();
  closeLists();
  closeBlockquote();

  return html.join("\n");
}

async function loadMarkdownSections() {
  const sections = document.querySelectorAll("[data-md]");
  for (const section of sections) {
    const file = section.getAttribute("data-md");
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Cannot load ${file}`);
      const md = await response.text();
      section.innerHTML = parseMarkdown(md);
    } catch (error) {
      section.innerHTML = `
        <h2>Không tải được nội dung</h2>
        <p>Không đọc được file <code>${file}</code>. Nếu đang mở trực tiếp bằng file,
        hãy chạy thử bằng máy chủ cục bộ: <code>python -m http.server 8000</code>.</p>
      `;
      console.error(error);
    }
  }
}

function setupNavigation() {
  const button = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  setupNavigation();
  loadMarkdownSections();
});
