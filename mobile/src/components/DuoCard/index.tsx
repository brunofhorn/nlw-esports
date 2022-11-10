import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';
import { GameController } from 'phosphor-react-native';
import { IDuoCard } from '../../interfaces';

export function DuoCard({
  name,
  yearsPlaying,
  weekDays,
  hourStart,
  hourEnd,
  useVoiceChannel,
  onConnect,
}: IDuoCard) {
  return (
    <View style={styles.container}>
      <DuoInfo label={'Nome'} value={name} />
      <DuoInfo label={'Tempo de jogo'} value={`${yearsPlaying} anos`} />
      <DuoInfo
        label={'Disponibilidade'}
        value={`${weekDays.length} dias \u2022 ${hourStart} - ${hourEnd}`}
      />
      <DuoInfo
        label={'Chamada de áudio'}
        value={useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
