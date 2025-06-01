import SokushuuIcon from '../assets/sokushuu.svg'

const HeroSection = () => {
    return <div id="hero" className="min-h-screen flex items-center">
        <div className="max-w-[80vw] md:max-w-[60vw] mx-auto">
            <div className="flex justify-center">
                <img
                    className="w-28 h-28"
                    src={SokushuuIcon}
                    alt="Sokushuu icon which looks like a flashcard with an anthena and S letter inside the card"
                />
            </div>
            <h1 className="mt-4 md:mt-8 text-center leading-[1.5] text-3xl md:text-4xl text-zinc-800 font-semibold text-shadow-md/20 text-shadow-zinc-100">
                <span className="underline decoration-wavy decoration-2 underline-offset-8 decoration-[#52525c]">Learn</span> Actively.{` `} 
                <br />
                <span className="underline decoration-wavy decoration-2 underline-offset-8 decoration-[#52525c]">Earn</span> Passively.{` `}
                <br />
                Anywhere, Anytime.
            </h1>
            <h2 className="mt-4 text-center text-xl">
                Explore AI flashcards and craft NFT art—no money, no barriers, just ideas.
            </h2>
            <div className="mt-6 flex flex-col md:flex-row gap-y-4 gap-x-4 justify-center">
                <a
                    href="#flashcards"
                    className="text-center font-bold border-2 border-zinc-600 px-4 py-2 rounded-lg cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[zinc-800] hover:border-zinc-800">
                    Explore Flashcards
                </a>
                <a
                    href="#nft-art"
                    className="text-center font-bold border-2 border-zinc-600 px-4 py-2 rounded-lg cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[zinc-800] hover:border-zinc-800">
                    Craft NFT Art
                </a>
            </div>
        </div>
    </div>
}

export default HeroSection;