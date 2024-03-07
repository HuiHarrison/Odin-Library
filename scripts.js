const dialog = document.querySelector("dialog");
const addBtn = document.querySelector("#add-btn");
const closeDialogBtn = document.querySelector("#close-dialog");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");
const submitBtn = document.querySelector("button[type='submit']");
const container = document.querySelector(".container");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
})

// Close dialog when clicking outside of it
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

// Add book to myLibrary and reset form when submit
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    dialog.close();
    displayLibrary();
})

function displayLibrary() {
    // Clear container before adding books
    container.innerHTML = "";
    for (const book of myLibrary) {
        // Create a card
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        // Create book title div
        const bookTitleDiv = document.createElement("div");
        bookTitleDiv.classList.add("book-title");
        bookTitleDiv.textContent = book.title;

        // Create book author div
        const bookAuthorDiv = document.createElement("div");
        bookAuthorDiv.classList.add("book-author");
        bookAuthorDiv.textContent = book.author;

        // Create book pages div
        const bookPagesDiv = document.createElement("div");
        bookPagesDiv.classList.add("book-pages");
        bookPagesDiv.textContent = `${book.pages} pages`;

        // Create book read button
        const readBtn = document.createElement("button");
        readBtn.classList.add(`${book.read ? "read" : "not-read"}`);
        readBtn.setAttribute("type", "button");
        readBtn.textContent = book.read ? "Read" : "Not Read";

        // Create book remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-button");
        removeBtn.setAttribute("type", "button");
        removeBtn.textContent = "Remove";

        // Append all book info to card
        cardDiv.append(bookTitleDiv, bookAuthorDiv, bookPagesDiv, readBtn, removeBtn);
        // Append card to container
        container.appendChild(cardDiv);
    }
}


// TESTING PURPOSE
addBookToLibrary("Harry Potter", "J.K. Rowling", 325, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 536, false);
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 634, true);
addBookToLibrary("Atomic Habits", "James Clear", 243, true);
addBookToLibrary("Dune", "Frank Herbert", 846, false);
displayLibrary();