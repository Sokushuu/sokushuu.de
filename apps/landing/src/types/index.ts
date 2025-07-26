// Core learning types
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  reward?: number; // Optional for beta release
  totalQuestions: number;
  thumbnail: string;
  author: string; // Creator/author of the lesson
  tags: string[];
  questions: Question[];
}

// Learning state management
export type LearningState = 'collection' | 'question' | 'answered' | 'completed' | 'celebrating';

// Component props
export interface InteractiveLearningCardProps {
  lesson?: Lesson;
  onStartLearning?: () => void;
  onComplete?: () => void;
}

export interface MobileLearningFlowProps {
  lesson: Lesson;
  onComplete?: () => void;
  onStartLearning?: () => void;
  onExploreMore?: () => void;
}

// Filter types
export type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

// API response types (for future backend integration)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{
    code: number;
    message: string;
  }>;
}

export interface LessonProgress {
  lessonId: string;
  currentQuestionIndex: number;
  correctAnswers: number;
  startTime: number;
  completionTime?: number;
  completed: boolean;
}

export interface UserSession {
  sessionId: string;
  anonymousId?: string;
  completedLessons: string[];
  totalEarnings: number;
  deviceType: 'mobile' | 'desktop';
  createdAt: Date;
}

// Analytics types
export interface LearningAnalytics {
  lessonId: string;
  userId?: string;
  sessionId: string;
  startTime: Date;
  completionTime?: Date;
  score: number;
  deviceType: 'mobile' | 'desktop';
  userAgent: string;
}