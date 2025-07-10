import ClockIcon from '../assets/clock-three.svg'
import UsdBadgeIcon from '../assets/usd-badge.svg'
import GlobeIcon from '../assets/globe.svg'
import SokushuuIcon from '../assets/sokushuu.svg'
import FlashCard from './FlashCard'

const HeroSection = () => {
    return <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
                {/* Sokushuu Icon above headline */}
                <div className="mb-6">
                    <img className="w-16 h-16 mx-auto lg:mx-0" src={SokushuuIcon} alt="Sokushuu" />
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight text-zinc-800">
                    <span className="">
                        Farm knowledge
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-zinc-800"></div>
                    </span>
                    <br />
                    and earn USD as you learn.
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Start with just 3 minutes a day. Boost your learning, boost your USD rewards.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                    <a 
                        href="https://x.com/sokushuu_de"
                        target="_blank"
                        className="bg-zinc-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-zinc-900 transition-colors text-center"
                    >
                        Follow us on X for Early Access
                    </a>
                    <a 
                        href="#how-it-works"
                        className="border-2 border-zinc-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-zinc-800 hover:text-white transition-colors text-center"
                    >
                        See How It Works
                    </a>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src={ClockIcon} alt="clock" />
                        <span>3 min minimum</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src={UsdBadgeIcon} alt="USD" />
                        <span>USD rewards</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src={GlobeIcon} alt="globe" />
                        <span>Global access</span>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="relative">
                    <FlashCard
                        front={
                            <div className="space-y-4">
                                <div className="text-2xl font-bold text-zinc-800">Complete this 3-min lesson</div>
                                <div className="text-sm text-gray-500">Finance Basics • Beginner</div>
                                <div className="flex items-center justify-center gap-2 text-green-600">
                                    <img className="w-5 h-5" src={UsdBadgeIcon} alt="USD" />
                                    <span className="font-bold">+$0.50 USD</span>
                                </div>
                            </div>
                        }
                        back={
                            <div className="space-y-4">
                                <div className="text-2xl font-bold text-green-400">Lesson Complete!</div>
                                <div className="text-lg">+$0.50 USD earned</div>
                                <div className="text-sm opacity-80">Ready for the next lesson?</div>
                            </div>
                        }
                        className="w-80 h-64"
                    />
                    
                    <div className="absolute -top-4 -right-4 bg-green-300 text-black px-3 py-1 rounded-full text-sm font-bold rotate-12 shadow-lg">
                        Earn USD!
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default HeroSection