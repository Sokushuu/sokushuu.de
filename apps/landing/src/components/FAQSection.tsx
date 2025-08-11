import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do I need to buy tokens?',
      answer: 'No. You earn USD (stablecoins) directly for learning or selling guides. No token purchases required.'
    },
    {
      question: 'How are rewards paid out?',
      answer: 'Rewards are paid based on completed learning sessions and guide/tutorial sales. All payments are in USD stablecoins.'
    },
    {
      question: 'Is there a minimum to start?',
      answer: 'No minimum—start with a 3-minute lesson. The more you learn and create, the more you can earn.'
    },
    {
      question: 'Can I use this platform from my country?',
      answer: 'Yes, Sokushuu is available globally. Anyone can learn, create, and earn USD regardless of location.'
    },
    {
      question: 'How much can I earn?',
      answer: 'Earnings vary based on your learning activity and content creation.'
    },
    {
      question: 'When will the platform launch?',
      answer: 'Follow us on X (Twitter) for the latest updates on our launch timeline and early access opportunities.'
    }
  ];

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-primary">Frequently Asked Questions</h2>
          <p className="text-xl text-secondary">Everything you need to know about earning USD with Sokushuu</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-2 border-primary rounded-lg overflow-hidden bg-secondary">
              <button
                className="w-full px-6 py-4 text-left font-bold text-lg hover:bg-muted transition-colors flex justify-between items-center text-primary"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <ChevronDown 
                  size={24} 
                  className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 border-t-2 border-primary' 
                    : 'max-h-0 opacity-0 border-t-0'
                }`}
              >
                <div className={`px-6 bg-muted transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'py-4' : 'py-0'
                }`}>
                  <p className="text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;