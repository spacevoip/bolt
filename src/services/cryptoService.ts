import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export const cryptoService = {
  hashPassword: async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  verifyPassword: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  },

  generateSalt: async (): Promise<string> => {
    return bcrypt.genSalt(SALT_ROUNDS);
  },
};
