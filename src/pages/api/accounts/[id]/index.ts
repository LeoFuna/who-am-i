import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { initMiddleware } from '@/utils/core.utils';
import accountDetailsService from '@/services/accounts/accounts.details';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === 'GET') {
    const id = req.query.id as string;
    const user = await accountDetailsService({ id });

    return res.status(200).json(user);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}