import { motion } from 'framer-motion'
import { ExternalLink, Github, Code2, Server, Database, Wrench, GraduationCap, Layers, Brain} from 'lucide-react'
import { profile, strengths, skills, projects, timeline, services } from '../data/site'
const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.5 } }
export function About() {
  return (
    <section id="about" className="section">
      <h2 className="h2">About me</h2>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-mist">
          <p>{profile.about}</p><p><strong className="text-white">Goals:</strong> {profile.goals}</p>
          <div className="glass flex gap-3 p-4"><GraduationCap className="shrink-0 text-electric" />
            <p className="text-sm">B.Tech in Computer Science Engineering, UIET Chandigarh, Batch : 2023-2027</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {strengths.map((s) => (<motion.div key={s.title} {...reveal} className="glass p-5">
            <h3 className="font-display font-semibold">{s.title}</h3><p className="mt-1 text-sm text-mist">{s.text}</p></motion.div>))}
        </div>
      </div>
    </section>
  )
}
const icons = { Frontend: Code2, Backend: Server, Database, 'AI / ML': Brain, 'Tools & Technologies': Wrench }
export function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="h2">Technical skills</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {Object.entries(skills).map(([cat, list]) => { const Icon = icons[cat]; return (
          <motion.div key={cat} {...reveal} className="glass p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold"><Icon size={20} className="text-electric" />{cat}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {list.map((s) => <li key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-mist transition hover:border-electric hover:text-white">{s}</li>)}
            </ul>
          </motion.div>) })}
      </div>
    </section>
  )
}
function LinkBtn({ href, icon: Icon, children, primary }) {
  const cls = `btn !px-4 !py-2 ${primary ? 'btn-primary' : 'btn-ghost'}`
  return href
    ? <a href={href} target="_blank" rel="noreferrer" className={cls}><Icon size={16} />{children}</a>
    : <span className={`${cls} cursor-not-allowed opacity-40`} aria-disabled="true" title="Add a link in src/data/site.js"><Icon size={16} />{children}</span>
}
export function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="h2">Featured projects</h2>
      {projects.length === 0 ? <p className="mt-8 text-mist">Projects coming soon.</p> : (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <motion.article key={p.title} {...reveal} whileHover={{ y: -6 }} className="glass flex flex-col overflow-hidden">
              {p.image ? <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="h-40 w-full object-cover" />
                : <div className="flex h-40 items-center justify-center bg-gradient-to-br from-electric/30 to-violet/30" role="img" aria-label="Screenshot placeholder"><Layers className="text-white/60" size={40} /></div>}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-mist">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-full bg-electric/15 px-2.5 py-0.5 text-xs text-electric">{t}</li>)}</ul>
                <div className="mt-5 flex gap-3"><LinkBtn href={p.live} icon={ExternalLink} primary>Live Demo</LinkBtn><LinkBtn href={p.repo} icon={Github}>GitHub Repository</LinkBtn></div>
              </div>
            </motion.article>))}
        </div>)}
    </section>
  )
}
export function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="h2">Experience & education</h2>
      <ol className="mt-8 space-y-6 border-l border-white/15 pl-6">
        {timeline.map((t) => (
          <motion.li key={t.title} {...reveal} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-electric shadow-[0_0_12px_#4F7CFF]" />
            <p className="text-sm text-electric">{t.when}</p><h3 className="font-display font-semibold">{t.title}</h3>
            <p className="text-sm text-mist">{t.place}</p><p className="mt-1 text-sm text-mist">{t.text}</p>
          </motion.li>))}
      </ol>
    </section>
  )
}
export function Services() {
  return (
    <section id="services" className="section">
      <h2 className="h2">Services</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => <motion.li key={s} {...reveal} className="glass p-5 font-display font-medium transition hover:border-electric/60">{s}</motion.li>)}
      </ul>
    </section>
  )
}
