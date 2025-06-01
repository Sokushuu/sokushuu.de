import SokushuuFlashcardPreview from '../assets/sokushuu-flashcard-preview.png'
import SokushuuAskAIPreview from '../assets/sokushuu-ask-ai-preview.png'

const FlashcardSpotlight = () => {
    return <div id="flashcards" className="py-12 flex items-center">
        <div className="px-8 mx-auto w-full grid gap-y-12 gap-x-8 grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-start">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Study Smarter with <span className="underline decoration-wavy decoration-2 underline-offset-8 decoration-[#52525c]">AI-Enhanced Flashcards</span>
                    </h2>
                    <ul className="text-base/8 mt-4 list-disc list-inside">
                        <li>Learn any topic using interactive flashcards</li>
                        <li>Let AI help you generate or explain content</li>
                        <li>Sell your study decks to earn passively</li>
                        <li>Discover decks aligned with your interests</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <a
                        href="https://app.sokushuu.de"
                        target="_blank"
                        className="border-2 rounded-lg text-lg font-semibold cursor-pointer px-3 py-2 shadow-md hover:shadow-lg"
                    >
                        Explore Flashcards
                    </a>
                    <p className="text-sm mt-4">Browse & try learning with AI</p>
                </div>
            </div>
            <div className="border-2 rounded-md p-2 grid grid-cols-1 lg:grid-cols-2 bg-zinc-200 gap-y-4 justify-items-center opacity-100">
                <img
                    className="h-[60vh] rounded-md"
                    src={SokushuuFlashcardPreview}
                    alt="a screenshot of sokushuu flashcard preview"
                />
                <img
                    className="h-[60vh] rounded-md"
                    src={SokushuuAskAIPreview}
                    alt="a screenshot of sokushuu ask ai preview"
                />
            </div>
        </div>
    </div>
}

export default FlashcardSpotlight;