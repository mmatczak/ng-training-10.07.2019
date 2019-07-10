import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book;

  @Output()
  bookChange = new EventEmitter<Book>();

  notifyOnBookChange($event: Event) {
    $event.preventDefault();
    const form = $event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('input#author');
    const author = authorElement && authorElement.value;
    const titleElement = form.querySelector<HTMLInputElement>('input#title');
    const title = titleElement && titleElement.value;

    this.bookChange.emit(
      {
        ...this.book,
        author,
        title
      });
  }
}
