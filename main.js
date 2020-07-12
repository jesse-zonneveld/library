let myLib = [];
const addBookButton = document.querySelector('.addBook');
const form = document.querySelector('.new-book-info');
const lightbox = document.querySelector('.lightbox');
const dimmer = document.createElement('div');

addBookButton.addEventListener('click', displayPopup);
form.addEventListener('submit', addBookToLib);

function displayPopup() {
    lightbox.style.visibility = 'visible';
    lightbox.style.top = window.innerHeight / 2 - 50 + 'px';
    lightbox.style.left = window.innerWidth / 2 - 100 + 'px';
    
    dimmer.style.width = window.innerWidth + 'px';
    dimmer.style.height = window.innerHeight + 'px';
    dimmer.className = 'dimmer';
    document.body.appendChild(dimmer);

    dimmer.addEventListener('click', () => {
        lightbox.style.visibility = 'hidden';
        document.body.removeChild(dimmer);
    });
}



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLib(e) {
    e.preventDefault();
    const title = this.querySelector('[name=title]').value;
    const author = this.querySelector('[name=author]').value;
    const pages = this.querySelector('[name=pages]').value;
    const read = this.querySelector('[name=read]').checked;
    myLib.push(new Book(title, author, pages, read));
    this.reset();
    console.log(myLib);

    lightbox.style.visibility = 'hidden';
    document.body.removeChild(dimmer);
    renderLibrary();
}

function renderLibrary() {
    document.querySelector('.library').innerHTML = myLib.map(book => {
        return `<div class="book">
                    <div class="title">${book.title}</div>
                    <div class="author">${book.author}</div>
                    <div class="pages">${book.pages}</div>
                    <div class="read">Done
                        <label class="switch">
                        <input type="checkbox" ${book.read === true ? 'checked' : ''}>
                        <span class="slider round"></span>
                        </label>
                    </div>
                </div>
        `;
    }).join('\n');
}