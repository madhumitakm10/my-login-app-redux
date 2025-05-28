import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode; // To allow wrapping components like <ProtectedRoute><Dashboard /></ProtectedRoute>
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading authentication status...</div>; // Or a spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ? <>{children}</> : <Outlet />; // Render children or Outlet for nested routes
};

export default ProtectedRoute;