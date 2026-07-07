'use strict'

const { z } = require('zod')

const listQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  category: z.string().trim().optional(),
  type: z.string().trim().optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
  page: z.string().default('1').transform(Number).pipe(z.number().int().positive()),
  limit: z.string().default('12').transform(Number).pipe(z.number().int().min(1).max(50)),
})

module.exports = { listQuerySchema }
