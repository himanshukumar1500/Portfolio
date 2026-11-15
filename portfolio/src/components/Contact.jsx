// EmailJS library import
// Iska use contact form se directly email bhejne ke liye hoga
import emailjs from "@emailjs/browser";

// React hooks
import { useState } from 'react'

// Icons
import { Mail, Github, Linkedin, Loader2 } from 'lucide-react'

// Profile data (email, GitHub, LinkedIn)
import { profile } from '../data/site'


// Form ke initial/empty values
const empty = {
  name: '',
  email: '',
  subject: '',
  message: ''
}


// Form validation function
function validate(v) {
  const e = {}

  // Name required
  if (!v.name.trim()) {
    e.name = 'Enter your name.'
  }

  // Email validation
  if (!/^\S+@\S+\.\S+$/.test(v.email)) {
    e.email = 'Enter a valid email address.'
  }

  // Subject required
  if (!v.subject.trim()) {
    e.subject = 'Enter a subject.'
  }

  // Message must contain at least 10 characters
  if (v.message.trim().length < 10) {
    e.message = 'Write at least 10 characters.'
  }

  return e
}


export default function Contact() {

  // Form values
  const [v, setV] = useState(empty)

  // Validation errors
  const [errors, setErrors] = useState({})

  // Form status
  // idle = normal
  // sending = email being sent
  // success = email sent
  // error = email failed
  const [status, setStatus] = useState('idle')


  // Update form field values
  const set = (k) => (e) => {
    setV({
      ...v,
      [k]: e.target.value
    })
  }


  // Form submit function
  async function onSubmit(ev) {

    // Prevent page refresh
    ev.preventDefault()


    // Validate all form fields
    const errs = validate(v)

    setErrors(errs)


    // If validation errors exist, stop here
    if (Object.keys(errs).length) {
      return
    }


    // Show "Sending..." state
    setStatus('sending')


    try {

      // Send email using EmailJS
      await emailjs.send(

        // EmailJS Service ID
        // Replace this with your actual Service ID
        'service_i6mfh7z',

        // EmailJS Template ID
        // Replace this with your actual Template ID
        'template_udfxipv',

        // Data that will be sent to your email template
        {
          name: v.name,
          email: v.email,
          subject: v.subject,
          message: v.message,

          // Your portfolio email
          to_email: profile.email
        },

        // EmailJS Public Key
        // Replace this with your actual Public Key
        {
          publicKey: 'ei9b03KqOgcSAkOEH'
        }
      )


      // Email successfully sent
      setStatus('success')

      // Clear form after successful submission
      setV(empty)

      // Clear validation errors
      setErrors({})

    } catch (error) {

      // Log error in browser console
      console.error('EmailJS Error:', error)

      // Show error message
      setStatus('error')
    }
  }


  // Common styling for input fields
  const field =
    'mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric focus-visible:ring-2 focus-visible:ring-electric/50'


  // Reusable input/textarea component
  const F = ({ k, label, area }) => {

    // Use textarea when "area" is true
    // Otherwise use normal input
    const P = area ? 'textarea' : 'input'

    return (
      <div>

        {/* Field label */}
        <label
          htmlFor={k}
          className="text-sm text-mist"
        >
          {label}
        </label>


        {/* Input or textarea */}
        <P
          id={k}

          // IMPORTANT:
          // These names must match the variables
          // used in your EmailJS template
          name={k}

          value={v[k]}

          // Update value when user types
          onChange={set(k)}

          // Message textarea height
          rows={area ? 5 : undefined}

          // Email field gets email type
          type={k === 'email' ? 'email' : 'text'}

          // Accessibility
          aria-invalid={!!errors[k]}
          aria-describedby={
            errors[k] ? `${k}-err` : undefined
          }

          // Input styling
          className={field}
        />


        {/* Display validation error */}
        {errors[k] && (
          <p
            id={`${k}-err`}
            className="mt-1 text-sm text-red-400"
          >
            {errors[k]}
          </p>
        )}

      </div>
    )
  }


  return (

    <section id="contact" className="section">

      <div className="glass grid gap-10 p-8 md:grid-cols-[1fr_1.2fr] md:p-12">


        {/* =========================
            LEFT SIDE
        ========================== */}
        <div>

          <h2 className="h2">
            Have a project in mind? Let's build something great together.
          </h2>


          {/* Contact information */}
          <ul className="mt-8 space-y-3 text-mist">

            {/* Email */}
            <li>
              <a
                className="flex items-center gap-3 hover:text-white"
                href={`mailto:${profile.email}`}
              >
                <Mail size={18} />
                {profile.email}
              </a>
            </li>


            {/* GitHub */}
            <li>
              <a
                className="flex items-center gap-3 hover:text-white"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                GitHub
              </a>
            </li>


            {/* LinkedIn */}
            <li>
              <a
                className="flex items-center gap-3 hover:text-white"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </li>

          </ul>

        </div>


        {/* =========================
            RIGHT SIDE - CONTACT FORM
        ========================== */}

        {/* onSubmit calls our EmailJS function */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-4"
        >

          {/* Name */}
          {F({
            k: 'name',
            label: 'Name'
          })}


          {/* Email */}
          {F({
            k: 'email',
            label: 'Email'
          })}


          {/* Subject */}
          {F({
            k: 'subject',
            label: 'Subject'
          })}


          {/* Message */}
          {F({
            k: 'message',
            label: 'Message',
            area: true
          })}


          {/* Submit button */}
          <button
            type="submit"

            // Disable button while sending
            disabled={status === 'sending'}

            className="btn btn-primary disabled:opacity-60"
          >

            {/* Show loading icon while email is being sent */}
            {status === 'sending' ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Sending…
              </>
            ) : (
              'Send message'
            )}

          </button>


          {/* =========================
              SUCCESS / ERROR MESSAGE
          ========================== */}

          <p
            role="status"
            aria-live="polite"

            className={`text-sm ${
              status === 'success'
                ? 'text-emerald-400'
                : 'text-red-400'
            }`}
          >

            {/* Success message */}
            {status === 'success' &&
              'Message sent successfully. I will reply soon.'
            }


            {/* Error message */}
            {status === 'error' &&
              'Message could not be sent. Please try again.'
            }

          </p>

        </form>

      </div>

    </section>
  )
}
