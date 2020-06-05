import { Request, Response, NextFunction } from 'express'
import redis from 'redis'
import AppError from '@shared/errors/AppError'
import { RateLimiterRedis } from 'rate-limiter-flexible'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: undefined
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5, // 10 requests
  duration: 1, // per 1 sercond by 1p
})

export default async function reteLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {

  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }

}
