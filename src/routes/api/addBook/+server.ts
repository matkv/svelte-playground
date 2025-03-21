import { db } from "$lib/server/db";
import { books } from "$lib/server/db/schema";
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
    try {
        // Parse the incoming data from the request body (book details)
        const { title, author, pages } = await request.json();

        // Insert the new book data into the database
        await db.insert(books).values([
            { title, author, pages },
        ]);

        console.log("Book added:", { title, author, pages });

        // Respond back with a success message and the inserted book data
        return json({
            message: 'Book added successfully!',
            book: { title, author, pages }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error adding book:", error.message);
            return json({
                message: 'Error adding book',
                error: error.message,
            }, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return json({
                message: 'Unknown error occurred',
                error: 'An unknown error occurred.',
            }, { status: 500 });
        }
    }
}
