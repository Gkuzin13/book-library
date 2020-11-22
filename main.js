
const newBookBtn = document.querySelector('.new-book-btn');

const addBtn = document.querySelector('.add-btn');

const cancelBtn = document.querySelector('.cancel-btn');

let formCtn = document.getElementById('form-ctn');

let formFocus = document.querySelector('.bg-focus');

const cardsCtn = document.getElementById('cards-ctn');

let bookLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

addBook = () => {
    let id = Date.now();
    let getTitle = document.getElementById('book-name').value;
    let getAuthor = document.getElementById('author-name').value;
    let getPages = document.getElementById('page-num').value;
    let getStatus = document.getElementById('book-status').checked;

    let addNewBook = new Book(id, getTitle, getAuthor, getPages, getStatus);
    bookLibrary.push(addNewBook);
    console.log(bookLibrary)

    // Create and style new book card
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    cardsCtn.prepend(bookCard);

    let bookDelete = document.createElement('span');
    bookDelete.classList.add('book-del-btn');
    bookDelete.textContent = 'X';
    bookDelete.setAttribute('unique-id', id);
    bookCard.appendChild(bookDelete);

    let mainInfo = document.createElement('h1');
    mainInfo.classList.add('book-main-info');
    bookCard.appendChild(mainInfo);
    mainInfo.textContent = `${getTitle} by ${getAuthor}`;

    let pagesInfo = document.createElement('p');
    pagesInfo.classList.add('pages-info');
    mainInfo.appendChild(pagesInfo);
    pagesInfo.textContent = `${getPages} pages`;
    
    let readStatus = document.createElement('p');
    readStatus.classList.add('read-status');
    bookCard.appendChild(readStatus);

    bookCompleted = () => {
        readStatus.style.color = 'green';
        readStatus.textContent = 'Completed';
    };

    bookNotRead = () => {
        readStatus.style.color = 'tomato';
        readStatus.textContent = 'Not read yet';
    };

    if(getStatus == true) {
        bookCompleted();
    } else {
        bookNotRead();
    };

    formCtn.style.display = 'none';
    formCtn.reset();
    newBookBtn.style.opacity = '1';
    formFocus.style.display = 'none';
};

formCtn.addEventListener('submit', e => {
    e.preventDefault();
    addBook();
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

        console.log(bookLibrary);
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





