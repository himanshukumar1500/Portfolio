// React hooks import
import { useEffect, useState } from 'react'

// Framer Motion animations
import { motion } from 'framer-motion'

// Social media icons
import { Github, Linkedin, Mail } from 'lucide-react'

// Portfolio profile data
import { profile } from '../data/site'


// =====================================================
// TYPED TEXT COMPONENT
// =====================================================
// Ye component profile.roles ke words ko typing/deleting
// animation ke saath display karta hai.

function Typed({ words }) {

  // Current word ka index
  const [i, setI] = useState(0)

  // Screen par currently visible text
  const [text, setText] = useState('')

  // Check karta hai ki text delete ho raha hai ya nahi
  const [del, setDel] = useState(false)


  // Typing animation effect
  useEffect(() => {

    // Current word
    const w = words[i]

    // Animation speed
    const t = setTimeout(() => {

      // Agar text delete nahi ho raha
      if (!del) {

        // Ek-ek character add karo
        setText(w.slice(0, text.length + 1))

        // Agar complete word type ho gaya
        if (text === w) {
          setDel(true)
        }

      } else {

        // Ek-ek character remove karo
        setText(w.slice(0, text.length - 1))

        // Word completely delete hone ke baad
        // next word par move karo
        if (text.length <= 1) {
          setDel(false)
          setI((i + 1) % words.length)
        }
      }

    // Typing speed = 80ms
    // Deleting speed = 40ms
    // Complete word ke baad = 1400ms pause
    }, del ? 40 : text === w ? 1400 : 80)

    // Previous timer ko clean up karo
    return () => clearTimeout(t)

  }, [text, del, i, words])


  // Typed text return
  return (
    <span
      className="bg-gradient-to-r from-electric to-violet bg-clip-text text-transparent"
      aria-live="off"
    >
      {text}

      {/* Blinking cursor */}
      <span className="animate-pulse">|</span>
    </span>
  )
}


// =====================================================
// SOCIAL LINKS
// =====================================================
// Yahan GitHub, LinkedIn aur Email links define hain.

const socials = [
  [Github, profile.github, 'GitHub'],
  [Linkedin, profile.linkedin, 'LinkedIn'],
  [Mail, `mailto:${profile.email}`, 'Email']
]


// =====================================================
// HERO COMPONENT
// =====================================================

export default function Hero() {

  return (

    // Main Hero Section
    <section
      id="top"
      className="relative overflow-hidden"
    >


      {/* ============================================
          BACKGROUND GRID
          ============================================ */}

      <div
        className="grid-bg absolute inset-0"
        aria-hidden
      />


      {/* ============================================
          BACKGROUND PURPLE/VIOLET GLOW
          ============================================ */}

      <div
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/30 blur-[120px]"
        aria-hidden
      />


      {/* ============================================
          MAIN HERO CONTAINER
          ============================================ */}

      <div
        className="section relative grid items-center gap-12 pt-36 md:grid-cols-[1.4fr_1fr]"
      >


        {/* ==========================================
            LEFT SIDE - HERO CONTENT
            ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >


          {/* ----------------------------------------
              OPEN TO OPPORTUNITIES BADGE
              ---------------------------------------- */}

          <span className="glass inline-flex items-center gap-2 px-4 py-1.5 text-sm text-mist">

            {/* Green animated status dot */}
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            Open to Opportunities

          </span>


          {/* ----------------------------------------
              PROFILE NAME
              ---------------------------------------- */}

          <h1
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
          >
            {profile.name}
          </h1>


          {/* ----------------------------------------
              PROFILE TITLE
              ---------------------------------------- */}

          <p
            className="mt-4 font-display text-2xl text-white/90 md:text-3xl"
          >
            {profile.title}
          </p>


          {/* ----------------------------------------
              TYPING ANIMATION
              ---------------------------------------- */}

          <p className="mt-2 h-8 font-display text-xl">
            <Typed words={profile.roles} />
          </p>


          {/* ----------------------------------------
              INTRODUCTION
              ---------------------------------------- */}

          <p className="mt-4 max-w-xl text-lg text-mist">
            {profile.intro}
          </p>


          {/* ========================================
              HERO BUTTONS
              ======================================== */}

          <div className="mt-8 flex flex-wrap gap-4">

            {/* Projects button */}
            <a
              href="#projects"
              className="btn btn-primary"
            >
              Explore My Work
            </a>


            {/* Contact button */}
            <a
              href="#contact"
              className="btn btn-ghost"
            >
              Contact Me
            </a>

          </div>


          {/* ========================================
              SOCIAL MEDIA LINKS
              ======================================== */}

          <div className="mt-8 flex gap-3">

            {/* Loop through social links */}
            {socials.map(([Icon, href, label]) => (

              <a
                key={label}
                href={href}

                // Email ko new tab mein open nahi karna
                // GitHub/LinkedIn ko new tab mein open karna
                target={
                  label === 'Email'
                    ? undefined
                    : '_blank'
                }

                // Security attribute for external links
                rel="noreferrer"

                // Accessibility label
                aria-label={label}

                // Button styling
                className="glass p-3 text-mist transition hover:-translate-y-1 hover:text-white hover:shadow-[0_0_24px_-6px_#4F7CFF]"
              >

                {/* Social icon */}
                <Icon size={20} />

              </a>

            ))}

          </div>

        </motion.div>


        {/* ==========================================
            RIGHT SIDE - PROFILE PHOTO
            ========================================== */}

        <motion.div

          // Initial animation
          initial={{
            opacity: 0,
            scale: 0.9
          }}

          // Final animation
          animate={{
            opacity: 1,
            scale: 1
          }}

          // Animation timing
          transition={{
            delay: 0.2,
            duration: 0.7
          }}

          // Center the image
          className="mx-auto"
        >


          {/* ========================================
              SQUARE GRADIENT BORDER
              ======================================== */}

          <div
            className="
              rounded-none
              bg-gradient-to-br
              from-electric
              to-violet
              p-1
              shadow-[0_0_80px_-10px_#4F7CFF]
            "
          >


            {/* ======================================
                PROFILE IMAGE
                ====================================== */}

            <img
              src="/profile.jpg"
              alt="Photo of Himanshu"

              // h-80 + w-80 = square image
              // rounded-none = no circular corners
              // object-cover = image fills the square
              className="
                h-80
                w-80
                rounded-none
                object-cover
              "
            />

          </div>


        {/* Close profile image motion.div */}
        </motion.div>


      {/* Close main hero container */}
      </div>


    {/* Close Hero section */}
    </section>
  )
}