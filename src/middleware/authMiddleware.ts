import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { SESSION_TIMEOUT } from '../utils/security';

export function useAuthMiddleware() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        logout();
        navigate('/login');
      }, SESSION_TIMEOUT);
    };

    if (isAuthenticated) {
      // Set up activity listeners
      const events = ['mousedown', 'keydown', 'touchstart', 'mousemove'];
      events.forEach(event => document.addEventListener(event, resetTimer));
      resetTimer();

      return () => {
        events.forEach(event => document.removeEventListener(event, resetTimer));
        if (inactivityTimer) clearTimeout(inactivityTimer);
      };
    }
  }, [isAuthenticated, logout, navigate]);
}