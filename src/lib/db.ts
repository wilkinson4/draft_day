import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString =
  import.meta.env.VITE_ENV == 'local'
    ? 'postgres://postgres:postgres@localhost:5432/draft_day'
    : '';

const client = postgres(connectionString);
export const migrationClient = postgres(connectionString, { max: 1 });

export const migrationDb = drizzle(migrationClient);

export const db = drizzle(client);
