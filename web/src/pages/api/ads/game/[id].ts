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

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      discord: true,
      discordImage: true,
      discordId: true,
      username: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json(
    ads.map((ad) => {
      return {
        ...ad,
        discordImage: ad.discordImage?.trim().includes('http')
          ? ad.discordImage
          : ad.discordId !== '' && ad.discordImage !== ''
          ? `https://cdn.discordapp.com/avatars/${ad.discordId}/${ad.discordImage}.png`
          : '',
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesAmountToHours(ad.hourStart),
        hourEnd: convertMinutesAmountToHours(ad.hourEnd),
      };
    })
  );
}
