import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useUserProfile } from '../hooks/useUserProfile';
import { supabase } from '../lib/supabase';
import AvatarUpload from '../components/profile/AvatarUpload';
import ProfileInfo from '../components/profile/ProfileInfo';
import PasswordChange from '../components/profile/PasswordChange';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const { isLoading: isLoadingProfile, error: profileError } = useUserProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || '');

  if (!user) return null;

  const handleAvatarUpload = async (file: File) => {
    try {
      setIsUpdating(true);

      // Validate file size and type
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      
      if (!fileExt || !allowedExtensions.includes(fileExt)) {
        throw new Error('Invalid file type. Allowed types: JPG, PNG, GIF');
      }

      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar: publicUrl });
      setAvatar(publicUrl);
      toast.success('Avatar updated successfully');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || 'Failed to upload avatar');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded-full w-32 mx-auto"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center text-red-600">
            {profileError}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
          <p className="text-blue-100">Manage your account information and security</p>
        </div>

        <div className="p-6 space-y-8">
          <div className="border-b border-gray-200 pb-8">
            <AvatarUpload
              currentAvatar={avatar}
              onAvatarChange={setAvatar}
              onAvatarUpload={handleAvatarUpload}
              isUpdating={isUpdating}
            />
          </div>

          <ProfileInfo user={user} />

          <div className="border-t border-gray-200 pt-8">
            <PasswordChange userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}