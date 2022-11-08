import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, DiscordLogo, GameController, Spinner, X } from 'phosphor-react';
import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/SelectInput';
import { Label } from '@components/Form/Label';
import { Toggle } from '@components/Form/Toggle';
import { signIn, useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { ErrorMessage } from '@components/ErrorMessage';
import { Toast } from '@components/Toast';
import { AppContext } from '@contexts/AppContext';
import { Modal } from '@components/Modal';
import { convertHoursToMinutesAmount } from '@utils/convertHoursToMinutesAmount';

const discordRegex = new RegExp('^.{3,32}#[0-9]{4}$');

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'O nome / nickname deve possui no mínimo 3 caracteres.',
  }),
  yearsPlaying: z
    .string()
    .min(1, { message: 'É obrigatório preencher há quantos anos joga.' })
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

export function CreateAdForm() {
  const { isAdsModalOpen, setIsAdsModalOpen, games, setGames, refreshAds } =
    useContext(AppContext);
  const { data: session, status } = useSession();
  const [gameSelected, setGameSelected] = useState('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [discord, setDiscord] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [discordImage, setDiscordImage] = useState('');
  const [username, setUsername] = useState('');
  const [errorGameSelected, setErrorGameSelected] = useState<boolean>(false);
  const [errorWeekDays, setErrorWeekDays] = useState<boolean>(false);
  const [errorHours, setErrorHours] = useState<boolean>(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [dadosToast, setDadosToast] = useState({
    type: '',
    title: '',
    message: '',
  });

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
      if (!gameSelected) {
        setErrorGameSelected(true);
        return;
      }

      if (weekDays.length == 0) {
        setErrorWeekDays(true);
        return;
      }

      if (
        convertHoursToMinutesAmount(data.hourStart) >
        convertHoursToMinutesAmount(data.hourEnd)
      ) {
        setErrorHours(true);
        return;
      }

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

      setDadosToast({
        type: 'success',
        title: 'PARABÉNS!',
        message: 'O anúncio foi criado com sucesso.',
      });

      refreshAds(gameSelected);
    } catch (error) {
      setDadosToast({
        type: 'error',
        title: 'ATENÇÃO!',
        message: 'Ocorreu um erro ao criar o anúncio.',
      });
    }

    handleCancel();
    setToastOpen(true);
  };

  const handleCancel = () => {
    reset();
    setGameSelected('');
    setWeekDays([]);
    setErrorGameSelected(false);
    setErrorHours(false);
    setErrorWeekDays(false);
    setIsAdsModalOpen(false);
  };

  useEffect(() => {
    if (!isAdsModalOpen) {
      handleCancel();
    }
  }, [isAdsModalOpen]);

  useEffect(() => {
    if (gameSelected !== '') {
      setErrorGameSelected(false);
    }
  }, [gameSelected]);

  useEffect(() => {
    if (weekDays.length > 0) {
      setErrorWeekDays(false);
    }
  }, [weekDays.length]);

  return (
    <FormProvider {...methods}>
      <Modal
        open={isAdsModalOpen}
        setOpen={setIsAdsModalOpen}
        title='Publique um anúncio'
        close
      >
        <form
          onSubmit={handleSubmit(handleCreateAd)}
          className='mt-6 flex flex-col gap-4'
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
            {!gameSelected && errorGameSelected && (
              <ErrorMessage message={'É obrigatório a seleção de um jogo'} />
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
              {discord === '' && (
                <button
                  className='bg-violet-600 rounded pl-1.5 mt-7 right-11 w-7 h-7 absolute'
                  onClick={() => signIn('discord')}
                >
                  <DiscordLogo size={18} />
                </button>
              )}
            </div>
          </div>
          {errors.yearsPlaying && (
            <ErrorMessage message={errors.yearsPlaying.message} />
          )}
          {errors.discord && <ErrorMessage message={errors.discord.message} />}
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
            </div>
          </div>
          {weekDays.length == 0 && errorWeekDays && (
            <ErrorMessage
              message={'Selecione os dias da semana que costuma jogar.'}
            />
          )}
          {(errors.hourStart || errors.hourEnd) && (
            <ErrorMessage message={'Informar os horários inicial e final.'} />
          )}
          {errorHours && (
            <ErrorMessage
              message={'A hora inicial não pode ser maior que a hora final.'}
            />
          )}
          <div className='mt-2 flex items-center gap-2 text-label md:text-xs'>
            <Checkbox.Root
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              onCheckedChange={(checked) =>
                setUseVoiceChannel(checked as boolean)
              }
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
              {isSubmitting ? (
                <Spinner size={20} className='animate-spin-slow' />
              ) : (
                <>
                  <GameController size={24} />
                  Encontrar duo
                </>
              )}
            </button>
          </footer>
        </form>
      </Modal>
      <Toast open={toastOpen} setOpen={setToastOpen} dados={dadosToast} />
    </FormProvider>
  );
}
