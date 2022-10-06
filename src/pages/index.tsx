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
import { CaretLeft, CaretRight } from 'phosphor-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperProps } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const breakPointsConfig = {
  480: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  900: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
};

const Home: NextPage = () => {
  const [swiper, setSwiper] = useState<SwiperProps>({} as SwiperProps);
  const [games, setGames] = useState<Game[]>([]);

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
      <div className='flex w-[100%] mt-16'>
        <button onClick={() => swiper.slidePrev()}>
          <CaretLeft size={48} className='text-zinc-500' />
        </button>
        <Swiper
          onSwiper={(slider: any) => setSwiper(slider)}
          breakpoints={breakPointsConfig}
          style={{ zIndex: 0, height: 240 }}
        >
          {games.map((game) => (
            <SwiperSlide key={game.id}>
              <GameCard
                id={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={() => swiper.slideNext()}>
          <CaretRight size={48} className='text-zinc-500' />
        </button>
      </div>
      <Dialog.Root modal>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
};

export default Home;
