import { create } from 'zustand';
import type { User } from '../types/user';
import { loginUser, registerUser, updateUserProfile } from '../lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateBalance: (newBalance: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  register: async (name: string, email: string, password: string) => {
    try {
      await registerUser(name, email, password);
      // Registration successful - user needs to login
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (data) => {
    const { user: currentUser } = useAuthStore.getState();
    if (!currentUser?.id) return;

    try {
      await updateUserProfile(currentUser.id, data);
      set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      }));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  updateBalance: (newBalance: number) => {
    set((state) => ({
      user: state.user ? { ...state.user, balance: newBalance } : null,
    }));
  },
}));