import React from 'react';
import { useTheme } from '../hooks/useTheme';

import XWhiteIcon from '../assets/x-white.png';
import XBlackIcon from '../assets/x-black.png';
import SokushuuWhiteIcon from '../assets/sokushuu-white.svg';
import SokushuuBlackIcon from '../assets/sokushuu.svg';

export const Footer: React.FC = () => {
  const { resolvedTheme } = useTheme();
  
  // Select appropriate Sokushuu icon based on theme
  const SokushuuIcon = resolvedTheme === 'dark' ? SokushuuBlackIcon : SokushuuWhiteIcon;
  
  return (
    <footer className="bg-interactive-primary text-inverse py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={SokushuuIcon} alt="Sokushuu Logo" height={24} width={24} />
              <span className="text-xl font-black text-inverse">Sokushuu</span>
            </div>
            <p className="text-inverse mb-4">
              Learn, earn USD, and monetize your knowledge with the world's first learn-to-earn platform.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/sokushuu_de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 cursor-pointer"
              >
                <img src={resolvedTheme === 'light' ? XWhiteIcon : XBlackIcon} height={20} width={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-inverse">Platform</h4>
            <ul className="space-y-2 text-inverse">
              <li><a href="#ecosystem-overview" className="hover:opacity-80">Overview</a></li>
              <li><a href="#how-it-works" className="hover:opacity-80">How It Works</a></li>
              <li><a href="#creator-section" className="hover:opacity-80">For Creators</a></li>
              <li><a href="#faq" className="hover:opacity-80">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-inverse">Get Started</h4>
            <ul className="space-y-2 text-inverse">
              <li><a href="https://twitter.com/sokushuu_de" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">Follow on X</a></li>
              <li><a href="#creator-section" className="hover:opacity-80">Become a Creator</a></li>
              <li><a href="#ecosystem-overview" className="hover:opacity-80">Start Learning</a></li>
              <li><a href="#how-it-works" className="hover:opacity-80">USD Rewards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-inverse">Legal</h4>
            <div className="mt-6 text-inverse text-sm">
              <p>&copy; 2025 Sokushuu. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;