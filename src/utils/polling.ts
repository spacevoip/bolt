export function calculatePollingInterval(
  baseInterval: number,
  maxInterval: number,
  attemptCount: number,
  backoffFactor = 1.5
): number {
  return Math.min(
    baseInterval * Math.pow(backoffFactor, attemptCount),
    maxInterval
  );
}