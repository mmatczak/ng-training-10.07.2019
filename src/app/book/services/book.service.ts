import { Book } from '../book';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookSubject = new BehaviorSubject([
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
  ]);

  private books$ = this.bookSubject.asObservable();

  findAll(): Observable<Book[]> {
    return this.books$;
  }

  update(book: Book) {
    let currentBooks = this.bookSubject.getValue();

    currentBooks = currentBooks.map(
      currBook => currBook.id === book.id ? book : currBook);

    this.bookSubject.next(currentBooks);
  }
}
