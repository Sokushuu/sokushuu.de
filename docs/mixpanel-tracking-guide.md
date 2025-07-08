# Mixpanel Analytics Tracking Guide for Sokushuu

This guide outlines all the analytics tracking possibilities you can implement in your web application using Mixpanel JavaScript SDK.

## 🎯 **Event Tracking**

### **Automatic Tracking (Already configured in your setup)**
- ✅ **Page Views** - Track visits to different pages
- ✅ **Button Clicks** - All button and link interactions
- ✅ **Form Interactions** - Input focus, form submissions
- ✅ **Scroll Behavior** - Page scroll depth (25%, 50%, 75%, 100%)
- ✅ **UTM Parameters** - Marketing campaign attribution

### **Custom Event Tracking**
```tsx
// Business-specific events
mixpanel.track('Product Demo Requested');
mixpanel.track('Newsletter Signup', {
  source: 'homepage',
  plan_interest: 'premium'
});
mixpanel.track('Feature Used', {
  feature_name: 'ai_flashcards',
  user_tier: 'free'
});
```

## 👤 **User Identity & Profiles**

### **User Identification**
```tsx
// When user signs up/logs in
mixpanel.identify('user_12345');

// Reset on logout
mixpanel.reset();
```

### **User Profile Properties**
```tsx
// Set user demographics
mixpanel.people.set({
  'name': 'John Doe',
  'email': 'john@example.com',
  'plan': 'Premium',
  'signup_date': new Date(),
  'total_flashcards': 150
});

// Increment counters
mixpanel.people.increment('lessons_completed');
mixpanel.people.increment('points_earned', 10);
```

## 🌐 **Page & Navigation Tracking**

### **Enhanced Page Views**
```tsx
// Custom page view with context
mixpanel.track_pageview({
  'page_category': 'educational_content',
  'content_type': 'flashcard_set',
  'difficulty_level': 'intermediate'
});
```

### **Navigation Patterns**
```tsx
// Track user flows
mixpanel.track('Page Transition', {
  'from_page': '/landing',
  'to_page': '/signup',
  'transition_type': 'cta_click'
});
```

## 🔗 **Engagement Tracking**

### **Content Interaction**
```tsx
// Educational platform specific
mixpanel.track('Flashcard Viewed', {
  'subject': 'mathematics',
  'difficulty': 'hard',
  'time_spent': 45
});

mixpanel.track('Study Session Started', {
  'session_type': 'practice',
  'deck_size': 20
});
```

### **Feature Usage**
```tsx
// AI features
mixpanel.track('AI Question Generated', {
  'input_type': 'text',
  'question_complexity': 'medium'
});

mixpanel.track('Search Performed', {
  'query': 'calculus derivatives',
  'results_count': 15
});
```

## 💰 **Conversion & Business Metrics**

### **Funnel Tracking**
```tsx
// Signup funnel
mixpanel.track('Signup Started');
mixpanel.track('Email Entered');
mixpanel.track('Password Created');
mixpanel.track('Account Verified');
mixpanel.track('Onboarding Completed');
```

### **Revenue Events**
```tsx
// Subscription tracking
mixpanel.track('Subscription Upgraded', {
  'from_plan': 'free',
  'to_plan': 'premium',
  'price': 9.99,
  'billing_cycle': 'monthly'
});

mixpanel.people.track_charge(9.99, {
  'plan': 'Premium Monthly'
});
```

## ⏱️ **Time-Based Analytics**

### **Duration Tracking**
```tsx
// Start timing
mixpanel.time_event('Study Session');

// Later... (automatically adds duration)
mixpanel.track('Study Session', {
  'cards_reviewed': 25,
  'correct_answers': 20
});
```

### **Session Analytics**
```tsx
// Track engagement depth
mixpanel.track('Deep Engagement', {
  'session_duration': 1800, // 30 minutes
  'pages_visited': 8,
  'features_used': ['flashcards', 'ai_tutor', 'progress_tracker']
});
```

## 🎯 **A/B Testing & Experiments**

### **Feature Flags**
```tsx
// Track experiment participation
mixpanel.track('Experiment Viewed', {
  'experiment_name': 'new_dashboard_layout',
  'variant': 'version_b'
});
```

## 📊 **Global Properties (Super Properties)**

### **Context Properties**
```tsx
// Set once, included in all events
mixpanel.register({
  'app_version': '2.1.0',
  'user_tier': 'premium',
  'platform': 'web',
  'feature_flags': ['ai_enabled', 'dark_mode']
});
```

## 🏢 **Group Analytics** (for B2B features)

### **Organization Tracking**
```tsx
// Associate user with organization
mixpanel.set_group('company', 'sokushuu_university');

// Set company properties
mixpanel.get_group('company', 'sokushuu_university').set({
  'plan': 'Enterprise',
  'student_count': 5000,
  'subjects': ['math', 'science', 'languages']
});
```

## 🔍 **Error & Performance Tracking**

### **Error Events**
```tsx
// Track errors
mixpanel.track('Error Occurred', {
  'error_type': 'api_timeout',
  'page': '/flashcard-generator',
  'user_action': 'generate_questions'
});
```

### **Performance Metrics**
```tsx
// Track load times
mixpanel.track('Page Load Performance', {
  'load_time': 1200, // milliseconds
  'page_size': '2.3MB',
  'connection_type': '4g'
});
```

## 🎮 **Gamification Tracking**

### **Achievement System**
```tsx
// Educational achievements
mixpanel.track('Achievement Unlocked', {
  'achievement_name': '7_day_streak',
  'category': 'consistency',
  'points_earned': 100
});

mixpanel.track('Level Up', {
  'subject': 'mathematics',
  'new_level': 5,
  'mastery_percentage': 85
});
```

## 📱 **Device & Technical Tracking**

### **Technical Context**
```tsx
// Device capabilities
mixpanel.track('Feature Support Check', {
  'webgl_supported': true,
  'offline_capable': false,
  'notification_permission': 'granted'
});
```

## 🔒 **Privacy-Compliant Tracking**

### **Consent Management**
```tsx
// Respect user privacy
if (userConsentGiven) {
  mixpanel.opt_in_tracking();
} else {
  mixpanel.opt_out_tracking();
}
```

## 📈 **Current Configuration Reference**

Your current Mixpanel setup in `main.tsx`:

```tsx
mixpanel.init(MIXPANEL_TOKEN, {
  debug: false,
  track_pageview: 'full-url', // Tracks all URL changes
  persistence: 'localStorage', // Stores data in browser localStorage
  autocapture: {
    pageview: 'full-url',      // Auto page view tracking
    click: true,               // Auto button/link click tracking
    input: true,               // Auto form interaction tracking
    scroll: true,              // Auto scroll depth tracking
    submit: true,              // Auto form submission tracking
    capture_text_content: false // Privacy-friendly (no text content)
  }
});
```

## 🚀 **Implementation Priority for Sokushuu**

### **Phase 1: Basic Analytics (Already Done)**
- ✅ Page views
- ✅ Button clicks
- ✅ Form interactions

### **Phase 2: User Journey**
- User identification on signup/login
- Conversion funnel tracking
- Feature usage events

### **Phase 3: Educational Metrics**
- Study session tracking
- Flashcard interaction events
- Learning progress metrics

### **Phase 4: Advanced Analytics**
- A/B testing events
- Performance monitoring
- Revenue tracking

## 📝 **Best Practices**

1. **Event Naming**: Use consistent, descriptive names
2. **Property Standards**: Define standard property formats
3. **Privacy First**: Always respect user consent
4. **Performance**: Don't over-track; focus on business-critical events
5. **Documentation**: Keep this guide updated as you add new tracking

---

*Last Updated: July 8, 2025*
*Project: Sokushuu Educational Platform*
