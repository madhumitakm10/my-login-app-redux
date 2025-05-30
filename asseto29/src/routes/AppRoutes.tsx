import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AboutPage from '../pages/AboutPage';
import ProtectedRoute from './ProtectedRoute';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
       {/* All routes within use the Layout */}
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<Layout />}>
        {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                {/* Add other protected routes here */}
            </Route>

        {/* Fallback for unknown routes (optional) */}
        <Route path="*" element={<div><h2>404 - Page Not Found</h2></div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;