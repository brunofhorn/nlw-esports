import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Game } from '../../interfaces';

const prisma = new PrismaClient();

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('PRISMA');
  const games: Game[] = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  console.log('GAMES: ', games);

  res.status(200).json(games);
}
