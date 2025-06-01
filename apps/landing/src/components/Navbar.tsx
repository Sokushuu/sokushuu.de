import { useEffect, useState } from 'react'

import SokushuuIcon from '../assets/sokushuu.svg'

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const listenScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 300);
        }

        window.addEventListener('scroll', listenScroll);
        return () => window.removeEventListener('scroll', listenScroll);
    }, [])

    if (!isVisible) return null;

    return <div className="p-4 fixed top-0 left-0 right-0 z-10 bg-zinc-400/95 flex items-center justify-between">
            <a
                href="#hero"
                className="flex gap-x-2 items-center cursor-pointer">
                <img
                    src={SokushuuIcon}
                    alt="sokushuu icon"
                    className="w-12 h-12 bg-white rounded-full p-1"
                />
                <p className="text-white font-bold text-2xl text-shadow-md">Sokushuu</p>
            </a>
            <div className="hidden md:flex text-white font-semibold gap-x-4 text-shadow-md hover:text-shadow-lg">
                <a href="#flashcards">Flashcards</a>
                <a href="#nft-art">NFT Art</a>
            </div>
        </div>
}

export default Navbar;