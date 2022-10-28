import { IDiscordProfile } from '@interfaces/index';
import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord';

const scopes = ['identify'].join(' ');

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: scopes } },
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        return {
          id: profile.id,
          name: profile.username,
          discriminator: profile.discriminator,
          image: profile.image_url,
          accentColor: profile.accentColor,
        };
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ profile }) {
      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.profile as DiscordProfile;
      return session;
    },
  },
};

export default NextAuth(authOptions);
