export const securityConfig = {
  auth: {
    maxLoginAttempts: 5,
    sessionTimeout: 3600000, // 1 hour
    passwordMinLength: 8,
    passwordRequirements: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    },
  },
  rateLimit: {
    window: 900000, // 15 minutes
    maxRequests: 100,
  },
  api: {
    timeout: 30000, // 30 seconds
  },
} as const;