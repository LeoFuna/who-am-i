import db from './../../../../prisma/db';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import bcrypt from 'bcrypt';
import { initMiddleware, parseBody } from '@/utils/core.utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

//Usado para aumentar o limite do body de 1mb (default) para 4mb
export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb'
      }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: 'Please log in...' });
  
  if (req.method === 'GET') {
    const users = await db.user.findMany({});

    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    try {
      const { avatarUrl, ...rest } = parseBody(req.body);
      const encryptedPassword = await bcrypt.hash(rest.password, 10);
  
      const emailAlreadyRegistered = await db.user.findUnique({ where: { email: rest.email } });
      if (!!emailAlreadyRegistered) return res.status(409).end();
  
      await db.user.create({
        data: {
          ...rest,
          password: encryptedPassword,
          avatar: {
            create: {
              avatarUrl,
            },
          },
        },
      });
  
      return res.status(201).end();
    } catch(e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
