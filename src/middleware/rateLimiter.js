const { RateLimiterRedis, RateLimiterRes } = require('rate-limiter-flexible');
const redisClient = require('../config/redisClient');

// Initialize rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20, // 20 requests per minute
  duration: 60, // 60 seconds
  keyPrefix: 'task_rate_limit',
  execEvenly: true, // Spread the requests evenly
  blockDuration: 1, // Block for 1 second if more than 1 request per second
});

// Rate limit middleware function
const rateLimitMiddleware = async (req, res, next) => {
  const userId = req.body.user_id; // Ensure user_id is present in the request body

  try {
    await rateLimiter.consume(userId); // Consume a point for the user
    next(); // Proceed to the next middleware
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
      });
    }
    console.error('Rate limiter error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = rateLimitMiddleware;
