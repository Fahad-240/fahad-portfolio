import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'
import Sidebar, { GitHubIcon, LinkedInIcon, EmailIcon } from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Background3D from './components/Background3D'

const sectionIds = ['home', 'about', 'projects', 'testimonials', 'blog', 'contact']

function Footer() {
  const socialLinks = [
    { label: 'GitHub', icon: GitHubIcon, href: 'https://github.com/Fahad-240' },
    { label: 'LinkedIn', icon: LinkedInIcon, href: 'https://www.linkedin.com/in/fahad-ahmed11/' },
    { label: 'Email', icon: EmailIcon, href: 'mailto:fahadahmed42003@gmail.com' },
  ]

  return (
    <footer
      className="app-footer"
      style={{
        padding: '48px 80px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        transition: 'var(--theme-transition)',
      }}
    >
      <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
        © 2026 Fahad Ahmed. All rights reserved.
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
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              background: 'var(--bg-card)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--accent-color)'
              e.currentTarget.style.borderColor = 'var(--accent-color)'
              e.currentTarget.style.background = 'var(--accent-soft)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.borderColor = 'var(--border-color)'
              e.currentTarget.style.background = 'var(--bg-card)'
            }}
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  )
}

function PortfolioContent() {
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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', transition: 'var(--theme-transition)', position: 'relative' }}>
      {/* Native 3D Interactive Canvas Background */}
      <Background3D />

      <Sidebar activeSection={activeSection} />

      {/* Main content */}
      <main className="app-main" style={{ marginLeft: '190px', flex: 1, minWidth: 0 }}>
        {/* Top actions bar (Theme Switcher + Logo on mobile + CTA) */}
        <div className="top-header-bar">
          {/* Mobile Logo Branding (Shown on mobile viewports) */}
          <div className="mobile-brand-logo" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
            <img src="/logo.png" alt="Fahad Ahmed Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme switcher dropdown */}
            <ThemeSwitcher />

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="top-cta-button"
              style={{
                padding: '9px 18px',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'var(--theme-transition)',
                fontFamily: 'Inter, sans-serif',
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--accent-color)'
                e.currentTarget.style.color = 'var(--accent-contrast)'
                e.currentTarget.style.borderColor = 'var(--accent-color)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              Let's Talk
            </button>
          </div>
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

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
