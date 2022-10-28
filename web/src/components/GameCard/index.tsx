import { useRouter } from 'next/router';
import { IGameCardProps } from '@interfaces/index';
import { useContext, useState } from 'react';
import { AppContext } from '@contexts/AppContext';
import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from '@components/Modal';

export function GameCard({ game }: IGameCardProps) {
  const router = useRouter();
  const { id, _count, bannerUrl, title } = game;
  const { setGameSelected, setIsPageLoading } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRedirectToGame = () => {
    setIsPageLoading(true);
    setGameSelected(game);
    router.push({ pathname: '/game/[id]' }, `/game/${id}`);
  };

  const handleClick = () => {
    if (_count.ads > 0) {
      handleRedirectToGame();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        className='relative rounded-lg overflow-hidden w-[100%] h-[100%]'
        onClick={handleClick}
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
    </>
  );
}
