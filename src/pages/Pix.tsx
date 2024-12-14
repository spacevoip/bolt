import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { useFavorites } from '../hooks/useFavorites';
import PixForm from '../components/pix/form/PixForm';
import ReviewCard from '../components/pix/review/ReviewCard';
import PinVerification from '../components/pix/pin/PinVerification';
import FavoritesCard from '../components/pix/favorites/FavoritesCard';
import AddFavoriteForm from '../components/pix/favorites/AddFavoriteForm';
import { validateAmount } from '../utils/validation';
import { useLocale } from '../hooks/useLocale';
import type { Favorite } from '../types/favorite';

export default function Pix() {
  const { t } = useLocale();
  const { user } = useAuthStore();
  const { favorites, refresh: refreshFavorites } = useFavorites(user?.account);
  
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'pin' | 'review'>('form');
  const [showReview, setShowReview] = useState(false);
  const [showAddFavorite, setShowAddFavorite] = useState(false);

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      toast.error(t('common.error.notAuthenticated'));
      return;
    }

    const amountValue = parseFloat(amount);
    const amountError = validateAmount(amountValue);
    if (amountError) {
      setError(amountError);
      return;
    }

    setShowReview(true);
    setStep('pin');
  };

  const handlePinSuccess = () => {
    setStep('review');
  };

  const handlePinError = (message: string) => {
    setError(message);
    setStep('form');
    setShowReview(false);
  };

  const handleCancel = () => {
    setStep('form');
    setShowReview(false);
    setError('');
  };

  const handleTransactionSuccess = () => {
    toast.success('PIX enviado com sucesso!');
    // Reset form
    setPixKey('');
    setAmount('');
    setFormattedAmount('');
    setDescription('');
    setStep('form');
    setShowReview(false);
  };

  const handleSelectFavorite = (favorite: Favorite) => {
    setPixKey(favorite.key);
  };

  const handleFavoriteAdded = () => {
    setShowAddFavorite(false);
    refreshFavorites();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PixForm
            pixKey={pixKey}
            setPixKey={setPixKey}
            amount={amount}
            formattedAmount={formattedAmount}
            setAmount={setAmount}
            setFormattedAmount={setFormattedAmount}
            description={description}
            setDescription={setDescription}
            error={error}
            onSubmit={handleInitialSubmit}
            disabled={step !== 'form'}
          />

          {step === 'pin' && (
            <div className="mt-6">
              <PinVerification
                onSuccess={handlePinSuccess}
                onError={handlePinError}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {showReview ? (
            <ReviewCard
              pixKey={pixKey}
              amount={parseFloat(amount)}
              description={description}
              onCancel={handleCancel}
              onSuccess={handleTransactionSuccess}
              isActive={step === 'review'}
            />
          ) : showAddFavorite ? (
            <AddFavoriteForm
              onSuccess={handleFavoriteAdded}
              onCancel={() => setShowAddFavorite(false)}
            />
          ) : (
            <FavoritesCard
              favorites={favorites}
              onSelect={handleSelectFavorite}
              onFavoriteAdded={refreshFavorites}
              onShowAddForm={() => setShowAddFavorite(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}