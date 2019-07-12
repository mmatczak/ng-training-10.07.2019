import { Component, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookProperties } from '../book';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book$: Observable<Book | BookProperties>;
  private readonly bookId: number;
  private readonly unsubscribe$ = new Subject();

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {

    if (route.snapshot.params.id) {
      this.bookId = +route.snapshot.params.id;
      this.book$ = bookService.findOne(this.bookId);
    } else {
      this.book$ = of({
        author: '',
        title: '',
      });
    }
  }

  saveAndGoToBookOverview($event: Event) {
    $event.preventDefault();
    const form = $event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('input#author');
    const author = authorElement && authorElement.value;
    const titleElement = form.querySelector<HTMLInputElement>('input#title');
    const title = titleElement && titleElement.value;

    this.bookService.saveOrUpdate({
      id: this.bookId, author, title
    })
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.router.navigate(['/books']);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
