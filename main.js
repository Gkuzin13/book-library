
const newBookBtn = document.querySelector('.new-book-btn');

const addBtn = document.querySelector('.add-btn');

const cancelBtn = document.querySelector('.cancel-btn');

const cardsCtn = document.getElementById('cards-ctn');

let formCtn = document.getElementById('form-ctn');

let formFocus = document.querySelector('.bg-focus');

let bookLibrary = [
    {id: 1606253782720,
    title: "The Lord of the Rings",
    author: "J.R.R. Tokien",
    pages: "1216",
    read: true},

    {id: 1606253732520,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: "310",
    read: false}
];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Renders book card
renderBook = () => {
    // Styling for each book card
    bookLibrary.forEach(Book => {
      let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        cardsCtn.prepend(bookCard);

      let bookDelete = document.createElement('span');
        bookDelete.classList.add('book-del-btn');
        bookDelete.textContent = 'X';
        // Sets a unique ID generated from Date.now()
        bookDelete.setAttribute('unique-id', Book.id);
        bookCard.appendChild(bookDelete);

      let titleInfo = document.createElement('h1');
        titleInfo.classList.add('title-info');
        titleInfo.textContent = Book.title;
        bookCard.appendChild(titleInfo);

      let authorInfo = document.createElement('p')
        authorInfo.classList.add('author-info');
        authorInfo.textContent = ' by ' + Book.author;
        titleInfo.appendChild(authorInfo);

      let pagesInfo = document.createElement('p');
        pagesInfo.classList.add('pages-info');
        titleInfo.appendChild(pagesInfo);
        pagesInfo.textContent = Book.pages + ' pages';
        
      let readStatus = document.createElement('p');
        readStatus.classList.add('read-status');
        bookCard.appendChild(readStatus);
        readStatus.setAttribute('unique-id', Book.id);

        bookCompleted = () => {
            readStatus.style.color = 'green';
            readStatus.textContent = 'Completed';
        };
        
        bookNotRead = () => {
            readStatus.style.color = 'rgb(230, 103, 80)';
            readStatus.textContent = 'Not read yet';
        };

        if(Book.read == true) {
            bookCompleted();
        } else {
            bookNotRead();
        };
    });  
};
// Update book local storage
bookLibrary = JSON.parse(localStorage.getItem("bookLibrary") || "[]");
// Renders book cards
renderBook();

addBook = () => {
    // Gets user input from form
    this.id = Date.now();
    this.title = document.getElementById('book-name').value;
    this.author = document.getElementById('author-name').value;
    this.pages = document.getElementById('page-num').value;
    this.read = document.getElementById('book-status').checked;

    // Adds new book object to array
    let addNewBook = new Book(id, title, author, pages, read);
    bookLibrary.push(addNewBook);

    // Removes all rendered book cards 
    cardsCtn.querySelectorAll('.book-card').forEach(e => e.remove());
    // Update book local storage
    localStorage.setItem("bookLibrary", JSON.stringify(bookLibrary));

    // Re-renders book list
    renderBook();
};

formCtn.addEventListener('submit', e => {
    e.preventDefault();

    addBook();
    // After submit styling
    formCtn.style.display = 'none';
    newBookBtn.style.opacity = '1';
    formFocus.style.display = 'none';
    // Resets form inputs
    formCtn.reset();
});

// Removes book element and object
cardsCtn.addEventListener('click', e => {
    // Get id number from current card 
    let getId = e.target.getAttribute('unique-id');
    
    if(e.target.classList.contains('book-del-btn')) {
        // Loops through array 
        for(let i = 0; i < bookLibrary.length; i++) {
            // Removes from array if id matched to id in object
            if(bookLibrary[i].id == getId) {
                bookLibrary.splice(i, 1);
            };
        };
        // Removes targeted card from DOM
        let del = e.target.parentElement;
        cardsCtn.removeChild(del);
        // Update book local storage
        localStorage.setItem("bookLibrary", JSON.stringify(bookLibrary));
    };
    // Change read status
    if(e.target.classList.contains('read-status')) {
        // Loops through array 
        for(let i = 0; i < bookLibrary.length; i++) {
            // Looks for matched id book
            if(bookLibrary[i].id == getId) {
                // Toggles read status on matched book id object
                if(bookLibrary[i].read == true) {
                    bookLibrary[i].read = false;
                    e.target.style.color = 'tomato';
                    e.target.textContent = 'Not read yet';
                    console.log(bookLibrary)
                } else {
                    bookLibrary[i].read = true;
                    e.target.style.color = 'green';
                    e.target.textContent = 'Completed';
                    console.log(bookLibrary)
                };
                // Update book local storage
                localStorage.setItem("bookLibrary", JSON.stringify(bookLibrary));
            };
        };
    };
});

// Form styling 
addBookToLibrary = () => {
    formCtn.style.display = 'block';
    formFocus.style.display = 'block';

    // Cancel button styling
    cancelBtn.addEventListener('click', e => {
        e.preventDefault();

        formCtn.style.display = 'none';
        formFocus.style.display = 'none';
        newBookBtn.style.opacity = '1';
    });
};

newBookBtn.addEventListener('click', addBookToLibrary);






