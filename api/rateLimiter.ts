import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/with-fetch";
import Reply from "./src/Reply";

// Setup rate-limiter
const rl = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "1 h")
});

// Rate-limiter middleware function
export async function rateLimiter(req, res, next) {
    // Get ip address from headers
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Use upstash to see if ip is rate-limited
    const { success, limit, remaining, reset } = await rl.limit(ip);
    
    // Return rate limit info in headers
    res.header('X-Rate-Limit-Limit', limit);
    res.header('X-Rate-Limit-Remaining', remaining);
    res.header('X-Rate-Limit-Reset', reset);

    // If request is allowed, continue
    if (success) return next();

    // Or, show 429 error
    Reply(req, res, 429, { });
}
