import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, deleteBook, borrowBook } from '../services/api';

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (e) {
      alert('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleBorrow = async (id) => {
    try {
      const updated = await borrowBook(id);
      setBooks(prev => prev.map(b => b._id === id ? updated : b));
    } catch (e) {
      alert(e.message);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                        book.author.toLowerCase().includes(search.toLowerCase());
    const matchesAvailable = !onlyAvailable || book.isAvailable;
    return matchesSearch && matchesAvailable;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Books</h2>
      <div style={{ marginBottom: 10 }}>
        <input 
          placeholder="Search books..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <label style={{ marginLeft: 10 }}>
          <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} />
          Only available
        </label>
      </div>

      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {filteredBooks.map(book => (
            <li key={book._id} style={{ marginBottom: 10 }}>
              <strong>{book.title}</strong> by {book.author} ({book.year}, {book.genre})
              <span style={{ marginLeft: 10, color: book.isAvailable ? 'green' : 'red' }}>
                {book.isAvailable ? 'Available' : `Borrowed by ${book.borrowedBy || 'Unknown'}`}
              </span>
              <button onClick={() => navigate(`/books/edit/${book._id}`)}>Edit</button>
              {book.isAvailable && <button onClick={() => handleBorrow(book._id)}>Borrow</button>}
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <button style={{ marginTop: 20 }} onClick={() => navigate('/books/add')}>Add Book</button>
    </div>
  );
}
