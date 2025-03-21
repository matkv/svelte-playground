<script lang="ts">
    import { onMount } from "svelte";
    let title = "";
    let author = "";
    let pages = 0;

    let books: { id: number; title: string; author: string; pages: number }[] =
        [];

    // Fetch the list of books when the page loads
    onMount(async () => {
        await fetchBooks();
    });

    const fetchBooks = async () => {
        const response = await fetch("/api/getBooks");
        if (response.ok) {
            books = await response.json();
        } else {
            console.error("Error fetching books");
        }
    };

    const submitForm = async () => {
        const response = await fetch("/api/addBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, author, pages }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Book added:", data);
            await fetchBooks();
        } else {
            console.error("Error:", data);
        }
    };

    const deleteBook = async (id: number) => {
        const response = await fetch("/api/deleteBook", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            console.log("Book deleted:", id);
            await fetchBooks();
        } else {
            console.error("Error deleting book");
        }
    };
</script>

<svelte:head>
    <title>Add a book</title>
    <meta name="description" content="Add a book" />
</svelte:head>
<div class="text-column">
    <h1>Adding books</h1>
    <form on:submit|preventDefault={submitForm}>
        <input type="text" bind:value={title} placeholder="Title" required />
        <input type="text" bind:value={author} placeholder="Author" required />
        <input type="number" bind:value={pages} placeholder="Pages" required />
        <button
            style="background-color: lightgrey; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;"
            type="submit">Add Book</button
        >
    </form>

    <!-- Display the list of books -->
    <h2 style="margin-bottom: 1rem;margin-top: 1rem;">Books List</h2>
    <ul>
        {#each books as book}
            <li style="margin-bottom: 0.5rem;">
                <b>{book.id} {book.title}</b> by {book.author} ({book.pages} pages)
                <button
                    on:click={() => deleteBook(book.id)}
                    style="background-color: lightgrey; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;"
                >
                    Delete
                </button>
            </li>
        {/each}
    </ul>
</div>
