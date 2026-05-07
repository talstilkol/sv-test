import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useNavigate } from 'react-router-dom';

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSaved = () => {
    navigate('/books');
  };

  return <BookForm bookId={id} onSaved={handleSaved} onCancel={() => navigate('/books')} />;
}
