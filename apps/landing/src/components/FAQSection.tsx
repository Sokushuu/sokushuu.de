const FAQSection = () => {
    const faqs = [
        {
            question: "Do I need to buy tokens?",
            answer: "No. You earn USD (stablecoins) directly for learning or selling guides."
        },
        {
            question: "How are rewards paid out?",
            answer: "Rewards are paid based on completed learning sessions and guide/tutorial sales."
        },
        {
            question: "Is there a minimum to start?",
            answer: "No minimum—start with a 3-minute lesson."
        },
        {
            question: "Can I use this platform from my country?",
            answer: "Yes, Sokushuu is available globally."
        }
    ]

    return (
        <div id="faq" className="py-12 flex items-center">
            <div className="px-4 mx-auto w-full max-w-4xl">
                <h2 className="text-center text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-2 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                            <p className="text-zinc-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQSection
