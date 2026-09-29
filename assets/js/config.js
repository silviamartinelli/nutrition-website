/* ==========================================================================
   SITE SETTINGS  -  the one file to edit for your name, contact details,
   links and menu. Everything here is used across all pages.
   ========================================================================== */
window.SITE = {
  // ---- Brand (name ideas are listed in README.md) ----
  name: "Nutri·Neuro",                       // <-- placeholder name
  tagline: "Science-based nutrition for mind, hormones & wellbeing",
  coachName: "Dr. Silvia Martinelli, PhD",

  // ---- Contact ----
  email: "hello@example.com",
  phone: "+00 000 000 0000",
  location: "Online worldwide · In-person in Your City",
  instagram: "https://instagram.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourprofile",

  // ---- Booking (paste your Calendly / Cal.com / Acuity link; leave "" to hide the embed) ----
  bookingUrl: "https://calendly.com/your-name/intro-call",

  // ---- Forms: create a free form at https://formspree.io and paste its URL ----
  contactFormAction:    "https://formspree.io/f/your-contact-id",
  newsletterFormAction: "https://formspree.io/f/your-newsletter-id",
  // (For a real newsletter tool, use the subscribe-form URL of Buttondown / MailerLite / Mailchimp instead.)

  // ---- Menu (order = order on the site). Remove a line to hide a page. ----
  nav: [
    { label: "Home",         href: "index.html" },
    { label: "About",        href: "about.html" },
    { label: "Approach",     href: "approach.html" },
    { label: "Newsletter & Resources", href: "content.html" },
    { label: "Appointments", href: "appointments.html" },
    { label: "Contact",      href: "contact.html" }
  ]
};
