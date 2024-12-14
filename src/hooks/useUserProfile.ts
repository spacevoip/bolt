import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/userService';
import { useAuthStore } from '../store/useAuthStore';

export function useUserProfile() {
  const { user, updateProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const profileData = await fetchUserProfile(user.id);
        updateProfile(profileData);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Profile loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user?.id]);

  return { isLoading, error };
}