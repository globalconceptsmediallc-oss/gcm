/* =========================================================
   Global Concepts Media — Shared Site Foundation
   File: shared.js
   Version: 2.0.0
   Updated: 2026-08-12
   Purpose: Shared header, navigation, footer, and utilities.
   ========================================================= */
(() => {
  const VERSION = "20260812-1";

  const IS_GITHUB_PAGES = window.location.hostname.endsWith(".github.io");
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // On GitHub Pages, derive the repository path instead of hard-coding it.
  // The custom domain remains rooted at /, while previews survive repo renames.
  const BASE = IS_GITHUB_PAGES && pathParts.length ? `/${pathParts[0]}` : "";

  const navItems = [
    { href: `${BASE}/industries`, label: "Industries" },
    { href: `${BASE}/google-ads`, label: "Google Ads" },
    { href: `${BASE}/seo`, label: "SEO" },
    { href: `${BASE}/case-studies`, label: "Case Studies" },
    { href: `${BASE}/contact`, label: "Contact" }
  ];

  function withV(url) {
    if (!url || url.startsWith("http")) return url;
    const joiner = url.includes("?") ? "&" : "?";
    return `${url}${joiner}v=${encodeURIComponent(VERSION)}`;
  }

  function normalizePath(path) {
    if (!path) return "/";
    return path
      .split("?")[0]
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "")
      .replace(/\/+$/, "") || "/";
  }

  function samePath(a, b) {
    return normalizePath(a) === normalizePath(b);
  }

  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const current = window.location.pathname || "/";
    const homeHref = `${BASE}/`;
    const growthReviewHref = `${BASE}/growth-review`;
    const logoSrc = `${BASE}/images/logo.jpg`;

    const links = navItems.map((item) => {
      const isActive = samePath(current, item.href);
      return `<a class="${isActive ? "active" : ""}" href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
    }).join("");

    const homeActive =
      samePath(current, `${BASE}/`) ||
      samePath(current, `${BASE}/index.html`) ||
      samePath(current, "/") ||
      samePath(current, "/index.html");

    header.innerHTML = `
      <header class="site-header">
        <div class="container navbar">
          <a class="brand" href="${homeHref}" aria-label="Global Concepts Media Home">
            <img src="${withV(logoSrc)}" alt="Global Concepts Media logo" width="40" height="40" />
            <span class="brand-text">
              <span class="brand-name">Global Concepts Media</span>
              <span class="brand-tag">Google Ads + SEO</span>
            </span>
          </a>

          <nav class="navlinks" aria-label="Primary navigation">
            <a class="${homeActive ? "active" : ""}" href="${homeHref}"${homeActive ? ' aria-current="page"' : ""}>Home</a>
            ${links}
          </nav>

          <div class="nav-cta">
            <a class="btn btn-primary" href="${growthReviewHref}">
              Schedule a Growth Review
            </a>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const year = new Date().getFullYear();
    const logoSrc = `${BASE}/images/logo.jpg`;

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="brand" style="min-width:unset;">
              <img src="${withV(logoSrc)}" alt="Global Concepts Media logo" width="40" height="40" />
              <div class="brand-text">
                <div class="brand-name">Global Concepts Media</div>
                <div class="brand-tag">Performance marketing with standards</div>
              </div>
            </div>
            <div class="copy">© ${year} Global Concepts Media. All rights reserved.</div>
          </div>

          <div class="footer-links" aria-label="Footer navigation">
            <a href="${BASE}/industries">Industries</a>
            <a href="${BASE}/google-ads">Google Ads</a>
            <a href="${BASE}/seo">SEO</a>
            <a href="${BASE}/case-studies">Case Studies</a>
            <a href="${BASE}/growth-review">Growth Review</a>
            <a href="${BASE}/sales-presentation">Sales Presentation</a>
            <a href="${BASE}/contact">Contact</a>
            <a href="${BASE}/privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    `;
  }

  function wireContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const note = document.getElementById("formNote");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const website = String(fd.get("website") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !email || !message) {
        if (note) note.textContent = "Please fill in name, email, and message.";
        return;
      }

      const subject = encodeURIComponent(`New inquiry — ${name}`);
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        website ? `Website: ${website}` : `Website:`,
        ``,
        `Message:`,
        message
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      const to = "andy@globalconceptsmedia.com";
      const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

      if (note) note.textContent = "Opening your email client…";
      window.location.href = mailto;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    wireContactForm();
  });
})();
