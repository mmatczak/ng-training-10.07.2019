export interface Book {
  id: number;
  author: string;
  title: string;
}

export type BookProperties = Pick<Book, 'author' | 'title'>;
