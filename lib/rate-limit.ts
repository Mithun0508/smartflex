/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Limits requests per IP address within a time window.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (resets on server restart)
const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  limit: number;       // Max requests
  windowMs: number;    // Time window in milliseconds
}

export function rateLimit(options: RateLimitOptions) {
  return function check(identifier: string): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = store.get(identifier);

    // If no entry or window expired → reset
    if (!entry || now > entry.resetAt) {
      const newEntry: RateLimitEntry = {
        count: 1,
        resetAt: now + options.windowMs,
      };
      store.set(identifier, newEntry);
      return { success: true, remaining: options.limit - 1, resetAt: newEntry.resetAt };
    }

    // Within window
    if (entry.count >= options.limit) {
      return { success: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count += 1;
    store.set(identifier, entry);
    return { success: true, remaining: options.limit - entry.count, resetAt: entry.resetAt };
  };
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

// Pre-configured limiters for different routes
export const videoUploadLimiter = rateLimit({ limit: 10, windowMs: 60 * 60 * 1000 });      // 10/hour
export const checkoutLimiter   = rateLimit({ limit: 5,  windowMs: 60 * 60 * 1000 });       // 5/hour
export const feedbackLimiter   = rateLimit({ limit: 3,  windowMs: 60 * 60 * 1000 });       // 3/hour
export const generalLimiter    = rateLimit({ limit: 60, windowMs: 60 * 1000 });             // 60/min
