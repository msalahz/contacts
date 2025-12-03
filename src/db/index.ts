import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema.ts'

config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  min: 10,
})
export const db = drizzle(pool, { schema, casing: 'snake_case' })
