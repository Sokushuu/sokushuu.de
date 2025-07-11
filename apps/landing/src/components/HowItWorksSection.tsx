import React from 'react';
import { Clock, CheckCircle, DollarSign, Upload, TrendingUp } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Clock size={32} />,
      title: 'Pick a 3-Minute Lesson',
      description: 'Select a bite-sized lesson (minimum: 3 mins). Option to go longer — more learning, more USD rewards.'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Complete the Step-by-Step Quiz',
      description: 'Each module ends with a quiz that unlocks the next module. Step-by-step flow — no skipping ahead.'
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Earn USD',
      description: 'Rewards are paid out in stablecoins. The more you learn, the more you earn.'
    },
    {
      icon: <Upload size={32} />,
      title: 'Create & Sell Your Guides',
      description: 'Upload and sell guides or tutorials. Earn USD whenever your content is purchased.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Four simple steps to start earning USD</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative h-full">
              <div className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4 mx-auto">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -left-3 bg-yellow-300 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white border-2 border-black rounded-xl p-8 text-center mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded">
              <Clock size={16} />
              <span>3 min lesson</span>
            </div>
            <span className="text-2xl hidden md:inline">→</span>
            <span className="text-2xl md:hidden">↓</span>
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded">
              <CheckCircle size={16} />
              <span>Complete quiz</span>
            </div>
            <span className="text-2xl hidden md:inline">→</span>
            <span className="text-2xl md:hidden">↓</span>
            <div className="flex items-center gap-2 text-sm bg-green-100 px-3 py-1 rounded">
              <DollarSign size={16} />
              <span>USD reward</span>
            </div>
            <span className="text-2xl hidden md:inline">→</span>
            <span className="text-2xl md:hidden">↓</span>
            <div className="flex items-center gap-2 text-sm bg-blue-100 px-3 py-1 rounded">
              <TrendingUp size={16} />
              <span>Create guides</span>
            </div>
          </div>
          <p className="text-gray-600">Simple, rewarding, and profitable</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;