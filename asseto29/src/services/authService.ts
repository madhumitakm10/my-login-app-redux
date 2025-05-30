import type { User } from '../types';

export interface LoginCredentials {
  username: string;
  password?: string; // Make password optional for easier mocking
}

// Mock user database
const MOCK_USERS: Record<string, User & { password?: string }> = {
  'test@example.com': { id: '1', username: 'testuser', email: 'test@example.com', password: 'password123' },
  'admin': { id: '2', username: 'admin', email: 'admin@example.com', password: 'adminpassword' },
};


export const login = (credentials: LoginCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS[credentials.username.toLowerCase()];
      if (user && (credentials.password === undefined || user.password === credentials.password)) {
        // In a real app, don't send the password back
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000); // Simulate network delay
  });
};

// In a real app, you'd have a real logout API call
export const logoutService = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('User logged out from service');
      resolve();
    }, 500);
  });
};