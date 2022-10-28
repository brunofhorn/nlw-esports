import type { NextPage } from 'next';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from '@components/CreateAdBanner';
import { CreateAdForm } from '@components/CreateAdForm';
import { Header } from '@components/Header';
import GameList from '@components/GameList';
import { useContext, useState } from 'react';
import { AppContext } from '@contexts/AppContext';
import { Loading } from '@components/Loading';
import { Modal } from '@components/Modal';

const Home: NextPage = () => {
  const { isPageLoading, setIsPageLoading } = useContext(AppContext);

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
      <CreateAdBanner />
      <CreateAdForm />
      <Modal
        open={isPageLoading}
        setOpen={setIsPageLoading}
        centered
        title={'Aguarde! Carregando...'}
      >
        <Loading load={isPageLoading} />
      </Modal>
    </div>
  );
};

export default Home;
