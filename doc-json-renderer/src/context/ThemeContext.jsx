import { createContext, useContext, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const lightTokens = {
  '--ds-surface-background': '#ffffff',
  '--ds-surface-elevated': '#f4f5f7',
  '--ds-text': '#172b4d',
  '--ds-heading': '#091e42',
  '--ds-subheading': '#253858',
}

const darkTokens = {
  '--ds-surface-background': '#0f172a',
  '--ds-surface-elevated': '#111827',
  '--ds-text': '#e5e7eb',
  '--ds-heading': '#f9fafb',
  '--ds-subheading': '#e5e7eb',
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light')

  const value = useMemo(() => {
    const tokens = mode === 'light' ? lightTokens : darkTokens

    // Apply CSS variables on documentElement
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      Object.entries(tokens).forEach(([key, v]) => {
        root.style.setProperty(key, v)
      })
    }

    return {
      mode,
      tokens,
      toggle: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }
  }, [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
