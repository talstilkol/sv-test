interface Book {
  title: string;
  author: string;
  year: number;
  genre: 'Fiction' | 'Science' | 'History' | 'Biography';
  isAvailable: boolean;
  borrowedBy: string;
}

function filterBooks(books: Book[], filters: Partial<Book>): Book[] {
  return books.filter(book => {
    for (const key in filters) {
      const k = key as keyof Book;
      if (filters[k] !== undefined && book[k] !== filters[k]) {
        return false;
      }
    }
    return true;
  });
}

export { Book, filterBooks };
