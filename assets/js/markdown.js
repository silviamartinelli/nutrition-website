/* Tiny Markdown renderer: headings, bold/italic, links, lists, blockquotes, paragraphs. */
window.renderMarkdown = function (src) {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = s => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((https?:[^)\s]+|[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const out = []; let list = null, para = [];
  const flushP = () => { if (para.length) { out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; } };
  const flushL = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const raw of src.split("\n")) {
    const l = raw.trimEnd(); let m;
    if (!l.trim()) { flushP(); flushL(); }
    else if ((m = l.match(/^(#{1,4})\s+(.*)/))) { flushP(); flushL(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); }
    else if ((m = l.match(/^\s*[-*]\s+(.*)/))) { flushP(); if (list !== "ul") { flushL(); out.push("<ul>"); list = "ul"; } out.push("<li>" + inline(m[1]) + "</li>"); }
    else if ((m = l.match(/^\s*\d+\.\s+(.*)/))) { flushP(); if (list !== "ol") { flushL(); out.push("<ol>"); list = "ol"; } out.push("<li>" + inline(m[1]) + "</li>"); }
    else if ((m = l.match(/^>\s?(.*)/))) { flushP(); flushL(); out.push("<blockquote>" + inline(m[1]) + "</blockquote>"); }
    else { flushL(); para.push(l.trim()); }
  }
  flushP(); flushL(); return out.join("\n");
};
