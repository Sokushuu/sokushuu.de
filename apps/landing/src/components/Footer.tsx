const Footer = () => {
    return <div className="bg-zinc-200/40 py-4 flex justify-center">
        <div className="flex flex-col md:flex-row gap-y-4 gap-x-8">
            <div className="flex gap-x-2">
                <p>Explore:</p>
                <a
                    className="text-zinc-800 underline underline-offset-2"
                    href="https://app.sokushuu.de"
                    target="_blank"
                >
                    Flashcard DApp
                </a>
                <div className="border-l-1 border-r-1 border-zinc-600" />
                <a
                    className="text-zinc-800 underline underline-offset-2"
                    href="https://launchpad.sokushuu.de"
                    target="_blank"
                >
                    NFT Launchpad
                </a>
            </div>
            <div className="flex gap-x-2">
                <p>Community:</p>
                <a
                    className="text-zinc-800 underline underline-offset-2"
                    href="https://x.com/sokushuu_de"
                    target="_blank"
                >
                    X (formerly Twitter)
                </a>
                <div className="border-l-1 border-r-1 border-zinc-600" />
                <a
                    className="text-zinc-800 underline underline-offset-2"
                    href="https://t.me/sokushuu"
                    target="_blank"
                >
                    Telegram
                </a>
            </div>
        </div>
    </div>
}

export default Footer;