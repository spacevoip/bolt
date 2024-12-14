import { useState, useEffect } from 'react';
import { fetchAccountTaxRate } from '../../services/tax/taxService';

export function useTaxRate(accountNumber: string) {
  const [taxRate, setTaxRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTaxRate = async () => {
      try {
        const rate = await fetchAccountTaxRate(accountNumber);
        setTaxRate(rate);
      } catch (err) {
        setError('Failed to load tax rate');
      } finally {
        setIsLoading(false);
      }
    };

    loadTaxRate();
  }, [accountNumber]);

  return { taxRate, isLoading, error };
}