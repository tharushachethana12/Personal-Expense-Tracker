import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';
import 'dotenv/config';

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// Export the db instance to use throughout your app
export const db = drizzle(pool, { schema });