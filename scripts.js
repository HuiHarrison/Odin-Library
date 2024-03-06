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
    container.innerHTML = "";
    for (const book of myLibrary) {
        container.innerHTML += `
            <div class="card">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-pages">${book.pages} pages</div>
                <button class=${book.read ? "read" : "not-read"} type="button">${book.read ? "Read" : "Not Read"}</button>
                <button class="remove-button" type="button">Remove</button>
            </div>
        `;
    }
}


// TESTING PURPOSE
addBookToLibrary("Harry Potter", "J.K. Rowling", 325, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 536, false);
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 634, true);
addBookToLibrary("Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", "James Clear", 243, true);
addBookToLibrary("Dune", "Frank Herbert", 846, true);
displayLibrary();