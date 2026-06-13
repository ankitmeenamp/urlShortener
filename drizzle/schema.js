// import { timestamp } from 'drizzle-orm/gel-core';
import { relations } from 'drizzle-orm';
import { int,timestamp, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const shortLinkTable = mysqlTable('short_link', {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  shortCode: varchar("short_code",{ length: 20 }).notNull().unique(),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  userId: int("user_id").notNull().references(()=> usersTable.id)
});


export const usersTable = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255}).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),

});

export const userRelation = relations(usersTable, ({many}) =>({
shortLink: many(shortLinkTable),
}))

export const shortLinksRelation = relations(shortLinkTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [shortLinkTable.userId],
    references: [usersTable.id],
  }),
}));    