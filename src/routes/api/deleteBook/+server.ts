import { db } from "$lib/server/db";
import { books } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { json, type RequestEvent } from '@sveltejs/kit';

export async function DELETE({ request }: RequestEvent) {
    try {
        // Parse the incoming data from the request body (book ID)
        const { id } = await request.json();
        console.log("Received DELETE request with body:", { id });
        // Delete the book from the database using the provided book ID
        const result = await db.delete(books).where(eq(books.id, id));

        // if (result.) {
        //     // If no rows were deleted, the book was not found
        //     return json({
        //         message: 'Book not found',
        //     }, { status: 404 });
        // }

        console.log("Book deleted:", id);

        // Respond back with a success message
        return json({
            message: 'Book deleted successfully!',
            id,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error deleting book:", error.message);
            return json({
                message: 'Error deleting book',
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