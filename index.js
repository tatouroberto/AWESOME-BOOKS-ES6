import Book from './MODULES/bookss.js';
import { DateTime } from './MODULES/luxon.js';
import './MODULES/menu.js';

class BookList {
  constructor() {
    this.bookList = document.getElementById('book-list');
    this.inputTitle = document.getElementById('title');
    this.inputAuthor = document.getElementById('authur');
    this.inputButton = document.getElementById('addBtn');
    this.books = JSON.parse(localStorage.getItem('book')) || [];
    this.inputButton.addEventListener('click', (event) => this.addBooks(event));

    this.displayBooks();
    this.displayTime();
  }

    displayTime = () => {
      const dateContainer = document.getElementById('date');
      const time = DateTime.now().toFormat('EEEE dd LLLL, yyyy - hh:mm');
      dateContainer.textContent = time;
    }

    addBooks = (event) => {
      event.preventDefault();
      const title = this.inputTitle.ariaValueMax;
      const author = this.inputAuthor.ariaValueMax;
      if (title !== '' && author !== '') {
        const book = new Book(Date.now(), title, author);
        this.books = [book, ...this.books];
        localStorage.setItem('book', JSON.stringify(this.books));
      }
      this.displayBooks();
      this.inputTitle = '';
      this.inputAuthor = '';
    }

    displayBooks = () => {
      this.bookList.innerHTML = '';
      const list = document.createElement('ul');
      list.classList.add('books-container');
      const listDiv = document.createElement('div');
      listDiv.classList.add('item');
      list.appendChild(listDiv);

      for (let i = 0; i < this.books.length; i += 1) {
        const book = this.books[i];
        const listItem = document.createElement('li');
        listItem.classList.add('list');
        const booksInfo = document.createElement('span');
        booksInfo.textContent = `${book.title} by ${book.author}`;
        listItem.appendChild(booksInfo);

        const removeButton = document.createElement('button');
        removeButton.classList.add('btn-remove');
        removeButton.id = `remove-button-${this.books[i].id}`;

        removeButton.textContent = 'remove';
        removeButton.setAttribute('data-index', i);

        listItem.appendChild(removeButton);
        listDiv.appendChild(listItem);
      }
      this.bookList.appendChild(list);
      this.buttonRemover();
    }

    buttonRemover = () => {
      const removedButtons = document.querySelectorAll("button[id^='remove-button-']");
      removedButtons.forEach((element) => {
        element.addEventListener('click', this.removeBook.bind(this));
      });
    }

    removeBook = (event) => {
      const bookIndex = event.target.dataset.index;
      this.books.splice(bookIndex, 1);
      localStorage.setItem('book', JSON.stringify(this.books));
      this.displayBooks();
    }
}

const booklist = new BookList();
booklist.displayBooks();