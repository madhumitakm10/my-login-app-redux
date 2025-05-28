import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useAuth = () => {
    const { user, token, isLoading, error } = useSelector((state: RootState) => state.auth);
    return {
        isAuthenticated: !!token, // Or !!user if you prioritize user object
        user,
        token,
        isLoading,
        error,
    };
};