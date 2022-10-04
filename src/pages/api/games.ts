// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Game } from '../../interfaces';

const games: Game[] = [
  {
    id: '1223',
    title: 'Resident Evil',
    bannerUrl: '122',
    _count: {
      ads: 1,
    },
  },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(games);
}
