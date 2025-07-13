import { useState } from 'react'

interface FlashCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

const FlashCard = ({ front, back, className = '' }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`perspective-1000 ${className}`} style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-64 cursor-pointer transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 w-full h-full bg-elevated border-2 border-primary rounded-lg shadow-lg flex items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-lg font-medium text-center text-primary">{front}</div>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full bg-interactive-primary text-inverse border-2 border-primary rounded-lg shadow-lg flex items-center justify-center p-6"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="text-lg font-medium text-center">{back}</div>
        </div>
      </div>
    </div>
  )
}

export default FlashCard
