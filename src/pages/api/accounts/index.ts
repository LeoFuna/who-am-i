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
    const parsedBody = parseBody(req.body);
    const encryptedPassword = await bcrypt.hash(parsedBody.password, 10);

    const emailAlreadyRegistered = await db.user.findUnique({ where: { email: parsedBody.email } });
    if (!!emailAlreadyRegistered) return res.status(409).end();

    await db.user.create({
      data: {
        ...parsedBody,
        password: encryptedPassword,
        // avatar: {
        //   avatarUrl: parsedBody.avatarUrl,
        // }
      }
    })

    return res.status(201).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
