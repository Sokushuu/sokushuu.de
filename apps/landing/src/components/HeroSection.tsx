import { useState } from 'react'
import { Clock, DollarSign, Globe } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

import { InteractiveLearningCard } from './InteractiveLearningFlow'

import SokushuuWhiteIcon from '../assets/sokushuu-white.svg'
import SokushuuBlackIcon from '../assets/sokushuu.svg'

const HeroSection = () => {
    const { theme } = useTheme();
    const [isLearningStarted, setIsLearningStarted] = useState(false);

    // Select appropriate Sokushuu icon based on theme
    const SokushuuIcon = theme === 'dark' ? SokushuuWhiteIcon : SokushuuBlackIcon;

    const handleLearningStart = () => {
        setIsLearningStarted(true);
    };
    return <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
                {/* Sokushuu Icon above headline */}
                <div className="mb-6">
                    <img className="w-16 h-16 mx-auto lg:mx-0" src={SokushuuIcon} alt="Sokushuu" />
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight text-primary">
                    <span className="">
                        Farm knowledge
                    </span>
                    <br />
                    and earn USD as you learn.
                </h1>
                
                <p className="text-xl text-secondary mb-8 leading-relaxed">
                    Start with just 3 minutes a day. Boost your learning, boost your USD rewards.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                    <a 
                        href="https://x.com/sokushuu_de"
                        target="_blank"
                        className="bg-interactive-primary text-inverse px-8 py-4 rounded-lg font-bold text-lg hover:bg-interactive-hover transition-colors text-center"
                    >
                        Follow us on X for Early Access
                    </a>
                    <a 
                        href="#how-it-works"
                        className="border-2 border-interactive-primary text-interactive-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-interactive-primary hover:text-inverse transition-colors text-center"
                    >
                        See How It Works
                    </a>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-muted">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>3 min minimum</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>USD rewards</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>Global access</span>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="relative">
                    <InteractiveLearningCard onStartLearning={handleLearningStart} />
                    
                    {!isLearningStarted && 
                        <div className="absolute -top-4 -right-4 bg-success text-interactive-primary px-3 py-1 rounded-full text-sm font-bold rotate-12 shadow-lg animate-bounce">
                            Try it now!
                        </div>
                    }
                </div>
            </div>
        </div>
    </section>
}

export default HeroSection