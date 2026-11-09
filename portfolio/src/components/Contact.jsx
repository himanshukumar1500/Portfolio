import { useState } from 'react'
import { Mail, Github, Linkedin, Loader2 } from 'lucide-react'
import { profile } from '../data/site'
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const empty = { name: '', email: '', subject: '', message: '' }
function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.subject.trim()) e.subject = 'Enter a subject.'
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.'
  return e
}
export default function Contact() {
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | unconfigured
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  async function onSubmit(ev) {
    ev.preventDefault()
    const errs = validate(v); setErrors(errs)
    if (Object.keys(errs).length) return
    if (!ENDPOINT) return setStatus('unconfigured')
    setStatus('sending')
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) })
      if (!r.ok) throw new Error()
      setStatus('success'); setV(empty)
    } catch { setStatus('error') }
  }
  const field = 'mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric/50'
  const F = ({ k, label, area }) => {
    const P = area ? 'textarea' : 'input'
    return (<div><label htmlFor={k} className="text-sm text-mist">{label}</label>
      <P id={k} name={k} value={v[k]} onChange={set(k)} rows={area ? 5 : undefined} type={k === 'email' ? 'email' : 'text'}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={field} />
      {errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-red-400">{errors[k]}</p>}</div>)
  }
  return (
    <section id="contact" className="section">
      <div className="glass grid gap-10 p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
        <div>
          <h2 className="h2">Have a project in mind? Let's build something great together.</h2>
          <ul className="mt-8 space-y-3 text-mist">
            <li><a className="flex items-center gap-3 hover:text-white" href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}</a></li>
            <li><a className="flex items-center gap-3 hover:text-white" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} />GitHub</a></li>
            <li><a className="flex items-center gap-3 hover:text-white" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn</a></li>
          </ul>
        </div>
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {F({ k: 'name', label: 'Name' })}{F({ k: 'email', label: 'Email' })}
          {F({ k: 'subject', label: 'Subject' })}{F({ k: 'message', label: 'Message', area: true })}
          <button className="btn btn-primary disabled:opacity-60" disabled={status === 'sending'}>
            {status === 'sending' ? <><Loader2 size={16} className="animate-spin" />Sending…</> : 'Send message'}</button>
          <p role="status" aria-live="polite" className={`text-sm ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {status === 'success' && 'Message sent. I will reply soon.'}
            {status === 'error' && 'Your message was not sent. Try again, or email me directly.'}
            {status === 'unconfigured' && <>The contact form is not set up yet, so nothing was sent. Email <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a> instead.</>}
          </p>
        </form>
      </div>
    </section>
  )
}
