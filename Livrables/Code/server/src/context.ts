import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
}

export const createContext = async ({ req }: { req: any }): Promise<Context> => {
  const authorization = req.headers.authorization || '';
  const token = authorization.replace('Bearer ', '');
  
  try {
    const { userId } = token ? (jwt.verify(token, JWT_SECRET) as { userId: string }) : { userId: null };
    return {
      prisma,
      userId,
    };
  } catch (error) {
    return {
      prisma,
      userId: null,
    };
  }
};
