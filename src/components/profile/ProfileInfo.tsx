import React from 'react';
import UserInfoSection from './info/UserInfoSection';
import type { User } from '../../types/user';

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <UserInfoSection user={user} />
    </div>
  );
}