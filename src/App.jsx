// App.jsx
// Main component of the portfolio. It puts all the sections on one page
// in the same order that they appear on the website (top to bottom).

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Skills, Projects, Experience, Services } from './components/Sections'
import Resume from './components/Resume' // NEW: resume section
import Contact from './components/Contact'
import Footer from './components/Footer'
import { profile } from './data/site' // all my personal details are stored here

export default function App() {
  return (
    <>
      {/* Navigation bar stays fixed at the top */}
      <Navbar name={profile.name} />

      {/* <main> holds the main content of the page (good for accessibility and SEO) */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Resume />   {/* NEW: added before Contact */}
        <Contact />
      </main>

      <Footer />
    </>
  )
}
