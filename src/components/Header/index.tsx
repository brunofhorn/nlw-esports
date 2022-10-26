import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '@assets/logo.svg';
import { Profile } from '@components/Profile';
import { useContext } from 'react';
import { AppContext } from '@contexts/AppContext';

export function Header() {
  const { setIsPageLoading } = useContext(AppContext);
  const router = useRouter();

  const handleBack = () => {
    setIsPageLoading(false);
    router.back();
  };

  return (
    <div className='w-[100%] flex p-2 items-center justify-between cursor-pointer mb-8'>
      <div className='flex flex-1 justify-start items-center'>
        {router.pathname !== '/' && (
          <button
            onClick={handleBack}
            className='p-2 rounded bg-[#2a2634] hover:bg-[#2a263494] text-zinc-200 hover:text-violet-500'
          >
            <ArrowLeft size={24} />
          </button>
        )}
      </div>
      <div className='flex flex-1 justify-center items-center'>
        <Image src={logo} alt='NLW eSports' />
      </div>
      <div className='flex flex-1 justify-end items-center'>
        <Profile />
      </div>
    </div>
  );
}
