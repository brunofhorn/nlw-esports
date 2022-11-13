import { Header } from '@components/Header';
import Link from 'next/link';
import { Ghost } from 'phosphor-react';

function Custom404() {
  return (
    <>
      <div className='max-w-[1344px] flex flex-col items-center my-0 mx-2 sm:mx-20 sm:my-20'>
        <Header />
        <div className='text-center mt-10'>
          <Ghost size={60} color='white' />
          <div className='text-3xl font-semibold mb-10 text-white'>
            Ops! Página não encontrada.
          </div>
          <Link href='/' className='bg-violet-400 text-white'>
            <a>Voltar</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Custom404;
