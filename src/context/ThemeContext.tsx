import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeId = 'light' | 'obsidian' | 'sapphire' | 'emerald' | 'amber' | 'cyber'

export interface ThemeConfig {
  id: ThemeId
  name: string
  contrastTag: string
  bgPreview: string
  accentPreview: string
  textPreview: string
  description: string
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'light',
    name: 'Minimal Light',
    contrastTag: 'Clean & Crisp',
    bgPreview: '#FFFFFF',
    accentPreview: '#111111',
    textPreview: '#111111',
    description: 'Crisp light mode with ultra-clean contrast',
  },
  {
    id: 'obsidian',
    name: 'Obsidian OLED',
    contrastTag: 'Pure Dark',
    bgPreview: '#09090B',
    accentPreview: '#FFFFFF',
    textPreview: '#FAFAFA',
    description: 'Deep obsidian black with bright white typography',
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    contrastTag: 'High Contrast Navy',
    bgPreview: '#0B132B',
    accentPreview: '#38BDF8',
    textPreview: '#F8FAFC',
    description: 'Royal deep navy paired with vibrant cyan glow',
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    contrastTag: 'Rich Mint & Jade',
    bgPreview: '#061E19',
    accentPreview: '#34D399',
    textPreview: '#F1F5F9',
    description: 'Deep forest green with striking mint accents',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    contrastTag: 'Warm Bronze',
    bgPreview: '#181311',
    accentPreview: '#F59E0B',
    textPreview: '#FDFBF7',
    description: 'Rich dark espresso with radiant amber highlights',
  },
  {
    id: 'cyber',
    name: 'Cyber Neon',
    contrastTag: 'Vivid Futuristic',
    bgPreview: '#0D0E15',
    accentPreview: '#C084FC',
    textPreview: '#F3F4F6',
    description: 'Sleek dark violet with neon gradient accents',
  },
]

interface ThemeContextType {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  currentThemeConfig: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'fahad_portfolio_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved
      }
    }
    return 'obsidian'
  })

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const currentThemeConfig = THEMES.find((t) => t.id === theme) || THEMES[0]

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
