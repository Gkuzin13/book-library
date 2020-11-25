
const newBookBtn = document.querySelector('.new-book-btn');

const addBtn = document.querySelector('.add-btn');

const cancelBtn = document.querySelector('.cancel-btn');

let formCtn = document.getElementById('form-ctn');

let formFocus = document.querySelector('.bg-focus');

const cardsCtn = document.getElementById('cards-ctn');

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

renderBook = () => {
    bookLibrary.forEach(Book => {
      let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        cardsCtn.prepend(bookCard);

      let bookDelete = document.createElement('span');
        bookDelete.classList.add('book-del-btn');
        bookDelete.textContent = 'X';
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

renderBook();

addBook = () => {
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

    // Re-renders book list
    renderBook();

    console.log(bookLibrary)
};

formCtn.addEventListener('submit', e => {
    e.preventDefault();

    addBook();

    formCtn.style.display = 'none';
    newBookBtn.style.opacity = '1';
    formFocus.style.display = 'none';
    formCtn.reset();
});

// Removes book element and object
cardsCtn.addEventListener('click', e => {
    // Get id number
    let getId = e.target.getAttribute('unique-id');

    if(e.target.classList.contains('book-del-btn')) {
        // Searches for id match and removes object
        for(let i = 0; i < bookLibrary.length; i++) {
            if(bookLibrary[i].id == getId) {
                bookLibrary.splice(i, 1);
            };
        };
        
        let del = e.target.parentElement;
        cardsCtn.removeChild(del);
        console.log(bookLibrary, 'Book removed');
    };
});

addBookToLibrary = () => {
    formCtn.style.display = 'block';

    formFocus.style.display = 'block';

    cancelBtn.addEventListener('click', e => {
        e.preventDefault();

        formCtn.style.display = 'none';

        formFocus.style.display = 'none';

        newBookBtn.style.opacity = '1';
    });
};

newBookBtn.addEventListener('click', addBookToLibrary);





