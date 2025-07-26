import React, { useState, useRef } from 'react';
import { DollarSign, CheckCircle, X, Play, RotateCcw, HelpCircle, Clock, Copy, ArrowRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import type { LearningState, Lesson, InteractiveLearningCardProps } from '../types';

import SokushuuIcon from '../assets/sokushuu.svg';
import XWhiteIcon from '../assets/x-white.png';
import XBlackIcon from '../assets/x-black.png';

export const InteractiveLearningCard: React.FC<InteractiveLearningCardProps> = ({ lesson, onStartLearning }) => {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<LearningState>('collection');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Helper function to show toast notifications
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Utility function to convert DOM element to canvas using a simpler approach
  const domToCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    const rect = element.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.scale(scale, scale);

    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Since we can't use foreignObject due to CORS, let's manually recreate the card content
    await drawCardContent(ctx, rect.width, rect.height);
    
    return canvas;
  };

  // Function to manually draw the card content
  const drawCardContent = async (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw the exact SVG pattern background from CSS
    await drawSquarePattern(ctx, width, height);

    // Set up fonts and styles
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the border (similar to border-2 border-zinc-800)
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Draw the completion content
    const centerX = width / 2;
    let currentY = 60;

    // Draw simplified Sokushuu logo at the top
    await drawSokushuuLogo(ctx, centerX - 15, currentY - 25, 30, 30);
    currentY += 45;

    // Title emoji
    ctx.font = '32px serif';
    ctx.fillStyle = '#000';
    ctx.fillText('🎉', centerX, currentY);
    currentY += 50;

    // Title text
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#16a34a'; // green-600
    ctx.fillText('Session Complete!', centerX, currentY);
    currentY += 40;

    // Description
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280'; // gray-600
    ctx.fillText('Great job! You\'ve completed all questions', centerX, currentY);
    currentY += 20;
    ctx.fillText('and earned your reward.', centerX, currentY);
    currentY += 50;

    // Score box
    drawInfoBox(ctx, 40, currentY, width - 80, 50, `Score: ${correctAnswers} / ${questions.length}`, '#f9fafb');
    currentY += 65;

    // Time box (if available)
    if (completionTime > 0) {
      const timeText = `Time: ${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}`;
      drawInfoBox(ctx, 40, currentY, width - 80, 50, timeText, '#f9fafb');
      currentY += 65;
    }

    // Earned box
    drawInfoBox(ctx, 40, currentY, width - 80, 50, `Earned: $${currentLesson.reward} USD`, '#f0fdf4', '#16a34a');
    currentY += 80;

    // Website link at the bottom
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6b7280'; // gray-600
    ctx.fillText('sokushuu.de', centerX, height - 30);
  };

  // Function to draw the exact SVG pattern from CSS
  const drawSquarePattern = async (ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> => {
    return new Promise((resolve) => {
      // First fill with the base background color
      ctx.fillStyle = '#f4f4f5'; // zinc-100
      ctx.fillRect(0, 0, width, height);
      
      // Create pattern from the SVG data URI used in index.css
      const svgDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2352525b' fill-opacity='0.08'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
      
      const patternImg = new Image();
      patternImg.onload = () => {
        const pattern = ctx.createPattern(patternImg, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
        resolve();
      };
      patternImg.onerror = () => {
        // Fallback: keep the solid background
        resolve();
      };
      patternImg.src = svgDataUri;
    });
  };

  // Function to draw a simplified Sokushuu logo
  const drawSokushuuLogo = async (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    try {
      // Create an image element and load the SVG
      const img = new Image();
      
      // Use the imported SVG directly as it should be a URL string
      const svgUrl = SokushuuIcon;
      
      return new Promise<void>((resolve) => {
        img.onload = () => {
          // Draw the SVG image onto the canvas
          ctx.drawImage(img, x, y, width, height);
          resolve();
        };
        
        img.onerror = () => {
          // Fallback to simplified logo if SVG fails to load
          drawFallbackLogo(ctx, x, y, width, height);
          resolve();
        };
        
        img.src = svgUrl;
      });
    } catch (error) {
      // Fallback to simplified logo if anything goes wrong
      drawFallbackLogo(ctx, x, y, width, height);
    }
  };

  // Fallback function for simplified logo
  const drawFallbackLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    // Draw a simplified "S" shape representing Sokushuu
    ctx.fillStyle = '#27272a'; // zinc-800
    ctx.lineWidth = 2;
    
    // Create a simple "S" curve
    ctx.beginPath();
    
    // Top curve
    ctx.arc(x + width * 0.25, y + height * 0.25, width * 0.15, Math.PI * 1.2, Math.PI * 2.2);
    
    // Middle section
    ctx.lineTo(x + width * 0.5, y + height * 0.5);
    
    // Bottom curve
    ctx.arc(x + width * 0.75, y + height * 0.75, width * 0.15, Math.PI * 0.2, Math.PI * 1.2);
    
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Add a small square accent (representing learning blocks)
    ctx.fillStyle = '#16a34a'; // green-600
    ctx.fillRect(x + width * 0.8, y + width * 0.1, width * 0.15, height * 0.15);
  };

  // Helper function to draw info boxes
  const drawInfoBox = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    text: string, 
    bgColor: string = '#f9fafb',
    textColor: string = '#374151'
  ) => {
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);
    
    // Draw border
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    
    // Draw text
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(text, x + width / 2, y + height / 2);
  };

  // Copy card as image to clipboard
  const handleCopyImage = async () => {
    try {
      if (!cardRef.current || currentState !== 'completed') return;
      
      const canvas = await domToCanvas(cardRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        if (navigator.clipboard && ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showToastNotification('✅ Card copied to clipboard!');
        } else {
          // Fallback: download the image
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'sokushuu-completion.png';
          link.click();
          URL.revokeObjectURL(url);
          showToastNotification('📥 Card downloaded!');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Failed to copy image:', error);
      // Fallback: create a simple text share
      if (navigator.clipboard && navigator.clipboard.writeText) {
        const text = `🎉 Just completed "${currentLesson.title}" on Sokushuu! Score: ${correctAnswers}/${questions.length}, Time: ${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}, Earned: $${currentLesson.reward} USD`;
        await navigator.clipboard.writeText(text);
        showToastNotification('📝 Text summary copied to clipboard!');
      } else {
        showToastNotification('❌ Copy failed. Please try again.');
      }
    }
  };

  // Share to X (Twitter)
  const handleShareToX = () => {
    const text = `🎉 Just completed "${currentLesson.title} Demo" on @sokushuu_de! 

📊 Score: ${correctAnswers}/${questions.length}
⏱️ Time: ${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}
💰 Earned: $${currentLesson.reward} USD

Learn crypto and earn rewards! 🚀`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Default lesson for hero section demo
  const defaultLesson: Lesson = {
    id: "crypto-basics-demo",
    title: "Crypto Basics",
    description: "Learn fundamental cryptocurrency concepts",
    category: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "2-3 min",
    reward: 0.50,
    totalQuestions: 3,
    thumbnail: "💰",
    sponsor: "Sokushuu",
    tags: ["Crypto", "Basics", "Blockchain"],
    questions: [
      {
        id: 1,
        question: "What is cryptocurrency?",
        options: [
          "To enable anyone to transfer money globally",
          "It's just a coin",
          "It has no goal",
        ],
        correctAnswer: 0,
        explanation: "Cryptocurrencies, such as bitcoin, enable anyone to transfer money globally. Source: ethereum.org"
      },
      {
        id: 2,
        question: "What is a blockchain?",
        options: [
          "I don't know",
          "A distributed ledger technology",
          "A traditional database",
        ],
        correctAnswer: 1,
        explanation: "A blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography."
      },
      {
        id: 3,
        question: "What does 'decentralized' mean in cryptocurrency?",
        options: [
          "Controlled by a single authority",
          "No central controlling authority",
          "Only available in certain countries",
        ],
        correctAnswer: 1,
        explanation: "Decentralized means there is no central controlling authority. Instead, the network is maintained by many participants around the world."
      }
    ]
  };

  const currentLesson = lesson || defaultLesson;
  const questions = currentLesson.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleStartLearning = () => {
    try {
        setCurrentState('question');
        const now = Date.now();
        console.log({ now });
        setStartTime(now);
        onStartLearning?.();
    } catch (err) {
        console.log({ err });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    // Track correct answers
    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    // If this is the last question and answer is correct, go directly to completed
    if (currentQuestionIndex === questions.length - 1 && answerIndex === currentQuestion.correctAnswer) {
      const endTime = Date.now();
      const timeTaken = startTime ? Math.round((endTime - startTime) / 1000) : 0;
      console.log({ timeTaken, startTime, endTime });
      setCompletionTime(timeTaken);
      
      setCurrentState('completed');
      setShowConfetti(true);
      setShowReward(true);
      
      // Hide confetti after a short time
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } else {
      setCurrentState('answered');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentState('question');
    } else {
      // All questions completed
      const endTime = Date.now();
      const timeTaken = startTime ? Math.round((endTime - startTime) / 1000) : 0;
      setCompletionTime(timeTaken);
      
      // Go directly to completed state for instant transition
      setCurrentState('completed');
      setShowConfetti(true);
      setShowReward(true);
      
      // Hide confetti after a short time
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const handleFinishSession = () => {
    handleNextQuestion();
  };

  const resetFlow = () => {
    setCurrentState('collection');
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCompletionTime(0);
    setShowConfetti(false);
    setShowReward(false);
  };

  const handleCardFlip = () => {
    if (currentState === 'answered' && isAnswered) {
      setCurrentState('question');
    } else if (currentState === 'question' && isAnswered) {
      setCurrentState('answered');
    }
  };

  const renderCollection = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-black text-primary">{currentLesson.title}</h3>
          <p className="text-secondary text-sm leading-relaxed">{currentLesson.description}</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-secondary">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <HelpCircle size={16} className="text-muted" />
                </div>
                <span className="text-primary font-medium">{currentLesson.totalQuestions} Questions</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-secondary">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Clock size={16} className="text-muted" />
                </div>
                <span className="text-primary font-medium">~3 min</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <DollarSign size={16} className="text-success" />
              </div>
              <span className="text-primary font-medium">Reward</span>
            </div>
            <div className="flex items-center gap-1 text-success">
              <span className="text-lg font-black">${currentLesson.reward}</span>
              <span className="text-sm font-medium">USD</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleStartLearning}
        className="bg-interactive-primary text-inverse px-8 py-4 rounded-lg font-bold hover:bg-interactive-hover cursor-pointer transition-colors flex items-center justify-center gap-3 shadow-lg"
      >
        <Play size={20} />
        <span>Start Learning</span>
      </button>
    </div>
  );

  const renderQuestion = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm text-secondary mb-2">Question {currentQuestionIndex + 1} of {questions.length}</div>
        <h3 className="text-lg font-black mb-4 text-primary">{currentQuestion.question}</h3>
      </div>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={isAnswered}
            className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
              isAnswered
                ? index === currentQuestion.correctAnswer
                  ? 'border-success bg-success/10 text-success'
                  : index === selectedAnswer
                  ? 'border-error bg-error/10 text-error'
                  : 'border-secondary bg-muted text-muted'
                : 'border-secondary hover:border-primary hover:bg-muted'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {isAnswered && (
                <div>
                  {index === currentQuestion.correctAnswer && (
                    <CheckCircle size={20} className="text-success" />
                  )}
                  {index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <X size={20} className="text-error" />
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {!isAnswered && (
        <div className="text-center text-sm text-secondary">
          Select an answer to continue
        </div>
      )}
      
      {isAnswered && (
        <div className="text-center text-sm text-secondary">
          Click the card to see your result
        </div>
      )}
    </div>
  );

  const renderAnswered = () => (
    <div className="space-y-6 text-center">
      <div className={`text-2xl font-black ${selectedAnswer === currentQuestion.correctAnswer ? 'text-success' : 'text-error'}`}>
        {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
      </div>
      
      <div className="bg-muted p-4 rounded-lg text-left border border-secondary">
        <h4 className="font-bold mb-2 text-primary">Explanation:</h4>
        <p className="text-secondary text-sm leading-relaxed">{currentQuestion.explanation}</p>
      </div>
      
      <div className="flex gap-3 justify-center">
        {selectedAnswer === currentQuestion.correctAnswer && (
          <button
            onClick={handleFinishSession}
            className="bg-success text-inverse px-6 py-3 rounded-lg font-bold hover:bg-success/90 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Claim Reward'}
          </button>
        )}

        {selectedAnswer !== currentQuestion.correctAnswer && (
            <button
                onClick={resetFlow}
                className="bg-interactive-secondary text-primary px-6 py-3 rounded-lg font-bold hover:bg-interactive-secondary/80 transition-colors flex items-center gap-2"
            >
                <RotateCcw size={16} />
                Try Again
            </button>
        )}
      </div>
      
      <div className="text-xs text-secondary">
        Click the card to review the question
      </div>
    </div>
  );

  const renderCelebrating = () => (
    <div className="space-y-6 text-center">
      <div className="text-6xl mb-4 animate-bounce">🎉</div>
      <div className="text-3xl font-black text-success mb-4">Congratulations!</div>
      <div className="text-xl text-primary">
        You completed the session!
      </div>
      <div className="text-lg text-secondary">
        {completionTime && `Finished in ${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}`}
      </div>
    </div>
  );

  const renderCompleted = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-black text-primary">Session Complete!</h3>
          <p className="text-secondary text-sm leading-relaxed">
            Great job! You've completed all questions and earned your reward.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-secondary">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-muted" />
                </div>
                <span className="text-primary font-medium">Score</span>
              </div>
              <span className="text-primary font-black">{correctAnswers} / {questions.length}</span>
            </div>
            {completionTime > 0 && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-muted" />
                  </div>
                  <span className="text-primary font-medium">Time</span>
                </div>
                <span className="text-primary font-black">
                  {Math.floor(completionTime / 60)}:{(completionTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-secondary">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <DollarSign size={16} className="text-muted" />
              </div>
              <span className="text-primary font-medium">Earned</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <span className="text-lg font-black">${currentLesson.reward}</span>
              <span className="text-sm font-medium">USD</span>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleCopyImage}
              className="flex-1 bg-interactive-primary text-inverse px-4 py-2 rounded-lg font-medium hover:bg-interactive-hover transition-colors flex items-center justify-center gap-2 border border-secondary"
            >
              <Copy size={16} />
              <span className="text-sm font-semibold">Copy Image</span>
            </button>
            <button
              onClick={handleShareToX}
              className="flex-1 bg-interactive-primary text-inverse px-4 py-2 rounded-lg font-medium hover:bg-interactive-hover transition-colors flex items-center justify-center gap-2 border border-secondary"
            >
              <img src={resolvedTheme === 'dark' ? XBlackIcon : XWhiteIcon} alt="X" className="w-4 h-4" />
              <span className="text-sm font-semibold">Share</span>
            </button>
          </div>

          {/* Explore More Button */}
          <button
            onClick={() => navigate('/explore')}
            className="w-full bg-success text-inverse px-8 py-4 rounded-lg font-bold hover:bg-success/90 transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            <ArrowRight size={20} />
            <span>Explore More Lessons</span>
          </button>
        </div>
      </div>
      
      {/*
      <button
        onClick={resetSession}
        className="bg-zinc-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-zinc-900 transition-colors flex items-center justify-center gap-3 shadow-lg"
      >
        <RotateCcw size={20} />
        <span>Try Again</span>
      </button>
      */}
    </div>
  );

  const getCardContent = () => {
    switch (currentState) {
      case 'collection':
        return renderCollection();
      case 'question':
        return renderQuestion();
      case 'answered':
        return renderAnswered();
      case 'celebrating':
        return renderCelebrating();
      case 'completed':
        return renderCompleted();
      default:
        return renderCollection();
    }
  };

  return (
    <div className="relative">
      <div
        ref={cardRef}
        className={`w-80 h-[32rem] bg-secondary border-2 border-primary rounded-lg shadow-lg p-6 flex items-center justify-center transition-all duration-300 ${
          (currentState === 'answered' || (currentState === 'question' && isAnswered)) ? 'cursor-pointer hover:shadow-xl' : ''
        }`}
        onClick={(currentState === 'answered' || (currentState === 'question' && isAnswered)) ? handleCardFlip : undefined}
      >
        <div className="w-full h-full flex items-center justify-center">
          {getCardContent()}
        </div>
      </div>
      
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1.5s'
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '2s'
              }}
            >
              <span className="text-2xl">✨</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Floating reward animation */}
      {showReward && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-success text-inverse px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            +${currentLesson.reward} USD!
          </div>
        </div>
      )}
      
      {/* Progress indicator */}
      {(currentState === 'question' || currentState === 'answered') && (
        <div className="absolute -bottom-8 left-0 right-0">
          <div className="bg-muted h-2 rounded-full">
            <div 
              className="bg-interactive-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-secondary text-center mt-1">
            {currentQuestionIndex + 1} of {questions.length} questions
          </div>
        </div>
      )}
      
      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-success text-inverse px-4 py-2 rounded-lg font-medium text-sm shadow-lg border border-success/20 animate-bounce">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};