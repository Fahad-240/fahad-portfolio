import { useState, useEffect } from 'react'
import Sidebar, { GitHubIcon, LinkedInIcon, EmailIcon } from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import Contact from './components/Contact'

const sectionIds = ['home', 'about', 'projects', 'testimonials', 'blog', 'contact']

function Footer() {
  const socialLinks = [
    { label: 'GitHub', icon: GitHubIcon, href: 'https://github.com/Fahad-240' },
    { label: 'LinkedIn', icon: LinkedInIcon, href: 'https://www.linkedin.com/in/fahad-ahmed11/' },
    { label: 'Email', icon: EmailIcon, href: 'mailto:fahadahmed42003@gmail.com' },
  ]

  return (
    <footer
      style={{
        padding: '48px 80px',
        borderTop: '1px solid #ECECEC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Position copyright left, socials right
        flexWrap: 'wrap',
        gap: '24px',
      }}
    >
      <div style={{ fontSize: '14px', color: '#9CA3AF' }}>
        © 2024 Muhammad Ahsan Khan. All rights reserved.
      </div>

      {/* Social links row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {socialLinks.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            style={{
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '1px solid #ECECEC',
              color: '#6B7280',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseOver={e => {
              e.currentTarget.style.color = '#111111'
              e.currentTarget.style.borderColor = '#111111'
              e.currentTarget.style.background = '#f9f9f9'
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = '#6B7280'
              e.currentTarget.style.borderColor = '#ECECEC'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff' }}>
      <Sidebar activeSection={activeSection} />

      {/* Main content */}
      <main className="app-main" style={{ marginLeft: '190px', flex: 1, minWidth: 0 }}>
        {/* Top right CTA */}
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '32px',
            zIndex: 40,
          }}
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '10px 22px',
              background: '#ffffff',
              color: '#111111',
              border: '1px solid #111111',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#111111'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#ffffff'
              e.currentTarget.style.color = '#111111'
            }}
          >
            Let's Talk
          </button>
        </div>

        <Hero />
        <About />
        <Projects />
        <Testimonials />

        <Contact />
        <Footer />
      </main>
    </div>
  )
}
