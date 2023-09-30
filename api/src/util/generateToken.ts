import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: '1h',
  });
};