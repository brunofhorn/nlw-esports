import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { IGamesFormated, IModal } from '../../interfaces';
import { Modal } from '../Modal';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CheckSquare,
  DiscordLogo,
  GameController,
  Spinner,
  Square,
} from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { Label } from '../Label';
import { SelectGames } from '../SelectGame';
import { useEffect, useState } from 'react';
import { Toggle } from '../Toggle';
import { useApp } from '../../hooks/useApp';
import { convertHoursToMinutesAmount } from '../../utils/convertHoursToMinutesAmount';
import { api } from '../../services/api';
import { ErrorMessage } from '../ErrorMessage';
import Toast from 'react-native-toast-message';
import MaskInput from 'react-native-mask-input';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

const discordRegex = new RegExp('^.{3,32}#[0-9]{4}$');

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required('O campo nome é obrigatório.')
      .min(3, 'O nome / nickname deve possui no mínimo 3 caracteres.'),
    yearsPlaying: yup
      .number()
      .min(0, 'É preciso preencher um valor neste campo')
      .max(99, 'Não é possível ter mais de 99 anos só de jogos.'),
    discord: yup
      .string()
      .matches(discordRegex, {
        message: 'O formato padrão para o discord é: nome#0000',
      })
      .required('O campo discord é obrigatório.'),
    hourStart: yup.string().min(5).required('O campo de horas é obrigatório.'),
    hourEnd: yup.string().min(5).required('O campo de horas é obrigatório.'),
  })
  .required();

export function ModalCreateAd({ visible, setVisible }: IModal) {
  const { gameSelected, setGameSelected, refreshAds } = useApp();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [errorGameSelected, setErrorGameSelected] = useState(false);
  const [errorWeekDays, setErrorWeekDays] = useState(false);
  const [errorHours, setErrorHours] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateAd = async (data: any) => {
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

      await api.post(`/ads/`, {
        gameId: gameSelected.Value,
        username: data.username,
        discordId: '',
        discordImage: '',
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays?.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      refreshAds(gameSelected.Value);
      handleCancel();

      Toast.show({
        type: 'success',
        text1: 'PARABÉNS!',
        text2: 'O anúncio foi criado com sucesso.',
      });
    } catch (error) {
      console.log(error);

      Toast.show({
        type: 'error',
        text1: 'OPS!',
        text2: 'Ocorreu um erro ao criar o anúncio.',
      });
    }
  };

  const handleCancel = () => {
    reset();
    setGameSelected({} as IGamesFormated);
    setWeekDays([]);
    setErrorGameSelected(false);
    setErrorHours(false);
    setErrorWeekDays(false);
    setUseVoiceChannel(false);
    setVisible(false);
  };

  const handleSelectWeekDay = (weekDay: string) => {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays.filter((day) => day !== weekDay));
    } else {
      setWeekDays([...weekDays, weekDay]);
    }
  };

  useEffect(() => {
    if (gameSelected.Value !== '') {
      setErrorGameSelected(false);
    }
  }, [gameSelected]);

  useEffect(() => {
    if (weekDays.length > 0) {
      setErrorWeekDays(false);
    }
  }, [weekDays.length]);

  const handleDiscordSignIn = async () => {
    const response = await AuthSession.startAsync({
      authUrl:
        'https://discord.com/api/oauth2/authorize?client_id=1028461626694848522&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40brunofhorn%2Fnlw-eSports&response_type=token&scope=identify',
    });

    if (response.type === 'success') {
      const { data } = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${response.params?.access_token}`,
        },
      });

      // data: {
      //   "accent_color": null,
      //   "avatar": "6068afbc33b26bd08ef4d061d8967265",
      //   "avatar_decoration": null,
      //   "banner": null,
      //   "banner_color": null,
      //   "discriminator": "1703",
      //   "email": "b.fernandeshorn@gmail.com",
      //   "flags": 0,
      //   "id": "1019236735726649375",
      //   "locale": "pt-BR",
      //   "mfa_enabled": false,
      //   "premium_type": 0,
      //   "public_flags": 0,
      //   "username": "brunofhorn",
      //   "verified": true
      // }
    } else {
      Toast.show({
        type: 'error',
        text1: 'OPS!',
        text2: 'Ocorreu um erro ao tentar efetuar o login com o Discord.',
      });
    }
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <View style={{ width: '100%' }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
          Publique um anúncio
        </Text>
        <ScrollView style={{ maxHeight: 450, marginTop: 10 }}>
          <View style={{ marginTop: 25 }}>
            <Label text='Qual o game?' />
            <SelectGames />
            {!gameSelected && errorGameSelected && (
              <ErrorMessage message={'É obrigatório a seleção de um jogo'} />
            )}
            <Label text='Seu nome (ou nickname)' />
            <Controller
              name='username'
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  placeholder='Como te chamam dentro do game?'
                  placeholderTextColor={THEME.COLORS.CAPTION_400}
                />
              )}
            />
            {errors.username && (
              <ErrorMessage message={errors.username.message?.toString()} />
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <Label text='Joga há quantos anos?' />
                <Controller
                  name='yearsPlaying'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      keyboardType='numeric'
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      placeholder={'Tudo bem ser ZERO'}
                      placeholderTextColor={THEME.COLORS.CAPTION_400}
                    />
                  )}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Label text='Qual é o teu discord?' />
                <Controller
                  name='discord'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      placeholder={'Usuario#8080'}
                      placeholderTextColor={THEME.COLORS.CAPTION_400}
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => handleDiscordSignIn()}
                  style={styles.discordButton}
                >
                  <DiscordLogo size={20} color='white' />
                </TouchableOpacity>
              </View>
            </View>
            {errors.yearsPlaying && (
              <ErrorMessage message={errors.yearsPlaying.message?.toString()} />
            )}
            {errors.discord && (
              <ErrorMessage message={errors.discord.message?.toString()} />
            )}
            <Label text='Quando costuma jogar?' />
            <View style={styles.daysButtonView}>
              <Toggle
                weekDayNumber='2'
                weekDayText='S'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
              <Toggle
                weekDayNumber='3'
                weekDayText='T'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
              <Toggle
                weekDayNumber='4'
                weekDayText='Q'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
              <Toggle
                weekDayNumber='5'
                weekDayText='Q'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
              <Toggle
                weekDayNumber='6'
                weekDayText='S'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
              <Toggle
                weekDayNumber='7'
                weekDayText='S'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
              <Toggle
                weekDayNumber='1'
                weekDayText='D'
                weekDays={weekDays}
                handleSelectWeekDay={handleSelectWeekDay}
              />
            </View>
          </View>
          {weekDays.length == 0 && errorWeekDays && (
            <ErrorMessage
              message={'Selecione os dias da semana que costuma jogar.'}
            />
          )}

          <Label text='Qual horário do dia?' />
          <View style={{ flexDirection: 'row' }}>
            <Controller
              name='hourStart'
              control={control}
              render={({ field: { onChange, value } }) => (
                <MaskInput
                  value={value}
                  onChangeText={onChange}
                  mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                  style={[styles.input, { flex: 1, marginRight: 5 }]}
                  keyboardType='numeric'
                  placeholder='De'
                  placeholderTextColor={THEME.COLORS.CAPTION_300}
                />
              )}
            />
            <Controller
              name='hourEnd'
              control={control}
              render={({ field: { onChange, value } }) => (
                <MaskInput
                  value={value}
                  onChangeText={onChange}
                  mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                  style={[styles.input, { flex: 1, marginRight: 5 }]}
                  keyboardType='numeric'
                  placeholder='Até'
                  placeholderTextColor={THEME.COLORS.CAPTION_300}
                />
              )}
            />
          </View>
          {(errors.hourStart || errors.hourEnd) && (
            <ErrorMessage message={'Informar os horários inicial e final.'} />
          )}
          {errorHours && (
            <ErrorMessage
              message={'A hora inicial não pode ser maior que a hora final.'}
            />
          )}
          <TouchableOpacity
            onPress={() => setUseVoiceChannel(!useVoiceChannel)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            {useVoiceChannel ? (
              <CheckSquare size={30} color='green' />
            ) : (
              <Square size={30} color='white' />
            )}

            <Text style={{ color: 'white', marginLeft: 10 }}>
              Costumo me conectar ao chat de voz
            </Text>
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => {
                handleCancel();
                setVisible(false);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelTextButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(handleCreateAd)}
              style={styles.duoButton}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    size={25}
                    color='white'
                    style={styles.duoIconButton}
                  />
                  <Text style={styles.duoTextButton}>Carregando</Text>
                </>
              ) : (
                <>
                  <GameController
                    color='white'
                    size={25}
                    style={styles.duoIconButton}
                  />
                  <Text style={styles.duoTextButton}>Encontrar duo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
