import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/SelectInput';
import { Label } from '@components/Form/Label';
import { Toggle } from '@components/Form/Toggle';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { ErrorMessage } from '@components/ErrorMessage';
import { Loading } from '@components/Loading';
interface Game {
  id: string;
  title: string;
}

const discordRegex = new RegExp('^.{3,32}#[0-9]{4}$');

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'O nome / nickname deve possui no mínimo 3 caracteres.',
  }),
  yearsPlaying: z
    .string()
    .min(1, { message: 'O preenchimento é obrigatório.' })
    .max(300, { message: 'O valor deve ser menor do que 300.' }),
  discord: z.string().regex(discordRegex, {
    message: 'O formato padrão para o discord é: nome#0000',
  }),
  hourStart: z
    .string()
    .min(5, { message: 'O preenchimento do horário é obrigatório.' }),
  hourEnd: z
    .string()
    .min(5, { message: 'O preenchimento do horário é obrigatório.' }),
});

type formInputs = z.infer<typeof formSchema>;

export function CreateAdModal() {
  const { data: session, status } = useSession();
  const [games, setGames] = useState<Game[]>([]);
  const [gameSelected, setGameSelected] = useState('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [discord, setDiscord] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [discordImage, setDiscordImage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      setDiscord(`${session?.user?.username}#${session?.user?.discriminator}`);
      setDiscordId(session.user?.id as string);
      setDiscordImage(session.user?.image_url as string);
      setUsername(session?.user?.username as string);
    }
  }, [status]);

  const methods = useForm<formInputs>({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = methods;

  useEffect(() => {
    axios('api/games').then(({ data }) => setGames(data));
  }, []);

  const handleCreateAd = async (data: formInputs) => {
    try {
      if (!gameSelected || !weekDays) {
        return;
      }

      console.log(data);

      await axios.post(`api/ads/`, {
        gameId: gameSelected,
        username: data.username,
        discordId,
        discordImage,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays?.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      alert('Anuncio criado com sucesso');
      reset();
    } catch (error) {
      alert('Erro ao criar o anúncio!');
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
        <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white mt-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-2xl font-black'>
            Publique um anúncio
          </Dialog.Title>
          {discord === '' ? (
            <Loading load={true} size={20} />
          ) : (
            <form
              onSubmit={handleSubmit(handleCreateAd)}
              className='mt-8 flex flex-col gap-4'
            >
              <div className='flex flex-col gap-2'>
                <Label htmlFor='game' text='Qual o game?' />
                <Select
                  label='Games'
                  options={games}
                  onSelectedChange={(option) => setGameSelected(option)}
                  placeholder='Selecione o game que deseja jogar...'
                  name='game'
                  id='game'
                />
                {!gameSelected && isValid && (
                  <ErrorMessage
                    message={'É obrigatório a seleção de um jogo'}
                  />
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='name' text='Seu nome (ou nickname)' />
                <Input
                  id='username'
                  name='username'
                  registerName='username'
                  placeholder='Como te chamam dentro do game?'
                  defaultValue={username}
                />
                {errors.username && (
                  <ErrorMessage message={errors.username.message} />
                )}
              </div>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='yearsPlaying' text='Joga há quantos anos?' />
                  <Input
                    type='number'
                    min='0'
                    max='301'
                    id='yearsPlaying'
                    name='yearsPlaying'
                    registerName='yearsPlaying'
                    placeholder='Tudo bem ser ZERO'
                  />
                  {errors.yearsPlaying && (
                    <ErrorMessage message={errors.yearsPlaying.message} />
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='discord' text='Qual seu discord?' />
                  <Input
                    id='discord'
                    name='discord'
                    registerName='discord'
                    placeholder='Usuario#8080'
                    defaultValue={discord}
                  />
                  {errors.discord && (
                    <ErrorMessage message={errors.discord.message} />
                  )}
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2 flex-1'>
                  <Label htmlFor='weekDays' text='Quando costuma jogar?' />
                  <ToggleGroup.Root
                    type='multiple'
                    className='grid grid-cols-7 gap-2'
                    value={weekDays}
                    onValueChange={setWeekDays}
                    aria-label='Dias da semana'
                  >
                    <Toggle
                      value={'0'}
                      weekDays={weekDays}
                      title={'Domingo'}
                      letter={'D'}
                    />
                    <Toggle
                      value={'1'}
                      weekDays={weekDays}
                      title={'Segunda'}
                      letter={'S'}
                    />
                    <Toggle
                      value={'2'}
                      weekDays={weekDays}
                      title={'Terça'}
                      letter={'T'}
                    />
                    <Toggle
                      value={'3'}
                      weekDays={weekDays}
                      title={'Quarta'}
                      letter={'Q'}
                    />
                    <Toggle
                      value={'4'}
                      weekDays={weekDays}
                      title={'Quinta'}
                      letter={'Q'}
                    />
                    <Toggle
                      value={'5'}
                      weekDays={weekDays}
                      title={'Sexta'}
                      letter={'S'}
                    />
                    <Toggle
                      value={'6'}
                      weekDays={weekDays}
                      title={'Sábado'}
                      letter={'S'}
                    />
                  </ToggleGroup.Root>
                  {!weekDays && isValid && (
                    <ErrorMessage message={'Selecione os dias da semana.'} />
                  )}
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <Label htmlFor='hourStart' text='Qual horário do dia?' />
                  <div className='grid grid-cols-2 gap-2'>
                    <Input
                      type='time'
                      id='hourStart'
                      name='hourStart'
                      placeholder='De'
                      registerName='hourStart'
                    />
                    <Input
                      type='time'
                      id='hourEnd'
                      name='hourEnd'
                      placeholder='Até'
                      registerName='hourEnd'
                    />
                  </div>
                  {(errors.hourStart || errors.hourEnd) && (
                    <ErrorMessage message={'Informar os horários'} />
                  )}
                </div>
              </div>
              <div className='mt-2 flex items-center gap-2 text-xs'>
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
              <footer className='mt-2 flex justify-end gap-4'>
                <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                  Cancelar
                </Dialog.Close>
                <button
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                  type='submit'
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </FormProvider>
  );
}
