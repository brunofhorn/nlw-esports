import NextAuth from 'next-auth';
import { string } from 'zod';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      discriminator?: string | null;
      avatar?: string | null;
      image_url?: string | null;
      username?: string | null;
      id?: string | null;
    };
  }
}
