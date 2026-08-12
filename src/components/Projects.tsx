import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import watchesImg from '../assets/watches.png'
import healthcareImg from '../assets/healthcare.png'
import financeImg from '../assets/finance.png'
import qrImg from '../assets/qr.png'
import newsImg from '../assets/news.png'

gsap.registerPlugin(ScrollTrigger)


const projects = [
  {
    id: 1,
    title: 'AurosSwiss Luxury Watches',
    category: 'E Commerce Web',
    desc: 'High-end e-commerce platform for luxury timepieces featuring interactive 3D product viewing, custom watch configurator, and high-conversion checkout.',
    tech: ['Next.js', 'React', 'Shopify API', 'Tailwind CSS', 'TypeScript'],
    year: '2024',
    image: watchesImg,
    metrics: '3.2× Conversion Rate',
    liveUrl: 'https://watches-web-topaz.vercel.app/',
    githubUrl: 'https://github.com/Fahad-240/watches-web',
  },
  {
    id: 2,
    title: 'Health & Prescription Portal',
    category: 'HealthTech',
    desc: 'Comprehensive patient portal allowing users to upload medical lab reports, analyze AI-assisted diagnostic test results, and view digital doctor prescriptions.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'OCR & Medical AI'],
    year: '2024',
    image: healthcareImg,
    metrics: '25,000+ Reports Analyzed',
    liveUrl: 'https://ai-helthcare-8vh5.vercel.app/',
    githubUrl: 'https://github.com/Fahad-240/AI-healthcare',
  },
  {
    id: 3,
    title: 'AI Finance Manager & Voice Assistant',
    category: 'AI',
    desc: 'Intelligent personal financial management web application featuring a conversational AI chatbot and real-time hands-free voice assistant for expense tracking and budgeting.',
    tech: ['Next.js', 'Python', 'OpenAI API', 'Web Speech API', 'Tailwind CSS'],
    year: '2024',
    image: financeImg,
    metrics: '$5M+ Tracked Assets',
    liveUrl: 'https://ai-finance-manager-e1n4.vercel.app/',
    githubUrl: 'https://github.com/Fahad-240/ai-finance-manager',
  },
  {
    id: 4,
    title: 'QuickQR Dynamic Generator',
    category: 'Tools',
    desc: 'High-speed web tool that generates custom, high-resolution vector QR codes for any URL or input data with instant styling and export features.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'QRCode Engine', 'Canvas API'],
    year: '2023',
    image: qrImg,
    metrics: '100K+ Generated Codes',
    liveUrl: 'https://fahad-240.github.io/QR-Code-Generate/',
    githubUrl: 'https://github.com/Fahad-240/QR-Code-Generate',
  },
  {
    id: 5,
    title: 'Pulse News Country News Platform',
    category: 'Web',
    desc: 'Multi-region news portal enabling users to filter live breaking news streams by country selection and specific categories like Tech, Business, and Politics.',
    tech: ['React', 'Node.js', 'News API', 'Tailwind CSS', 'Express'],
    year: '2023',
    image: newsImg,
    metrics: '50+ Countries Supported',
    liveUrl: 'https://pulse-news-theta.vercel.app/',
    githubUrl: 'https://github.com/Fahad-240/pulse-news',
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  useGSAP(() => {
    // Reveal normal header / text elements
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

    // Staggered grid cards
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        }
      }
    )
  }, { scope: sectionRef, dependencies: [activeCategory] })

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: '120px 80px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', transition: 'var(--theme-transition)' }}
    >
      <div className="reveal" style={{ marginBottom: '60px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Projects
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            Selected work.
          </h2>
          {/* Category filters */}
          {/* <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  background: activeCategory === cat ? '#111111' : 'transparent',
                  color: activeCategory === cat ? '#ffffff' : '#6B7280',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#111111' : '#ECECEC',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {/* Project grid */}
      {/* Project grid */}
      <div
        className="reveal-stagger projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '24px'
        }}
      >
        {filtered.map((project) => (
          <article
            key={project.id}
            className="project-card"
            style={{ position: 'relative' }}
          >
            {/* Thumbnail Container */}
            <div style={{ position: 'relative', height: '460px', overflow: 'hidden', backgroundColor: '#111111' }}>
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Top Slide Color Palette Overlay (Slides down from top on hover) */}
              <div className="project-top-slide">
                {/* Category & Metrics Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#A5B4FC', textTransform: 'uppercase' }}>
                    {project.category} · {project.year}
                  </span>
                  {project.metrics && (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', padding: '3px 12px', borderRadius: '100px' }}>
                      {project.metrics}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.015em', marginBottom: '8px' }}>
                  {project.title}
                </h3>

                {/* Short Detail Summary */}
                <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#E5E7EB', margin: '0 0 20px 0', opacity: 1, fontWeight: 400 }}>
                  {project.desc}
                </p>

                {/* Action Buttons Row */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* Live Preview Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (project.liveUrl) window.open(project.liveUrl, '_blank')
                    }}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      background: '#ffffff',
                      color: '#111111',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px rgba(255,255,255,0.2)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <span>Live Preview</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </button>

                  {/* GitHub Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (project.githubUrl) window.open(project.githubUrl, '_blank')
                    }}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      background: 'rgba(255, 255, 255, 0.16)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      backdropFilter: 'blur(6px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                      e.currentTarget.style.borderColor = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)'
                    }}
                  >
                    <span>GitHub</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </button>

                  {/* Details Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(project)
                    }}
                    style={{
                      padding: '9px 14px',
                      background: 'rgba(255, 255, 255, 0.16)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      backdropFilter: 'blur(6px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                      e.currentTarget.style.borderColor = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)'
                    }}
                  >
                    <span>Details</span>
                  </button>
                </div>
              </div>

              {/* Bottom Subtle Bar (Visible by default before hover) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 28px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  transition: 'opacity 0.3s ease',
                  zIndex: 5,
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#818CF8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {project.category}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '4px 0 0 0' }}>
                    {project.title}
                  </h3>
                </div>
                <span style={{ fontSize: '12px', color: '#ffffff', opacity: 0.8, fontWeight: 500 }}>
                  {project.year}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project detail modal */}
      {selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="project-modal"
            style={{
              background: 'var(--bg-modal)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '16px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              transition: 'var(--theme-transition)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ height: '280px', overflow: 'hidden', borderRadius: '16px 16px 0 0', backgroundColor: 'var(--bg-card-subtle)' }}>
              <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {selected.category} · {selected.year}
                  </span>
                  <h3 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginTop: '8px' }}>
                    {selected.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--bg-card-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--text-secondary)', flexShrink: 0 }}
                >
                  ×
                </button>
              </div>

              {[
                { title: 'Overview', content: selected.desc },
                { title: 'Challenge', content: 'The client needed a modern, scalable system to replace fragmented legacy tools that were slowing down operations and creating data silos across departments.' },
                { title: 'Solution', content: 'Built a modular, cloud-native architecture with real-time data sync, role-based access control, and an intuitive interface that required minimal training.' },
                { title: 'Results', content: `Delivered measurable impact: ${selected.metrics || 'High engagement & performance'}. Reduced operational overhead by 40% and improved data accuracy to 99.9%.` },
              ].map(({ title, content }) => (
                <div key={title} style={{ marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    {title}
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{content}</p>
                </div>
              ))}

              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Technology
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selected.tech.map((t) => (
                    <span key={t} style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', padding: '6px 14px', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'var(--bg-card-subtle)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    if (selected.liveUrl) window.open(selected.liveUrl, '_blank')
                  }}
                  style={{ padding: '12px 28px', background: '#111111', color: '#ffffff', border: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>Live Demo</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    if (selected.githubUrl) window.open(selected.githubUrl, '_blank')
                  }}
                  style={{ padding: '12px 28px', background: 'transparent', color: '#111111', border: '1px solid #ECECEC', borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>GitHub Code</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
