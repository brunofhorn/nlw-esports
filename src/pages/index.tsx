import type { NextPage } from 'next';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from '@components/CreateAdBanner';
import { CreateAdForm } from '@components/CreateAdForm';
import { Header } from '@components/Header';
import GameList from '@components/GameList';
import { useContext, useState } from 'react';
import { GameContext } from '@contexts/GamesContext';
import { Loading } from '@components/Loading';
import { Modal } from '@components/Modal';

const Home: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isPageLoading, setIsPageLoading } = useContext(GameContext);

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
      <GameList />
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CreateAdBanner />
        <CreateAdForm open={open} setOpen={setOpen} />
      </Dialog.Root>
      <Dialog.Root open={isPageLoading} onOpenChange={setIsPageLoading}>
        <Modal centered title={'Aguarde! Carregando...'}>
          <Loading load={isPageLoading} />
        </Modal>
      </Dialog.Root>
    </div>
  );
};

export default Home;
