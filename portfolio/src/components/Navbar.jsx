import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
const links = ['about', 'skills', 'projects', 'experience', 'contact']
export default function Navbar({ name }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' })
    links.forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <a href="#top" className="font-display text-lg font-bold">{name}</a>
        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l}><a href={`#${l}`} aria-current={active === l ? 'true' : undefined}
              className={`text-sm capitalize transition hover:text-white ${active === l ? 'text-white' : 'text-mist'}`}>
              {l}{active === l && <span className="mt-1 block h-px bg-gradient-to-r from-electric to-violet" />}</a></li>
          ))}
        </ul>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-white/10 bg-navy px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l}><a href={`#${l}`} onClick={() => setOpen(false)} className="block py-3 capitalize text-mist">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  )
}
