const dialog = document.querySelector("dialog");
const addBtn = document.querySelector("#add-btn");
const closeDialogBtn = document.querySelector("#close-dialog");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");
const submitBtn = document.querySelector("button[type='submit']");
const container = document.querySelector(".container");


// Library Object
const Library = {
    myLibrary: [],
    addBookToLibrary: function(title, author, pages, read) {
        let book = new Book(title, author, pages, read);
        this.myLibrary.push(book);
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus() {
        this.read = !this.read;
    }
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", () => {
    setSuccess(titleInput);
    setSuccess(authorInput);
    setSuccess(pagesInput);
    dialog.close();
})

// Close dialog when clicking outside of it
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        setSuccess(titleInput);
        setSuccess(authorInput);
        setSuccess(pagesInput);
        dialog.close();
    }
});

// Add ".success" and remove ".error" to input if validate
function setSuccess(element) {
    const errorDisplay = element.parentElement.querySelector(".error-message")

    errorDisplay.innerText = "";
    element.classList.add("success");
    element.classList.remove("error");
}

// Add ".error" and remove ".success" to input if invalidate
function setError(element, message) {
    const errorDisplay = element.parentElement.querySelector(".error-message")

    errorDisplay.innerText = message;
    element.classList.add("error");
    element.classList.remove("success");
}

// To validate all inputs after clicking submit button in "New Book"
function validateInputs() {
    const titleValue = titleInput.value.trim();
    const authorValue = authorInput.value.trim();
    const pagesValue = pagesInput.value.trim()
    let titleValidate = false;
    let authorValidate = false;
    let pagesValidate = false;

    // Title Validation
    // Check input not empty
    if (titleValue === "") {
        setError(titleInput, "Title is Required");
    } 
    // Check not longer than 25 char
    else if (titleValue.length > 25) {
        setError(titleInput, "Maximum 25 Characters");
    } 
    // Check not title not already exist in myLibrary[]
    else if (Library.myLibrary.some(book => book.title.toLowerCase() === titleValue.toLowerCase())) {
        setError(titleInput, "Book Already Existed");
    } 
    // Else valid
    else {
        setSuccess(titleInput);
        titleValidate = true;
    }

    // Author Validation
    // Check input not empty
    if (authorValue === "") {
        setError(authorInput, "Author is Required");
    } 
    // Check not longer than 20 char
    else if (authorValue.length > 20) {
        setError(authorInput, "Maximum 20 Characters");
    } 
    // Else valid
    else {
        setSuccess(authorInput);
        authorValidate = true;
    }

    // Pages Validation
    // Check input not empty
    if (pagesValue === "") {
        setError(pagesInput, "Pages is Required");
    } 
    // Check in range 1 to 1,000,000
    else if (pagesValue > 1000000 || pagesValue < 1) {
        setError(pagesInput, "Exceed Range");
    } 
    // Else valid
    else {
        setSuccess(pagesInput);
        pagesValidate = true;
    }

    // return true if all 3 are true
    return (titleValidate && authorValidate && pagesValidate)
}

// Add book to myLibrary and reset form when submit
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (validateInputs()) {
        Library.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readInput.checked = false;
        dialog.close();
        displayLibrary();
    }
})

function displayLibrary() {
    // Clear container before adding books
    container.innerHTML = "";
    for (const book of Library.myLibrary) {
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
        readBtn.addEventListener("click", () => {
            book.changeReadStatus();
            displayLibrary();
        });

        // Create book remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-button");
        removeBtn.setAttribute("type", "button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            Library.myLibrary.splice(Library.myLibrary.findIndex(x => x.title === book.title), 1);
            displayLibrary()
        });

        // Append all book info to card
        cardDiv.append(bookTitleDiv, bookAuthorDiv, bookPagesDiv, readBtn, removeBtn);
        // Append card to container
        container.appendChild(cardDiv);
    }
}


// TESTING PURPOSE
Library.addBookToLibrary("Harry Potter", "J.K. Rowling", 325, true);
Library.addBookToLibrary("The Hunger Games", "Suzanne Collins", 536, false);
Library.addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 634, true);
Library.addBookToLibrary("Atomic Habits", "James Clear", 243, true);
Library.addBookToLibrary("Dune", "Frank Herbert", 846, false);
displayLibrary();