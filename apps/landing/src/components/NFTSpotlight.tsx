import SokushuuLaunchpadPrompt from '../assets/sokushuu-launchpad-prompt.png'
import SokushuuLaunchpadMinted from '../assets/sokushuu-launchpad-minted.png'

const NFTSpotlight = () => {
    return <div id="nft-art" className="py-12 flex items-center">
        <div className="px-8 mx-auto w-full gap-y-12 gap-x-8 flex flex-col lg:flex-row-reverse">
            <div className="lg:flex-1 flex flex-col justify-start">
                <div>
                    <h2 className="text-2xl font-semibold">
                        No Skills? No Problem. <span className="underline decoration-wavy decoration-2 underline-offset-8 decoration-[#52525c]">Create NFTs in Seconds</span>.
                    </h2>
                    <ul className="text-base/8 mt-4 list-disc list-inside">
                        <li>Generate custom artwork using AI</li>
                        <li>Instantly mint and list on our marketplace</li>
                        <li>Discover NFT art created by other learners</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <a
                        href="https://launchpad.sokushuu.de"
                        target="_blank"
                        className="border-2 rounded-lg text-lg font-semibold cursor-pointer px-3 py-2 shadow-md hover:shadow-lg"
                    >
                        Craft NFT Art
                    </a>
                    <p className="text-sm mt-4">Launch your own collection, testnet only</p>
                </div>
            </div>
            <div className="lg:flex-1 border-2 rounded-md p-2 grid gap-x-2 grid-cols-1 lg:grid-cols-2 bg-zinc-200 gap-y-4 justify-items-center opacity-100">
                <img
                    className="border h-[60vh] rounded-md"
                    src={SokushuuLaunchpadPrompt}
                    alt="a screenshot of sokushuu launchpad prompt"
                />
                <img
                    className="border h-[60vh] rounded-md"
                    src={SokushuuLaunchpadMinted}
                    alt="a screenshot of sokushuu launchpad minted"
                />
            </div>
        </div>
    </div>
}

export default NFTSpotlight;