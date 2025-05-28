import type { User } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    login: async (credentials: { email: string; password: string }): Promise<{ user: User; token: string }> => {
        await delay(1000); // Simulate network latency
        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
            const user: User = {
                id: '1',
                name: 'Test User',
                email: 'user@example.com',
            };
            const token = 'fake-jwt-token-' + Math.random().toString(36).substr(2, 9);
            return { user, token };
        } else {
            throw new Error('Invalid email or password');
        }
    },

    // Optional: If you need to fetch user details using a token
    getUserProfile: async (token: string): Promise<User> => {
        await delay(500);
        if (token && token.startsWith('fake-jwt-token-')) {
        // In a real app, you'd verify the token and fetch user data
            return {
                id: '1',
                name: 'Test User',
                email: 'user@example.com',
            };
        }
        throw new Error('Invalid token or user not found');
    }
};