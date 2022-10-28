import { UserCircle } from 'phosphor-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Tooltip } from '@components/Tooltip';

export function Profile() {
  const { data: session } = useSession();

  if (session) {
    const { user } = session;

    return (
      <Tooltip description='Este é o seu perfil no discord.'>
        <div className='flex gap-2 p-2 items-center cursor-pointer hover:bg-[#1d1a2496] rounded'>
          <div className='flex flex-col items-end'>
            <span className='text-white font-semibold text-sm'>
              {user?.username}#{user?.discriminator}
            </span>
            <span className='text-zinc-500 text-xs' onClick={() => signOut()}>
              Sair
            </span>
          </div>

          {user?.image_url && (
            <img className='w-10 h-10 rounded-full' src={user.image_url} />
          )}
        </div>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip description='Efetue o login no discord clicando aqui.'>
        <div className='flex gap-2 p-2 items-center cursor-pointer hover:bg-[#1d1a2496] rounded'>
          <button onClick={() => signIn('discord')} className='flex gap-2'>
            <div className='flex flex-col items-end'>
              <span className='text-white font-semibold text-sm'>
                Efetue o login
              </span>

              <span className='text-zinc-500 text-xs'>no Discord</span>
            </div>

            <UserCircle size={32} color='#FFF' weight='bold' />
          </button>
        </div>
      </Tooltip>
    );
  }
}
