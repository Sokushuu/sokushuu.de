import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

// Theme types
export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

// Context interface
interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Custom hook for consuming theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode
}

// Get system theme preference
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

// Get stored theme from localStorage
const getStoredTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored
    }
  }
  return 'system'
}

// Resolve theme based on user preference and system preference
const resolveTheme = (theme: Theme): ResolvedTheme => {
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => 
    resolveTheme(getStoredTheme())
  )

  // Update resolved theme when theme changes or system preference changes
  useEffect(() => {
    const newResolvedTheme = resolveTheme(theme)
    setResolvedTheme(newResolvedTheme)

    // Apply theme class to document
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newResolvedTheme)

    // Store theme preference
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        const newResolvedTheme = resolveTheme('system')
        setResolvedTheme(newResolvedTheme)
        
        // Apply theme class to document
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(newResolvedTheme)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = getStoredTheme()
    const initialResolvedTheme = resolveTheme(initialTheme)
    
    // Apply initial theme immediately to prevent flash
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(initialResolvedTheme)
    
    setThemeState(initialTheme)
    setResolvedTheme(initialResolvedTheme)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    // If current theme is system, get the resolved theme to toggle from
    const currentResolvedTheme = theme === 'system' ? resolvedTheme : theme
    const newTheme = currentResolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
