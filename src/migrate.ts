import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationDb, migrationClient } from '$lib/db';

// This will run migrations on the database, skipping the ones already applied
await migrate(migrationDb, { migrationsFolder: './drizzle' });

// Don't forget to close the connection, otherwise the script will hang
await migrationClient.end();
