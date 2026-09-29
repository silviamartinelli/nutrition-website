/* Builds header + footer on every page from config.js, wires the mobile menu
   and the newsletter / contact forms. You normally don't need to edit this. */
(function () {
  const S = window.SITE;
  const current = (location.pathname.split("/").pop() || "index.html");

  const logo = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M20 33V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 22c-6 0-9-3-9-9 6 0 9 3 9 9Z M20 18c0-5 3-8 9-8 0 6-3 8-9 8Z" fill="currentColor"/>
  </svg>`;

  const links = S.nav.map(n =>
    `<a href="${n.href}" ${n.href === current ? 'aria-current="page"' : ""}>${n.label}</a>`).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="index.html">${logo}<span>${S.name}</span></a>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false">☰</button>
      <nav class="nav" id="nav">${links}</nav>
    </div>`;

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-grid">
      <div>
        <div class="brand">${logo}<span>${S.name}</span></div>
        <p class="muted">${S.tagline}</p>
      </div>
      <div>
        <h4>Explore</h4>
        ${S.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}
      </div>
      <div>
        <h4>Get in touch</h4>
        <a href="mailto:${S.email}">${S.email}</a>
        <span>${S.location}</span>
        ${S.instagram ? `<a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}
        ${S.linkedin ? `<a href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
      </div>
    </div>
    <div class="container legal">
      <p>© ${new Date().getFullYear()} ${S.coachName}. Content on this site is educational and does not replace
      medical advice, diagnosis or treatment. <a href="privacy.html">Privacy</a></p>
    </div>`;

  // Mobile menu
  const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // Fill placeholders like <span data-site="email"></span>
  document.querySelectorAll("[data-site]").forEach(el => {
    const v = S[el.dataset.site]; if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-site-href]").forEach(el => {
    const k = el.dataset.siteHref, v = S[k];
    if (v) el.href = (k === "email" ? "mailto:" : k === "phone" ? "tel:" : "") + v;
  });

  // Forms: set action from config, submit via fetch so the visitor stays on the page
  document.querySelectorAll("form[data-form]").forEach(form => {
    form.action = form.dataset.form === "newsletter" ? S.newsletterFormAction : S.contactFormAction;
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      msg.textContent = "Sending…";
      try {
        const r = await fetch(form.action, { method: "POST", body: new FormData(form),
                                              headers: { Accept: "application/json" } });
        if (!r.ok) throw 0;
        form.reset(); msg.textContent = "Thank you! Your message was sent.";
      } catch (_) {
        msg.textContent = "Something went wrong. Please email " + S.email + " directly.";
      }
    });
  });

  // Booking embed
  const embed = document.getElementById("booking-embed");
  if (embed) {
    if (S.bookingUrl) embed.innerHTML = `<iframe src="${S.bookingUrl}" title="Book an appointment" loading="lazy"></iframe>`;
    else embed.remove();
  }
})();
