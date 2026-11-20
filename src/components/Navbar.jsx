// Navbar.jsx
// Fixed navigation bar with: section links, active link highlight,
// light/dark theme button, and a hamburger menu for mobile.

import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'

// Each name must match the id of a section (e.g. id="resume").
// NEW: added 'resume' so it shows in the navbar.
const links = ['about', 'skills', 'projects', 'experience', 'resume', 'contact']

// Small button to switch between light and dark mode
function ThemeToggle() {
  // Start with whatever theme the page already has
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    setDark(next)
    // Tailwind dark mode works by adding/removing the "dark" class on <html>
    document.documentElement.classList.toggle('dark', next)
    // Save the choice so it is remembered after refresh.
    // try/catch because localStorage can fail (for example in private mode).
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="glass p-2 text-mist transition hover:text-white"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false)   // is the mobile menu open?
  const [active, setActive] = useState('')  // which section is on screen right now

  // Active link highlight:
  // IntersectionObserver watches each section and tells us when it is in the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' } // only counts the middle strip of the screen
    )
    links.forEach((id) => {
      const el = document.getElementById(id)
      el && io.observe(el)
    })
    return () => io.disconnect() // cleanup when the component is removed
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        {/* My name works as the logo and scrolls to the top */}
        <a href="#top" className="font-display text-lg font-bold">{name}</a>

        {/* Desktop links (hidden on mobile with "hidden md:flex") */}
        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l}`}
                aria-current={active === l ? 'true' : undefined}
                className={`text-sm capitalize transition hover:text-white ${active === l ? 'text-white' : 'text-mist'}`}
              >
                {l}
                {/* small gradient underline under the active link */}
                {active === l && <span className="mt-1 block h-px bg-gradient-to-r from-electric to-violet" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Hamburger button: only visible on mobile (md:hidden) */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: shown only when "open" is true.
          Clicking a link closes the menu. */}
      {open && (
        <ul className="border-t border-white/10 bg-navy px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l}`} onClick={() => setOpen(false)} className="block py-3 capitalize text-mist">
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
