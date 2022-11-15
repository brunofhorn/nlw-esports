import { useState } from 'react';
import { GameController, UserCircle } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { UserDiscordModal } from '@components/UserDiscordModal';
import { Tooltip } from '@components/Tooltip';
import { IDuoCard } from '@interfaces/index';

export function DuoCard({
  id,
  discordImage,
  username,
  yearsPlaying,
  weekDays,
  hourStart,
  hourEnd,
  useVoiceChannel,
}: IDuoCard) {
  const [adSelectedId, setAdSelectedId] = useState('');

  return (
    <li className='w-[100%] h-[84px] pl-5 flex justify-between items-center rounded-lg bg-[#2A2634] hover:bg-[#2a263483] overflow-hidden'>
      {discordImage ? (
        <img
          className='w-12 h-12 rounded-full'
          src={discordImage}
          alt={username}
          title='Foto de Perfil'
        />
      ) : (
        <UserCircle size={55} color='white' />
      )}

      <div className='flex justify-between flex-1 px-4'>
        <div className='flex flex-col text-xs w-[128px]'>
          <p className='text-zinc-400'>Nome</p>
          <span className='text-white font-semibold block truncate'>
            {username}
          </span>
        </div>

        <div className='hidden md:flex md:flex-col md:items-center md:justify-center text-xs'>
          <p className='text-zinc-400'>Tempo de jogo</p>
          <span className='text-white ont-semibold'>
            {yearsPlaying} hora(s)
          </span>
        </div>

        <div className='flex flex-col items-center justify-center text-xs text-center'>
          <p className='text-zinc-400'>Disponibilidade</p>
          <span className='text-white font-semibold'>
            {`${weekDays.length} dia(s) \u2022 ${hourStart} - ${hourEnd}`}
          </span>
        </div>

        <div className='hidden sm:flex sm:flex-col sm:items-center sm:justify-center text-xs'>
          <p className='text-zinc-400'>Chamada de áudio</p>
          <span
            className={`text-white font-semibold ${
              useVoiceChannel ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {useVoiceChannel ? 'Sim' : 'Não'}
          </span>
        </div>
      </div>
      <Dialog.Root>
        <Dialog.Trigger
          onClick={() => setAdSelectedId(id)}
          className='h-[100%] bg-violet-500 hover:bg-violet-600 flex items-center justify-center text-md text-white font-semibold gap-2 p-2'
        >
          <Tooltip description='Clique aqui para visualizar o discord deste usuário.'>
            <GameController size={28} weight='bold' />
          </Tooltip>
        </Dialog.Trigger>
        {adSelectedId && <UserDiscordModal discordId={adSelectedId} />}
      </Dialog.Root>
    </li>
  );
}
