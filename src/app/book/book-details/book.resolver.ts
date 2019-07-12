import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Book } from '../book';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BookService } from '../services/book.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book> {
  constructor(private readonly bookService: BookService) {
  }

  resolve(
    route: ActivatedRouteSnapshot): Observable<Book> {
    const bookId: number = +route.params.id;
    return this.bookService.findOne(bookId);
  }
}
