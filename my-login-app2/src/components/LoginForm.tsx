import React, { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../store';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth'; // Import useAuth

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useAuth(); // Use the custom hook

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const data = await authService.login({ email, password });
      dispatch(loginSuccess(data));
      navigate('/dashboard');
    } catch (err: any) {
      dispatch(loginFailure(err.message || 'Failed to login'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;