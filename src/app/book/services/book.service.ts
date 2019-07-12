import { Book, BookProperties } from '../book';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, Subscriber, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private idSeq = 0;

  private bookSubject = new BehaviorSubject([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS'
    }
  ]);

  private books$ = this.bookSubject.asObservable();

  findAll(): Observable<Book[]> {
    return this.books$
      .pipe(delay(2000));
  }

  saveOrUpdate(book: Book): Observable<Book> {
    return new Observable(subscriber => {
      let currentBooks = this.bookSubject.getValue();
      const isUpdate = book.id != null && !isNaN(book.id);

      if (isUpdate) {
        currentBooks = currentBooks.map(
          currBook => currBook.id === book.id ? book : currBook);
      } else {
        book.id = this.idSeq++;
        currentBooks.push(book);
      }

      this.bookSubject.next(currentBooks);

      subscriber.next(book);
      subscriber.complete();
    });
  }

  findOne(id: number): Observable<Book> {
    const  currentBooks = this.bookSubject.getValue();
    const foundBook = currentBooks.find(book => book.id === id);
    return foundBook ? of(foundBook).pipe(delay(1000)) :
      throwError(`No book with ${id} found`);
  }
}
