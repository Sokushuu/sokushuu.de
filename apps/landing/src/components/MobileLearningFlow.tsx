import React, { useState } from 'react';
import { DollarSign, CheckCircle, X, Play, RotateCcw, HelpCircle, Clock, Copy, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { LearningState, MobileLearningFlowProps } from '../types';

export const MobileLearningFlow: React.FC<MobileLearningFlowProps> = ({ 
  lesson, 
  onStartLearning,
  onExploreMore
}) => {
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

  const currentQuestion = lesson.questions[currentQuestionIndex];

  // Mobile haptic feedback
  const triggerHapticFeedback = (type: 'success' | 'error' | 'light' = 'light') => {
    if ('vibrate' in navigator) {
      switch (type) {
        case 'success':
          navigator.vibrate([100, 50, 100]);
          break;
        case 'error':
          navigator.vibrate([200]);
          break;
        case 'light':
          navigator.vibrate([50]);
          break;
      }
    }
  };

  // const showToastNotification = (message: string) => {
  //   setToastMessage(message);
  //   setShowToast(true);
  //   setTimeout(() => {
  //     setShowToast(false);
  //   }, 3000);
  // };

  const handleStartLearning = () => {
    try {
      setCurrentState('question');
      const now = Date.now();
      setStartTime(now);
      onStartLearning?.();
      triggerHapticFeedback('light');
    } catch (err) {
      console.log({ err });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Haptic feedback
    triggerHapticFeedback(isCorrect ? 'success' : 'error');
    
    // Track correct answers
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setCurrentState('answered');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentState('question');
      triggerHapticFeedback('light');
    } else {
      // All questions completed
      const endTime = Date.now();
      const timeTaken = startTime ? Math.round((endTime - startTime) / 1000) : 0;
      setCompletionTime(timeTaken);
      
      setCurrentState('completed');
      setShowConfetti(true);
      if (lesson.reward) {
        setShowReward(true);
      }
      triggerHapticFeedback('success');
      
      // Hide confetti after a short time
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const retryCurrentQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentState('question');
  };

  const continueToNextQuestion = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentState('question');
    } else {
      // Last question - complete the lesson
      setCurrentState('completed');
      const endTime = Date.now();
      const totalTime = Math.floor((endTime - startTime) / 1000);
      setCompletionTime(totalTime);
      
      // Show reward animation if lesson has reward
      if (lesson.reward) {
        setShowReward(true);
      }
      
      // Show confetti animation
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const handleShareToX = () => {
    const text = `🎉 Just completed "${lesson.title}" on @sokushuu_de! 

📊 Score: ${correctAnswers}/${lesson.questions.length}
⏱️ Time: ${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}
${lesson.reward ? `💰 Earned: $${lesson.reward} USD\n` : ''}
Learn Web3 and level up your knowledge! 🚀`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleExploreMore = () => {
    // Reset learning state
    setCurrentState('collection');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setCompletionTime(0);
    setShowConfetti(false);
    setShowReward(false);
    setStartTime(0);
    
    // Call parent callback to reset selected lesson
    if (onExploreMore) {
      onExploreMore();
    } else {
      // Fallback navigation if no callback provided
      navigate('/explore');
    }
  };

  const renderCollection = () => (
    <div className="w-full max-w-sm mx-auto bg-secondary border-2 border-primary rounded-2xl shadow-xl overflow-hidden">
      {/* Header with thumbnail */}
      <div className="bg-gradient-to-br from-interactive-primary/10 to-success/10 p-6 text-center border-b border-primary/10">
        <div className="text-6xl mb-3">{lesson.thumbnail}</div>
        <h3 className="text-xl font-black text-primary mb-2">{lesson.title}</h3>
        <p className="text-secondary text-sm leading-relaxed">{lesson.description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <HelpCircle size={16} className="text-interactive-primary" />
            </div>
            <p className="text-sm font-bold text-primary">{lesson.totalQuestions}</p>
            <p className="text-xs text-secondary">Questions</p>
          </div>
          <div className="bg-muted rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={16} className="text-interactive-primary" />
            </div>
            <p className="text-sm font-bold text-primary">{lesson.estimatedTime}</p>
            <p className="text-xs text-secondary">Duration</p>
          </div>
        </div>

        {/* Difficulty & Category */}
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-interactive-primary/10 text-interactive-primary text-xs font-medium rounded-full">
            {lesson.category}
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
            {lesson.difficulty}
          </span>
        </div>

        {/* Reward - Only show if reward exists */}
        {lesson.reward && (
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-success" />
                <span className="text-primary font-bold">Earn Reward</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-success">${lesson.reward}</p>
                <p className="text-xs text-secondary">USD</p>
              </div>
            </div>
          </div>
        )}

        {/* Sponsor */}
        <div className="text-center text-xs text-secondary">
          Created by <span className="font-medium text-primary">{lesson.author}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-6 pt-0">
        <button
          onClick={handleStartLearning}
          className="w-full bg-interactive-primary text-inverse py-4 rounded-xl font-bold text-lg hover:bg-interactive-hover active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
        >
          <Play size={20} />
          Start Learning
        </button>
      </div>
    </div>
  );

  const renderQuestion = () => (
    <div className="w-full max-w-sm mx-auto bg-secondary border-2 border-primary rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-interactive-primary/10 to-success/10 p-4 border-b border-primary/10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-secondary">
            Question {currentQuestionIndex + 1} of {lesson.questions.length}
          </span>
          {lesson.reward && (
            <div className="flex items-center gap-1 text-success font-bold">
              <DollarSign size={14} />
              <span className="text-sm">${lesson.reward}</span>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="bg-muted h-2 rounded-full overflow-hidden">
          <div 
            className="bg-interactive-primary h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestionIndex + 1) / lesson.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-primary mb-6 leading-tight">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 active:scale-95 ${
                isAnswered
                  ? index === currentQuestion.correctAnswer
                    ? 'border-success bg-success/10 text-success'
                    : index === selectedAnswer
                    ? 'border-error bg-error/10 text-error'
                    : 'border-secondary bg-muted text-muted opacity-50'
                  : 'border-secondary hover:border-interactive-primary hover:bg-interactive-primary/5 text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium pr-4">{option}</span>
                {isAnswered && (
                  <div className="flex-shrink-0">
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
          <div className="text-center text-sm text-secondary mt-6">
            Tap an answer to continue
          </div>
        )}
      </div>
    </div>
  );

  const renderAnswered = () => (
    <div className="w-full max-w-sm mx-auto bg-secondary border-2 border-primary rounded-2xl shadow-xl overflow-hidden">
      {/* Result Header */}
      <div className={`p-6 text-center border-b border-primary/10 ${
        selectedAnswer === currentQuestion.correctAnswer 
          ? 'bg-success/10' 
          : 'bg-error/10'
      }`}>
        <div className={`text-4xl mb-3 ${
          selectedAnswer === currentQuestion.correctAnswer ? 'text-success' : 'text-error'
        }`}>
          {selectedAnswer === currentQuestion.correctAnswer ? '✅' : '❌'}
        </div>
        <h3 className={`text-xl font-black mb-2 ${
          selectedAnswer === currentQuestion.correctAnswer ? 'text-success' : 'text-error'
        }`}>
          {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite!'}
        </h3>
      </div>

      {/* Explanation */}
      <div className="p-6">
        <div className="bg-muted rounded-xl p-4 mb-6">
          <h4 className="font-bold text-primary mb-2">Explanation:</h4>
          <p className="text-secondary text-sm leading-relaxed">{currentQuestion.explanation}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-success text-inverse py-4 rounded-xl font-bold hover:bg-success/90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {currentQuestionIndex < lesson.questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Finish Session
                  <CheckCircle size={18} />
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <button
                onClick={continueToNextQuestion}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < lesson.questions.length - 1 ? (
                  <>
                    Continue Anyway
                    <ArrowRight size={18} />
                  </>
                ) : (
                  <>
                    Finish Session
                    <CheckCircle size={18} />
                  </>
                )}
              </button>
              <button
                onClick={retryCurrentQuestion}
                className="w-full bg-interactive-secondary text-primary py-4 rounded-xl font-bold hover:bg-interactive-secondary/80 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Retry Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCompleted = () => (
    <div className="w-full max-w-sm mx-auto bg-secondary border-2 border-primary rounded-2xl shadow-xl overflow-hidden">
      {/* Celebration Header */}
      <div className="bg-gradient-to-br from-success/20 to-interactive-primary/20 p-6 text-center border-b border-primary/10">
        <div className="text-6xl mb-3 animate-bounce">🎉</div>
        <h3 className="text-2xl font-black text-primary mb-2">Lesson Complete!</h3>
        <p className="text-secondary text-sm">
          Amazing work! You've mastered {lesson.title}
        </p>
      </div>

      {/* Results */}
      <div className="p-6 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-primary">{correctAnswers}</div>
            <div className="text-xs text-secondary">out of {lesson.questions.length}</div>
            <div className="text-xs font-medium text-primary">Correct</div>
          </div>
          <div className="bg-muted rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-primary">
              {Math.floor(completionTime / 60)}:{(completionTime % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-secondary">minutes</div>
            <div className="text-xs font-medium text-primary">Time</div>
          </div>
        </div>

        {/* Reward - Only show if reward exists */}
        {lesson.reward && (
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-black text-success mb-1">${lesson.reward}</div>
            <div className="text-sm font-medium text-success">Earned!</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleShareToX}
            className="w-full bg-interactive-primary text-inverse py-3 rounded-xl font-bold hover:bg-interactive-hover active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Copy size={16} />
            Share Achievement
          </button>
          
          <button
            onClick={handleExploreMore}
            className="w-full bg-success/10 border border-success/20 text-success py-3 rounded-xl font-bold hover:bg-success/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowRight size={16} />
            Explore More Lessons
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-muted text-secondary py-3 rounded-xl font-medium hover:bg-muted/80 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>
      </div>
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
      case 'completed':
        return renderCompleted();
      default:
        return renderCollection();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-background">
      {getCardContent()}
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(30)].map((_, i) => (
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
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          ))}
          {[...Array(20)].map((_, i) => (
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
              <span className="text-3xl">✨</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Floating Reward */}
      {showReward && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 animate-bounce z-40">
          <div className="bg-success text-inverse px-6 py-3 rounded-full font-bold shadow-lg">
            +${lesson.reward} USD!
          </div>
        </div>
      )}
      
      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-success text-inverse px-6 py-3 rounded-xl font-medium shadow-lg border border-success/20">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLearningFlow;