import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>Welcome, {user.name} ({user.email})!</p>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;