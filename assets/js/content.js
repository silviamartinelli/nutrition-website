/* Newsletter & Resources page.
   Reads content/content.json, shows filterable cards, and opens items in a
   built-in reader (PDF or Markdown) with a Download button. */
(async function () {
  const grid = document.getElementById("cards");
  if (!grid) return;

  let items = [];
  try { items = await (await fetch("content/content.json")).json(); }
  catch (e) { grid.innerHTML = "<p>Could not load content list. (If you opened the file directly, run a local server – see README.)</p>"; return; }

  items.sort((a, b) => b.date.localeCompare(a.date));
  const cats = ["All", ...new Set(items.map(i => i.category))];
  let cat = "All", q = "";

  const filters = document.getElementById("filters");
  const search = document.getElementById("search");
  const fmt = d => new Date(d + "T12:00:00").toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const typeLabel = { newsletter: "Newsletter", article: "Article", guide: "Guide", recipe: "Recipe", link: "Link" };

  function render() {
    filters.innerHTML = cats.map(c => `<button class="chip ${c === cat ? "active" : ""}" data-c="${c}">${c}</button>`).join("");
    const list = items.filter(i =>
      (cat === "All" || i.category === cat) &&
      (i.title + i.summary + i.category).toLowerCase().includes(q));
    grid.innerHTML = list.length ? list.map(card).join("") : "<p class='muted'>Nothing found.</p>";
  }

  function card(i) {
    const canRead = i.file && /\.(pdf|md)$/i.test(i.file);
    const open = i.type === "link"
      ? `<a class="btn small" href="${i.file}" target="_blank" rel="noopener">Open ↗</a>`
      : canRead ? `<button class="btn small" data-read="${i.id}">Read online</button>` : "";
    const dl = i.file && i.type !== "link"
      ? `<a class="btn small ghost" href="${i.file}" download>Download</a>` : "";
    return `<article class="card">
      <div class="meta"><span class="tag">${typeLabel[i.type] || i.type}</span><span>${fmt(i.date)}</span></div>
      <h3>${i.title}</h3>
      <p>${i.summary}</p>
      <p class="muted small">${i.category}</p>
      <div class="actions">${open}${dl}</div>
    </article>`;
  }

  filters.addEventListener("click", e => { const c = e.target.dataset.c; if (c) { cat = c; render(); } });
  search.addEventListener("input", () => { q = search.value.toLowerCase(); render(); });
  grid.addEventListener("click", e => { const id = e.target.dataset.read; if (id) openReader(items.find(i => i.id === id)); });

  // ---- Reader modal ----
  const modal = document.getElementById("reader");
  const body = document.getElementById("reader-body");
  const title = document.getElementById("reader-title");
  const dlBtn = document.getElementById("reader-dl");

  async function openReader(i) {
    title.textContent = i.title; dlBtn.href = i.file;
    modal.hidden = false; document.body.style.overflow = "hidden";
    if (/\.pdf$/i.test(i.file)) {
      body.innerHTML = `<iframe src="${i.file}" title="${i.title}"></iframe>`;
    } else {
      body.innerHTML = "<p>Loading…</p>";
      const md = await (await fetch(i.file)).text();
      body.innerHTML = `<div class="prose">${renderMarkdown(md)}</div>`;
    }
  }
  const close = () => { modal.hidden = true; body.innerHTML = ""; document.body.style.overflow = ""; };
  document.getElementById("reader-close").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });

  render();
})();
