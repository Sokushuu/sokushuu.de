import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

import SokushuuWhiteIcon from '../assets/sokushuu-white.svg';
import SokushuuBlackIcon from '../assets/sokushuu.svg';

import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Select appropriate Sokushuu icon based on theme
  const SokushuuIcon = theme === 'dark' ? SokushuuWhiteIcon : SokushuuBlackIcon;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'For Creators', id: 'creator-section' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-secondary/95 backdrop-blur-md shadow-lg border-b-2 border-primary' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src={SokushuuIcon} width={24} height={24} />
            <span className="text-xl font-black text-brand-primary">Sokushuu</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-primary font-medium hover:text-secondary transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle size="sm" />
            <button 
              className="bg-interactive-primary text-inverse px-6 py-2 rounded-lg font-bold hover:bg-interactive-hover transition-colors cursor-pointer"
              onClick={() => window.open('https://twitter.com/sokushuu_de', '_blank')}
            >
              Follow on X
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-secondary border-t-2 border-primary">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-primary font-medium hover:bg-interactive-secondary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 flex items-center gap-4">
                <ThemeToggle size="sm" className="flex-shrink-0" />
                <button 
                  className="flex-1 bg-interactive-primary text-inverse px-6 py-2 rounded-lg font-bold hover:bg-interactive-hover transition-colors"
                  onClick={() => {
                    window.open('https://twitter.com/sokushuu_de', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Follow on X
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;