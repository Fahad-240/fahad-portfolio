import { useEffect, useRef } from 'react'

const posts = [
  {
    id: 1,
    category: 'Architecture',
    title: 'How I Architected an ERP Platform for 15,000 Daily Users',
    excerpt: 'A deep dive into the technical decisions, trade-offs, and lessons learned from building a production ERP system from scratch — from database design to deployment strategy.',
    date: 'Nov 12, 2024',
    readTime: '12 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=500&fit=crop&auto=format',
  },
  {
    id: 2,
    category: 'AI Engineering',
    title: 'Building Production AI Agents with LangChain and n8n',
    excerpt: 'Beyond demos — real patterns for deploying reliable AI agents that handle errors gracefully, scale under load, and integrate with existing business systems.',
    date: 'Oct 28, 2024',
    readTime: '9 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=380&fit=crop&auto=format',
  },
  {
    id: 3,
    category: 'Full Stack',
    title: 'The NestJS Patterns I Use in Every Enterprise Project',
    excerpt: 'CQRS, event sourcing, clean architecture, and the module structure that has served me across 20+ production applications.',
    date: 'Oct 14, 2024',
    readTime: '7 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop&auto=format',
  },
  {
    id: 4,
    category: 'Startups',
    title: 'What I Wish I Knew Before Founding a Software Agency',
    excerpt: 'From freelancer to founder — the operational, financial, and personal lessons from building a software company from zero to 40+ clients.',
    date: 'Sep 30, 2024',
    readTime: '11 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=380&fit=crop&auto=format',
  },
]

const categories = ['All', 'Architecture', 'AI Engineering', 'Full Stack', 'Startups', 'DevOps']

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{ padding: '120px 80px', borderBottom: '1px solid #ECECEC' }}
    >
      <div className="reveal" style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '16px' }}>
          Blog
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#111111', lineHeight: 1.1 }}>
            Writing.
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => {}}
                style={{
                  padding: '8px 16px',
                  background: i === 0 ? '#111111' : 'transparent',
                  color: i === 0 ? '#ffffff' : '#6B7280',
                  border: '1px solid',
                  borderColor: i === 0 ? '#111111' : '#ECECEC',
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
          </div>
        </div>
      </div>

      {/* Featured post */}
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', marginBottom: '64px', alignItems: 'center' }}>
        <div className="img-zoom-container" style={{ aspectRatio: '16/10', backgroundColor: '#f5f5f5' }}>
          <img
            src={featured.image}
            alt={featured.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#ffffff', background: '#111111', padding: '4px 10px', borderRadius: '4px'
            }}>
              Featured
            </span>
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>{featured.category}</span>
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', color: '#111111', lineHeight: 1.25, marginBottom: '16px' }}>
            {featured.title}
          </h3>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#6B7280', marginBottom: '32px' }}>
            {featured.excerpt}
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{featured.date}</span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>·</span>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{featured.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article grid */}
      <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {rest.map((post) => (
          <article
            key={post.id}
            className="card-hover"
            style={{
              border: '1px solid #ECECEC',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <div className="img-zoom-container" style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {post.category}
                </span>
                <span style={{ fontSize: '11px', color: '#D1D5DB' }}>·</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{post.readTime}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', color: '#111111', lineHeight: 1.3, marginBottom: '10px' }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#6B7280', marginBottom: '16px' }}>
                {post.excerpt.slice(0, 100)}...
              </p>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{post.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
