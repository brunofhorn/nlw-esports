import { useState } from 'react';
import { CaretDown, UserCircle } from 'phosphor-react';
import axios from 'axios';
import Link from 'next/link';

interface DiscordLoginProps {
  clientId: string;
  redirectUri: string;
  scope?: string;
  render?: any;
}

export function Profile() {
  const [user, setUser] = useState('');
  const [loginModal, setLoginModal] = useState(false);

  const discordLogin = async () => {
    const retorno = await axios.get('/api/discord/login');
    console.log('RETORNO: ', retorno);
  };

  return (
    <div
      className='flex gap-2 p-2 items-center cursor-pointer hover:bg-[#1d1a2496] rounded'
      title='Perfil'
    >
      {user === '' ? (
        <Link href={'/api/discord/login'}>
          <button className='flex gap-2'>
            <div className='flex flex-col items-end'>
              <span className='text-white font-semibold text-sm'>
                Efetue o login
              </span>

              <span className='text-zinc-500 text-xs'>no Discord</span>
            </div>

            <UserCircle size={32} color='#FFF' weight='bold' />
          </button>
        </Link>
      ) : (
        <>
          <div className='flex flex-col items-end'>
            <span className='text-white font-semibold text-sm'>Bruno</span>

            <span className='text-zinc-500 text-xs'>#brunofhorn</span>
          </div>

          <img
            className='w-10 h-10 rounded'
            src={`https://cdn.discordapp.com/avatars/`}
          />

          <CaretDown size={16} color='#FFF' weight='bold' />
        </>
      )}
    </div>
  );
}
