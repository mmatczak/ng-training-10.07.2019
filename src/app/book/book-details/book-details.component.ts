import { Component, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  bookForm: FormGroup;
  private readonly unsubscribe$ = new Subject();

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    formBuilder: FormBuilder
  ) {
    const book: Book = route.snapshot.data.book;

    this.bookForm = formBuilder.group({
      author: [book && book.author, [
        Validators.required,
        Validators.maxLength(15)]],
      title: [book && book.title, [
        Validators.required,
        Validators.maxLength(25)]]
    });
  }

  getErrorMessages(formControlName: string): string[] {
    const errorMessages = [];

    const formControl = this.bookForm.get(formControlName);
    if (formControl && formControl.errors) {
      Object.keys(formControl.errors)
        .forEach(errorCode => {
          let msg = 'Unknown Error';
          if (errorCode === 'required') {
            msg = 'Please provide a value';
          } else if (errorCode === 'maxlength') {
            msg = 'Value too long';
          }
          errorMessages.push(msg);
        });
    }

    return errorMessages;
  }

  saveAndGoToBookOverview() {
    if (this.bookForm.valid) {
      this.bookService.saveOrUpdate({
        id: +this.route.snapshot.params.id,
        ...this.bookForm.value
      })
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.router.navigate(['/books']);
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
