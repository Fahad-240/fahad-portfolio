import { useEffect, useRef } from 'react'

const services = [
  {
    title: 'Enterprise Software',
    desc: 'Custom-built enterprise applications designed for scale, reliability, and longevity. From requirement to production.',
    icon: '⬡',
  },
  {
    title: 'ERP Development',
    desc: 'End-to-end ERP systems covering finance, HR, procurement, inventory, and reporting — fully integrated.',
    icon: '◫',
  },
  {
    title: 'AI Automation',
    desc: 'Intelligent process automation that eliminates repetitive work, reduces cost, and accelerates decision-making.',
    icon: '◈',
  },
  {
    title: 'AI Agents',
    desc: 'Autonomous AI agents that handle complex workflows, customer interactions, and data processing at scale.',
    icon: '◉',
  },
  {
    title: 'SaaS Applications',
    desc: 'Scalable multi-tenant SaaS products built with best-in-class architecture, billing, and user management.',
    icon: '◧',
  },
  {
    title: 'Web Development',
    desc: 'High-performance web applications with exceptional UX, built with modern frameworks and engineering standards.',
    icon: '⬔',
  },
  {
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile applications that feel native on iOS and Android — built for performance and usability.',
    icon: '◪',
  },
  {
    title: 'Shopify Development',
    desc: 'Custom Shopify themes, headless storefronts, and app integrations that maximize conversion and brand impact.',
    icon: '◫',
  },
  {
    title: 'API Integration',
    desc: 'Seamless third-party integrations, RESTful APIs, GraphQL schemas, and microservice architectures.',
    icon: '⬡',
  },
  {
    title: 'Cloud Solutions',
    desc: 'Cloud infrastructure design, migration, and optimization on AWS and Azure with DevOps best practices.',
    icon: '◈',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ padding: '120px 80px', borderBottom: '1px solid #ECECEC' }}
    >
      <div className="reveal" style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '16px' }}>
          Services
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#111111', lineHeight: 1.1 }}>
            What I build.
          </h2>
          <p style={{ maxWidth: '380px', fontSize: '16px', lineHeight: 1.7, color: '#6B7280' }}>
            From idea to enterprise scale — I cover the full spectrum of modern software delivery.
          </p>
        </div>
      </div>

      <div
        className="reveal-stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1px',
          background: '#ECECEC',
          border: '1px solid #ECECEC',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {services.map(({ title, desc, icon }) => (
          <div
            key={title}
            className="card-hover"
            style={{
              background: '#ffffff',
              padding: '36px 32px',
              cursor: 'default',
              transition: 'background 0.2s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#fafafa')}
            onMouseOut={e => (e.currentTarget.style.background = '#ffffff')}
          >
            <div style={{ fontSize: '22px', marginBottom: '20px', lineHeight: 1 }}>{icon}</div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111111', marginBottom: '10px', letterSpacing: '-0.01em' }}>
              {title}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#6B7280' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="reveal"
        style={{
          marginTop: '64px',
          padding: '60px',
          border: '1px solid #ECECEC',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h3 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: '#111111', marginBottom: '12px' }}>
            Have a project in mind?
          </h3>
          <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6 }}>
            Let's discuss your requirements and build something exceptional together.
          </p>
        </div>
        <button
          className="magnetic-btn"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '16px 36px',
            background: '#111111',
            color: '#ffffff',
            border: 'none',
            borderRadius: '100px',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Start a Project
        </button>
      </div>
    </section>
  )
}
