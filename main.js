const myLib = JSON.parse(localStorage.getItem('myLib')) || [];
let libraryContainer = document.querySelector('.library');
const addBookButton = document.querySelector('.add-book');
const form = document.querySelector('.new-book-info');
const lightbox = document.querySelector('.lightbox');
const dimmer = document.createElement('div');

addBookButton.addEventListener('click', displayPopup);
form.addEventListener('submit', addBookToLib);
libraryContainer.addEventListener('click', deleteBook);
libraryContainer.addEventListener('click', toggleRead);

function displayPopup() {
    lightbox.style.visibility = 'visible';
    lightbox.style.top = window.innerHeight / 2 - 250 + 'px';
    lightbox.style.left = window.innerWidth / 2 - 200 + 'px';
    
    dimmer.style.width = window.innerWidth + 'px';
    dimmer.style.height = window.innerHeight + 30 + 'px';
    dimmer.className = 'dimmer';
    document.body.appendChild(dimmer);
    document.body.classList.add('stop-scrolling');

    dimmer.addEventListener('click', (e) => {
        if (!e.target.parentElement.matches('body') || e.target === null) return;
        lightbox.style.visibility = 'hidden';
        document.body.removeChild(dimmer);
        document.body.classList.remove('stop-scrolling');
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
    localStorage.setItem('myLib', JSON.stringify(myLib));
}

function renderLibrary() {
    libraryContainer.innerHTML = myLib.map((book, i) => {
        console.log(book, i);
        return `<div class="book" data-index="${i}">
                    <div class="title">${book.title}</div>
                    <div class="author">By:  ${book.author}</div>
                    <div class="pages">pages:  ${book.pages}</div>
                    <div class="read">${book.read === true ? 'Complete' : 'Incomplete'} 
                        <label class="switch">
                        <input type="checkbox" ${book.read === true ? 'checked' : ''}>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <button class="delete">Delete</button>
                </div>
        `;
    }).join('\n');
}

function deleteBook(e) {
    if (!e.target.matches('button')) return;
    index = e.target.parentElement.dataset.index;
    console.log(index);
    myLib[index] = myLib[myLib.length - 1];
    myLib.pop();
    renderLibrary();
    localStorage.setItem('myLib', JSON.stringify(myLib));
}

function toggleRead(e) {
    if (!e.target.matches('.slider')) return;
    index = e.target.parentElement.parentElement.parentElement.dataset.index;
    console.log(index);
    myLib[index].read = !myLib[index].read;
    console.log(myLib[index]);
    localStorage.setItem('myLib', JSON.stringify(myLib));
    renderLibrary();
}

renderLibrary();