import { db } from "$lib/server/db";
import { books } from "$lib/server/db/schema";
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Query all books from the database
        const allBooks = await db.select().from(books);

        // Return the list of books
        return json(allBooks);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching books:", error.message);
            return json({
                message: 'Error fetching books',
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