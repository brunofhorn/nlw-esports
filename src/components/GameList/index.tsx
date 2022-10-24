import { useContext, useEffect, useState } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperProps } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Game } from '@interfaces/index';
import { GameCard } from '@components/GameCard';
import { Loading } from '@components/Loading';
import axios from 'axios';
import { GameContext } from '@contexts/GamesContext';

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
    slidesPerView: 6,
    spaceBetween: 20,
  },
};

export default function GameList() {
  const [swiper, setSwiper] = useState<SwiperProps>({} as SwiperProps);
  const { games, setGames } = useContext(GameContext);
  const [loadingGames, setLoadingGames] = useState(true);

  const loadGames = async () => {
    await axios('/api/games').then(({ data }) => setGames(data));
  };

  useEffect(() => {
    setLoadingGames(true);
    loadGames();
    setLoadingGames(false);
  }, []);

  return (
    <>
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
            <SwiperSlide
              key={game.id}
              className='border-2 border-transparent hover:border-2 hover:border-slate-200 hover:rounded-xl'
            >
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
    </>
  );
}
