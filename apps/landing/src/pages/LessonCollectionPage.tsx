import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DollarSign, HelpCircle, Clock, Play, ArrowLeft, Share2, Check } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { MobileLearningFlow } from '../components/MobileLearningFlow';
import type { Lesson } from '../types';
import lessonsData from '../data/lessons.json';

const LessonCollectionPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const posthog = usePostHog();
  const [showLearningFlow, setShowLearningFlow] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const lesson = lessonsData.lessons.find((l) => l.id === lessonId) as Lesson | undefined;

  useEffect(() => {
    if (!lesson) {
      navigate('/explore');
      return;
    }

    // Set document title and meta tags for OG sharing
    document.title = `${lesson.title} | Sokushuu - Learn Web3`;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let metaTag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // OG Meta Tags
    updateMetaTag('og:title', `${lesson.title} | Sokushuu`, true);
    updateMetaTag('og:description', lesson.description, true);
    updateMetaTag('og:type', 'article', true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', 'Sokushuu', true);
    // TODO: Implement dynamic OG image generation for each lesson collection page
    // For now, using the same OG image as the main landing page
    updateMetaTag('og:image', 'https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png', true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    
    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@sokushuu_de');
    updateMetaTag('twitter:title', `${lesson.title} | Sokushuu`);
    updateMetaTag('twitter:description', lesson.description);
    // TODO: Implement dynamic Twitter image generation for each lesson collection page
    // For now, using the same image as the main landing page
    updateMetaTag('twitter:image', 'https://launchpad-dev-r2.sokushuu.de/og_image%20(1).png');
    
    // Additional meta tags
    updateMetaTag('description', lesson.description);
    updateMetaTag('keywords', `Web3, ${lesson.category}, ${lesson.tags.join(', ')}, Learning, Education`);
    updateMetaTag('author', lesson.author);

    // Analytics: Track lesson page view
    posthog?.capture('lesson_page_viewed', {
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      lesson_difficulty: lesson.difficulty,
      has_reward: !!lesson.reward,
      author: lesson.author,
      referrer: document.referrer
    });
  }, [lesson, lessonId, navigate, posthog]);

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-xl font-bold text-primary mb-2">Lesson not found</h2>
          <p className="text-secondary mb-4">The lesson you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-interactive-primary text-inverse px-6 py-3 rounded-xl font-bold hover:bg-interactive-hover transition-colors"
          >
            Explore Lessons
          </button>
        </div>
      </div>
    );
  }

  const handleStartLearning = () => {
    posthog?.capture('lesson_started_from_collection', {
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      lesson_difficulty: lesson.difficulty,
      has_reward: !!lesson.reward,
      author: lesson.author
    });
    
    setShowLearningFlow(true);
  };

  const handleBackToCollection = () => {
    setShowLearningFlow(false);
  };

  const handleBackToExplore = () => {
    navigate('/explore');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${lesson.title} | Sokushuu`,
      text: `Learn ${lesson.title} on Sokushuu - ${lesson.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        
        // Analytics: Track native share
        posthog?.capture('lesson_shared', {
          lesson_id: lesson.id,
          method: 'native_share',
          platform: 'web_share_api'
        });
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(window.location.href);
        
        // Show user feedback
        showToastNotification('Link copied to clipboard! You can paste it anywhere you want to share.');
        
        // Analytics: Track clipboard share
        posthog?.capture('lesson_shared', {
          lesson_id: lesson.id,
          method: 'clipboard_copy',
          platform: 'fallback'
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      
      // Fallback to clipboard copy on error
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToastNotification('Link copied to clipboard! You can paste it anywhere you want to share.');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        showToastNotification('Unable to copy link. Please copy the URL manually.');
      }
    }
  };

  if (showLearningFlow) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile-first header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-secondary px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToCollection}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-primary truncate">{lesson.title}</h1>
              <p className="text-sm text-secondary truncate">{lesson.category} • {lesson.estimatedTime}</p>
            </div>
            {lesson.reward && (
              <div className="flex items-center gap-1 text-success font-bold">
                <DollarSign size={16} />
                <span>${lesson.reward}</span>
              </div>
            )}
          </div>
        </div>

        {/* Learning Content */}
        <div className="min-h-[calc(100vh-80px)]">
          <MobileLearningFlow
            lesson={lesson}
            onComplete={handleBackToCollection}
            onExploreMore={handleBackToCollection}
          />
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4">
            <div className="bg-success text-inverse px-4 py-3 rounded-xl font-medium shadow-lg border border-success/20 flex items-center gap-2">
              <Check size={18} className="text-inverse flex-shrink-0" />
              <span className="text-sm">{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-secondary px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToExplore}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-primary">Collection</h1>
            <p className="text-sm text-secondary">Web3 Learning Lesson</p>
          </div>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Share this lesson"
          >
            <Share2 size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Collection Content */}
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
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

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {lesson.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted text-secondary text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

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
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-xs w-full mx-4">
          <div className="bg-success text-inverse px-4 py-3 rounded-xl font-medium shadow-lg border border-success/20 flex items-center gap-2">
            <Check size={18} className="text-inverse flex-shrink-0" />
            <span className="text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonCollectionPage;