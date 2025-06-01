import EduChainIcon from '../assets/educhain.svg'

const EduChainSection = () => {
    return <div className="my-12 py-12 px-6 md:px-12 max-w-[80vw] mx-auto bg-zinc-200/60 rounded-md flex flex-col items-center text-center gap-y-8">
        <img
            className="w-16 h-16 rounded-full"
            src={EduChainIcon}
            alt="educhain icon"
        />
        <h2 className="text-2xl font-semibold">Trusted and Funded by EduChain—Education's Own Layer-3</h2>
        <p className="text-zinc-600">EduChain inherits security, scalability, and speed—with education-focused performance at its core.</p>
        <p>🏆 Earn Track #1 Winner - EduChain Semester 3 Hackathon</p>
    </div>
}

export default EduChainSection;