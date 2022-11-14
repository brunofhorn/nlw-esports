import { TouchableOpacity, View, Text, Image } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';
import { DiscordLogo, GameController, UserCircle } from 'phosphor-react-native';
import { IDuoCard } from '../../interfaces';

export function DuoCard({
  discordImage,
  username,
  yearsPlaying,
  weekDays,
  hourStart,
  hourEnd,
  useVoiceChannel,
  onConnect,
}: IDuoCard) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {discordImage?.trim() !== '' &&
          discordImage?.trim().includes('http') ? (
            <Image
              source={{ uri: discordImage }}
              style={{ width: 40, height: 40, borderRadius: 40 }}
            />
          ) : (
            <UserCircle size={45} color='white' />
          )}
        </View>
        <View style={{ flex: 2 }}>
          <DuoInfo label={'Nome'} value={username} />
        </View>
      </View>

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
