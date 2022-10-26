import { useRouter } from 'next/router';
import { IGameCardProps } from '@interfaces/index';
import { useContext } from 'react';
import { GameContext } from '@contexts/GamesContext';

export function GameCard({ game }: IGameCardProps) {
  const router = useRouter();
  const { id, _count, bannerUrl, title } = game;
  const { setGameSelected, setIsPageLoading } = useContext(GameContext);

  function handleRedirectToGame() {
    setIsPageLoading(true);
    setGameSelected(game);
    router.push({ pathname: '/game/[id]' }, `/game/${id}`);
  }

  return (
    <button
      className='relative rounded-lg overflow-hidden w-[100%] h-[100%]'
      onClick={_count.ads > 0 ? handleRedirectToGame : () => null}
    >
      <img src={bannerUrl} className='w-[100%] h-[100%] rounded-lg ' />
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 flex flex-col items-start'>
        <strong className='font-bold text-white block text-left'>
          {title}
        </strong>
        <span className='text-zinc-300 text-sm block'>
          {_count.ads} anúncio(s)
        </span>
      </div>
    </button>
  );
}
