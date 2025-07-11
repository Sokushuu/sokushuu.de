import React from 'react';
import { DollarSign, Clock, Zap } from 'lucide-react';
import Twitter from '../assets/x-white.png'

const CreatorSection: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign size={32} />,
      title: 'Instant USD Payouts',
      description: 'Get paid in stablecoins immediately when someone completes your content.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Sell Once, Earn Forever',
      description: 'Create your guide once and earn USD whenever someone learns from it.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Simple Publishing',
      description: 'Upload guides, tutorials, or flashcards in minutes. Set your price and go live.'
    }
  ];

  return (
    <section id="creator-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Share Your Expertise. Earn USD Every Time Someone Learns.</h2>
          <p className="text-xl text-zinc-600">
            Publish guides, tutorials, or flashcards—set your price and build a passive income stream.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 border-2 border-zinc-800 rounded-lg hover:shadow-lg transition-shadow bg-zinc-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 text-zinc-50 rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        {/* Simple CTA */}
        <div className="text-center">
          <div className="bg-zinc-50 border-2 border-zinc-800 rounded-xl p-8">
            <h3 className="text-2xl font-black mb-4">Ready to Start Earning USD?</h3>
            
            <button 
              className="bg-zinc-800 text-zinc-50 px-8 py-4 rounded-lg font-bold text-lg hover:bg-zinc-700 transition-colors inline-flex items-center gap-3 mb-3"
              onClick={() => window.open('https://twitter.com/sokushuu_de', '_blank')}
            >
              <img src={Twitter} height={20} width={20} />
              Follow on X
            </button>
            
            <div className="text-sm text-zinc-600">
              Let us know through DM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;