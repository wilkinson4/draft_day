import { text, pgTable, timestamp, integer, bigint } from 'drizzle-orm/pg-core';
import { users } from './user';

export const leagues = pgTable('league', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  numberOfTeams: integer('numberOfTeams').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  insertedAt: timestamp('insertedAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
});
