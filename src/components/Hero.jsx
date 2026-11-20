// React hooks
import { useEffect, useState } from 'react'

// Framer Motion for animations
import { motion } from 'framer-motion'

// Social media icons
import { Github, Linkedin, Mail } from 'lucide-react'

// Portfolio profile data
import { profile } from '../data/site'


// Typing animation component
function Typed({ words }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const w = words[i]

    // Control typing and deleting speed
    const t = setTimeout(
      () => {
        if (!del) {
          // Add one character at a time
          setText(w.slice(0, text.length + 1))

          // Start deleting when the complete word is typed
          if (text === w) {
            setDel(true)
          }
        } else {
          // Remove one character at a time
          setText(w.slice(0, text.length - 1))

          // Move to the next word
          if (text.length <= 1) {
            setDel(false)
            setI((i + 1) % words.length)
          }
        }
      },
      del ? 40 : text === w ? 1400 : 80
    )

    // Clear timeout when component updates/unmounts
    return () => clearTimeout(t)
  }, [text, del, i, words])

  return (
    // Gradient text for the typing animation
    <span
      className="bg-gradient-to-r from-electric to-violet bg-clip-text text-transparent"
      aria-live="off"
    >
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}


// Social media links
const socials = [
  [Github, profile.github, 'GitHub'],
  [Linkedin, profile.linkedin, 'LinkedIn'],
  [Mail, `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`, 'Email'],
]


// Main Hero component
export default function Hero() {
  return (
    // Hero section
    <section id="top" className="relative overflow-hidden">

      {/* Background grid */}
      <div
        className="grid-bg absolute inset-0"
        aria-hidden
      />

      {/* Background glow effect */}
      <div
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/30 blur-[120px]"
        aria-hidden
      />

      {/* Main Hero content container */}
      <div className="section relative grid items-center gap-12 pt-36 md:grid-cols-[1.4fr_1fr]">

        {/* Left side - Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Availability badge */}
          <span className="glass inline-flex items-center gap-2 px-4 py-1.5 text-sm text-mist">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Open to Opportunities
          </span>

          {/* Name */}
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            {profile.name}
          </h1>

          {/* Professional title */}
          <p className="mt-4 font-display text-2xl text-white/90 md:text-3xl">
            {profile.title}
          </p>

          {/* Animated roles */}
          <p className="mt-2 h-8 font-display text-xl">
            <Typed words={profile.roles} />
          </p>

          {/* Introduction */}
          <p className="mt-4 max-w-xl text-lg text-mist">
            {profile.intro}
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            {/* Projects button */}
            <a href="#projects" className="btn btn-primary">
              Explore My Work
            </a>

            {/* Contact button */}
            <a href="#contact" className="btn btn-ghost">
              Contact Me
            </a>

          </div>

          {/* Social media links */}
          <div className="mt-8 flex gap-3">
            {socials.map(([Icon, href, label]) => (
              <a
                key={label}
                href={href}
                target={label === 'Email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                className="glass p-3 text-mist transition hover:-translate-y-1 hover:text-white hover:shadow-[0_0_24px_-6px_#4F7CFF]"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

        </motion.div>


        {/* Right side - Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto"
        >

          {/* Square gradient border around profile image */}
          <div className="rounded-none bg-gradient-to-br from-electric to-violet p-1 shadow-[0_0_80px_-10px_#4F7CFF]">

            {/* Profile image */}
            <img
              src="/profile.jpg"
              alt="Photo of Himanshu"
              className="h-80 w-80 rounded-none object-cover"
            />

          </div>

        </motion.div>

      </div>
    </section>
  )
}
