import { mysqlTable, serial, varchar, text, int } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: serial('id').primaryKey(),
	age: int('age'),
});

export const books = mysqlTable("books", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	author: varchar("author", { length: 255 }).notNull(),
	pages: int("pages").notNull(),
});