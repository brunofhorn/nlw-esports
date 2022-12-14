import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { DuoCard } from '@components/DuoCard';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { AppContext } from '@contexts/AppContext';
import { IAds, IGame } from '@interfaces/index';
import { useRouter } from 'next/router';
import axios from 'axios';

const Game: NextPage<IGame> = () => {
  const { gameSelected, setGameSelected, setIsPageLoading } =
    useContext(AppContext);
  const [ads, setAds] = useState<IAds[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const router = useRouter();

  const getAds = async () => {
    await axios
      .get(`/api/ads/game/${gameSelected.id}`)
      .then(({ data }) => setAds(data));
    setLoadingAds(false);
  };

  const getGameData = async () => {
    await axios.get(`/api/game/${router?.query?.id}`).then(({ data }) => {
      setGameSelected(data as IGame);
    });
  };

  useEffect(() => {
    setIsPageLoading(false);
    setLoadingAds(true);

    if (gameSelected && gameSelected.id !== '') {
      getAds();
    }
  }, [gameSelected]);

  useEffect(() => {
    if (!router.isReady) return;

    if (!gameSelected || gameSelected.id === '') {
      getGameData();
    }
  }, [router.isReady]);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-8 px-0 md:px-4'>
      <Header />
      <div className='w-[100%] lg:h-[436px] flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-0 md:mt-12 px-10 py-0 md:pt-8 pb-8 rounded'>
        <div className='flex flex-col items-center gap-6'>
          <h1 className='text-white font-bold text-3xl md:text-3xl lg:text-xl text-center'>
            {gameSelected.title}
          </h1>
          <img
            src={gameSelected.bannerUrl}
            alt={gameSelected.title}
            className='w-[300px] rounded shadow-[0_1px_20px_10px_#0c0c0ca9]'
          />
        </div>
        <div className='flex flex-col gap-8 self-start w-[100%] h-[100%]'>
          <h2 className='bg-nlw-gradient bg-clip-text text-transparent text-xl font-bold'>
            Escontre seu duo e bora se conectar:
          </h2>
          <div className='overflow-y-auto pr-2 relative h-[100%] w-[100%]'>
            <Loading load={loadingAds} />
            <ul className='flex flex-col w-[100%] gap-3'>
              {ads.map((ad) => (
                <DuoCard {...ad} key={ad.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
