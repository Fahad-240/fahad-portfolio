import { useState, useRef, useEffect } from 'react'
import { useTheme, THEMES, ThemeId } from '../context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme, currentThemeConfig } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Theme Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Theme"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '100px',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
          transition: 'var(--theme-transition)',
          backdropFilter: 'blur(12px)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-color)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)'
        }}
      >
        {/* Palette icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.5-.72 1.5-1.5 0-.4-.15-.78-.42-1.07-.27-.29-.44-.68-.44-1.11 0-.92.78-1.68 1.7-1.68H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9.1-10-9.1z" />
        </svg>

        {/* Color preview indicator */}
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: currentThemeConfig.accentPreview,
            boxShadow: `0 0 6px ${currentThemeConfig.accentPreview}`,
          }}
        />

        <span style={{ fontSize: '12px' }}>{currentThemeConfig.name}</span>

        {/* Arrow icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Theme Dropdown Panel */}
      {isOpen && (
        <div
          className="theme-dropdown-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: '320px',
            maxWidth: 'calc(100vw - 32px)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            padding: '16px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 100,
            animation: 'fadeIn 0.2s ease both',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--border-muted)',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Theme Palettes
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                High-contrast professional modes
              </div>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '100px',
                background: 'var(--accent-soft)',
                color: 'var(--accent-color)',
                border: '1px solid var(--border-color)',
              }}
            >
              6 Presets
            </span>
          </div>

          {/* Theme list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
            {THEMES.map((t) => {
              const isSelected = theme === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as ThemeId)
                    setIsOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid var(--accent-color)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--accent-soft)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--accent-color)'
                      e.currentTarget.style.transform = 'translateX(2px)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Swatch Pill */}
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: t.bgPreview,
                        border: '1.5px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: t.accentPreview,
                        }}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {t.contrastTag}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator Checkmark */}
                  {isSelected && (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        color: 'var(--accent-contrast)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                      }}
                    >
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
