import { BookDetailsComponent } from './book-details.component';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Book } from '../book';

fdescribe('BookDetailsComponent', () => {
  let book: Book;

  beforeEach(() => {
    book = {
      id: 0,
      title: 'test title',
      author: 'test author'
    };
  });

  describe('(class)', () => {
    it('emits an event upon book change', (done) => {
      // given
      const eventMock: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string) {
            return selector === 'input#author'
              ? {value: 'updatedAuthor'} : {value: 'updatedTitle'};
          }
        }
      };
      const component = new BookDetailsComponent();
      component.book = book;
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(updatedBook).toBeDefined();
        expect(updatedBook.title).toBe('updatedTitle');
        expect(updatedBook.author).toBe('updatedAuthor');
        done();
      });
      // when
      component.saveAndGoToBookOverview(eventMock);
    });
  });

  describe('(DOM)', () => {
    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
    });

    it('is created', () => {
      expect(component).toBeDefined();
    });

    it('renders book\'s author and title in inputs', () => {
      // given
      component.book = book;
      // when
      fixture.detectChanges();
      // then
      const element = fixture.nativeElement as HTMLElement;
      const authorInputElement = element.querySelector<HTMLInputElement>('input#author');
      expect(authorInputElement).toBeDefined();
      expect(authorInputElement.value).toBe(book.author);
    });

    it('emits an event upon updating inputs', (done) => {
      // given
      component.book = book;
      fixture.detectChanges();
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(updatedBook).toBeDefined();
        expect(updatedBook.title).toBe('updatedTitle');
        expect(updatedBook.author).toBe('updatedAuthor');
        done();
      });
      // when
      const element = fixture.nativeElement as HTMLElement;
      const authorInputElement = element.querySelector<HTMLInputElement>(
        'input#author');
      authorInputElement.value = 'updatedAuthor';

      const titleInputElement = element.querySelector<HTMLInputElement>(
        'input#title');
      titleInputElement .value = 'updatedTitle';

      const buttonElement = element.querySelector<HTMLButtonElement>(
        'button');
      buttonElement.click();
    });
  });
});
