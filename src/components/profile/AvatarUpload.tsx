import React, { useCallback } from 'react';
import { Camera, Upload } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (url: string) => void;
  onAvatarUpload: (file: File) => Promise<void>;
  isUpdating: boolean;
}

export default function AvatarUpload({ 
  currentAvatar, 
  onAvatarChange,
  onAvatarUpload,
  isUpdating
}: AvatarUploadProps) {
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onAvatarUpload(file);
  }, [onAvatarUpload]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className={`relative w-32 h-32 rounded-full overflow-hidden ${
          isUpdating ? 'opacity-50' : ''
        }`}>
          <img
            src={currentAvatar || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover border-4 border-white shadow-lg"
          />
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          )}
        </div>
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
          <Camera className="w-8 h-8 text-white" />
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            disabled={isUpdating}
          />
        </label>
      </div>

      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">
          Or use an image URL
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={currentAvatar || ''}
            onChange={(e) => onAvatarChange(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isUpdating}
          />
          <button
            type="button"
            onClick={() => onAvatarChange('')}
            className="p-2 text-gray-500 hover:text-gray-700"
            disabled={isUpdating}
          >
            <Upload className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}