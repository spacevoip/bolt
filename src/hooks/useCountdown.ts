import { useState, useEffect } from 'react';

interface CountdownProps {
  initialMinutes: number;
  onExpire: () => void;
}

export function useCountdown({ initialMinutes, onExpire }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  return {
    minutes: Math.floor(timeLeft / 60),
    seconds: timeLeft % 60,
    timeLeft,
  };
}