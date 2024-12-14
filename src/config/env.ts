import { z } from 'zod';

const envSchema = z.object({
  supabase: z.object({
    url: z.string().url(),
    anonKey: z.string().min(1),
  }),
  api: z.object({
    baseUrl: z.string().url(),
    pixUrl: z.string().url(),
    timeout: z.number().positive(),
  }),
  security: z.object({
    maxLoginAttempts: z.number().positive(),
    sessionTimeout: z.number().positive(),
    rateLimit: z.object({
      windowMs: z.number().positive(),
      maxRequests: z.number().positive(),
    }),
  }),
});

type EnvConfig = z.infer<typeof envSchema>;

const loadEnvConfig = (): EnvConfig => {
  const config = {
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    },
    api: {
      baseUrl: import.meta.env.VITE_API_URL || '',
      pixUrl: import.meta.env.VITE_API_URL_PIX || '',
      timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
    },
    security: {
      maxLoginAttempts: Number(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS) || 5,
      sessionTimeout: Number(import.meta.env.VITE_SESSION_TIMEOUT) || 3600000,
      rateLimit: {
        windowMs: Number(import.meta.env.VITE_RATE_LIMIT_WINDOW) || 900000,
        maxRequests: Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || 100,
      },
    },
  };

  try {
    return envSchema.parse(config);
  } catch (error) {
    console.error('Erro na validação das variáveis de ambiente:', error);
    throw new Error('Configuração de ambiente inválida');
  }
};

export const env = loadEnvConfig();