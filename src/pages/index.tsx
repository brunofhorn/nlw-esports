import type { NextPage } from 'next';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from '@components/CreateAdBanner';
import { CreateAdModal } from '@components/CreateAdModal';
import { Header } from '@components/Header';
import GameList from '@components/GameList';
import { useState } from 'react';

const Home: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);

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
        <CreateAdModal open={open} />
      </Dialog.Root>
    </div>
  );
};

export default Home;
