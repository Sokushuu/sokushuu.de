import React, { useState, useRef } from 'react';
import { DollarSign, CheckCircle, X, Play, RotateCcw, HelpCircle, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import type { LearningState, Lesson, InteractiveLearningCardProps } from '../types';

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
  const [showToast] = useState(false);
  const [toastMessage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Helper function to show toast notifications (currently unused)
  // const showToastNotification = (message: string) => {
  //   setToastMessage(message);
  //   setShowToast(true);
  //   setTimeout(() => {
  //     setShowToast(false);
  //   }, 3000);
  // };


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
    author: "Sokushuu Team",
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

          {/* Action buttons - Single row */}
          <div className="flex gap-3">
            <button
              onClick={handleShareToX}
              className="flex-1 bg-interactive-primary text-inverse px-4 py-3 rounded-lg font-bold hover:bg-interactive-hover transition-colors flex items-center justify-center gap-2"
            >
              <img src={resolvedTheme === 'dark' ? XBlackIcon : XWhiteIcon} alt="X" className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button
              onClick={() => navigate('/explore')}
              className="flex-1 bg-success text-inverse px-4 py-3 rounded-lg font-bold hover:bg-success/90 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRight size={16} />
              <span>Explore</span>
            </button>
          </div>
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