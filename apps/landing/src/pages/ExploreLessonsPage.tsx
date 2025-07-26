import React, { useState } from 'react';
import { ArrowLeft, Clock, DollarSign, BookOpen, Trophy, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePostHog } from 'posthog-js/react';
import { MobileLearningFlow } from '../components/MobileLearningFlow';
import type { Lesson, DifficultyFilter } from '../types';
import lessonsData from '../data/lessons.json';

const ExploreLessonsPage: React.FC = () => {
  const navigate = useNavigate();
  const posthog = usePostHog();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filter, setFilter] = useState<DifficultyFilter>('all');
  const [showStats, setShowStats] = useState(true);

  const lessons: Lesson[] = lessonsData.lessons;

  const filteredLessons = lessons.filter(lesson => 
    filter === 'all' || lesson.difficulty.toLowerCase() === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-success bg-success/10 border-success/20';
      case 'intermediate': return 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800/30';
      case 'advanced': return 'text-error bg-error/10 border-error/20';
      default: return 'text-secondary bg-muted border-secondary';
    }
  };

  const handleStartLesson = (lesson: Lesson) => {
    // Analytics: Track lesson selection
    posthog?.capture('lesson_selected', {
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      lesson_difficulty: lesson.difficulty,
      has_reward: !!lesson.reward,
      author: lesson.author
    });

    setSelectedLesson(lesson);
    setShowStats(false);
  };

  const handleBackToExplore = () => {
    // Analytics: Track lesson abandonment if lesson was in progress
    if (selectedLesson) {
      posthog?.capture('lesson_abandoned', {
        lesson_id: selectedLesson.id,
        reason: 'back_button_clicked'
      });
    }

    setSelectedLesson(null);
    setShowStats(true);
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile-first header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-secondary px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToExplore}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-primary truncate">{selectedLesson.title}</h1>
              <p className="text-sm text-secondary truncate">{selectedLesson.category} • {selectedLesson.estimatedTime}</p>
            </div>
            {selectedLesson.reward && (
              <div className="flex items-center gap-1 text-success font-bold">
                <DollarSign size={16} />
                <span>${selectedLesson.reward}</span>
              </div>
            )}
          </div>
        </div>

        {/* Learning Content */}
        <div className="min-h-[calc(100vh-80px)]">
          <MobileLearningFlow
            lesson={selectedLesson}
            onComplete={() => {
              // Handle completion - could navigate to next lesson or back to explore
              handleBackToExplore();
            }}
            onExploreMore={handleBackToExplore}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first header - Sticky */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-secondary">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <h1 className="text-xl font-bold text-primary">Explore Lessons</h1>
            <div className="w-10 h-10"></div>
          </div>

          {/* Filter Pills - Mobile Optimized */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['all', 'beginner', 'intermediate', 'advanced'] as DifficultyFilter[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === level
                    ? 'bg-interactive-primary text-inverse'
                    : 'bg-muted text-secondary hover:bg-interactive-primary/10'
                }`}
              >
                {level === 'all' ? 'All Lessons' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Banner - Non-sticky */}
      <div className="px-4 py-4">
        {showStats && (
          <div className="bg-gradient-to-r from-interactive-primary/10 to-success/10 rounded-xl p-4 mb-4 border border-interactive-primary/20">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-interactive-primary/20 rounded-full flex items-center justify-center">
                  <Trophy size={20} className="text-interactive-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-primary">Welcome to Web3 Learning!</p>
                  <p className="text-xs text-secondary">Start your journey with these curated lessons</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lessons Grid - Mobile-first */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto sm:max-w-2xl sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-secondary border border-primary rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
              onClick={() => handleStartLesson(lesson)}
            >
              {/* Lesson Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{lesson.thumbnail}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </div>
              </div>

              {/* Lesson Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-primary text-lg leading-tight mb-1">{lesson.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed line-clamp-2">{lesson.description}</p>
                </div>

                {/* Lesson Stats */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-secondary">
                      <Clock size={12} />
                      <span>{lesson.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary">
                      <BookOpen size={12} />
                      <span>{lesson.totalQuestions} Questions</span>
                    </div>
                  </div>
                  {lesson.reward && (
                    <div className="flex items-center gap-1 text-success font-bold">
                      <DollarSign size={12} />
                      <span>${lesson.reward}</span>
                    </div>
                  )}
                </div>

                {/* Author */}
                <div className="flex items-center gap-1 text-xs text-secondary">
                  <User size={12} />
                  <span>Created by <span className="font-medium text-primary">{lesson.author}</span></span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-secondary text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {lesson.tags.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-secondary text-xs rounded-md">
                      +{lesson.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full mt-4 bg-interactive-primary text-inverse py-3 rounded-lg font-bold hover:bg-interactive-hover transition-colors flex items-center justify-center gap-2">
                <BookOpen size={16} />
                Start Learning
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-primary mb-2">No lessons found</h3>
            <p className="text-secondary">Try adjusting your filter or check back later!</p>
          </div>
        )}

        {/* Coming Soon Banner */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-lg font-bold text-primary mb-2">More Lessons Coming Soon!</h3>
          <p className="text-secondary text-sm">
            We're working on advanced topics like Layer 2, DAOs, and DeFi protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreLessonsPage;