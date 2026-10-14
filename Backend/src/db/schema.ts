import { pgTable, serial, text, numeric, timestamp, integer } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  // numeric is best for financial data to prevent floating-point math errors
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  date: timestamp('date').defaultNow().notNull(),
  categoryId: integer('category_id').references(() => categories.id)
});