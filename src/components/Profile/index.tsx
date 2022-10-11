import { UserCircle } from 'phosphor-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export function Profile() {
  const { data: session } = useSession();

  if (session) {
    const { user } = session;

    return (
      <div
        className='flex gap-2 p-2 items-center cursor-pointer hover:bg-[#1d1a2496] rounded'
        title='Perfil'
      >
        <div className='flex flex-col items-end'>
          <span className='text-white font-semibold text-sm'>
            {user?.username}
          </span>

          <span className='text-zinc-500 text-xs' onClick={() => signOut()}>
            #{user?.discriminator}
          </span>
        </div>

        {user?.image_url && (
          <img className='w-10 h-10 rounded-full' src={user.image_url} />
        )}
      </div>
    );
  } else {
    return (
      <div
        className='flex gap-2 p-2 items-center cursor-pointer hover:bg-[#1d1a2496] rounded'
        title='Perfil'
      >
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
    );
  }
}
