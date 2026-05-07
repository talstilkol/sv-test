const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchBooks = async () => {
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
};

export const fetchBook = async (id) => {
  const res = await fetch(`${API_BASE}/books/${id}`);
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
};

export const createBook = async (book) => {
  const res = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create book');
  }
  return res.json();
};

export const updateBook = async (id, book) => {
  const res = await fetch(`${API_BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update book');
  }
  return res.json();
};

export const deleteBook = async (id) => {
  const res = await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete book');
};

export const borrowBook = async (id) => {
  const res = await fetch(`${API_BASE}/books/borrow/${id}`, { method: 'POST' });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to borrow book');
  }
  return res.json();
};
