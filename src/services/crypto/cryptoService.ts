import { pbkdf2Sync, randomBytes } from 'crypto';

const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const DIGEST = 'sha512';

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH).toString('hex');
  const hash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  ).toString('hex');
  
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  password: string, 
  storedHash: string
): Promise<boolean> {
  const [salt, hash] = storedHash.split(':');
  const verifyHash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  ).toString('hex');
  
  return hash === verifyHash;
}