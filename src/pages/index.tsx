import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperProps } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Game } from '@interfaces/index';
import { GameCard } from '@components/GameCard';
import { CreateAdBanner } from '@components/CreateAdBanner';
import { CreateAdModal } from '@components/CreateAdModal';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';

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
  const [loadingGames, setLoadingGames] = useState(true);

  useEffect(() => {
    setLoadingGames(true);
    axios('/api/games').then(({ data }) => setGames(data));
    setLoadingGames(false);
  }, []);

  return (
    <div className='max-w-[1344px] flex flex-col items-center my-20 mx-20'>
      <Header />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu{' '}
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span>{' '}
        está aqui.
      </h1>
      <Loading load={loadingGames} />
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
