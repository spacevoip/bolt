import { useCallback } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/auth/authService';
import { sessionManager } from '../../services/auth/session';
import { toast } from 'react-hot-toast';
import type { LoginInput, RegisterInput } from '../../services/auth/validation';

export function useAuth() {
  const { setUser, clearUser } = useAuthStore();

  const login = useCallback(async (data: LoginInput) => {
    try {
      const user = await authService.login(data);
      setUser(user);
      toast.success('Login successful');
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  }, [setUser]);

  const register = useCallback(async (data: RegisterInput) => {
    try {
      await authService.register(data);
      toast.success('Registration successful. Please login.');
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    sessionManager.clearSession();
    clearUser();
    toast.success('Logged out successfully');
  }, [clearUser]);

  return {
    login,
    register,
    logout,
    isAuthenticated: sessionManager.isAuthenticated(),
  };
}