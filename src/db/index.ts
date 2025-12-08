import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as auth from './schemas/auth'

config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  min: 10,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err)
})

export const db = drizzle(pool, { schema: { ...auth }, casing: 'snake_case' })
