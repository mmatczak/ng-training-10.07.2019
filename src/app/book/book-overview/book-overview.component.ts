import { Component } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[] = [
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 1,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS'
    }
  ];

  selectedBook: Book | undefined;

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return book === this.selectedBook;
  }

  updateBook(book: Book) {
    this.books = this.books.map(
      currBook => currBook.id === book.id ? book : currBook);
    this.selectedBook = book;
  }
}
