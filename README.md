# Developer Portfolio (React + Vite + Tailwind + Framer Motion)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```
Requires Node.js 18+.

## Customize
- All text, skills, projects, timeline: `src/data/site.js` (replace every `[placeholder]`).
- Project links: leave `live`/`repo` empty and the button shows disabled; add real URLs when ready.
- Screenshots: put images in `public/` and set `image: '/shot.png'`.
- Profile photo: replace the initials circle in `src/components/Hero.jsx`.
- Page title/meta: `index.html`.

## Contact form
Nothing is sent until configured. Create a free form at formspree.io, then:
```bash
cp .env.example .env   # set VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx
```
Without it the form tells the visitor it is not set up (it never fakes success).

## Deploy to GitHub
```bash
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/portfolio.git
git push -u origin main
```

## Free hosting (Vercel)
1. Sign in at vercel.com with GitHub, click **Add New → Project**, import the repo.
2. Framework: Vite (auto-detected). Add `VITE_FORM_ENDPOINT` under Environment Variables. Deploy.
(Netlify: build command `npm run build`, publish directory `dist`.)

## Custom domain
Buy a domain, then in Vercel: **Project → Settings → Domains → Add**. Add the DNS records Vercel shows
(an `A` record for the root domain, a `CNAME` for `www`) at your registrar. HTTPS is automatic after DNS propagates.
