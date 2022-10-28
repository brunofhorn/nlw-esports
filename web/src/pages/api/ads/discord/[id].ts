import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@lib/prisma';

export default async function adsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  console.log(id);

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: id as string,
    },
  });

  return res.status(200).json({ discord: ad.discord });
}
