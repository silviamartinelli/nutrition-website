https://silviamartinelli.github.io/nutrition-website/

# Nutri·Neuro – nutrition coaching website

A simple static website (HTML/CSS/JS). No build tools, no database. Works on GitHub Pages.

## 1. Publish on GitHub Pages
1. Create a GitHub account and a new repository (e.g. `my-website`, public).
2. Upload **all files in this folder** (drag & drop in the GitHub web interface: *Add file → Upload files*).
3. Go to **Settings → Pages**, set *Source* to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/my-website/`.
5. Own domain (e.g. `yourname.com`)? Add it under Settings → Pages → Custom domain.

## 2. What to edit
| I want to change…                         | Edit this                       |
|-------------------------------------------|---------------------------------|
| Name, tagline, email, links, menu, booking | `assets/js/config.js`           |
| Page texts                                 | the `.html` files (plain text between tags) |
| Colours & fonts                            | top of `assets/css/style.css`   |
| Photos                                     | put in `assets/img/` and replace the `<div class="photo">` blocks with `<img src="assets/img/hero.jpg" alt="…">` |
| Prices & services                          | `appointments.html`, `approach.html` |

Search the HTML files for the words "mock" and "[ ... ]" to find placeholder text.

## 3. Adding newsletter / content
1. Copy your file into `content/files/`:
   - **PDF** or **Markdown (.md)** → can be read online *and* downloaded.
   - Any other file (Word, Excel, image, zip) → download only.
2. Add an entry in `content/content.json` (copy an existing block; keep the commas right):
   ```json
   {
     "id": "unique-name",
     "title": "My new guide",
     "date": "2026-10-05",
     "type": "guide",
     "category": "Hormones",
     "summary": "One-sentence description.",
     "file": "content/files/my-new-guide.pdf"
   }
   ```
   `type`: newsletter, article, guide, recipe or link (link = external URL). Categories create the filter buttons automatically. Newest date is shown first.
3. Commit. The site updates itself in about a minute.

Tip: write newsletters in Markdown (`# Title`, `## Heading`, `- list`), they look best online.

## 4. Forms, newsletter & booking
- **Contact + newsletter forms:** free account at formspree.io, create two forms, paste the URLs into `config.js`. For a full newsletter service (mailing list, unsubscribe links) use Buttondown, MailerLite or Substack and paste their form URL.
- **Booking:** create a free Calendly / Cal.com page and paste its link in `bookingUrl`.

## 5. Test on your computer
Browsers block loading `content.json` from a double-clicked file. Run in this folder:
`python3 -m http.server 8000` and open http://localhost:8000

## 6. Before going live
- Replace `privacy.html` text with a real policy for your country and add any legal/business info required.
- Check any testimonials are real and consented.
- Add a photo and `<title>` / description per page for search engines.

## Name ideas
- **Nutri·Neuro** (placeholder) – **Neurogusto** – **Mindful Metabolism** – **The Nourished Brain**
- **Gut & Mind Nutrition** – **Rooted Mind** – **Equilibria Nutrition** (hormonal balance) – **Synapse & Sage**
- Or simply your name: *Dr. Silvia Martinelli · Nutrition & Neuroscience*, which builds trust and is easy to find.
Check the domain and social handles are free before deciding.
