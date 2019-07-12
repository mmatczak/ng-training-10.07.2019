import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book$: Observable<Book>;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute
  ) {
    const id: number = +route.snapshot.params.id;
    this.book$ = bookService.findOne(id);
  }

  notifyOnBookChange($event: Event) {
    $event.preventDefault();
    const form = $event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('input#author');
    const author = authorElement && authorElement.value;
    const titleElement = form.querySelector<HTMLInputElement>('input#title');
    const title = titleElement && titleElement.value;

    // go to book overview
  }
}
