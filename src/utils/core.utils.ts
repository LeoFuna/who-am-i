import { NextApiRequest, NextApiResponse } from 'next';
// Initialize the cors middleware
export const initMiddleware = (middleware: any) => (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export const parseBody = (body: any) => {
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    parsedBody = body;
  }
  return parsedBody as NextApiRequest['body'];
}