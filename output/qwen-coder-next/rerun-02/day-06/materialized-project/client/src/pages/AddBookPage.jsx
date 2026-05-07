import BookForm from '../components/BookForm';
import { useNavigate } from 'react-router-dom';

export default function AddBookPage() {
  const navigate = useNavigate();

  const handleSaved = () => {
    navigate('/books');
  };

  return <BookForm onSaved={handleSaved} onCancel={() => navigate('/books')} />;
}
