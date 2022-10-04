import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import logo from '@assets/logo.svg';
import Image from 'next/image';

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
      <Image src={logo} alt='NLW eSports' />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu{' '}
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span>{' '}
        está aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'></div>
      <Dialog.Root>
        {/* <CreateAdBanner />
        <CreateAdModal /> */}
      </Dialog.Root>
    </div>
  );
};

export default Home;
