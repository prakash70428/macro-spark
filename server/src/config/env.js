'use strict'

const { z } = require('zod')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .default('5000')
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().positive()),

  // Database
  MONGODB_URI: z.string().url(),
  // Optional in development — rate limiter falls back to in-memory store if absent
  REDIS_URL: z.string().url().optional(),

  // JWT — RS256 keys stored as base64-encoded PEM strings
  JWT_PRIVATE_KEY: z.string().min(1),
  JWT_PUBLIC_KEY: z.string().min(1),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // CORS
  ALLOWED_ORIGINS: z
    .string()
    .default('http://localhost:3000')
    .transform((v) => v.split(',').map((s) => s.trim())),

  // Third-party (optional in development)
  RESEND_API_KEY: z.string().optional(),
  ALGOLIA_APP_ID: z.string().optional(),
  ALGOLIA_ADMIN_KEY: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),

  // Security
  BCRYPT_ROUNDS: z
    .string()
    .default('12')
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().min(10).max(14)),
})

function validateEnv() {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  [${issue.path.join('.')}] ${issue.message}`)
      .join('\n')

    // Log directly to stderr — logger may not be initialised yet
    console.error('❌ Environment validation failed:\n' + formatted)
    process.exit(1)
  }

  return result.data
}

const env = validateEnv()

module.exports = env
