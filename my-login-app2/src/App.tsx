import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import type { AppDispatch } from './store';
import { setUserFromToken, logout } from './store/authSlice'; // Import logout
import { authService } from './services/authService';
import './styles/App.css'; // Import some basic styles

function App() {
  const { isAuthenticated, token, isLoading: authLoading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  // Effect to load user profile if token exists on app load but user object is not yet in state
  useEffect(() => {
    const tryLoadUser = async () => {
      if (token && !isAuthenticated) { // Token exists, but user not loaded (e.g., after refresh)
        try {
          // You might want to dispatch a loading start action here
          const userProfile = await authService.getUserProfile(token);
          dispatch(setUserFromToken(userProfile));
        } catch (error) {
          console.error("Failed to fetch user profile with token:", error);
          dispatch(logout()); // Token is invalid or expired, so log out
        }
      }
    };
    if (!authLoading) { // Only run if not already in an auth loading state
        tryLoadUser();
    }
  }, [token, isAuthenticated, dispatch, authLoading]);


  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {/* Logout button can also be here or in DashboardPage */}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* Add more protected routes here */}
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;