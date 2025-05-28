import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('authToken'), // Check for token on initial load
    isLoading: false,
    error: null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginStart: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('authToken', action.payload.token); // Persist token
      },
      loginFailure: (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        localStorage.removeItem('authToken');
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.isLoading = false;
        localStorage.removeItem('authToken');
      },
      // Optional: if you fetch user details separately after initial token load
      setUserFromToken: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      }
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure, logout, setUserFromToken } = authSlice.actions;
  export default authSlice.reducer;
  