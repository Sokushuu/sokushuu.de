import React, { useState, useEffect } from 'react';
import { Clock, Mail, CheckCircle, Bell } from 'lucide-react';

const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dynamic data states
  const [launchDate, setLaunchDate] = useState(new Date('2025-08-24T00:00:00Z')); // Fallback date
  const [subscriberCount, setSubscriberCount] = useState(2847); // Fallback count
  const [isLoadingData, setIsLoadingData] = useState(true);

  /**
   * API SPECIFICATION & DISCLAIMER
   * 
   * This component expects the following API endpoints to be implemented:
   * 
   * 1. GET /api/launch-config
   *    Response: { launchDate: string (ISO 8601), subscriberCount: number }
   *    Purpose: Fetch dynamic launch date and current subscriber count
   * 
   * 2. POST /api/subscribe
   *    Body: { email: string }
   *    Response: { success: boolean, message?: string }
   *    Purpose: Subscribe user to launch notifications
   * 
   * FALLBACK BEHAVIOR:
   * - If API calls fail, component uses hardcoded fallback values
   * - Launch date: 2025-08-24T00:00:00Z
   * - Subscriber count: 2,847
   * - Email subscription: Simulated success after 1 second
   * 
   * TODO: Replace these placeholder functions with actual API calls
   */

  // API Functions (TO BE IMPLEMENTED)
  const fetchLaunchConfig = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/launch-config');
      // const data = await response.json();
      // return data;
      
      // Simulated API response for now
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        launchDate: '2025-08-24T00:00:00Z',
        subscriberCount: 2847 + Math.floor(Math.random() * 50) // Simulate growth
      };
    } catch (error) {
      console.warn('Failed to fetch launch config, using fallback values:', error);
      return null;
    }
  };

  const subscribeToLaunch = async (email: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // const data = await response.json();
      // return data;
      
      // Simulated API call for now
      console.log('Subscribing email:', email); // Use the email parameter
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Successfully subscribed!' };
    } catch (error) {
      console.error('Subscription failed:', error);
      return { success: false, message: 'Subscription failed. Please try again.' };
    }
  };

  // Load launch configuration on mount
  useEffect(() => {
    const loadLaunchConfig = async () => {
      setIsLoadingData(true);
      const config = await fetchLaunchConfig();
      
      if (config) {
        setLaunchDate(new Date(config.launchDate));
        setSubscriberCount(config.subscriberCount);
      }
      
      setIsLoadingData(false);
    };

    loadLaunchConfig();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    // Use the API function instead of simulation
    const result = await subscribeToLaunch(email);
    
    if (result.success) {
      setIsSubmitted(true);
      setEmail('');
      // Increment subscriber count on successful subscription
      setSubscriberCount(prev => prev + 1);
    } else {
      // Handle error case - you might want to show an error message
      console.error('Subscription failed:', result.message);
    }
    
    setIsSubmitting(false);
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-interactive-secondary px-4 py-2 rounded-full font-bold text-sm mb-4 text-interactive-primary border border-border-secondary">
            <Clock size={16} />
            <span>LAUNCHING SOON</span>
          </div>
          <h2 className="text-4xl font-black mb-4 text-primary">
            Get Ready to Start Earning USD
          </h2>
        </div>

        {/* Countdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="relative">
              <div className="bg-elevated border-2 border-primary rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 font-mono">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm font-bold text-muted uppercase tracking-wide">
                  {unit.label}
                </div>
              </div>
              
              {/* Separator */}
              {index < timeUnits.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-2xl font-black z-10 text-primary">
                  :
                </div>
              )}
            </div>
          ))}
        </div>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            <div className="bg-elevated border-2 border-primary rounded-lg p-6">
              <div className="text-center mb-6">
                <Bell className="mx-auto mb-3 text-interactive-primary" size={32} />
                <h3 className="text-xl font-bold mb-2 text-primary">Get Launch Notification</h3>
                <p className="text-secondary text-sm">
                  Be the first to know when Sokushuu goes live and start earning USD immediately.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-interactive-focus bg-secondary text-primary placeholder:text-muted"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-interactive-primary text-inverse py-3 rounded-lg font-bold hover:bg-interactive-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Notify Me at Launch'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="mx-auto mb-3 text-green-600" size={32} />
                  <h4 className="font-bold text-green-600 mb-2">You're all set!</h4>
                  <p className="text-secondary text-sm">
                    We'll notify you as soon as Sokushuu launches. Get ready to start earning USD!
                  </p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Early access perks</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Launch day bonuses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="bg-elevated border-2 border-primary rounded-lg p-4 inline-block">
              <p className="font-bold text-sm text-primary">
                🚀 Join{' '}
                {isLoadingData ? (
                  <span className="inline-block w-12 h-4 bg-muted rounded animate-pulse"></span>
                ) : (
                  <span className="text-green-600">{subscriberCount.toLocaleString()}+</span>
                )}{' '}
                people already waiting for launch
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default CountdownSection;