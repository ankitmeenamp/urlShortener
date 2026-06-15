// import { timestamp } from 'drizzle-orm/gel-core';
// import { relations } from 'drizzle-orm';

import { relations, sql } from 'drizzle-orm';
import { boolean, int,timestamp, mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';


export const shortLinkTable = mysqlTable('short_link', {
  id: int().autoincrement().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  shortCode: varchar("short_code",{ length: 20 }).notNull().unique(),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  userId: int("user_id").notNull().references(()=> usersTable.id)
});

export const sessionTable = mysqlTable("sessions",{
  id: int().autoincrement().primaryKey(),
  userId : int("user_id").notNull().references(()=> usersTable.id, {onDelete: "cascade"}),
  valid: boolean().default(true).notNull(),
  userAgent: text("user_agent"),
  ip: varchar({length: 255}),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
})

export const verifyEmailTokenTable = mysqlTable("is_email_valid",{
  id: int().autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(()=>usersTable.id, {onDelete: "cascade"}),
   token: varchar({length: 8}).notNull(),
  expiresAt: timestamp("expires_at").$default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`).notNull(),
  createAt: timestamp("create_at").defaultNow().notNull(),

})


export const usersTable = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255}).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  isEmailValid: boolean("is_email_valid").default(false).notNull(),
  createAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),

});

export const userRelation = relations(usersTable, ({many}) =>({
shortLink: many(shortLinkTable),
session: many(sessionTable),
}))

export const shortLinksRelation = relations(shortLinkTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [shortLinkTable.userId],
    references: [usersTable.id],
  }),
}));    

export const sessionRelation = relations(sessionTable,({one})=>({
user: one(usersTable, {
  fields: [sessionTable.userId],
  references: [usersTable.id]
})
}))