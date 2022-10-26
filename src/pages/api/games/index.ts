import type { NextApiRequest, NextApiResponse } from 'next';
import type { IGame } from '@interfaces/index';
import { prisma } from '@lib/prisma';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const games: IGame[] = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  res.status(200).json(games);
}
