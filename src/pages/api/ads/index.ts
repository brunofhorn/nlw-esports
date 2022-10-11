import type { NextApiRequest, NextApiResponse } from 'next';
import { convertHoursToMinutesAmount } from '@utils/convertHoursToMinutesAmount';
import { prisma } from '@lib/prisma';

export default async function adsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const ad = await prisma.ad.create({
    data: {
      gameId: body.gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      discordImage: body.discordImage,
      discordId: body.discordId,
      weekDays: body.weekDays.join(','),
      hourStart: convertHoursToMinutesAmount(body.hourStart),
      hourEnd: convertHoursToMinutesAmount(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
}
