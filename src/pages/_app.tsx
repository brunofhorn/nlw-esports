import { GameProvider } from '@contexts/GamesContext';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <GameProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </GameProvider>
  );
}

export default App;
