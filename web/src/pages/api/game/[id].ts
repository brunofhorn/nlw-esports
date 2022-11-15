import type { NextApiRequest, NextApiResponse } from 'next';
import { convertMinutesAmountToHours } from '@utils/convertMinutesAmountToHoursString';
import { prisma } from '@lib/prisma';

export default async function adsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json([]);
  }

  const game = await prisma.game.findUniqueOrThrow({
    select: {
      id: true,
      title: true,
      bannerUrl: true,
    },
    where: {
      id: id as string,
    },
  });

  return res.status(200).json(game);
}
