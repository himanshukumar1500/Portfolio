import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/site'
export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-mist">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
   <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
  target="_blank"
  rel="noreferrer"
  aria-label="Email"
>
  <Mail size={18} />
</a>
          <a href="#top" className="btn btn-ghost !px-4 !py-2"><ArrowUp size={16} />Back to top</a>
        </div>
      </div>
    </footer>
  )
}
