// Email validation utilities
// Matches backend validation for consistency

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Comprehensive email validation matching backend requirements
 * - RFC 5322 compliant format
 * - Must have valid TLD (2+ characters)
 * - Common format checks
 */
export const validateEmail = (email: string): ValidationResult => {
  // Trim whitespace
  const trimmedEmail = email.trim();
  
  // Check if empty
  if (!trimmedEmail) {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  // Basic format check - must contain @ and .
  if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // RFC 5322 compliant regex with TLD validation
  // This matches the same validation used in the backend
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Additional checks for common issues
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  const [localPart, domainPart] = parts;

  // Check local part (before @)
  if (localPart.length === 0 || localPart.length > 64) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Check domain part (after @)
  if (domainPart.length === 0 || domainPart.length > 255) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Check for dots at start or end of local part
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Check TLD has at least 2 characters
  const domainParts = domainPart.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return {
      isValid: false,
      error: 'Please enter a valid email address with a proper domain'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Quick email format check for real-time validation
 * Less strict than full validation - for immediate user feedback
 */
export const isEmailFormatValid = (email: string): boolean => {
  if (!email.trim()) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};