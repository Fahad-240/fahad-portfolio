import { useRef } from 'react'

const testimonials = [
  {
    name: 'Ahmed G.',
    flag: '🇹🇳',
    rating: 5.0,
    title: 'Firebase Setup and TypeScript Cloud Functions Development',
    quote: 'Really satisfied with the work',
    tags: ['JavaScript', 'TypeScript', 'Google Firebase', 'API Development'],
    amount: '$30 USD',
    date: '4 months ago',
    avatarBg: '#E0F2FE',
    avatarColor: '#0369A1'
  },
  {
    name: 'Ahmed G.',
    flag: '🇹🇳',
    rating: 5.0,
    title: 'PayloadCMS & Next.js Camper Rental Platform',
    quote: 'Great work. Professional and very responsive. Would recommend',
    tags: ['Next.js', 'Tailwind CSS'],
    amount: '€30 EUR',
    date: '5 months ago',
    avatarBg: '#E0F2FE',
    avatarColor: '#0369A1'
  },
  {
    name: 'Veer S.',
    flag: '🇮🇳',
    rating: 5.0,
    title: 'Payment gateway Cashfree integration android app, Php backend',
    quote: 'Excellent work! The Cashfree payment gateway integration was completed perfectly on time and within budget. Fiza has great technical expertise and communication skills. Highly recommended!',
    tags: ['PHP', 'Payment Gateway Integration'],
    amount: '₹2,700 INR',
    date: '3 months ago',
    avatarBg: '#DCFCE7',
    avatarColor: '#15803D'
  },
  {
    name: 'Anas S.',
    flag: '🇵🇰',
    rating: 4.8,
    title: 'Integrate USITC DataWeb API v2',
    quote: "Great experience it was very first time handled it with professionalism. Great communication and one of the best part is she updated regularly that's why I'm happy to work with her. Work with her again.",
    tags: ['AngularJS', 'API Integration', 'Backend Development', 'Data Extraction', 'Frontend Development'],
    amount: '',
    date: '',
    avatarBg: '#FFE4E6',
    avatarColor: '#B91C1C'
  },
  {
    name: 'Ahmed G.',
    flag: '🇹🇳',
    rating: 5.0,
    title: 'Localizing Coordinates in a Building',
    quote: 'I was again satisfied by the quality of work',
    tags: ['API Development', 'Backend Development'],
    amount: '$30 USD',
    date: '4 months ago',
    avatarBg: '#E0F2FE',
    avatarColor: '#0369A1'
  },
  {
    name: 'Anas S.',
    flag: '🇵🇰',
    rating: 5.0,
    title: 'Gingerino AI Daily Horoscope App Development',
    quote: 'This time she proves her very well. Thank you for your efforts. Will work more in future. Good experience overall.',
    tags: ['AI Mobile App Development', 'Android', 'Android App Development', 'App Developer', 'App Development'],
    amount: '$50 NZD',
    date: '5 days ago',
    avatarBg: '#FFE4E6',
    avatarColor: '#B91C1C'
  },
  {
    name: 'Serunjogi S.',
    flag: '🇺🇬',
    rating: 5.0,
    title: 'Pre-Built Member-School Web Portal Required',
    quote: 'She is the best freelancer i have work with, very calm and understanding, innovative, proffsional with high level of integrity and honest. She is going to handle all phases of this project',
    tags: ['PHP', 'Website Design', 'Graphic Design', 'PDF', 'HTML'],
    amount: '$200 USD',
    date: '1 month ago',
    avatarBg: '#FEF3C7',
    avatarColor: '#B45309'
  },
  {
    name: 'Tutorsclub E.',
    flag: '🇮🇳',
    rating: 5.0,
    title: 'Mesh Central Server Customization -- 2 (archived)',
    quote: "She consistently demonstrates excellent communication and a strong commitment to meeting project deadlines. She quickly understands project requirements and always gives her best effort. It's been a pleasure working with her—thank you!",
    tags: ['Server Customization', 'Backend Development'],
    amount: '₹1,900 INR',
    date: '2 months ago',
    avatarBg: '#F3E8FF',
    avatarColor: '#6B21A8'
  }
]

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC107" style={{ display: 'inline-block' }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function HalfStarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" style={{ display: 'inline-block' }}>
      <defs>
        <linearGradient id="halfStar">
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="50%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfStar)"/>
    </svg>
  )
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {Array.from({ length: fullStars }).map((_, i) => <StarIcon key={`full-${i}`} />)}
      {hasHalf && <HalfStarIcon />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#E5E7EB" style={{ display: 'inline-block' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const getFlagUrl = (flag: string) => {
  if (flag === '🇹🇳') return 'tn'
  if (flag === '🇮🇳') return 'in'
  if (flag === '🇵🇰') return 'pk'
  if (flag === '🇺🇬') return 'ug'
  return ''
}

const doubledTestimonials = [...testimonials, ...testimonials]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{ padding: '120px 80px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', transition: 'var(--theme-transition)', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="testimonials-header" style={{ marginBottom: '64px' }}>
        <p className="testimonials-header-tag" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Testimonials
        </p>
        <h2 className="testimonials-header-title" style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
          Trusted by clients
          <br />worldwide.
        </h2>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="testimonials-marquee-wrapper" style={{ overflow: 'hidden', margin: '0 -80px', padding: '10px 80px' }}>
        <div className="marquee-track" style={{ animationDuration: '60s' }}>
          {doubledTestimonials.map(({ name, flag, rating, title, quote, tags, amount, date, avatarBg, avatarColor }, index) => (
            <div
              key={`${name}-${index}`}
              className="card-hover"
              style={{
                flex: '0 0 460px',
                padding: '28px',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--theme-transition)',
              }}
            >
              <div>
                {/* Header: Client Info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' }}>
                  {/* Avatar, Name, Flag, Rating */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: avatarBg,
                      color: avatarColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(name)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</span>
                      {getFlagUrl(flag) ? (
                        <img
                          src={`https://flagcdn.com/16x12/${getFlagUrl(flag)}.png`}
                          srcSet={`https://flagcdn.com/32x24/${getFlagUrl(flag)}.png 2x`}
                          width="16"
                          height="12"
                          alt={flag}
                          title="Client location"
                          style={{ borderRadius: '2px', objectFit: 'cover', display: 'inline-block' }}
                        />
                      ) : (
                        <span style={{ fontSize: '14px' }} title="Client location">{flag}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <RatingStars rating={rating} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '2px' }}>{rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Project Title */}
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                  {title}
                </h4>

                {/* Quote / Feedback */}
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  "{quote}"
                </p>
              </div>

              {/* Tags / Skills at the bottom */}
              {tags && tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px dashed var(--border-color)' }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-card-subtle)',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
