import rateLimit from 'express-rate-limit';

const completionRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    keyGenerator: (req) => {
        return req.headers.authorization ?? '';
    },
    statusCode: 429,
    message: {
        message: 'Rate limit exceeded'
    }
});

export default completionRateLimiter;