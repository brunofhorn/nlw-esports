import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from '../Form/Input';
import { SelectInput } from '../Form/SelectInput';
import { Label } from '@components/Form/Label';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [gameSelected, setGameSelected] = useState('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('api/games').then(({ data }) => setGames(data));
  }, []);

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      alert('Preencha tudo');
      return;
    }

    try {
      axios.post(`api/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert('Anúncio criado com sucesso.');
    } catch (error) {
      alert('Erro ao criar o anúncio!');
    }

    console.log(data);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white mt-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-2xl font-black'>
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='game' text='Qual o game?' />
            <SelectInput
              gameSelected={gameSelected}
              games={games}
              setGameSelected={setGameSelected}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name' text='Seu nome (ou nickname)' />
            <Input
              id='name'
              name='name'
              placeholder='Como te chamam dentro do game?'
            />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='yearsPlaying' text='Joga há quantos anos?' />
              <Input
                id='yearsPlaying'
                name='yearsPlaying'
                placeholder='Tudo bem ser ZERO'
                type='number'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='discord' text='Qual seu discord?' />
              <Input id='discord' name='discord' placeholder='Usuario#8080' />
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='weekDays' text='Quando costuma jogar?' />
              <ToggleGroup.Root
                type='multiple'
                className='grid grid-cols-4 gap-2'
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value='0'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Domingo'
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Segunda'
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='2'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Terça'
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='3'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Quarta'
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='4'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Quinta'
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='5'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Sexta'
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='6'
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title='Sábado'
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <Label htmlFor='hourStart' text='Qual horário do dia?' />
              <div className='grid grid-cols-2 gap-2'>
                <Input
                  name='hourStart'
                  id='hourStart'
                  type='time'
                  placeholder='De'
                />
                <Input
                  name='hourEnd'
                  id='hourEnd'
                  type='time'
                  placeholder='Até'
                />
              </div>
            </div>
          </div>
          <div className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </div>
          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold  flex items-center gap-3 hover:bg-violet-600'
              type='submit'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
