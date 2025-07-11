import { Clock, BookOpen, Mail } from 'lucide-react';

const EcosystemOverview = () => {
  const features = [
    {
      icon: <Clock size={32} />,
      title: 'Start Small, Earn More',
      description: 'Complete 3-minute learning sessions for instant USD rewards. Go longer for even bigger gains.'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Monetize Your Knowledge',
      description: 'Sell your guides or tutorials, and earn USD every time someone completes your content.'
    },
    {
      icon: <Mail size={32} />,
      title: 'Frictionless Access',
      description: 'Sign up with email or X (Twitter). No wallet needed to start.'
    }
  ];

  return (
    <section id="ecosystem-overview" className="py-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Learn. Earn. Repeat.</h2>
          <p className="text-xl text-gray-600">Turn your time into USD rewards</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white border-2 border-black rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EcosystemOverview;