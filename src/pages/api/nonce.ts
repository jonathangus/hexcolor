import { NextApiHandler } from 'next';
import { generateNonce } from 'siwe';

const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(generateNonce());
};

export default handler;
