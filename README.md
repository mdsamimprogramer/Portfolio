# Portfolio — React + Vite

This repository is a production-ready personal portfolio built with React and Vite. It is designed for performance, accessibility, and a polished user experience suitable for showcasing to top-tier engineering recruiters.

**Live demo:** Add your deployed site URL here (e.g. https://your-domain.com)

**Highlights:**

- Minimal, elegant UI with attention to typography, spacing and motion.
- Accessible form with aria attributes, honeypot anti-spam, and animated success feedback.
- Fast interactive background and subtle micro-interactions using Framer Motion.

**Tech stack**

- **Framework:** React + Vite
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion
- **Forms & Validation:** react-hook-form + zod
- **Icons:** lucide-react
- **Email:** EmailJS (optional; configured via env)

**Repository structure (key files)**

- [src/components/Contact.jsx](src/components/Contact.jsx#L1-L551) — polished contact form with accessibility and EmailJS integration
- [src/App.jsx](src/App.jsx) — application root and routing
- [src/main.jsx](src/main.jsx) — entry file
- tailwind.config.js — Tailwind configuration
- vite.config.js — Vite config for dev/build

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production and preview:

```bash
npm run build
npm run preview
```

## Environment variables

To enable the contact form (EmailJS), add the following to a `.env` file at project root or set them in your deployment platform:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

If these are not set, the form will show a clear error message and prevent sending.

## Accessibility & UX

- Inputs include `aria-invalid`, `aria-required` and `aria-describedby` for the status region.
- Status messages use `role="status"` and `aria-live="polite"` to announce updates to assistive tech.
- Keyboard focus styles and `focus-visible` rings are present for strong keyboard navigation.

## Deployment

This app is optimized for modern static hosts. Recommended platforms:

- Vercel — automatic deployments from Git, environment variables via dashboard
- Netlify — similar automatic deployments

To deploy to Vercel:

```bash
vercel --prod
```

Make sure to add the `VITE_EMAILJS_*` env vars in the Vercel project settings.

## Design notes (for recruiters)

- Motion is intentionally subtle: long-duration background animation + short interactive micro-interactions on user events.
- Focus on clarity: generous whitespace, high contrast typography, and clear affordances for actions.
- Progressive enhancement: features work without JavaScript where possible; accessibility is treated as a first-class requirement.

## Testing the contact form locally

- Add EmailJS env vars locally and open the site. Submit a test message from the contact form.
- Alternatively, replace EmailJS call with a temporary mock endpoint during development.

## Contributing

PRs are welcome. For substantial changes, open an issue first describing the goal.

## License

Add your license information here.

---

If you want, I can also generate a short `README` blurb tailored to recruiters (one-paragraph elevator pitch) in Bangla or English and add screenshots or deployment badges. Which would you prefer?
