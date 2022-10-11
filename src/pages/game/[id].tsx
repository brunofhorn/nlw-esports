import { useEffect, useState } from 'react';
import axios from 'axios';
import { DuoCard } from '../../components/DuoCard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';

type Game = {
  id: string;
  title: string;
  bannerUrl: string;
};

type AdsParams = {
  id: string;
  bannerUrl: string;
  username: string;
  userId: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
};

const Game: NextPage<Game> = (props) => {
  const router = useRouter();
  const { id, title, bannerUrl } = router.query as Game;
  const [ads, setAds] = useState<AdsParams[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);

  const getAds = async () => {
    setLoadingAds(true);
    await axios.get(`/api/ads/game/${id}`).then(({ data }) => setAds(data));
    setLoadingAds(false);
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-8 px-4'>
      <Header />
      <div className='w-[100%] lg:h-[436px] flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-12 px-10 py-8 rounded'>
        <div className='flex flex-col items-center gap-6 '>
          <h1 className='text-white font-bold text-3xl md:text-4xl lg:text-2xl'>
            {title}
          </h1>
          <img
            src={bannerUrl}
            alt={title}
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
                <DuoCard data={ad} key={ad.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
