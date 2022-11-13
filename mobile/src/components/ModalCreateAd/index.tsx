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
  CheckCircle,
  CheckSquare,
  GameController,
  Spinner,
  Square,
  SquareHalf,
  SquareLogo,
  X,
} from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { Label } from '../Label';
import { SelectGames } from '../SelectGame';
import { useEffect, useState } from 'react';
import { Toggle } from '../Toggle';
import { useApp } from '../../hooks/useApp';
import { convertHoursToMinutesAmount } from '../../utils/convertHoursToMinutesAmount';
import axios from 'axios';
import { api } from '../../services/api';
import { ErrorMessage } from '../ErrorMessage';

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required('O campo nome é obrigatório.')
      .min(3, 'O valor mínimo é 3 caracteres.'),
    yearsPlaying: yup
      .number()
      .min(0, 'É preciso preencher um valor neste campo')
      .max(90, 'Não é possível ter mais de 90 anos só de jogos.'),
    discord: yup.string().required('O campo discord é obrigatório'),
    hourStart: yup.string().required('O campo de horas é obrigatório.'),
    hourEnd: yup.string().required('O campo de horas é obrigatório.'),
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    reset();
    setGameSelected({} as IGamesFormated);
    setWeekDays([]);
    setErrorGameSelected(false);
    setErrorHours(false);
    setErrorWeekDays(false);
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
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
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
                <TextInput
                  keyboardType='numeric'
                  value={value}
                  onChangeText={onChange}
                  style={[styles.input, { flex: 1, marginRight: 5 }]}
                  placeholder={'De'}
                  placeholderTextColor={THEME.COLORS.CAPTION_300}
                />
              )}
            />
            <Controller
              name='hourEnd'
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType='numeric'
                  value={value}
                  onChangeText={onChange}
                  style={[styles.input, { flex: 1, marginLeft: 5 }]}
                  placeholder={'Até'}
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
