import { AppContext } from '@contexts/AppContext';
import { PlusCircle } from 'phosphor-react';
import { useContext } from 'react';

export function CreateAdBanner() {
  const { setIsAdsModalOpen } = useContext(AppContext);

  return (
    <>
      <div className='pt-1 mt-8 mb-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 flex flex-col md:flex-row md:flex-1 justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block text-center md:text-left'>
              Não encontrou seu duo?
            </strong>
            <span className='text-zinc-400 block text-center md:text-left'>
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <button
            onClick={() => setIsAdsModalOpen(true)}
            className='mt-5 md:mt-0 py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3'
          >
            <PlusCircle size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </>
  );
}
