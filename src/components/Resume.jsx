// Resume.jsx
// This component shows the "My Resume" section of the portfolio.
// It has a resume card and two buttons: View Resume and Download Resume.

import { motion } from 'framer-motion' // used for the animations (fade-in, hover)
import { FileText, Eye, Download } from 'lucide-react' // icons for the card and buttons
import { profile } from '../data/site' // my name comes from site.js so I only edit it in one place

// Path of the resume file. The PDF must be at public/resume.pdf
// (files inside the public folder are served directly from "/")
const RESUME_URL = '/resume.pdf'

// Scroll animation: the element fades in and moves up when it appears on screen.
// "once: true" means it plays only the first time.
const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export default function Resume() {
  return (
    // id="resume" is needed so the navbar link (#resume) can scroll to this section
    <section id="resume" className="section">
      {/* Section heading and short description */}
      <h2 className="h2">My Resume</h2>
      <p className="mt-4 max-w-2xl text-mist">
        View my resume to learn more about my education, technical skills, projects, experience, and achievements.
      </p>

      {/* Wrapper: centers the card and buttons, fades in on scroll */}
      <motion.div {...reveal} className="mx-auto mt-10 max-w-xl">

        {/* Resume preview card (lifts up a little on hover) */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass flex items-center gap-5 p-6 transition hover:border-electric/60 hover:shadow-[0_0_40px_-12px_#4F7CFF]"
        >
          {/* Icon box with the blue-purple gradient used in the rest of the site */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-violet shadow-[0_0_30px_-6px_#4F7CFF]">
            {/* aria-hidden: screen readers skip decorative icons */}
            <FileText size={30} className="text-[#ffffff]" aria-hidden />
          </div>

          {/* Card text: name, degree, file name and file type */}
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-mist">Computer Science Engineering Student</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist">
              <span className="rounded-full bg-electric/15 px-2.5 py-0.5 text-electric">Resume.pdf</span>
              <span>PDF Document</span>
            </p>
          </div>
        </motion.div>

        {/* Buttons: stacked on mobile (flex-col), side by side on bigger screens (sm:flex-row) */}
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">

          {/* View: opens the PDF in a new tab.
              rel="noopener noreferrer" is a security practice for target="_blank" links */}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary justify-center">
            <Eye size={18} aria-hidden /> View Resume
          </a>

          {/* Download: the "download" attribute makes the browser save the file
              instead of opening it. The text is the file name that gets saved. */}
          <a href={RESUME_URL} download="Himanshu_Kumar_Resume.pdf" className="btn btn-ghost justify-center">
            <Download size={18} aria-hidden /> Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  )
}
