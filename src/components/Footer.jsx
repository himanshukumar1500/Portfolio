// Import required icons from lucide-react
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'

// Import profile information from site data
// profile.email contains your Gmail address
import { profile } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">

      {/* Main footer container */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-mist">

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        {/* Social media links */}
        <div className="flex items-center gap-4">

          {/* GitHub */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          {/* Gmail - Opens Gmail Compose directly */}
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>

          {/* Back to top */}
          <a
            href="#top"
            className="btn btn-ghost !px-4 !py-2"
          >
            <ArrowUp size={16} />
            Back to top
          </a>

        </div>
      </div>
    </footer>
  )
}
