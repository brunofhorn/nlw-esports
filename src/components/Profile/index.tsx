import { CaretDown } from 'phosphor-react';

export function Profile() {
  return (
    <div
      className='flex gap-2 p-2 items-center cursor-pointer hover:bg-[#1d1a2496] rounded'
      title='Perfil'
    >
      <div className='flex flex-col items-end'>
        <span className='text-white font-semibold text-sm'>Bruno</span>

        <span className='text-zinc-500 text-xs'>#brunofhorn</span>
      </div>

      <img
        className='w-10 h-10 rounded'
        src={`https://cdn.discordapp.com/avatars/`}
      />

      <CaretDown size={16} color='#FFF' weight='bold' />
    </div>
  );
}
