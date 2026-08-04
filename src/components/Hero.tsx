import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {


    // Staggered text elements animation
    gsap.fromTo(
      '.hero-reveal',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15
      }
    )

    // Scroll indicator animation
    gsap.fromTo(
      '.hero-scroll-indicator',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.9 }
    )
  }, { scope: heroRef })

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ECECEC',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Background/Right Image aligned to the right side */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '60%', // Takes up the right 60% of the screen
          zIndex: 0,
        }}
      >
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&h=1000&fit=crop&auto=format"
          alt="Minimal workspace"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left center', // Shift image contents slightly
            display: 'block',
          }}
        />
        {/* Soft gradient overlay on the image to blend it into the white text area */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.4) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Text content container with much more width and breathing room */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          paddingLeft: '80px',
          paddingRight: '40px',
          width: '100%',
          maxWidth: '750px', // Increased max-width so text has plenty of space
        }}
      >
        {/* Hi, I'm */}
        <p
          className="hero-reveal"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: '#6B7280',
            marginBottom: '20px',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          Hi, I'm
        </p>

        {/* Name */}
        <h1
          className="hero-reveal"
          style={{
            fontSize: 'clamp(56px, 6vw, 84px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: '#111111',
            marginBottom: '20px',
            opacity: 0,
          }}
        >
          FAHAD AHMED
        </h1>

        {/* Role */}
        <p
          className="hero-reveal"
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '28px',
            letterSpacing: '-0.01em',
            opacity: 0,
          }}
        >
          Full Stack Developer + AI
        </p>

        {/* Description */}
        <p
          className="hero-reveal"
          style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#4B5563',
            marginBottom: '44px',
            maxWidth: '780px', // Wider description width so it doesn't wrap too tightly
            opacity: 0,
          }}
        >
          I design and build scalable web applications, AI-powered solutions, and enterprise software with a focus on performance, security, and exceptional user experience. From SaaS platforms to ERP systems and intelligent automation, I transform complex business challenges into reliable digital products.
        </p>

        {/* CTA */}
        <div className="hero-reveal" style={{ opacity: 0 }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-animate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 30px',
              background: '#111111',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: '#9CA3AF',
          zIndex: 3,
          opacity: 0,
        }}
      >
        <div
          className="scroll-bounce"
          style={{
            width: '22px',
            height: '34px',
            border: '1.5px solid #D1D5DB',
            borderRadius: '11px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '5px',
          }}
        >
          <div style={{ width: '3px', height: '7px', background: '#D1D5DB', borderRadius: '2px' }} />
        </div>
        <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
          Scroll Down
        </span>
      </div>
    </section>
  )
}
