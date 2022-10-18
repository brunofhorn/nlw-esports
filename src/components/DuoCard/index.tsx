import { useState } from 'react';
import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { UserDiscordModal } from '@components/UserDiscordModal';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface DuoCardProps {
  id: string;
  discordImage: string;
  username: string;
  discordId: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect?: () => void;
}

export function DuoCard({ data }: Props) {
  const [adSelectedId, setAdSelectedId] = useState('');

  return (
    <li className='w-[100%] h-[84px] pl-5 flex justify-between items-center rounded-lg bg-[#2A2634] hover:bg-[#2a263483] overflow-hidden'>
      <img
        className='w-12 h-12 rounded-full hidden md:block'
        src={data.discordImage}
        alt={data.username}
        title='Foto de Perfil'
      />

      <div className='flex justify-between flex-1 px-4'>
        <div className='flex flex-col text-xs w-[128px]'>
          <p className='text-zinc-400'>Nome</p>
          <span className='text-white font-semibold block truncate'>
            {data.username}
          </span>
        </div>

        <div className='hidden md:flex md:flex-col md:items-center md:justify-center text-xs'>
          <p className='text-zinc-400'>Tempo de jogo</p>
          <span className='text-white ont-semibold'>
            {data.yearsPlaying} hora(s)
          </span>
        </div>

        <div className='flex flex-col items-center justify-center text-xs text-center'>
          <p className='text-zinc-400'>Disponibilidade</p>
          <span className='text-white font-semibold'>
            {`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}
          </span>
        </div>

        <div className='hidden sm:flex sm:flex-col sm:items-center sm:justify-center text-xs'>
          <p className='text-zinc-400'>Chamada de áudio</p>
          <span
            className={`text-white font-semibold ${
              data.useVoiceChannel ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {data.useVoiceChannel ? 'Sim' : 'Não'}
          </span>
        </div>
      </div>

      {/* MODAL - DISCORD ID */}
      <Dialog.Root>
        <Dialog.Trigger
          onClick={() => setAdSelectedId(data.id)}
          className='h-[100%] bg-violet-500 hover:bg-violet-600 flex items-center justify-center text-md text-white font-semibold gap-2 p-2'
        >
          <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root delayDuration={0}>
              <TooltipPrimitive.Trigger asChild>
                <GameController size={28} weight='bold' />
              </TooltipPrimitive.Trigger>
              <TooltipPrimitive.Content
                sideOffset={4}
                className='radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade inline-flex items-center rounded-md px-4 py-2.5 bg-white dark:bg-gray-800'
              >
                <TooltipPrimitive.Arrow className='mb-8 fill-current text-white dark:text-gray-800' />
                <span className='block text-xs leading-none text-gray-700 dark:text-gray-100'>
                  Clique aqui para visualizar o discord deste usuário.
                </span>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
          </TooltipPrimitive.Provider>
        </Dialog.Trigger>
        {adSelectedId && <UserDiscordModal discordId={adSelectedId} />}
      </Dialog.Root>
    </li>
  );
}
