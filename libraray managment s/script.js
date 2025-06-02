document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const isbn = document.getElementById('isbn').value.trim();

  if (title && author && isbn) {
    const book = { title, author, isbn };
    addBookToList(book);
    saveBook(book);
    this.reset();
  }
});

function addBookToList(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button onclick="deleteBook(this, '${book.isbn}')">Delete</button></td>
  `;

  list.appendChild(row);
}

function deleteBook(button, isbn) {
  button.parentElement.parentElement.remove();
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books = books.filter(book => book.isbn !== isbn);
  localStorage.setItem('books', JSON.stringify(books));
}

function saveBook(book) {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.forEach(addBookToList);
}

window.onload = loadBooks;
