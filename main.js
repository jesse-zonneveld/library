function Book(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
    this.info = () => `${this.name} by ${this.author}, status: ${this.read}`;
}

let lotr = new Book('lotr', 'tolkin', 'want to read');
console.log(lotr.info());