import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../public/logo-nlw-esports.svg';
import * as Dialog from '@radix-ui/react-dialog';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const Home: NextPage = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('/api/games').then(({ data }) => setGames(data));
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu{' '}
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span>{' '}
        está aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => (
          <div>teste</div>
          // <GameBanner
          //   key={game.id}
          //   bannerUrl={game.bannerUrl}
          //   title={game.title}
          //   adsCount={game._count.ads}
          // />
        ))}
      </div>
      <Dialog.Root>
        {/* <CreateAdBanner />
        <CreateAdModal /> */}
      </Dialog.Root>
    </div>
  );
};

export default Home;
