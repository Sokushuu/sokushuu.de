import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        bg-interactive-secondary 
        hover:bg-interactive-hover 
        text-primary 
        rounded-lg 
        flex items-center justify-center 
        transition-all duration-300 
        border-2 border-muted
        hover:border-primary
        focus:outline-none 
        focus:ring-2 
        focus:ring-interactive-primary 
        focus:ring-opacity-50
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon 
          size={iconSizes[size]} 
          className="text-primary transition-transform duration-300 hover:scale-110" 
        />
      ) : (
        <Sun 
          size={iconSizes[size]} 
          className="text-primary transition-transform duration-300 hover:scale-110" 
        />
      )}
    </button>
  );
};

export default ThemeToggle;
