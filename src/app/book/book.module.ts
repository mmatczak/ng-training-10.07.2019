import { NgModule } from '@angular/core';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookDetailsComponent,
    BookOverviewComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BookModule {
}
