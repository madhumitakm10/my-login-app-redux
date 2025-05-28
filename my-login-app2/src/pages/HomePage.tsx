import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the App!</h1>
      <p>This is the public home page.</p>
      <nav>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/dashboard">Dashboard (Protected)</Link>
      </nav>
    </div>
  );
};

export default HomePage;