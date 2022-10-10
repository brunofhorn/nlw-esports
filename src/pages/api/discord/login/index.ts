import { NextApiRequest, NextApiResponse } from 'next';

const OAuthScope = ['identify'].join(' ');
const OAuthData = new URLSearchParams({
  response_type: 'code',
  client_id: process.env.CLIENT_ID as string,
  redirect_uri: encodeURIComponent(
    `${process.env.DOMAIN}/api/discord/callback`
  ),
  scope: OAuthScope,
});

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
}
