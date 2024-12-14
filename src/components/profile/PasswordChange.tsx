import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import PinInput from '../pix/pin/PinInput';
import { toast } from 'react-hot-toast';
import { changePassword } from '../../services/authService';

interface PasswordChangeProps {
  userId: string;
}

export default function PasswordChange({ userId }: PasswordChangeProps) {
  const [step, setStep] = useState<'initial' | 'pin' | 'password'>('initial');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePinSuccess = () => {
    setStep('password');
  };

  const handlePinError = (message: string) => {
    toast.error(message);
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      toast.error('Password must contain at least one lowercase letter');
      return false;
    }

    if (!/[0-9]/.test(password)) {
      toast.error('Password must contain at least one number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(newPassword)) {
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(userId, newPassword);
      toast.success('Password changed successfully');
      setStep('initial');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        {step === 'initial' && (
          <button
            onClick={() => setStep('pin')}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Change Password
          </button>
        )}
      </div>

      {step === 'pin' && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <h4 className="text-lg font-medium text-gray-900">Security Check</h4>
            <p className="text-sm text-gray-500">
              Please enter your PIN to continue
            </p>
          </div>
          <PinInput
            onSuccess={handlePinSuccess}
            onError={handlePinError}
          />
          <button
            onClick={() => setStep('initial')}
            className="mt-4 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      )}

      {step === 'password' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>Password must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Include at least one uppercase letter</li>
              <li>Include at least one lowercase letter</li>
              <li>Include at least one number</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setStep('initial');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}