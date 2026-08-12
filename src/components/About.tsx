import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)




const techList = [
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/000000', desc: 'Enterprise framework for SSR, static sites, and high-performance SEO.', color: '#000000', textColor: '#ffffff' },
  { name: 'React.js', logo: 'https://cdn.simpleicons.org/react/61DAFB', desc: 'Component-based UI library for crafting rich user experiences.', color: '#00D8FF', textColor: '#0e2d35' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6', desc: 'Strict syntactic superset of JS adding static typing.', color: '#3178C6', textColor: '#ffffff' },
  { name: 'JavaScript (ES6+)', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', desc: 'Modern logic, array utilities, and asynchronous event flow.', color: '#F7DF1E', textColor: '#111111' },
  { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26', desc: 'Semantic web layouts for high accessibility and structures.', color: '#E34F26', textColor: '#ffffff' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', desc: 'Custom layouts with Grid, Flexbox, transitions, and media queries.', color: '#1572B6', textColor: '#ffffff' },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', desc: 'Utility-first styles for modern, scalable styling structures.', color: '#06B6D4', textColor: '#ffffff' },
  { name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer/0055ff', desc: 'Declarative physics-based animations for engaging transitions.', color: '#F024B6', textColor: '#ffffff' },
  { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933', desc: 'High-performance asynchronous backend JavaScript runtime.', color: '#339933', textColor: '#ffffff' },
  { name: 'NestJS', logo: 'https://cdn.simpleicons.org/nestjs/E0234E', desc: 'Structured modular architecture for enterprise-grade API backends.', color: '#E0234E', textColor: '#ffffff' },
  { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/000000', desc: 'Fast minimalist routing middleware server for API creation.', color: '#111111', textColor: '#ffffff' },
  {
    name: 'REST API',
    isSvg: true,
    desc: 'Architectural standards for secure data integration and communication.',
    color: '#FF6C37',
    textColor: '#ffffff',
    render: () => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6C37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
        <path d="M20 10v4" />
      </svg>
    )
  },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1', desc: 'Enterprise-grade relational database supporting JSON querying.', color: '#4169E1', textColor: '#ffffff' },
  { name: 'SQL Server', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg', desc: 'Microsoft enterprise relational database with analytics engines.', color: '#CC292B', textColor: '#ffffff' },
  { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248', desc: 'Scalable document database storing JSON-like flexible data schemas.', color: '#47A248', textColor: '#ffffff' },
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E', desc: 'Leading collaborative design workspace for UI prototyping.', color: '#F24E1E', textColor: '#ffffff' },
  { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/FF6C37', desc: 'Industrial tool for automated endpoint testing and documenting.', color: '#FF6C37', textColor: '#ffffff' },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', desc: 'Optimized source code editor configured with personal developer workflow.', color: '#007ACC', textColor: '#ffffff' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717', desc: 'Cloud workspace for collaborative code, action runners, and security.', color: '#181717', textColor: '#ffffff' },
  { name: 'JWT', logo: 'https://cdn.simpleicons.org/jsonwebtokens/d91254', desc: 'Secure token-based stateless credentials for API authorization.', color: '#D91254', textColor: '#ffffff' },
  { name: 'OAuth', logo: 'https://cdn.simpleicons.org/openid/F15A24', desc: 'Industrial protocol standard for third-party user log-in flows.', color: '#F15A24', textColor: '#ffffff' },
  {
    name: 'Auth.js (NextAuth)',
    isSvg: true,
    desc: 'Complete authentication integration across fullstack frameworks.',
    color: '#EB5424',
    textColor: '#ffffff',
    render: () => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EB5424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    )
  },
  {
    name: 'RBAC',
    isSvg: true,
    desc: 'System role logic checking permissions before database reads/writes.',
    color: '#007ACC',
    textColor: '#ffffff',
    render: () => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#007ACC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 11a5 5 0 0 0-5-5v5h5z" />
      </svg>
    )
  },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/000000', desc: 'Cloud deployment and hosting platform optimized for Next.js and frontend stacks.', color: '#000000', textColor: '#ffffff' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032', desc: 'Distributed version control system for tracking changes in source files.', color: '#F05032', textColor: '#ffffff' },
  { name: 'npm', logo: 'https://cdn.simpleicons.org/npm/CB3837', desc: 'Standard package manager for Node.js package dependency registry.', color: '#CB3837', textColor: '#ffffff' },
  { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase/FFCA28', desc: 'Google cloud backend database service offering OAuth, storage, and hosting.', color: '#FFCA28', textColor: '#111111' },
  {
    name: 'Cursor',
    isSvg: true,
    desc: 'Next-generation AI code editor built on top of VS Code for pair programming.',
    color: '#52D7F3',
    textColor: '#111111',
    render: () => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#52D7F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" />
        <line x1="13" y1="13" x2="19" y2="19" />
      </svg>
    )
  },
  {
    name: 'Antigravity',
    isSvg: true,
    desc: 'Advanced agentic AI coding companion designed by Google DeepMind.',
    color: '#6366F1',
    textColor: '#ffffff',
    render: () => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M12 8l3-3M12 8l-3-3" strokeDasharray="2 2" />
        <polygon points="12 10 16 14 12 18 8 14" fill="#6366F1" fillOpacity="0.2" />
        <path d="M4 22h16" />
      </svg>
    )
  },
  { name: 'Vite', logo: 'https://cdn.simpleicons.org/vite/646CFF', desc: 'Next-generation rapid frontend toolchain and development server.', color: '#646CFF', textColor: '#ffffff' },
  { name: 'Bootstrap', logo: 'https://cdn.simpleicons.org/bootstrap/7952B3', desc: 'Responsive grid CSS utility library for rapid layout styles.', color: '#7952B3', textColor: '#ffffff' }
]



const timeline = [
  { year: '2025', title: 'MERN Stack Developer Intern', company: 'App Mash', desc: 'Built and maintained MERN applications while collaborating with the development team.' },
  { year: '2025', title: 'Junior Full Stack Developer', company: 'Codezya', desc: 'Developed web features, integrated APIs, and optimized application performance.' },
  { year: '2026', title: 'Web Content & Website Support', company: 'Web Content & Website Support', desc: 'Managed website content and implemented UI updates to improve the user experience.' },
  { year: '2026 – Present', title: 'Freelance Full Stack Developer', company: 'Self-Employed', desc: 'Building custom web applications and scalable software solutions for clients.' },
]

export default function About() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = () => setActiveTech(null)
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

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

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: '120px 80px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', transition: 'var(--theme-transition)' }}
    >
      {/* Section header */}
      <div className="reveal" style={{ marginBottom: '80px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
          About
        </p>
        <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
          Crafting software that
          <br />
          moves business forward.
        </h2>
      </div>

      {/* Main grid */}
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px', alignItems: 'start' }}>
        {/* Portrait + bio */}
        <div className="reveal">
          <div className="img-zoom-container" style={{
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: '12px',
            backgroundColor: '#f5f5f5',
            marginBottom: '40px',
          }}>
            <img
              src="/model.png"
              alt="Fahad Ahmed — professional portrait"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '8px' }}>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-primary)' }}>
            I specialize in creating high-performance applications using modern technologies, with a strong focus on clean architecture, maintainable code, and exceptional user experience. From responsive frontend interfaces to secure backend APIs and database design, I enjoy building complete solutions that are reliable, scalable, and built for long-term growth.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            I believe great software is more than writing code—it's about understanding problems, designing thoughtful solutions, and delivering products that make a meaningful impact. Every project I work on is guided by performance, security, scalability, and attention to detail.
          </p>

          {/* Philosophy */}
          <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '24px' }}>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              "I believe great software is built with purpose—where every line of code, every feature, and every decision contributes to a product that is reliable, scalable, and built to last."
            </p>
          </div>

          {/* Skills chips
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  color: '#374151',
                  padding: '6px 14px',
                  border: '1px solid #ECECEC',
                  borderRadius: '100px',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                {skill}
              </span>
            ))}
          </div> */}
        </div>
      </div>


      {/* Tech Stack */}
      <div className="reveal" style={{ marginBottom: '80px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '40px' }}>
          Technology
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 24px' }}>
          {techList.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredTech(item.name)}
              onMouseLeave={(e) => {
                setHoveredTech(null)
                // Smoothly reset position and scale when mouse leaves
                e.currentTarget.style.transform = 'scale(1) translate(0px, 0px)'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                setMousePos({ x, y })

                // Magnetic effect: translate slightly towards the cursor relative to center
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const shiftX = (x - centerX) * 0.35 // Move 35% towards cursor
                const shiftY = (y - centerY) * 0.35
                e.currentTarget.style.transform = `scale(1.2) translate(${shiftX}px, ${shiftY}px)`
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)', // Smooth snapback
                zIndex: hoveredTech === item.name ? 100 : 1, // Keep active/hovered icon on top
              }}
            >
              {item.isSvg ? (
                <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.render()}
                </div>
              ) : (
                <img
                  src={item.logo}
                  alt={item.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'contain',
                    pointerEvents: 'none', // Prevents mouse flicker
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const textSpan = document.createElement('span');
                      textSpan.innerText = item.name;
                      textSpan.style.fontSize = '12px';
                      textSpan.style.fontWeight = '600';
                      textSpan.style.textAlign = 'center';
                      parent.appendChild(textSpan);
                    }
                  }}
                />
              )}

              {/* Hover-to-Open Details Sticky Note (Visible immediately on hover) */}
              {hoveredTech === item.name && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '14px', // Float slightly higher to prevent overlapping
                    width: '230px',
                    background: item.color,
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    // Soft brand-colored glow shadow
                    boxShadow: `0 10px 25px ${item.color}25, 0 4px 12px rgba(0, 0, 0, 0.08)`,
                    zIndex: 10000, // On top of everything
                    cursor: 'default',
                    textAlign: 'left',
                    animation: 'fadeIn 0.15s ease',
                    pointerEvents: 'none', // Allow cursor to move through card area without glitching
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: item.textColor }}>{item.name}</span>
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: 1.45, color: item.textColor, opacity: 0.9, margin: 0, fontWeight: 500 }}>
                    {item.desc}
                  </p>

                  {/* Downward pointing arrow matching brand color */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '7px solid transparent',
                      borderRight: '7px solid transparent',
                      borderTop: `7px solid ${item.color}`,
                    }}
                  />
                  {/* Arrow border shadow */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%) translateY(1px)',
                      width: 0,
                      height: 0,
                      borderLeft: '7px solid transparent',
                      borderRight: '7px solid transparent',
                      borderTop: '7px solid rgba(0, 0, 0, 0.05)',
                      zIndex: -1,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="reveal">
        <h3 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '40px' }}>
          Experience
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {timeline.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1px 1fr',
                gap: '0 32px',
                paddingBottom: '40px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '4px' }}>
                {item.year}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', margin: '4px -3.5px 0' }} />
                {i < timeline.length - 1 && (
                  <div style={{ flex: 1, width: '1px', background: 'var(--border-color)', marginTop: '8px' }} />
                )}
              </div>
              <div style={{ paddingBottom: '8px' }}>
                <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 500 }}>{item.company}</div>
                <div style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
