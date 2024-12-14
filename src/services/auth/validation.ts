import { z } from 'zod';
import { securityConfig } from '../../config/security.config';

const { passwordMinLength, passwordRequirements } = securityConfig.auth;

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(passwordMinLength, `Password must be at least ${passwordMinLength} characters`)
    .refine(
      (password) => passwordRequirements.uppercase && /[A-Z]/.test(password),
      'Password must contain at least one uppercase letter'
    )
    .refine(
      (password) => passwordRequirements.lowercase && /[a-z]/.test(password),
      'Password must contain at least one lowercase letter'
    )
    .refine(
      (password) => passwordRequirements.numbers && /\d/.test(password),
      'Password must contain at least one number'
    )
    .refine(
      (password) => passwordRequirements.symbols && /[!@#$%^&*]/.test(password),
      'Password must contain at least one special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;