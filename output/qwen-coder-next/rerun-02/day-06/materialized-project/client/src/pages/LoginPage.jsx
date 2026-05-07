import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (isLoggedIn) => {
    if (isLoggedIn) {
      onLogin();
      navigate('/books');
    }
  };

  return <LoginForm onLogin={handleLoginSuccess} />;
}
