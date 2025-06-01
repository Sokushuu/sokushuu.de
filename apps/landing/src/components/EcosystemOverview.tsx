import BrainIcon from '../assets/brain.svg'
import MoneyIcon from '../assets/money.svg'
import ArtIcon from '../assets/art.svg'
import CoinIcon from '../assets/coin.svg'

const EcosystemOverview = () => {
    return <div id="ecosystem-overview" className="py-12 flex items-center">
        <div className="px-4 mx-auto w-full">
            <h2 className="text-center text-2xl font-semibold">Ecosystem At-a-Glance</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
                <div className="border-2 rounded-md py-8">
                    <img
                        className="w-8 h-8 mx-auto"
                        src={BrainIcon}
                        alt="brain icon"
                    />
                    <div className="mt-4 text-center flex flex-col gap-y-2">
                        <p className="font-semibold">Flashcards</p>
                        <p className="text-sm">Learn & Create</p>
                    </div>
                </div>
                <div className="border-2 rounded-md py-8">
                    <img
                        className="w-8 h-8 mx-auto"
                        src={MoneyIcon}
                        alt="money icon"
                    />
                    <div className="mt-4 text-center flex flex-col gap-y-2">
                        <p className="font-semibold">Marketplace</p>
                        <p className="text-sm">Earn & Explore</p>
                    </div>
                </div>
                <div className="border-2 rounded-md py-8">
                    <img
                        className="w-8 h-8 mx-auto"
                        src={ArtIcon}
                        alt="art icon"
                    />
                    <div className="mt-4 text-center flex flex-col gap-y-2">
                        <p className="font-semibold">AI Art</p>
                        <p className="text-sm">Generate Effortlessly</p>
                    </div>
                </div>
                <div className="border-2 rounded-md py-8">
                    <img
                        className="w-8 h-8 mx-auto"
                        src={CoinIcon}
                        alt="coin icon"
                    />
                    <div className="mt-4 text-center flex flex-col gap-y-2">
                        <p className="font-semibold">NFT Launchpad</p>
                        <p className="text-sm">Mint & Sell</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EcosystemOverview;