import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin(true);
    } else {
      alert('Invalid username or password. Only admin/1234 succeeds.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '40px auto' }}>
      <h2>SV Library Login</h2>
      <div>
        <label>Username: <input value={username} onChange={e => setUsername(e.target.value)} required /></label>
      </div>
      <div>
        <label>Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
