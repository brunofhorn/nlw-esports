import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import logo from '@assets/logo.svg';
import Image from 'next/image';
import { GameCard } from '../components/GameCard';
import type { Game } from '../interfaces';
import { CreateAdBanner } from '@components/CreateAdBanner';
import { CreateAdModal } from '@components/CreateAdModal';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const Home: NextPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 6,
      spacing: 10,
    },
  });

  useEffect(() => {
    axios('/api/games').then(({ data }) => setGames(data));
  }, []);

  return (
    <div className='max-w-[1344px] flex flex-col items-center my-20 mx-20'>
      <Image src={logo} alt='NLW eSports' />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu{' '}
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span>{' '}
        está aqui.
      </h1>
      <div className='mt-16 keen-slider' ref={ref}>
        {games.map((game, index) => (
          <GameCard
            className={`keen-slider__slide number-slide${index}`}
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root modal>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
};

export default Home;
