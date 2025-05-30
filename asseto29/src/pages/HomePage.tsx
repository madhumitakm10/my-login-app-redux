import React from 'react';
import { useAppSelector } from '../store/hooks';
const HomePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {user && <p>You are logged in as {user.username}.</p>}
      <p>This page is protected and only visible to logged-in users.</p>
    </div>
  );
};

export default HomePage;