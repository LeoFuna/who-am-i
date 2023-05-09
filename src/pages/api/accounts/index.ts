import db from './../../../../prisma/db';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import bcrypt from 'bcrypt';
import { initMiddleware, parseBody } from '@/utils/core.utils';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === 'GET') {
    const users = await db.user.findMany({})
    return res.json(users);
  }

  if (req.method === 'POST') {
    const { avatarUrl, ...rest } = parseBody(req.body);
    const encryptedPassword = await bcrypt.hash(rest.password, 10);

    const emailAlreadyRegistered = await db.user.findUnique({ where: { email: rest.email } });
    if (!!emailAlreadyRegistered) return res.status(409).end();

    const user = await db.user.create({
      data: {
        ...rest,
        password: encryptedPassword,
      }
    });

    await db.avatar.create({ data: { userId: user.id, avatarUrl } });

    return res.status(201).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
