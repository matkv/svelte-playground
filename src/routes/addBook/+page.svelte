<script lang="ts">
    import { onMount } from "svelte";
    let title = "";
    let author = "";
    let pages = 0;

    let books: { title: string; author: string; pages: number }[] = [];

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
            // Handle success (e.g., show success message)
            await fetchBooks();
        } else {
            console.error("Error:", data);
            // Handle error (e.g., show error message)
        }
    };
</script>

<form on:submit|preventDefault={submitForm}>
    <input type="text" bind:value={title} placeholder="Title" required />
    <input type="text" bind:value={author} placeholder="Author" required />
    <input type="number" bind:value={pages} placeholder="Pages" required />
    <button type="submit">Add Book</button>
</form>

<!-- Display the list of books -->
<h2>Books List</h2>
<ul>
    {#each books as book}
        <li>{book.title} by {book.author} ({book.pages} pages)</li>
    {/each}
</ul>
