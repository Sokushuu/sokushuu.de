import React from 'react';

import Twitter from '../assets/x-white.png';
import Sokushuu from '../assets/sokushuu.svg'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={Sokushuu} alt="Sokushuu Logo" height={24} width={24} className="bg-zinc-100 rounded-full p-1" />
              <span className="text-xl font-black">Sokushuu</span>
            </div>
            <p className="text-gray-300 mb-4">
              Learn, earn USD, and monetize your knowledge with the world's first learn-to-earn platform.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/sokushuu_de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 cursor-pointer"
              >
                <img src={Twitter} height={20} width={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#ecosystem-overview" className="hover:text-white">Overview</a></li>
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#creator-section" className="hover:text-white">For Creators</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Get Started</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://twitter.com/sokushuu_de" target="_blank" rel="noopener noreferrer" className="hover:text-white">Follow on X</a></li>
              <li><a href="#creator-section" className="hover:text-white">Become a Creator</a></li>
              <li><a href="#ecosystem-overview" className="hover:text-white">Start Learning</a></li>
              <li><a href="#how-it-works" className="hover:text-white">USD Rewards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="mt-6 text-gray-400 text-sm">
              <p>&copy; 2025 Sokushuu. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;