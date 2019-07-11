import { BookDetailsComponent } from './book-details.component';

fdescribe('BookDetailsComponent', () => {
  describe('(class)', () => {
    it('emits an event upon book change', () => {
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
      component.book = {
        id: 0,
        title: 'test',
        author: 'test'
      };
      component.bookChange.subscribe(updatedBook => {
        // then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(updatedBook).toBeDefined();
        expect(updatedBook.title).toBe('updatedTitle');
        expect(updatedBook.author).toBe('updatedAuthor');
      });
      // when
      component.notifyOnBookChange(eventMock);
    });
  });

  // describe();
});
