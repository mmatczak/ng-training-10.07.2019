import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../services/book.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  books$: Observable<Book[]>;

  selectedBook: Book | undefined;

  constructor(readonly bookService: BookService) {
  }

  ngOnInit(): void {
    this.books$ = this.bookService.findAll();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return book === this.selectedBook;
  }

  updateBook(book: Book) {
    this.bookService.update(book);
    this.selectedBook = book;
  }
}
