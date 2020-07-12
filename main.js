let myLib = [];
const addBookButton = document.querySelector('.addBook');
const form = document.querySelector('.new-book-info');
const lightbox = document.querySelector('.lightbox');

addBookButton.addEventListener('click', displayPopup);
form.addEventListener('submit', addBookToLib);

function displayPopup() {
    lightbox.style.visibility = 'visible';
    lightbox.style.top = window.innerHeight / 2 - 50 + 'px';
    lightbox.style.left = window.innerWidth / 2 - 100 + 'px';

    const dimmer = document.createElement('div');
    dimmer.style.width = window.innerWidth + 'px';
    dimmer.style.height = window.innerHeight + 'px';
    dimmer.className = 'dimmer';
    document.body.appendChild(dimmer);

    dimmer.addEventListener('click', () => {
        lightbox.style.visibility = 'hidden';
        document.body.removeChild(dimmer);
    })
}



function Book(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
}

function addBookToLib(e) {
    e.preventDefault();
    const title = this.querySelector('[name=title]').value;
    const author = this.querySelector('[name=author]').value;
    const pages = this.querySelector('[name=pages]').value;
    const read = this.querySelector('[name=read]').value;
}

