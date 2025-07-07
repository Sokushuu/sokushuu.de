import { useEffect } from 'react'

const SurveyPage = () => {
  useEffect(() => {
    // Load the Tally embed script
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="h-screen w-full">
        <iframe
          data-tally-src="https://tally.so/r/mYBaoB"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Survey Pengalaman Airdrop Bahasa Indonesia"
          className="border-0"
        />
      </div>
    </div>
  )
}

export default SurveyPage
