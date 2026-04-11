import rateLimit from 'express-rate-limit';

// ─── Contact Rate Limiter ──────────────────────────────────────────────────────
// Restricts contact form submissions to 5 per IP per 15 minutes.
// This is an OPTIMIZATION — prevents spam bots and brute-force abuse.
// express-rate-limit works in middleware, so it runs before the controller
// and returns 429 Too Many Requests without even hitting MongoDB.

export const contactRateLimiter = rateLimit({
  windowMs: 10 * 1000,       // 10-second window (reduced for development)
  max: 5,                    // Max 5 requests per window per IP
  standardHeaders: true,     // Returns `RateLimit-*` headers in response
  legacyHeaders: false,      // Disables deprecated `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many messages sent. Development rate limit active (10s).',
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});
