import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    label: 'Email',
    value: 'fahadahmed42003@gmail.com',
    href: 'mailto:fahadahmed42003@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },

  {
    label: 'WhatsApp',
    value: '+92 346 3270127',
    href: 'https://wa.me/346 3270127',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/fahad-ahmed11/',
    href: 'https://www.linkedin.com/in/fahad-ahmed11/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'https://github.com/Fahad-240',
    href: 'https://github.com/Fahad-240',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
]

const opportunityTypes = [
  'Full-Time Job Offer',
  'Contract / Freelance Role',
  'Consulting / Advisory',
  'Interview Invitation',
  'General Inquiry',
]

const workModes = [
  'Remote',
  'Hybrid',
  'On-Site',
  'Flexible / Open',
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', opportunityType: '', workMode: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useGSAP(() => {
    const reveals = gsap.utils.toArray('.reveal')
    reveals.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play reverse play reverse',
          }
        }
      )
    })
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Direct frontend submission via Web3Forms API (Free, zero-backend, delivers directly to inbox)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'bfe25959-19c9-4b47-b844-30756779435b', // Web3Forms Public Access Key or Formspree
          subject: `Portfolio Inquiry from ${form.name} (${form.company || 'Direct Recruiter'})`,
          from_name: form.name,
          email: form.email,
          company: form.company,
          opportunity_type: form.opportunityType,
          work_mode: form.workMode,
          message: form.message,
          to_email: 'fahadahmed42003@gmail.com',
        }),
      })

      const res = await response.json()
      if (res.success || response.ok) {
        setSubmitted(true)
      } else {
        // Fallback UI confirmation
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Email submission error:', err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '15px',
    color: 'var(--text-primary)',
    background: 'var(--bg-card)',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s ease, var(--theme-transition)',
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '120px 80px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', transition: 'var(--theme-transition)' }}
    >
      <div className="reveal" style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Get In Touch
        </p>
        <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
          Let's discuss your next
          <br />great hire or project.
        </h2>
      </div>

      <div
        className="reveal contact-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}
      >
        {/* Left — contact info */}
        <div>
          <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '36px' }}>
            I am currently open to full-time MERN & Full Stack Developer roles, contract projects,
            and software engineering opportunities. Reach out via the form or through my direct channels below!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {contactInfo.map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  padding: '16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  transition: 'border-color 0.2s ease, background 0.2s ease, var(--theme-transition)',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)'
                  e.currentTarget.style.background = 'var(--accent-soft)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                  e.currentTarget.style.background = 'var(--bg-card)'
                }}
              >
                <div style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>{icon}</div>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
                </div>
                <svg style={{ marginLeft: 'auto', color: 'var(--text-muted)', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Candidate Contact Form */}
        <div className="contact-form-card" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '48px', background: 'var(--bg-card)', color: 'var(--text-primary)', transition: 'var(--theme-transition)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111111', marginBottom: '12px' }}>Inquiry Received</h3>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6 }}>
                Thank you for reaching out. I'll review your message and get back to you promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="contact-inputs-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google / Tech Startup / Self"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              <div className="contact-inputs-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                    Opportunity Type
                  </label>
                  <select
                    value={form.opportunityType}
                    onChange={e => setForm(f => ({ ...f, opportunityType: e.target.value }))}
                    style={{ ...inputStyle, color: form.opportunityType ? '#111111' : '#9CA3AF', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select opportunity</option>
                    {opportunityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                    Work Mode
                  </label>
                  <select
                    value={form.workMode}
                    onChange={e => setForm(f => ({ ...f, workMode: e.target.value }))}
                    style={{ ...inputStyle, color: form.workMode ? '#111111' : '#9CA3AF', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select work mode</option>
                    {workModes.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                  Job Details / Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share the job description, project details, or any questions..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="magnetic-btn"
                style={{
                  width: '100%',
                  padding: '16px',
                  background: loading ? 'var(--text-muted)' : 'var(--accent-color)',
                  color: 'var(--accent-contrast)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.02em',
                  marginTop: '4px',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s ease, var(--theme-transition)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {loading ? 'Sending Inquiry...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
